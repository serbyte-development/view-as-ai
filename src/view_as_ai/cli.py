"""Read a URL, saved HTML file, or stdin and print a View as AI preview."""

from __future__ import annotations

import argparse
import ipaddress
import json
import math
import socket
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


class CLIError(Exception):
    """User-facing operational failure."""


def _configure_stdio() -> None:
    """Keep model-reference Unicode printable on Windows consoles and pipes."""
    for stream in (sys.stdout, sys.stderr):
        reconfigure = getattr(stream, "reconfigure", None)
        if reconfigure is not None:
            reconfigure(encoding="utf-8")


def _validate_http_url(value: str) -> None:
    try:
        parsed = urlsplit(value)
        _ = parsed.port
    except ValueError as exc:
        raise ValueError(f"Invalid URL: {exc}") from exc
    if parsed.scheme not in ("http", "https") or not parsed.hostname:
        raise ValueError("Invalid URL: expected http:// or https:// with a hostname")


def _remote_url(source: str) -> str | None:
    """Resolve CLI input to a URL unless it uses explicit local-path syntax."""
    if source == "-":
        return None
    if source.startswith(("/", "./", "../", "\\\\", ".\\", "..\\")) or (
        len(source) >= 3 and source[0].isalpha() and source[1] == ":" and source[2] in ("/", "\\")
    ):
        return None

    lowered = source.lower()
    for scheme in ("http", "https"):
        prefix = f"{scheme}:"
        if lowered.startswith(prefix):
            url = f"{scheme}://{source[len(prefix) :].lstrip('/')}"
            _validate_http_url(url)
            return url

    if lowered.startswith(("http//", "https//")):
        raise ValueError("Invalid URL: expected http:// or https://")
    if "://" in source:
        raise ValueError("Invalid URL: only http:// and https:// URLs are supported")

    try:
        parsed = urlsplit(f"//{source}")
        hostname = parsed.hostname
        _ = parsed.port
    except ValueError as exc:
        raise ValueError(f"Invalid URL: {exc}") from exc
    if not hostname:
        raise ValueError("Invalid URL: expected a hostname")

    if hostname == "localhost":
        scheme = "http"
    else:
        try:
            address = ipaddress.ip_address(hostname)
        except ValueError:
            scheme = "https"
        else:
            scheme = "http" if address.is_loopback or address.is_private else "https"
    url = f"{scheme}://{source}"
    _validate_http_url(url)
    return url


def _fetch_url(url: str, timeout: float) -> tuple[str, str]:
    _validate_http_url(url)
    host = urlsplit(url).hostname or url
    headers = {
        "User-Agent": DEFAULT_USER_AGENT,
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
    }
    try:
        with httpx.Client(follow_redirects=True, timeout=timeout, headers=headers) as client:
            response = client.get(url)
            response.raise_for_status()
    except httpx.TimeoutException as exc:
        raise CLIError(f"Request timed out: {host}") from exc
    except httpx.ConnectError as exc:
        cause = exc
        while cause is not None:
            if isinstance(cause, socket.gaierror):
                raise CLIError(f"Could not resolve host: {host}") from exc
            if isinstance(cause, ConnectionRefusedError):
                raise CLIError(f"Connection refused: {host}") from exc
            cause = cause.__cause__ or cause.__context__
        raise CLIError(f"Could not connect to host: {host}") from exc
    except httpx.TooManyRedirects as exc:
        raise CLIError(f"Too many redirects: {url}") from exc
    except httpx.HTTPStatusError as exc:
        status = exc.response.status_code
        reason = exc.response.reason_phrase
        raise CLIError(f"HTTP {status} {reason}: {exc.request.url}") from exc
    content_type = response.headers.get("content-type", "").split(";", 1)[0].strip().lower()
    if content_type and content_type not in ("text/html", "application/xhtml+xml"):
        raise ValueError(f"Expected HTML; received {content_type}")
    return response.text, str(response.url)


def main(argv: list[str] | None = None) -> int:
    _configure_stdio()
    parser = argparse.ArgumentParser(
        description="Preview a website as an AI browsing model sees it."
    )
    parser.add_argument(
        "source",
        help="Website, explicit local path (./page.html), or - for stdin. Bare domains use HTTPS.",
    )
    parser.add_argument(
        "--base-url",
        metavar="URL",
        help="Base URL for relative links in local HTML",
    )
    parser.add_argument(
        "--format",
        choices=("view", "text", "json"),
        default="view",
        help="Output: line-numbered view (default), plain text, or JSON",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        metavar="FILE",
        help="Write output to a file",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=30,
        metavar="SECONDS",
        help="HTTP timeout (default: 30)",
    )
    parser.add_argument(
        "--version",
        action="version",
        version=f"view-as-ai {__version__}",
        help="Show version and exit",
    )
    args = parser.parse_args(argv)

    if not math.isfinite(args.timeout) or args.timeout <= 0:
        parser.error("--timeout must be a finite positive number")

    try:
        remote_url = _remote_url(args.source)
    except ValueError as exc:
        print(f"view-as-ai: {exc}", file=sys.stderr)
        return 1

    if args.base_url:
        try:
            _validate_http_url(args.base_url)
        except ValueError:
            parser.error("--base-url must be an HTTP(S) URL with a hostname")
        if remote_url is not None:
            parser.error("--base-url applies only to local HTML files and stdin")

    try:
        if remote_url is not None:
            html, url = _fetch_url(remote_url, args.timeout)
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
        CLIError,
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
