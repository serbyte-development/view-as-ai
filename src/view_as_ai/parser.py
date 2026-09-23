"""HTML formatter adapted from OpenAI's gpt-oss simple browser.

Source: openai/gpt-oss at 750cfe908fdc9dd1f0e9bfcd92a4bb1adb0aa81c,
gpt_oss/tools/simple_browser/page_contents.py (Apache-2.0).
View as AI modifications: standalone dataclass, removed unused browser machinery,
safe document roots, controls, image references, tables and whitespace calibrated
against native web.run. The parser retains Unicode and same-page links.
See THIRD_PARTY_NOTICES.md and licenses/openai-gpt-oss.txt.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from urllib.parse import urljoin, urlparse

import html2text
import lxml.etree
import lxml.html

HTML_SUP_RE = re.compile(r"<sup( [^>]*)?>([\w\-]+)</sup>")
HTML_SUB_RE = re.compile(r"<sub( [^>]*)?>([\w\-]+)</sub>")
HTML_TAGS_SEQ_RE = re.compile(r"(?<=\w)((<[^>]*>)+)(?=\w)")
WHITESPACE_ANCHOR_RE = re.compile(r"(【\@[^】]+】)(\s+)")
EMPTY_LINE_RE = re.compile(r"^\s+$", flags=re.MULTILINE)
EXTRA_NEWLINE_RE = re.compile(r"\n(\s*\n)+")
LINK_BLOCK_TAGS = {
    "address",
    "article",
    "aside",
    "blockquote",
    "dd",
    "div",
    "dl",
    "dt",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hr",
    "li",
    "main",
    "nav",
    "ol",
    "p",
    "pre",
    "section",
    "table",
    "td",
    "th",
    "tr",
    "ul",
}


@dataclass
class PageContents:
    url: str
    text: str
    title: str
    urls: dict[str, str]


def get_domain(url: str) -> str:
    """Extract the domain from a URL."""
    if "://" not in url:
        url = "//" + url
    return urlparse(url).netloc


def _replace_special_chars(text: str) -> str:
    replacements = {"【": "〖", "】": "〗", "◼": "◾", "\u200b": ""}
    regex = re.compile("(" + "|".join(map(re.escape, replacements)) + ")")
    return regex.sub(lambda mo: replacements[mo.group(1)], text)


def merge_whitespace(text: str) -> str:
    return re.sub(r"\s+", " ", text.replace("\n", " "))


def _get_text(node: lxml.html.HtmlElement) -> str:
    return merge_whitespace(" ".join(node.itertext()))


def _get_link_text(node: lxml.html.HtmlElement) -> str:
    """Keep inline text contiguous, block boundaries spaced, and code marked."""

    def collect(element: lxml.html.HtmlElement) -> str:
        if not isinstance(element.tag, str):
            return ""
        if element.tag == "code":
            return html_to_text(lxml.etree.tostring(element, encoding="unicode", with_tail=False))
        parts = [element.text or ""]
        for child in element:
            block = child.tag in LINK_BLOCK_TAGS
            if block:
                parts.append(" ")
            parts.append(collect(child))
            if block:
                parts.append(" ")
            parts.append(child.tail or "")
        return "".join(parts)

    return merge_whitespace(collect(node))


def replace_node_with_text(node: lxml.html.HtmlElement, text: str) -> None:
    """Replace a node while preserving the text on either side."""
    previous = node.getprevious()
    parent = node.getparent()
    tail = node.tail or ""
    if previous is None:
        parent.text = (parent.text or "") + text + tail
    else:
        previous.tail = (previous.tail or "") + text + tail
    parent.remove(node)


def replace_references(root: lxml.html.HtmlElement, cur_url: str, base_url: str) -> dict[str, str]:
    """Replace links, standalone images and iframe sources in document order."""
    cur_domain = get_domain(cur_url)
    urls: dict[str, str] = {}
    urls_rev: dict[str, str] = {}
    handled_anchors: set[lxml.html.HtmlElement] = set()
    for node in root.xpath(".//a[@href] | .//img | .//iframe[@src]"):
        if node.getparent() is None:
            continue
        if node.tag == "a":
            link = node.attrib["href"]
            text = _get_link_text(node).strip().replace("†", "‡")
            image_only = not text and node.find(".//img") is not None
            if not text and not image_only:
                continue
            try:
                link = urljoin(base_url, link)
                domain = get_domain(link)
                scheme = urlparse(link).scheme
                if scheme not in ("http", "https"):
                    if scheme == "mailto":
                        # Native USAGov and HVAC captures retain email text while
                        # omitting email-link images. Phone images remain.
                        for image in node.findall(".//img"):
                            image.drop_tree()
                    node.drop_tag()
                    continue
            except ValueError:
                continue
            if not domain:
                continue
            handled_anchors.add(node)
            if image_only:
                # Native Serbyte output drops HTTP(S) image-only anchors while
                # retaining standalone images later in the document.
                replace_node_with_text(node, "")
                continue
            if (link_id := urls_rev.get(link)) is None:
                link_id = f"{len(urls)}"
                urls[link_id] = link
                urls_rev[link] = link_id
            if domain == cur_domain:
                replacement = f"【{link_id}†{text}】"
            else:
                replacement = f"【{link_id}†{text}†{domain}】"
            replace_node_with_text(node, " " + replacement + " ")
            continue

        # Images inside anchors are represented by the anchor's readable text,
        # or omitted for valid HTTP(S) image-only anchors. Invalid/non-web
        # anchors retain their prior image behavior.
        if any(anchor in handled_anchors for anchor in node.xpath("ancestor::a[@href]")):
            continue
        if node.tag == "iframe":
            label = merge_whitespace(node.get("title", "")).strip() or "iframe"
        else:
            title = merge_whitespace(node.get("title", "")).strip()
            alt = merge_whitespace(node.get("alt", "")).strip()
            image_label = title or alt
            label = f"Image: {image_label}" if image_label else "Image"
        src = node.get("src", "")
        try:
            target = urljoin(base_url, src)
            domain = get_domain(target)
            valid = bool(src and domain) and urlparse(target).scheme in ("http", "https")
        except ValueError:
            valid = False
        if node.tag == "iframe" and not valid:
            continue
        if valid:
            if target not in urls_rev:
                key = str(len(urls))
                urls[key] = target
                urls_rev[target] = key
            suffix = f"†{domain}" if domain != cur_domain else ""
            label = f"【{urls_rev[target]}†{label.replace('†', '‡')}{suffix}】"
        replace_node_with_text(node, " " + label + " ")
    return urls


class _ModelText(html2text.HTML2Text):
    """Emit literal model text without Markdown escaping or global monkeypatches."""

    def handle_data(self, data: str, entity_char: bool = False) -> None:
        super().handle_data(data, entity_char=True)


def html_to_text(html: str) -> str:
    """Convert HTML using the public OpenAI formatter configuration."""
    html = re.sub(HTML_SUP_RE, r"^{\2}", html)
    html = re.sub(HTML_SUB_RE, r"_{\2}", html)
    html = re.sub(HTML_TAGS_SEQ_RE, r" \1", html)
    # Upstream intended to disable escaping via a global patch. Do it on this
    # converter instance, including generated table-header separator lines.
    h = _ModelText()
    h.ignore_links = True
    h.ignore_images = True
    h.body_width = 0
    h.ignore_tables = True
    h.unicode_snob = True
    h.ignore_emphasis = True
    return h.handle(html).strip("\n")


def replace_controls(root: lxml.html.HtmlElement) -> None:
    """Preserve the native control markers observed in web.run form fixtures.

    Labels remain ordinary text in DOM order. Native snapshots suppress select
    options and input values, including checked state. They include hidden inputs.
    """
    buttons_with_element_children = {
        button
        for button in root.xpath(".//button")
        if any(isinstance(child.tag, str) for child in button)
    }
    for node in reversed(root.xpath(".//button | .//input | .//select")):
        if node.tag == "input":
            placeholder = merge_whitespace(node.get("placeholder", "")).strip()
            text = f"[Input: {placeholder}]" if placeholder else "[Input]"
        elif node.tag == "select":
            text = "[Select]"
        else:
            if node in buttons_with_element_children:
                # Native captures expose child markup from complex buttons while
                # text-only buttons retain the explicit [Button: ...] marker.
                node.drop_tag()
                continue
            label = _get_text(node).lstrip()
            text = f"[Button: {label}]" if label else ""
        replace_node_with_text(node, text)


def prepare_tables(root: lxml.html.HtmlElement) -> None:
    """Retain cell boundaries while reusing html2text's row handling."""
    for table in root.findall(".//table"):
        rows = table.xpath("./tr | ./thead/tr | ./tbody/tr | ./tfoot/tr")
        for index, row in enumerate(rows):
            cells = row.xpath("./th | ./td")
            for cell in cells[:-1]:
                cell.tail = " | " + (cell.tail or "")
            if index == 0 and cells and all(cell.tag == "th" for cell in cells):
                separator = lxml.html.Element("tr")
                separator.text = " | ".join("---" for cell in cells)
                row.addnext(separator)
        table.tag = "div"


