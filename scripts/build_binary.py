"""Build one standalone View as AI executable with PyInstaller."""

from __future__ import annotations

import argparse
import os
import shutil
import tempfile
from pathlib import Path

import PyInstaller.__main__

ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()

    output = args.output.resolve()
    output.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix="view-as-ai-pyinstaller-") as temp:
        temp_dir = Path(temp)
        dist_dir = temp_dir / "dist"
        PyInstaller.__main__.run(
            [
                "--onefile",
                "--clean",
                "--name",
                "view-as-ai",
                "--paths",
                str(ROOT / "src"),
                "--distpath",
                str(dist_dir),
                "--workpath",
                str(temp_dir / "build"),
                "--specpath",
                str(temp_dir),
                str(ROOT / "scripts" / "pyinstaller_entry.py"),
            ]
        )

        executable = dist_dir / ("view-as-ai.exe" if os.name == "nt" else "view-as-ai")
        if not executable.is_file():
            raise FileNotFoundError(f"PyInstaller did not create {executable}")
        shutil.copy2(executable, output)

    if os.name != "nt":
        output.chmod(output.stat().st_mode | 0o111)

    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
