"""Synthetic regressions supplement the separately captured native snapshots."""

from concurrent.futures import ThreadPoolExecutor

import pytest

from view_as_ai import process_html, prune_html

URL = "https://example.test/docs/page"


def test_provider_pruning_navigation_role_and_non_main_banner():
    html = """
    <nav><a href="/kept">Kept nav</a></nav>
    <div role="navigation"><a href="/gone">Gone navigation</a></div>
    <section class="promo-banner"><p>Gone banner</p></section>
    <main><section class="article-banner"><p>Kept main banner</p></section></main>
    <main class="page-banner"><p>Kept primary content</p></main>
    """
    page = process_html(prune_html(html), URL)
    assert "Kept nav" in page.text
    assert "Kept main banner" in page.text
    assert "Kept primary content" in page.text
    assert "Gone navigation" not in page.text
    assert "Gone banner" not in page.text


def test_provider_pruning_breadcrumb():
    html = """
    <nav aria-label="Breadcrumb"><a href="/">Home</a> Current</nav>
    <nav id="product-nav"><a href="/buy">Buy</a></nav>
    <main><h1>Current</h1></main>
    """
    page = process_html(prune_html(html), URL)
    assert "Home" not in page.text
    assert "Buy" in page.text
    assert "# Current" in page.text


def test_metadata_and_fragments():
    page = process_html("<title>Preview &amp; test</title><h1>Ready</h1>", URL)
    assert page.title == "Preview & test"
    assert page.url == URL
    assert page.text == "# Ready"
    assert process_html("<button>Buy</button>", URL).text == "[Button: Buy]"


def test_duplicate_relative_external_and_fragment_links():
    page = process_html(
        '<a href="../buy">Buy</a><a href="../buy">Again</a>'
        '<a href="#faq">FAQ</a><a href="https://elsewhere.test/x">More</a>',
        URL,
    )
    assert page.urls == {
        "0": "https://example.test/buy",
        "1": URL + "#faq",
        "2": "https://elsewhere.test/x",
    }
    assert page.text == "【0†Buy】 【0†Again】 【1†FAQ】 【2†More†elsewhere.test】"


def test_base_href_applies_to_links_and_images():
    page = process_html(
        '<base href="/assets/"><a href="guide">Guide</a><img src="cover.png" alt="Cover">',
        URL,
    )
    assert page.urls == {
        "0": "https://example.test/assets/guide",
        "1": "https://example.test/assets/cover.png",
    }
    assert "【1†Image: Cover】" in page.text


def test_images_and_image_only_link():
    page = process_html(
        '<a href="/before">Before</a>'
        '<img src="/cover.png" alt="Cover">'
        '<a href="/product"><img src="/thumb.png" alt="Product"></a>'
        '<a href="/after">After</a>'
        '<img src="/cover.png" alt="Cover again"><img alt="Unavailable">',
        URL,
    )
    assert page.urls == {
        "0": "https://example.test/before",
        "1": "https://example.test/cover.png",
        "2": "https://example.test/after",
    }
    assert "Product" not in page.text
    assert all("thumb.png" not in url for url in page.urls.values())
    assert "【0†Before】 【1†Image: Cover】 【2†After】" in page.text
    assert "【1†Image: Cover again】" in page.text
    assert "Image: Unavailable" in page.text


def test_controls_preserve_text_without_inventing_aria_rules():
    page = process_html(
        '<button aria-label="Different">Visible</button>'
        '<button aria-label="Icon action"></button>'
        '<div role="button">Custom</div>'
        '<input type="password" value="secret" placeholder="Password">'
        '<select aria-label="Plan"><option selected>Pro</option></select>'
        "<textarea>Notes</textarea>",
        URL,
    )
    assert "[Button: Visible]" in page.text
    assert "Different" not in page.text
    assert "Icon action" not in page.text
    assert "Custom" in page.text
    assert "[Input: Password]" in page.text
    assert "secret" not in page.text
    assert "[Select]" in page.text
    assert "Pro" not in page.text
    assert "Notes" in page.text


