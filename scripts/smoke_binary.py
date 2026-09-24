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
    ).stdout.strip()
    if not version.startswith("view-as-ai "):
        raise RuntimeError(f"Unexpected version output: {version!r}")

    result = subprocess.run(
        [str(binary), "https://example.com", "--format", "text"],
        check=False,
        capture_output=True,
        text=True,
        timeout=60,
    )
    if result.returncode != 0:
        raise RuntimeError(
            "Frozen executable failed to fetch example.com:\n"
            f"stdout:\n{result.stdout}\n"
            f"stderr:\n{result.stderr}"
        )
    page = result.stdout
    if "# Example Domain" not in page or "Learn more" not in page:
        raise RuntimeError("Frozen executable did not produce the expected example.com preview")

    print(version)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
