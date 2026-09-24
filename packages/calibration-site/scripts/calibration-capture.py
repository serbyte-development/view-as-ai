from __future__ import annotations

import argparse
import difflib
import hashlib
import json
import re
import subprocess
from datetime import UTC, datetime
from pathlib import Path
from urllib.parse import parse_qsl, urlsplit

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
BATCH_CAPTURE_RE = re.compile(
    r"^URL: (?P<url>https://view-as-ai\.vercel\.app/[^\n]*)\n\n"
    r"```\n(?P<text>[\s\S]*?)\n```(?=\nURL: |\n?\Z)",
    flags=re.MULTILINE,
)


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


def capture_slug(url: str) -> str:
    parsed = urlsplit(url)
    parts = [part.lower() for part in parsed.path.strip("/").split("/") if part]
    if parts[:2] == ["experiments", "visibility"] and len(parts) == 3:
        slug = f"visibility-{parts[2]}"
    elif parts:
        slug = "-".join(parts)
    else:
        slug = "root"

    query_parts = [
        f"{key.lower()}-{value.lower()}"
        for key, value in parse_qsl(parsed.query, keep_blank_values=True)
    ]
    if query_parts:
        slug = "-".join([slug, *query_parts])
    if parsed.fragment:
        slug = f"{slug}-{parsed.fragment.lower()}"
    return re.sub(r"[^a-z0-9._-]+", "-", slug).strip("-")


