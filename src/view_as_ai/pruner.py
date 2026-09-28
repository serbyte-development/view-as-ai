"""Provider-style HTML pruning calibrated against native web.run captures."""

from __future__ import annotations

import re

import lxml.etree
import lxml.html

BANNER_TOKEN_RE = re.compile(r"(^|[-_])banner($|[-_])", re.IGNORECASE)
RESPONSIVE_HIDDEN_TOKEN_RE = re.compile(r"hidden-(?:xs|sm|md|lg)\Z")
NAVBAR_TOKEN_RE = re.compile(r"(^|[-_])navbar($|[-_])", re.IGNORECASE)
EXACT_VISIBILITY_CLASS_TOKENS = {"hidden", "hide", "d-none"}
EXACT_PROVIDER_CLASS_TOKENS = {"social-links", "skip-link", "ad", "ad-slot"}


def _class_tokens(node: lxml.html.HtmlElement) -> list[str]:
    return node.get("class", "").split()


def _has_inline_style(node: lxml.html.HtmlElement) -> bool:
    return node.get("style") is not None


def _is_visibility_utility(node: lxml.html.HtmlElement) -> bool:
    """Match exact visibility utility tokens supported by native captures."""
    if _has_inline_style(node):
        return False

    classes = _class_tokens(node)
    if any(RESPONSIVE_HIDDEN_TOKEN_RE.fullmatch(token) for token in classes):
        return True

    if not any(token in EXACT_VISIBILITY_CLASS_TOKENS for token in classes):
        return False

    # Historical native evidence preserves hidden wrappers whose purpose is to
    # contain form controls. Keep that narrower control case while pruning
    # ordinary exact-token content blocks.
    return not (
        "hidden" in classes
        and node.xpath(".//form | .//input | .//select | .//textarea | .//button")
    )


def _is_exact_provider_class(node: lxml.html.HtmlElement) -> bool:
    return any(token in EXACT_PROVIDER_CLASS_TOKENS for token in _class_tokens(node))


def _is_banner_like(node: lxml.html.HtmlElement) -> bool:
    values = [node.get("id", ""), *node.get("class", "").split()]
    return any(BANNER_TOKEN_RE.search(value) for value in values if value)


def _is_breadcrumb(node: lxml.html.HtmlElement) -> bool:
    item_type = node.get("itemtype", "").strip().lower()
    if node.get("itemscope") is not None and "schema.org/breadcrumblist" in item_type:
        return False
    aria_label = node.get("aria-label", "").strip().lower()
    classes = _class_tokens(node)
    if aria_label == "breadcrumb" or any("breadcrumb" in value.lower() for value in classes):
        return True
    return node.tag in {"nav", "ul", "ol"} and "breadcrumb" in node.get("id", "").lower()


def _is_hidden_decorative_image_wrapper(node: lxml.html.HtmlElement) -> bool:
    """Match hidden main-content wrappers containing only empty-alt decorative images."""
    if (
        node.tag != "div"
        or node.get("aria-hidden", "").strip().lower() != "true"
        or not node.xpath("ancestor::main")
        or not any(
            RESPONSIVE_HIDDEN_TOKEN_RE.fullmatch(token) for token in node.get("class", "").split()
        )
        or "".join(node.itertext()).strip()
    ):
        return False
    images = node.xpath(".//img")
    if not images or any((image.get("alt") or "").strip() for image in images):
        return False
    return all(
        not isinstance(descendant.tag, str) or descendant.tag in {"img", "picture", "source"}
        for descendant in node.iterdescendants()
    )


def _is_framework_social_widget(node: lxml.html.HtmlElement) -> bool:
    """Match framework-declared social widgets and skip-navigation links."""
    classes = _class_tokens(node)
    return (
        (node.tag == "ul" and "et_pb_social_media_follow" in classes)
        or "social-links" in classes
        or ("share-buttons" in classes and bool(node.xpath(".//a")))
        or (node.tag == "a" and "elementor-social-icon" in classes)
        or "skip-link" in classes
    )


def _is_private_use_social_link(node: lxml.html.HtmlElement) -> bool:
    if node.tag != "a" or not any(
        "social" in token.lower() for token in node.get("class", "").split()
    ):
        return False
    chars = [char for char in "".join(node.itertext()) if not char.isspace()]
    return bool(chars) and all(0xE000 <= ord(char) <= 0xF8FF for char in chars)


