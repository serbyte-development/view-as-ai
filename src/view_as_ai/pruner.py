"""Provider-style HTML pruning calibrated against native web.run captures."""

from __future__ import annotations

import re

import lxml.etree
import lxml.html

BANNER_TOKEN_RE = re.compile(r"(^|[-_])banner($|[-_])", re.IGNORECASE)
CAROUSEL_CLONE_CLASS_TOKENS = frozenset({"slick-cloned", "swiper-slide-duplicate"})
RESPONSIVE_HIDDEN_TOKEN_RE = re.compile(r"hidden-(?:xs|sm|md|lg)\Z")
NAVBAR_TOKEN_RE = re.compile(r"(^|[-_])navbar($|[-_])", re.IGNORECASE)
PREFERENCE_WIDGET_TOKEN_RE = re.compile(
    r"(^|[-_])(color-theme|language-switcher|language_switcher)([-_]|$)", re.IGNORECASE
)
SECONDARY_NAV_ITEMS_RE = re.compile(
    r"(^|[-_])secondary-navigation-menu-items([-_]|$)", re.IGNORECASE
)


def _is_banner_like(node: lxml.html.HtmlElement) -> bool:
    if node.tag == "header":
        return False
    values = [node.get("id", ""), *node.get("class", "").split()]
    return any(BANNER_TOKEN_RE.search(value) for value in values if value)


def _is_breadcrumb(node: lxml.html.HtmlElement) -> bool:
    aria_label = node.get("aria-label", "").strip().lower()
    values = [node.get("id", ""), *node.get("class", "").split()]
    return aria_label == "breadcrumb" or any("breadcrumb" in value.lower() for value in values)


def _is_explicit_carousel_clone(node: lxml.html.HtmlElement) -> bool:
    return bool(CAROUSEL_CLONE_CLASS_TOKENS.intersection(node.get("class", "").split()))


def _is_hidden_header_control(node: lxml.html.HtmlElement) -> bool:
    """Match the responsive header links/wrappers omitted in five native pages."""
    return (
        node.tag in ("a", "div", "nav")
        and bool(node.xpath("ancestor::header | ancestor::nav"))
        and not node.xpath("ancestor::main")
        and any(
            RESPONSIVE_HIDDEN_TOKEN_RE.fullmatch(token) for token in node.get("class", "").split()
        )
    )


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
    classes = node.get("class", "").split()
    return (
        (node.tag == "ul" and "et_pb_social_media_follow" in classes)
        or (node.tag == "a" and "elementor-social-icon" in classes)
        or (node.tag == "a" and "skip-link" in classes)
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
    return node.get("role", "").strip().lower() == "menu" and not node.xpath(
        "ancestor-or-self::main"
    )


def _is_related_navigation(node: lxml.html.HtmlElement) -> bool:
    """Remove semantically labeled contextual/related navigation containers."""
    if node.tag not in {"aside", "div", "nav"}:
        return False
    values = [node.get("id", ""), *node.get("class", "").split()]
    lowered = [value.lower() for value in values if value]
    return any(
        "related-navigation" in value
        or "contextual-sidebar" in value
        or "contextual-footer" in value
        for value in lowered
    )


def _is_preference_widget(node: lxml.html.HtmlElement) -> bool:
    """Remove non-content color-theme/language switcher widgets outside main."""
    if node.xpath("ancestor-or-self::main") or node.xpath(".//form | ancestor::form"):
        return False
    if node.tag not in {"div", "ul", "mdn-color-theme", "mdn-language-switcher"}:
        return False
    values = [node.get("id", ""), *node.get("class", "").split()]
    return any(PREFERENCE_WIDGET_TOKEN_RE.search(value) for value in values if value)


def _is_secondary_navigation_items(node: lxml.html.HtmlElement) -> bool:
    """Remove page-local secondary-navigation item containers, not global nav."""
    if node.tag not in {"div", "nav"}:
        return False
    values = [node.get("id", ""), *node.get("class", "").split()]
    return any(SECONDARY_NAV_ITEMS_RE.search(value) for value in values if value)


def _is_complementary_region(node: lxml.html.HtmlElement) -> bool:
    """Remove semantic sidebars that native open() omits from article-like pages."""
    return node.get("role", "").strip().lower() == "complementary"


def _is_contentinfo_region(node: lxml.html.HtmlElement) -> bool:
    """Remove explicit contentinfo regions supported across multiple page families."""
    return node.get("role", "").strip().lower() == "contentinfo"


def _is_utility_navigation(node: lxml.html.HtmlElement) -> bool:
    """Remove explicitly named utility-navigation containers, not primary nav."""
    if node.tag not in {"nav", "ul", "div"}:
        return False
    values = [node.get("id", ""), *node.get("class", "").split()]
    lowered = [value.lower() for value in values if value]
    return any("utility-nav" in value or value == "utilitynav" for value in lowered)


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
    explicit ARIA navigation landmarks, banner-labelled blocks outside main
    content, breadcrumbs, framework-marked carousel clones, responsive header
    alternates, purely decorative hidden images, explicit popup/related/utility
    navigation, complementary sidebars, and selected framework preference/social
    widgets. HTML ``nav`` elements without another supported signal remain.
    """
    root = lxml.html.document_fromstring(
        (html if html.strip() else "<html></html>").encode("utf-8"),
        parser=lxml.html.HTMLParser(encoding="utf-8"),
    )

    candidates = list(root.xpath('.//*[@role="navigation"]'))
    candidates.extend(
        node
        for node in root.xpath(".//*")
        if _is_banner_like(node) and not node.xpath("ancestor-or-self::main")
    )
    candidates.extend(node for node in root.xpath(".//nav | .//ul | .//ol") if _is_breadcrumb(node))
    candidates.extend(
        node for node in root.xpath(".//*[@class]") if _is_explicit_carousel_clone(node)
    )
    candidates.extend(
        node
        for node in root.xpath(".//*[@class]")
        if _is_hidden_header_control(node)
        or _is_search_utility_bar(node)
        or _is_hidden_decorative_image_wrapper(node)
        or _is_framework_social_widget(node)
        or _is_private_use_social_link(node)
        or _is_preference_widget(node)
        or _is_secondary_navigation_items(node)
    )
    candidates.extend(node for node in root.xpath(".//*") if _is_menu_popup(node))
    candidates.extend(node for node in root.xpath(".//*") if _is_related_navigation(node))
    candidates.extend(node for node in root.xpath(".//*") if _is_complementary_region(node))
    candidates.extend(node for node in root.xpath(".//*") if _is_contentinfo_region(node))
    candidates.extend(node for node in root.xpath(".//*") if _is_utility_navigation(node))
    candidates.extend(node for node in root.xpath(".//nav") if _is_navbar_navigation(node))
    # Native captures omit closed-state alternate labels and hidden separators.
    # Conditional class variants and screen-reader-only text keep their content.
    candidates.extend(
        node for node in root.xpath(".//span[@class]") if "hidden" in node.get("class", "").split()
    )

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
