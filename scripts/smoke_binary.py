"""Smoke-test a frozen View as AI executable."""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("binary", type=Path)
    args = parser.parse_args()
    binary = args.binary.resolve()

    version = subprocess.run(
        [str(binary), "--version"],
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
    ).stdout.strip()
    if not version.startswith("view-as-ai "):
        raise RuntimeError(f"Unexpected version output: {version!r}")

    fixture = (
        "<title>Frozen Smoke</title><h1>Frozen Smoke</h1>"
        '<p>Before <a href="/next">Next</a></p>'
        "<svg><text>SVG_LEAK</text></svg><p>After</p>"
    )
    result = subprocess.run(
        [
            str(binary),
            "-",
            "--base-url",
            "https://example.test/",
            "--format",
            "text",
            "--markdown-links",
        ],
        check=False,
        capture_output=True,
        input=fixture,
        text=True,
        encoding="utf-8",
        timeout=30,
    )
    if result.returncode != 0:
        raise RuntimeError(
            "Frozen executable failed deterministic HTML smoke test:\n"
            f"stdout:\n{result.stdout}\n"
            f"stderr:\n{result.stderr}"
        )
    page = result.stdout
    expected = ("# Frozen Smoke", "[Next](https://example.test/next)", "After")
    if any(value not in page for value in expected) or "SVG_LEAK" in page:
        raise RuntimeError("Frozen executable did not produce the expected deterministic preview")

    print(version)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