def import_batch(
    batch_file: Path,
    *,
    capture_date: str,
    deployment_commit: str,
    batch_label: str | None = None,
) -> None:
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", capture_date):
        raise SystemExit("capture date must use YYYY-MM-DD")
    if not re.fullmatch(r"[0-9a-fA-F]{7,40}", deployment_commit):
        raise SystemExit("deployment commit must be a 7–40 character Git SHA")
    if batch_label and not CAPTURE_ID_RE.fullmatch(batch_label):
        raise SystemExit("batch label must use capture-ID-safe characters")

    source = batch_file.read_text("utf-8")
    source = re.sub(r'^id="[0-9]+"\n', "", source, count=1)
    matches = list(BATCH_CAPTURE_RE.finditer(source))
    if not matches:
        raise SystemExit(f"no native URL capture blocks found in {batch_file}")

    consumed = BATCH_CAPTURE_RE.sub("", source).strip()
    if consumed:
        raise SystemExit(
            "batch file contains text outside recognized URL/fenced capture blocks; "
            "refusing a partial import"
        )

    seen_urls: set[str] = set()
    short_commit = deployment_commit[:7].lower()
    imported: list[tuple[str, str]] = []
    for match in matches:
        url = match.group("url")
        if url in seen_urls:
            raise SystemExit(f"duplicate URL in batch: {url}")
        seen_urls.add(url)

        suffix = f"-{batch_label}" if batch_label else ""
        capture_id = f"{capture_date}-{capture_slug(url)}-{short_commit}{suffix}"
        directory = capture_dir(capture_id)
        native_path = directory / "native.web.txt"
        if directory.exists():
            raise SystemExit(f"capture directory already exists: {directory}")

        directory.mkdir(parents=True)
        native_path.write_text(match.group("text") + "\n", encoding="utf-8")
        imported.append((capture_id, url))

    for capture_id, url in imported:
        print(f"{capture_id}\t{url}")


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
    fetch_compatible = bool(metadata.get("view_as_ai_url_fetch_compatible", True))
    if not fetch_compatible:
        actual = (
            "VIEW_AS_AI_FETCH_REJECTED "
            f"status={metadata.get('http_status')} "
            f"content_type={metadata.get('content_type') or '<missing>'}"
        )
        (directory / "view-as-ai.txt").write_text(actual + "\n", encoding="utf-8")

        native_body = strip_file_terminator(native)
        diff = "\n".join(
            difflib.unified_diff(
                native_body.splitlines(),
                actual.splitlines(),
                fromfile="native web.run",
                tofile="view-as-ai fetch layer",
                lineterm="",
            )
        )
        if diff:
            diff += "\n"
        (directory / "diff.txt").write_text(diff, encoding="utf-8")

        comparison = {
            "mode": "fetch-layer",
            "view_as_ai_fetch_compatible": False,
            "view_as_ai_fetch_result": "rejected",
            "exact_match": None,
            "layout_tolerant_match": None,
            "view_as_ai_version": __version__,
            "compared_at": datetime.now(UTC).isoformat(),
            "native_sha256": sha256(native_path.read_bytes()),
            "view_as_ai_sha256": sha256((actual + "\n").encode("utf-8")),
        }
        metadata["comparison"] = comparison
        (directory / "capture.json").write_text(
            json.dumps(metadata, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        return comparison

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


def finalize(
    capture_id: str,
    url: str,
    test_ids: list[str],
    *,
    deployment_commit: str,
    fixture_scenario: str | None = None,
) -> None:
    parsed = urlsplit(url)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        raise SystemExit("public URL must be an absolute HTTP(S) URL")
    unknown_test_ids = sorted(set(test_ids) - valid_test_ids())
    if unknown_test_ids:
        raise SystemExit(f"unknown calibration test IDs: {', '.join(unknown_test_ids)}")
    if not re.fullmatch(r"[0-9a-fA-F]{7,40}", deployment_commit):
        raise SystemExit(
            "deployment commit must be the verified deployed Git SHA (7–40 hex digits)"
        )
    manifest = fixture_manifest()
    fixtures: list[dict[str, object]] = []
    if manifest is not None:
        if fixture_scenario is not None and fixture_scenario != manifest.get("scenario"):
            raise SystemExit("fixture scenario differs from the current built fixture manifest")
        fixtures = [*manifest.get("routes", []), *manifest.get("endpoints", [])]
        manifest_ids = {test_id for fixture in fixtures for test_id in fixture.get("testIds", [])}
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
    if (directory / "origin.html").exists() or (directory / "capture.json").exists():
        raise SystemExit("saved origin/metadata already exists; use compare or a new capture ID")

    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
    }
    with httpx.Client(follow_redirects=True, timeout=30, headers=headers) as client:
        response = client.get(url)

    content_type = response.headers.get("content-type", "")
    media_type = content_type.split(";", 1)[0].strip().lower()
    fetch_compatible = response.is_success and (
        not media_type or media_type in {"text/html", "application/xhtml+xml"}
    )

    origin_path = directory / "origin.html"
    origin_path.write_bytes(response.content)
    encoding = response.encoding or "utf-8"
    metadata: dict[str, object] = {
        "capture_id": capture_id,
        "requested_url": url,
        "final_url": str(response.url),
        "http_status": response.status_code,
        "content_type": content_type,
        "content_encoding": response.headers.get("content-encoding"),
        "redirect_history": [
            {
                "status": item.status_code,
                "url": str(item.url),
                "location": item.headers.get("location"),
            }
            for item in response.history
        ],
        "view_as_ai_url_fetch_compatible": fetch_compatible,
        "origin_encoding": encoding,
        "origin_sha256": sha256(response.content),
        "native_sha256": sha256(native_path.read_bytes()),
        "deployment_commit": deployment_commit,
        "local_commit": git_commit(),
        "test_ids": test_ids,
        "fixture_scenario": (
            fixture_scenario
            if fixture_scenario is not None
            else manifest.get("scenario")
            if manifest
            else None
        ),
        "fixture_manifest_sha256": (
            sha256(FIXTURE_MANIFEST.read_bytes()) if manifest is not None else None
        ),
        "fixture_definitions": [
            fixture
            for fixture in fixtures
            if set(test_ids).intersection(fixture.get("testIds", []))
            or (not test_ids and fixture.get("path") == parsed.path)
        ],
        "finalized_at": datetime.now(UTC).isoformat(),
    }
    # Save the origin's identity before rendering so compare can recover a parser failure.
    (directory / "capture.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
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
    origin_path = directory / "origin.html"
    if not origin_path.exists() or sha256(origin_path.read_bytes()) != metadata["origin_sha256"]:
        raise SystemExit("saved origin does not match its capture hash")
    native_hash = metadata.get("native_sha256") or metadata.get("comparison", {}).get(
        "native_sha256"
    )
    if native_hash and sha256((directory / "native.web.txt").read_bytes()) != native_hash:
        raise SystemExit("saved native capture does not match its capture hash")
    comparison = render_comparison(directory, metadata)
    print(
        f"{capture_id}: exact_match={comparison['exact_match']} "
        f"layout_tolerant_match={comparison['layout_tolerant_match']}"
    )
    if not comparison["exact_match"]:
        print(f"diff: {directory / 'diff.txt'}")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Import, finalize, or recompare a calibration capture."
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    import_parser = subparsers.add_parser("import-batch")
    import_parser.add_argument("batch_file", type=Path)
    import_parser.add_argument("--capture-date", required=True)
    import_parser.add_argument("--deployment-commit", required=True)
    import_parser.add_argument("--batch-label")

    finalize_parser = subparsers.add_parser("finalize")
    finalize_parser.add_argument("capture_id")
    finalize_parser.add_argument("url")
    finalize_parser.add_argument(
        "test_ids", nargs="*", help="omit for baseline pipeline validation"
    )
    finalize_parser.add_argument(
        "--deployment-commit", required=True, help="verified public deployment Git SHA"
    )
    finalize_parser.add_argument(
        "--fixture-scenario", help="verified deployed scenario; defaults to the built manifest"
    )

    compare_parser = subparsers.add_parser("compare")
    compare_parser.add_argument("capture_id")

    args = parser.parse_args()
    if args.command == "import-batch":
        import_batch(
            args.batch_file,
            capture_date=args.capture_date,
            deployment_commit=args.deployment_commit,
            batch_label=args.batch_label,
        )
    elif args.command == "finalize":
        finalize(
            args.capture_id,
            args.url,
            args.test_ids,
            deployment_commit=args.deployment_commit,
            fixture_scenario=args.fixture_scenario,
        )
    else:
        compare(args.capture_id)


if __name__ == "__main__":
    main()