def _is_search_utility_bar(node: lxml.html.HtmlElement) -> bool:
    """Recognize search/control-only navbar regions while preserving link lists."""
    return (
        node.tag == "div"
        and any(NAVBAR_TOKEN_RE.search(token) for token in node.get("class", "").split())
        and bool(node.xpath(".//form"))
        and not node.xpath(".//ul | .//ol | .//h1 | .//h2 | .//article")
        and not node.xpath("ancestor-or-self::main")
    )


def _is_menu_popup(node: lxml.html.HtmlElement) -> bool:
    """Remove explicit menu popups while preserving ordinary navigation lists."""
    return node.get("role", "").strip().lower() in {"menu", "menubar"} and not node.xpath(
        "ancestor-or-self::main"
    )


def _is_related_navigation(node: lxml.html.HtmlElement) -> bool:
    """Remove semantically labeled contextual/related navigation containers."""
    if node.tag not in {"aside", "div", "nav"}:
        return False
    values = [node.get("id", ""), *node.get("class", "").split()]
    lowered = [value.lower() for value in values if value]
    return any("related-navigation" in value for value in lowered)


def _is_cookie_notice(node: lxml.html.HtmlElement) -> bool:
    if node.tag not in {"aside", "div", "section"}:
        return False
    values = [node.get("id", ""), *node.get("class", "").split()]
    return any(value.lower() in {"cookie-notice", "cookie_notice"} for value in values if value)


def _is_complementary_region(node: lxml.html.HtmlElement) -> bool:
    """Remove semantic sidebars that native open() omits from article-like pages."""
    return node.get("role", "").strip().lower() == "complementary"


def _is_contentinfo_region(node: lxml.html.HtmlElement) -> bool:
    """Remove explicit contentinfo regions supported across multiple page families."""
    return node.get("role", "").strip().lower() == "contentinfo"


def _is_navbar_navigation(node: lxml.html.HtmlElement) -> bool:
    """Match bounded/labeled navbar chrome while preserving large mega-navs."""
    if node.tag != "nav":
        return False
    values = [node.get("id", ""), *node.get("class", "").split()]
    lowered = [value.lower() for value in values if value]
    if not any(value == "navbar" or value.startswith("navbar-") for value in lowered):
        return False
    aria_label = node.get("aria-label", "").strip().lower()
    return len(node.xpath(".//a")) <= 30 or aria_label in {"main", "primary", "primary navigation"}


def prune_html(html: str) -> str:
    """Remove provider-style boilerplate before model-readable formatting.

    Current rules are limited to patterns supported by the native fixture corpus:
    explicit ARIA navigation landmarks, selected banner blocks, ordinary
    breadcrumbs, exact visibility utility class tokens, purely decorative hidden
    images, explicit popup/related navigation, complementary/contentinfo regions,
    cookie notices, and selected social/share/ad widgets. Plain navigation and
    preference controls remain unless another supported signal applies.
    """
    root = lxml.html.document_fromstring(
        (html if html.strip() else "<html></html>").encode("utf-8"),
        parser=lxml.html.HTMLParser(encoding="utf-8"),
    )

    candidates = list(root.xpath('.//*[@role="navigation"]'))
    candidates.extend(
        node
        for node in root.xpath(".//*")
        if _is_banner_like(node)
        and (
            not node.xpath("ancestor-or-self::main")
            or "promo-banner" in node.get("class", "").split()
        )
    )
    candidates.extend(node for node in root.xpath(".//*") if _is_breadcrumb(node))
    candidates.extend(
        node
        for node in root.xpath(".//*[@class]")
        if _is_visibility_utility(node)
        or _is_search_utility_bar(node)
        or _is_hidden_decorative_image_wrapper(node)
        or _is_framework_social_widget(node)
        or _is_private_use_social_link(node)
        or _is_exact_provider_class(node)
    )
    candidates.extend(node for node in root.xpath(".//*") if _is_menu_popup(node))
    candidates.extend(node for node in root.xpath(".//*") if _is_related_navigation(node))
    candidates.extend(node for node in root.xpath(".//*") if _is_cookie_notice(node))
    candidates.extend(node for node in root.xpath(".//*") if _is_complementary_region(node))
    candidates.extend(node for node in root.xpath(".//*") if _is_contentinfo_region(node))
    candidates.extend(node for node in root.xpath(".//nav") if _is_navbar_navigation(node))
    selected: list[lxml.html.HtmlElement] = []
    candidate_ids = {id(node) for node in candidates}
    for node in candidates:
        if any(id(ancestor) in candidate_ids for ancestor in node.iterancestors()):
            continue
        selected.append(node)

    for node in selected:
        if node.getparent() is not None:
            node.drop_tree()

    return lxml.etree.tostring(root, encoding="UTF-8").decode()