def process_html(html: str, url: str, title: str | None = None) -> PageContents:
    """Convert HTML into a model-readable page; this function performs no I/O."""
    html = _replace_special_chars(html)
    root = lxml.html.document_fromstring(
        (html if html.strip() else "<html></html>").encode("utf-8"),
        parser=lxml.html.HTMLParser(encoding="utf-8"),
    )
    title_element = root.find(".//title")
    if title:
        final_title = title
    elif title_element is not None:
        final_title = title_element.text or ""
    else:
        final_title = get_domain(url) if url else ""

    # Remove non-reading content before link/button text extraction can flatten
    # it into an otherwise visible label. Preserve surrounding text and tails.
    for node in reversed(root.xpath(".//script | .//style | .//math")):
        replace_node_with_text(node, "")

    base = root.find(".//base[@href]")
    try:
        base_url = urljoin(url, base.get("href")) if base is not None else url
        if urlparse(base_url).scheme not in ("http", "https"):
            base_url = url
    except ValueError:
        base_url = url
    # HTML forms establish block boundaries even when their only child is input.
    for form in root.findall(".//form"):
        form.tag = "div"
    replace_controls(root)
    urls = replace_references(root, url, base_url)
    prepare_tables(root)
    # Emphasis is intentionally omitted from native text. Unwrap it before the
    # tag-boundary spacing rule so inline units such as 10<em>yr</em> stay joined.
    for node in reversed(root.xpath(".//b | .//strong | .//i | .//em")):
        node.drop_tag()
    clean_html = lxml.etree.tostring(root, encoding="UTF-8").decode()
    text = html_to_text(clean_html)
    text = re.sub(WHITESPACE_ANCHOR_RE, lambda m: m.group(2) + m.group(1), text)
    text = re.sub(EMPTY_LINE_RE, "", text)
    text = re.sub(EXTRA_NEWLINE_RE, "\n\n", text)
    # Preserve list and code indentation while removing converter spacing noise.
    lines = []
    for line in text.splitlines():
        line = line.rstrip()
        if line and not line.startswith("    ") and "`" not in line:
            indent = len(line) - len(line.lstrip())
            line = line[:indent] + re.sub(r"[ \t]+", " ", line[indent:])
        lines.append(line)
    text = "\n".join(lines).strip("\n")
    return PageContents(url=url, text=text, urls=urls, title=final_title)