def test_linked_code_keeps_markup_and_neighboring_text():
    page = process_html(
        '<p>Call <a href="/fn"><code><span>sleep()</span></code></a>.</p>'
        '<a href="/guide">Use <code>a_b</code> here</a>',
        URL,
    )
    assert "【0†`sleep()`】" in page.text
    assert "【1†Use `a_b` here】" in page.text
    assert page.urls == {"0": "https://example.test/fn", "1": "https://example.test/guide"}


def test_link_text_preserves_inline_word_boundaries_and_spaces():
    page = process_html(
        '<a href="/brand"><span aria-label="Different">SERBY<span>T</span>E</span></a>'
        '<a href="/more">Read<span> more</span></a>'
        '<a href="/comments">One<!-- split -->word</a>',
        URL,
    )
    assert page.text == "【0†SERBYTE】 【1†Read more】 【2†Oneword】"


def test_link_text_separates_block_nodes_and_their_tails():
    page = process_html('<a href="/card">Start<div><h2>Title</h2><p>Details</p></div>Tail</a>', URL)
    assert page.text == "【0†Start Title Details Tail】"


def test_external_images_include_source_domain():
    page = process_html('<img src="https://images.test/cover.png" alt="Cover">', URL)
    assert page.text == "【0†Image: Cover†images.test】"
    assert page.urls == {"0": "https://images.test/cover.png"}


def test_icon_only_button_preserves_its_image_without_an_invented_button_name():
    page = process_html(
        '<button aria-label="Close dialog"><img src="/close.svg" alt="Close"></button>',
        URL,
    )
    assert page.text == "【0†Image: Close】"
    assert page.urls == {"0": "https://example.test/close.svg"}


def test_image_only_email_anchor_is_suppressed_and_tail_survives():
    page = process_html(
        '<p>Share <a href="mailto:?subject=Hello"><img src="/email.svg" alt="Email"></a> here.</p>',
        URL,
    )
    assert page.text == "Share here."
    assert page.urls == {}


def test_email_text_survives_while_its_image_is_suppressed():
    page = process_html(
        '<a href="tel:123"><img src="/phone.png">123</a>'
        '<p><a href="mailto:hello@example.test"><img src="/email.png">hello@example.test</a></p>',
        URL,
    )
    assert "hello@example.test" in page.text
    assert page.urls == {"0": "https://example.test/phone.png"}
    assert "【0†Image】" in page.text


def test_plain_nonweb_links_keep_literal_adjacent_text_boundaries():
    page = process_html(
        '<p><a href="tel:123">123</a><a href="mailto:hi@example.test">hi@example.test</a></p>',
        URL,
    )
    assert page.text == "123hi@example.test"
    assert page.urls == {}


def test_emphasis_does_not_insert_new_word_boundaries():
    page = process_html(
        "<p>10<em>yr</em></p><div>Lifespan<strong>30–50 yrs</strong></div>"
        "<p>Real <strong>word</strong> spacing.</p>",
        URL,
    )
    assert "10yr" in page.text
    assert "Lifespan30–50 yrs" in page.text
    assert "Real word spacing." in page.text


def test_iframe_references_keep_title_default_label_and_document_order():
    page = process_html(
        '<iframe src="https://frames.test/one" title="GTM"></iframe>'
        '<a href="/next">Next</a>'
        '<iframe src="/embedded"></iframe>'
        '<img src="/image.png" alt="Photo">',
        URL,
    )
    assert page.text == "【0†GTM†frames.test】 【1†Next】 【2†iframe】 【3†Image: Photo】"
    assert page.urls == {
        "0": "https://frames.test/one",
        "1": "https://example.test/next",
        "2": "https://example.test/embedded",
        "3": "https://example.test/image.png",
    }


@pytest.mark.parametrize("source", ["", "javascript:alert(1)", "http://[bad"])
def test_invalid_iframe_source_keeps_fallback_and_surrounding_text(source):
    page = process_html(f'<p>Before<iframe src="{source}">Fallback</iframe>After</p>', URL)
    assert all(word in page.text for word in ("Before", "Fallback", "After"))
    assert page.urls == {}


