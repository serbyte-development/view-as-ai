"""Read a URL, saved HTML file, or stdin and print a View as AI preview."""

from __future__ import annotations

import argparse
import json
import math
import sys
from dataclasses import asdict
from pathlib import Path
from urllib.parse import urlsplit

import httpx
import lxml.etree

from . import __version__
from .parser import process_html
from .pruner import prune_html

DEFAULT_USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36"
)


def _validate_http_url(value: str) -> None:
    try:
        parsed = urlsplit(value)
        _ = parsed.port
    except ValueError as exc:
        raise ValueError(f"Invalid URL: {exc}") from exc
    if parsed.scheme not in ("http", "https") or not parsed.hostname:
        raise ValueError("URL must use http:// or https:// and include a hostname")


def _fetch_url(url: str, timeout: float) -> tuple[str, str]:
    _validate_http_url(url)
    headers = {
        "User-Agent": DEFAULT_USER_AGENT,
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
    }
    with httpx.Client(follow_redirects=True, timeout=timeout, headers=headers) as client:
        response = client.get(url)
        response.raise_for_status()
    content_type = response.headers.get("content-type", "").split(";", 1)[0].strip().lower()
    if content_type and content_type not in ("text/html", "application/xhtml+xml"):
        raise ValueError(f"Expected HTML; received {content_type}")
    return response.text, str(response.url)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Preview the information a browsing model is likely to receive from HTML."
    )
    parser.add_argument("source", help="HTTP(S) URL, local HTML file, or - for stdin")
    parser.add_argument("--base-url", help="Resolve relative links against this URL for local HTML")
    parser.add_argument("--format", choices=("view", "text", "json"), default="view")
    parser.add_argument("-o", "--output", type=Path, help="Write the preview to a file")
    parser.add_argument(
        "--timeout", type=float, default=30, help="HTTP timeout in seconds (default 30)"
    )
    parser.add_argument("--version", action="version", version=f"view-as-ai {__version__}")
    args = parser.parse_args(argv)

    if not math.isfinite(args.timeout) or args.timeout <= 0:
        parser.error("--timeout must be a finite positive number")

    if args.base_url:
        try:
            _validate_http_url(args.base_url)
        except ValueError:
            parser.error("--base-url must be an HTTP(S) URL with a hostname")
        if args.source.startswith(("http://", "https://")):
            parser.error("--base-url applies only to local HTML files and stdin")

    try:
        if args.source.startswith(("http://", "https://")):
            html, url = _fetch_url(args.source, args.timeout)
        else:
            html = sys.stdin.read() if args.source == "-" else Path(args.source).read_text("utf-8")
            url = args.base_url or "http://localhost/"

        page = process_html(prune_html(html), url)
        if not page.text.strip():
            print(
                "view-as-ai: no readable HTML text found; client-rendered JavaScript content "
                "is intentionally not executed.",
                file=sys.stderr,
            )

        if args.format == "json":
            output = json.dumps(asdict(page), ensure_ascii=False, indent=2)
        elif args.format == "text":
            output = page.text
        else:
            lines = page.text.splitlines()
            numbered = "\n".join(f"L{i}: {line}" for i, line in enumerate(lines))
            output = (
                f"{page.title} ({page.url})\n"
                f"View as AI preview; Total lines: {len(lines)}\n{numbered}"
            )

        if args.output:
            args.output.write_text(output + "\n", encoding="utf-8")
        else:
            print(output)
        return 0
    except BrokenPipeError:
        return 0
    except (
        httpx.HTTPError,
        httpx.InvalidURL,
        OSError,
        UnicodeError,
        ValueError,
        lxml.etree.LxmlError,
    ) as exc:
        print(f"view-as-ai: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
