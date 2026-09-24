# View as AI - see how AI views your website

[Try it](#try-it) • [CLI](#cli) • [Python API](#python-api) • [How it works](#how-it-works) • [Calibration](#calibration-and-limitations)

[![CI](https://github.com/Serbyte-Development/view-as-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/Serbyte-Development/view-as-ai/actions/workflows/ci.yml)
[![License: GPL-3.0-or-later](https://img.shields.io/badge/License-GPL--3.0--or--later-blue.svg)](LICENSE)

## The problem

When ChatGPT browses a webpage, the model does not receive your raw HTML or the visual page you see in a browser. The page is transformed into a compact, Markdown-like model representation first: headings, prose, links, images, controls, tables, and selected surrounding context.

That makes a basic SEO and development question surprisingly hard to answer:

**What does AI actually see when it opens my website?**

## The solution

**View as AI** locally reconstructs the model-readable page representation observed in ChatGPT's `web.run open()` output, so you can inspect the information an AI browsing model is likely to receive without making an OpenAI API call.

The implementation started from OpenAI's public `gpt-oss` browser formatter and was empirically adapted against **100+ captured native `web.run` page representations**. On the primary 22-page development benchmark used to tune content selection, the current approach reached **99.94% selection F1**. Broader stress testing contains harder crawler and acquisition mismatches, so this is a best-effort reconstruction rather than a claim of universal 99% parity.

## What you see vs. what the model sees

<table>
<tr>
<td align="center" width="50%">

**What you think AI sees**

</td>
<td align="center" width="50%">

**What the model sees**

</td>
</tr>
<tr>
<td colspan="2">

<img src="./images/what-ai-sees-hero.webp" alt="Side-by-side comparison of a SaaS homepage. Left: the visual page a browser user sees, with navigation, a hero, calls to action, and a dashboard preview. Right: the compact Markdown-like representation an AI browsing model receives, with a heading, prose, a button, and a citation link." width="100%">

</td>
</tr>
</table>

The exact output varies by page and by the browsing system. View as AI targets **information presence, omission, ordering, links, images, controls, and tables**. Exact Markdown shape, whitespace, reference numbering, and line layout are secondary.

For the observed pipeline, calibration evidence, known element behavior, and the parts of OpenAI's browsing stack we still cannot see, read **[How ChatGPT web browsing represents a webpage](./docs/how-chatgpt-sees-web-pages.md)**.

## Try it

**macOS / Linux**

```sh
curl -fsSL https://raw.githubusercontent.com/Serbyte-Development/view-as-ai/main/run.sh | sh -s -- https://example.com
```

**Windows PowerShell**

```powershell
& ([scriptblock]::Create((irm 'https://raw.githubusercontent.com/Serbyte-Development/view-as-ai/main/run.ps1'))) 'https://example.com'
```

The launcher detects your operating system and CPU architecture, downloads the matching standalone executable from the latest GitHub Release, verifies its SHA-256 checksum, runs it, and removes the temporary copy.

## CLI

```sh
view-as-ai https://example.com
```

Common options: `--format text`, `--format json`, `-o preview.txt`, or pass a local HTML file with `--base-url`. Run `view-as-ai --help` for the complete interface.

The default `view` format adds line numbers for inspection:

```text
Example Domain (https://example.com/)
View as AI preview; Total lines: 5
L0: # Example Domain
L1:
L2: This domain is for use in documentation examples without needing permission. Avoid use in operations.
L3:
L4: 【0†Learn more†iana.org】
```

`--format json` returns the page URL, model-readable text, title, and the reference URL map:

```json
{
  "url": "https://example.com/",
  "text": "# Example Domain\n\n...",
  "title": "Example Domain",
  "urls": {
    "0": "https://iana.org/domains/example"
  }
}
```

The CLI follows HTTP redirects, accepts HTML/XHTML responses, and uses a 30-second default timeout.

<details>
<summary><strong>Install permanently or use the Python package</strong></summary>

Install the standalone executable:

```sh
# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/Serbyte-Development/view-as-ai/main/install.sh | sh
```

```powershell
# Windows PowerShell
irm 'https://raw.githubusercontent.com/Serbyte-Development/view-as-ai/main/install.ps1' | iex
```

The installer downloads the verified binary for your platform. No Python runtime is required. Releases include SHA-256 checksums and binaries for macOS ARM64/x64, Linux ARM64/x64, and Windows ARM64/x64.

Run directly from PyPI with uv or pipx:

```sh
uvx view-as-ai https://example.com
pipx run view-as-ai https://example.com
```

Install the Python CLI or library:

```sh
uv tool install view-as-ai
uv add view-as-ai
```

Requires Python 3.11+. `python -m view_as_ai` exposes the same CLI.

</details>

## Python API

```python
from view_as_ai import process_html, prune_html

html = "<h1>Pricing</h1><button>Start trial</button>"
page = process_html(prune_html(html), "https://example.com/pricing")

print(page.title)
print(page.text)
print(page.urls)
```

`process_html()` is pure and performs no I/O. It returns a `PageContents` dataclass with `url`, `text`, `title`, and `urls` fields. `prune_html()` applies the conservative provider-style pruning used by the CLI.

## How it works

The stable runtime path is deliberately small:

```text
HTTP origin HTML
    ↓
conservative provider-style pruning
    ↓
OpenAI-derived HTML-to-model-text formatter
    ↓
model-readable text + reference URLs
```

The parser preserves useful model-visible information such as headings, prose, lists, tables, code, links, image descriptions, buttons, inputs, selects, and document order. Pruning removes a narrow set of recurring navigation and UI patterns supported by calibration evidence.

Client-side JavaScript execution, shadow DOM traversal, and fetching iframe documents are outside the runtime. Browser-rendered DOM was removed after broad calibration because it generally reduced resemblance to the recorded native output.

> [!IMPORTANT]
> View as AI approximates page representation. Search ranking, citation likelihood, cached crawl versions, crawler policy decisions, and OpenAI's private indexing behavior are outside scope.

## Calibration and limitations

View as AI is a best-effort approximation based on recorded native ChatGPT browsing observations.

The archived calibration work includes more than 100 native page representations across documentation, government, ecommerce, service-business, form, reference, and client-rendered page families. On the 22-page development benchmark used to tune the current selection rules, View as AI reached **99.94% content-selection F1**. A separate 109-page diagnostic stress corpus exposed harder acquisition and representation mismatches and was intentionally not treated as a universal 99% certification.

Expected sources of difference include:

- Sites serving different HTML to different user agents or crawlers.
- Content created only after client-side JavaScript runs.
- Shadow DOM and fetched iframe contents.
- Images whose meaning exists only in pixels instead of `alt` or `title` text.
- Unusual navigation, widgets, or page structures outside the calibration set.
- Whitespace, Markdown structure, heading levels, reference numbering, and line counts.

The active repository keeps compact native golden fixtures plus synthetic parser and pruner regressions. The larger reverse-engineering corpus and oracle tooling are archived separately for future recalibration if native behavior changes materially.

## Verification and maintenance

```sh
uv sync --group dev
uv run pytest -q
uv run ruff check src tests
uv run ruff format --check src tests
uv build
```

Routine maintenance is evidence-driven: reproduce meaningful information differences against native output, add the smallest generic fix, and preserve conservative pruning. The installed wheel contains the runtime package and required third-party attribution files.

## Source lineage and attribution

The formatter began from OpenAI's public `gpt-oss` `gpt_oss/tools/simple_browser/page_contents.py` at revision `750cfe908fdc9dd1f0e9bfcd92a4bb1adb0aa81c` and was adapted for View as AI's standalone parser and empirical calibration. OpenAI source attribution, the upstream Apache-2.0 license, and dependency notices are preserved in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and `licenses/`.

View as AI is distributed under [GPL-3.0-or-later](LICENSE).

Developed & maintained by [Serbyte Development](https://www.serbyte.net/) · [GitHub](https://github.com/Serbyte-Development)
