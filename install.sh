#!/bin/sh
set -eu

repo="Serbyte-Development/view-as-ai"

case "$(uname -s)" in
  Darwin) platform="darwin" ;;
  Linux) platform="linux" ;;
  *) echo "view-as-ai: unsupported operating system: $(uname -s)" >&2; exit 1 ;;
esac

case "$(uname -m)" in
  x86_64|amd64) arch="x64" ;;
  arm64|aarch64) arch="arm64" ;;
  *) echo "view-as-ai: unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac

asset="view-as-ai-${platform}-${arch}"
version="${VIEW_AS_AI_VERSION:-}"
if [ -n "$version" ]; then
  case "$version" in v*) ;; *) version="v$version" ;; esac
  base="https://github.com/${repo}/releases/download/${version}"
else
  base="https://github.com/${repo}/releases/latest/download"
fi

command -v curl >/dev/null 2>&1 || { echo "view-as-ai: curl is required" >&2; exit 1; }

tmp="$(mktemp -d 2>/dev/null || mktemp -d -t view-as-ai)"
trap 'rm -rf "$tmp"' EXIT HUP INT TERM

curl -fsSL "$base/$asset" -o "$tmp/$asset"
curl -fsSL "$base/checksums.txt" -o "$tmp/checksums.txt"

expected="$(awk -v file="$asset" '$2 == file { print $1 }' "$tmp/checksums.txt")"
[ -n "$expected" ] || { echo "view-as-ai: checksum entry missing for $asset" >&2; exit 1; }

if command -v sha256sum >/dev/null 2>&1; then
  actual="$(sha256sum "$tmp/$asset" | awk '{ print $1 }')"
elif command -v shasum >/dev/null 2>&1; then
  actual="$(shasum -a 256 "$tmp/$asset" | awk '{ print $1 }')"
else
  echo "view-as-ai: sha256sum or shasum is required" >&2
  exit 1
fi

[ "$actual" = "$expected" ] || { echo "view-as-ai: checksum verification failed" >&2; exit 1; }

install_dir="${VIEW_AS_AI_INSTALL_DIR:-$HOME/.local/bin}"
mkdir -p "$install_dir"
cp "$tmp/$asset" "$install_dir/view-as-ai"
chmod +x "$install_dir/view-as-ai"

echo "Installed view-as-ai to $install_dir/view-as-ai"
case ":$PATH:" in
  *":$install_dir:"*) ;;
  *) echo "Add $install_dir to PATH to run 'view-as-ai' directly." ;;
esac