def test_table_header_and_currency_boundaries():
    page = process_html(
        "<table><tr><th>Name</th><th>Price</th></tr><tr><td>Pro</td><td>£5</td></tr></table>",
        URL,
    )
    assert page.text == "Name | Price\n--- | ---\nPro | £5"


def test_table_with_row_headers_has_no_invented_column_header():
    page = process_html("<table><tr><th>Price</th><td>£5</td></tr></table>", URL)
    assert page.text == "Price | £5"


def test_plaintext_links_and_invalid_hrefs():
    page = process_html(
        '<a href="javascript:alert(1)">Action</a>'
        '<a href="mailto:hello@example.test">Email</a>'
        '<a href="http://[invalid">Malformed</a>'
        '<a href="https://arxiv.org/abs/123">Paper</a>'
        '<a href="tel:+12065551212"><img src="/phone.png" alt="Phone"></a>',
        URL,
    )
    assert page.urls == {
        "0": "https://arxiv.org/abs/123",
        "1": "https://example.test/phone.png",
    }
    assert all(word in page.text for word in ("Action", "Email", "Malformed", "Paper"))
    assert "【1†Image: Phone】" in page.text


def test_textless_non_image_anchor_preserves_layout_content():
    page = process_html('<p>Before<a href="/x"><br></a>After</p>', URL)
    assert page.text == "Before\nAfter"


@pytest.mark.parametrize("base", ["http://[broken", "javascript:bad"])
def test_invalid_base_keeps_page_url(base):
    page = process_html(f'<base href="{base}"><a href="/ok">OK</a>', URL)
    assert page.urls == {"0": "https://example.test/ok"}


def test_scripts_and_styles_stay_out_of_text():
    page = process_html(
        "<style>LEAK_STYLE{color:red}</style><script>LEAK_SCRIPT()</script><h1>Visible</h1>",
        URL,
    )
    assert page.text == "# Visible"


def test_preformatted_code_preserves_indentation_and_spacing():
    page = process_html("<pre><code>a  b\n  c\n</code></pre>", URL)
    assert page.text == "    a  b\n      c"


@pytest.mark.parametrize("tag", ["script", "style"])
def test_active_content_inside_labels_stays_out_of_text(tag):
    page = process_html(
        f'<a href="/buy">Buy<{tag}>HIDDEN</{tag}> now</a>'
        f"<button>Go<{tag}>HIDDEN</{tag}> now</button>",
        URL,
    )
    assert page.text == "【0†Buy now】 [Button: Go now]"


def test_code_markup_and_literal_markdown_are_retained():
    page = process_html("<p>Use <code>a_b</code> and [x].</p><p>1. Literal</p>", URL)
    assert "`a_b`" in page.text
    assert "[x]" in page.text
    assert "1. Literal" in page.text


def test_math_removal_preserves_surrounding_text():
    assert process_html("<p>before<math><mi>x</mi></math>after</p>", URL).text == "beforeafter"


def test_unicode_entities_and_citation_delimiters():
    text = process_html("<p>😀 café 中文 &amp; 【source】</p>", URL).text
    assert text == "😀 café 中文 & 〖source〗"


def test_xml_encoding_declaration_and_malformed_html():
    page = process_html('<?xml version="1.0" encoding="UTF-8"?><html><p>café', URL)
    assert page.text == "café"


def test_empty_input():
    page = process_html(" \n ", URL)
    assert page.text == ""
    assert page.urls == {}


def test_title_override():
    assert process_html("<title>Old</title>", URL, "New").title == "New"


def test_concurrent_calls_have_no_shared_converter_state():
    def parse(index):
        return process_html(f'<h1>{index}</h1><a href="/{index}">Link</a>', URL)

    with ThreadPoolExecutor(max_workers=4) as pool:
        pages = list(pool.map(parse, range(20)))
    for index, page in enumerate(pages):
        assert page.text.startswith(f"# {index}\n")
        assert page.urls == {"0": f"https://example.test/{index}"}
