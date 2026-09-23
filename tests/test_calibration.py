"""Recorded native web.run bodies are the oracle, never generated expectations."""

import difflib
import re
from pathlib import Path

import pytest

from view_as_ai import process_html

FIXTURES = Path(__file__).parent / "fixtures"
CASES = [
    ("example", "https://example.com/"),
    ("httpbin", "https://httpbin.org/forms/post"),
    ("selenium", "https://www.selenium.dev/selenium/web/web-form.html"),
]


@pytest.mark.parametrize("name,url", CASES)
def test_native_web_output(name, url):
    html = (FIXTURES / f"{name}.html").read_text("utf-8")
    expected = (FIXTURES / f"{name}.web.txt").read_text("utf-8").strip()
    actual = process_html(html, url).text.strip()
    diff = "\n".join(
        difflib.unified_diff(
            expected.splitlines(),
            actual.splitlines(),
            fromfile="native web.run",
            tofile="view-as-ai",
            lineterm="",
        )
    )
    assert actual == expected, diff


@pytest.mark.parametrize(
    "name,url",
    [
        ("xhtml", "https://www.selenium.dev/selenium/web/xhtmlTest.html"),
        ("openai-controls", "https://developers.openai.com/api/docs/bots"),
        (
            "book-details",
            "https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html",
        ),
    ],
)
def test_native_content_with_layout_tolerance(name, url):
    html = (FIXTURES / f"{name}.html").read_text("utf-8")
    expected = (FIXTURES / f"{name}.web.txt").read_text("utf-8")
    actual = process_html(html, url).text

    # Only whitespace and document-local reference numbering differ here.
    # Text, control markers, table separators, and ordering must all match.
    def normalize(text):
        return re.sub(r"\s+", " ", re.sub(r"【\d+†", "【#†", text)).strip()

    assert normalize(actual) == normalize(expected)
