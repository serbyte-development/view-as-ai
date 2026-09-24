from __future__ import annotations

import argparse
import difflib
import hashlib
import json
import re
import subprocess
from datetime import UTC, datetime
from pathlib import Path
from urllib.parse import urlsplit

import httpx

from view_as_ai import __version__, process_html, prune_html

PACKAGE_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = PACKAGE_ROOT.parents[1]
CAPTURES_ROOT = PACKAGE_ROOT / "captures"
FIXTURE_MANIFEST = PACKAGE_ROOT / ".calibration" / "manifest.json"
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36"
)
CAPTURE_ID_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]*$")


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def git_commit() -> str:
    result = subprocess.run(
        ["git", "rev-parse", "HEAD"],
        cwd=REPO_ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return result.stdout.strip()


def capture_dir(capture_id: str) -> Path:
    if not CAPTURE_ID_RE.fullmatch(capture_id):
        raise SystemExit("capture ID must use only letters, numbers, dot, underscore, and hyphen")
    return CAPTURES_ROOT / capture_id


def normalize_for_layout_comparison(text: str) -> str:
    text = re.sub(r"【\d+†", "【#†", text)
    return re.sub(r"\s+", " ", text).strip()


def strip_file_terminator(text: str) -> str:
    return text.removesuffix("\n")


def valid_test_ids() -> set[str]:
    plan = (PACKAGE_ROOT / "CALIBRATION_PLAN.md").read_text("utf-8")
    numbered = re.findall(r"\*\*([A-Z][A-Z0-9-]*-\d{3}):\*\*", plan)
    site = re.findall(r"^## (SITE-[A-Z-]+) —", plan, flags=re.MULTILINE)
    return set(numbered + site)


def fixture_manifest() -> dict[str, object] | None:
    if not FIXTURE_MANIFEST.exists():
        return None
    return json.loads(FIXTURE_MANIFEST.read_text("utf-8"))


def render_comparison(directory: Path, metadata: dict[str, object]) -> dict[str, object]:
    native_path = directory / "native.web.txt"
    origin_path = directory / "origin.html"
    if not native_path.exists():
        raise SystemExit(f"missing authoritative native capture: {native_path}")
    if not origin_path.exists():
        raise SystemExit(f"missing saved origin HTML: {origin_path}")

    native = native_path.read_text("utf-8")
    encoding = str(metadata.get("origin_encoding") or "utf-8")
    origin = origin_path.read_bytes().decode(encoding, errors="replace")
    url = str(metadata["final_url"])

    actual = process_html(prune_html(origin), url).text
    (directory / "view-as-ai.txt").write_text(actual, encoding="utf-8")

    native_body = strip_file_terminator(native)
    actual_body = strip_file_terminator(actual)
    diff = "\n".join(
        difflib.unified_diff(
            native_body.splitlines(),
            actual_body.splitlines(),
            fromfile="native web.run",
            tofile="view-as-ai",
            lineterm="",
        )
    )
    if diff:
        diff += "\n"
    (directory / "diff.txt").write_text(diff, encoding="utf-8")

    comparison = {
        "exact_match": native_body == actual_body,
        "layout_tolerant_match": (
            normalize_for_layout_comparison(native_body)
            == normalize_for_layout_comparison(actual_body)
        ),
        "view_as_ai_version": __version__,
        "compared_at": datetime.now(UTC).isoformat(),
        "native_sha256": sha256(native_path.read_bytes()),
        "view_as_ai_sha256": sha256(actual.encode("utf-8")),
    }
    metadata["comparison"] = comparison
    (directory / "capture.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    return comparison


def finalize(capture_id: str, url: str, test_ids: list[str]) -> None:
    parsed = urlsplit(url)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        raise SystemExit("public URL must be an absolute HTTP(S) URL")
    unknown_test_ids = sorted(set(test_ids) - valid_test_ids())
    if unknown_test_ids:
        raise SystemExit(f"unknown calibration test IDs: {', '.join(unknown_test_ids)}")
    manifest = fixture_manifest()
    if manifest is not None:
        manifest_ids = {
            test_id for route in manifest.get("routes", []) for test_id in route.get("testIds", [])
        }
        unbuilt_test_ids = sorted(set(test_ids) - manifest_ids)
        if unbuilt_test_ids:
            raise SystemExit(
                "test IDs are not present in the current built fixture manifest: "
                + ", ".join(unbuilt_test_ids)
            )

    directory = capture_dir(capture_id)
    native_path = directory / "native.web.txt"
    if not native_path.exists():
        raise SystemExit(
            f"capture native web.run first; expected {native_path.relative_to(REPO_ROOT)}"
        )

    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
    }
    with httpx.Client(follow_redirects=True, timeout=30, headers=headers) as client:
        response = client.get(url)
        response.raise_for_status()

    content_type = response.headers.get("content-type", "")
    media_type = content_type.split(";", 1)[0].strip().lower()
    if media_type not in {"text/html", "application/xhtml+xml"}:
        raise SystemExit(f"expected HTML origin; received {content_type or 'no content type'}")

    origin_path = directory / "origin.html"
    origin_path.write_bytes(response.content)
    encoding = response.encoding or "utf-8"
    metadata: dict[str, object] = {
        "capture_id": capture_id,
        "requested_url": url,
        "final_url": str(response.url),
        "http_status": response.status_code,
        "content_type": content_type,
        "origin_encoding": encoding,
        "origin_sha256": sha256(response.content),
        "deployment_commit": git_commit(),
        "test_ids": test_ids,
        "fixture_scenario": manifest.get("scenario") if manifest else None,
        "fixture_manifest_sha256": (
            sha256(FIXTURE_MANIFEST.read_bytes()) if manifest is not None else None
        ),
        "finalized_at": datetime.now(UTC).isoformat(),
    }
    comparison = render_comparison(directory, metadata)
    print(
        f"{capture_id}: exact_match={comparison['exact_match']} "
        f"layout_tolerant_match={comparison['layout_tolerant_match']}"
    )
    if not comparison["exact_match"]:
        print(f"diff: {directory / 'diff.txt'}")


def compare(capture_id: str) -> None:
    directory = capture_dir(capture_id)
    metadata_path = directory / "capture.json"
    if not metadata_path.exists():
        raise SystemExit(f"missing capture metadata: {metadata_path}")
    metadata = json.loads(metadata_path.read_text("utf-8"))
    comparison = render_comparison(directory, metadata)
    print(
        f"{capture_id}: exact_match={comparison['exact_match']} "
        f"layout_tolerant_match={comparison['layout_tolerant_match']}"
    )
    if not comparison["exact_match"]:
        print(f"diff: {directory / 'diff.txt'}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Finalize or recompare a calibration capture.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    finalize_parser = subparsers.add_parser("finalize")
    finalize_parser.add_argument("capture_id")
    finalize_parser.add_argument("url")
    finalize_parser.add_argument("test_ids", nargs="+")

    compare_parser = subparsers.add_parser("compare")
    compare_parser.add_argument("capture_id")

    args = parser.parse_args()
    if args.command == "finalize":
        finalize(args.capture_id, args.url, args.test_ids)
    else:
        compare(args.capture_id)


if __name__ == "__main__":
    main()
