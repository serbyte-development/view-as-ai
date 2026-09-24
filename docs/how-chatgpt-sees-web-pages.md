# How ChatGPT web browsing represents a webpage

This document summarizes what View as AI has **observed**, what can be reproduced from public OpenAI code, and what remains unknown about the page representation exposed by ChatGPT's `web.run open()` browsing tool.


## The short version

The model does not receive the raw DOM or a screenshot of the webpage.

The observed result is closer to:

```text
URL
  ↓
provider fetch / crawl behavior                 partly unknown
  ↓
HTML-like page source                          observable only indirectly
  ↓
selective boilerplate / UI pruning             partly inferred
  ↓
HTML-to-model-text formatting                  substantially reproducible
  ↓
headings + prose + code + controls + references
  ↓
line-numbered tool result shown to the model
```

OpenAI has published a closely related HTML formatter in `gpt-oss`. That formatter explains a large portion of the model-facing text transformation. View as AI copies the small relevant formatter surface, then adds behavior established by direct comparison with native ChatGPT `web.run` captures.

## What we know with high confidence

### 1. The model-facing page is not raw HTML

Native `web.run open()` output is a text representation. HTML tags, CSS, JavaScript source, DOM attributes, and browser chrome are not passed through verbatim.

Instead, useful page information is serialized into readable text with lightweight Markdown-like structure and document-local references.

### 2. It is not a conventional article extractor

We tested Readability, Trafilatura, rs-trafilatura, jusText, DOM Smoothie, CETD, and similar main-content extraction approaches against captured native output.

They removed too much information.

Across 22 development pages, View as AI's conservative origin-HTML selection reached **99.94% selection F1** while unpruned origin HTML reached 98.72%. The best conventional extractor in that bake-off was far lower.

The practical model is therefore:

> **mostly preserve the useful origin document, then remove a narrow set of recurring UI/boilerplate structures.**

It is not:

> **extract only the article body.**

### 3. Browser-rendered DOM was usually a worse input than static HTML

The calibration work compared direct origin HTML with browser-rendered DOM on real pages.

Rendering frequently added content that native `web.run` did not expose: carousel clones, review widgets, mobile navigation duplicates, dynamic state, and substituted UI content.

That is why View as AI's normal URL path uses direct HTTP origin HTML instead of running page JavaScript.

This does **not** prove that OpenAI never renders JavaScript anywhere in its crawling or browsing stack. It only establishes that, for the tested pages, static HTML was usually a closer reconstruction input than the fully rendered browser DOM.

### 4. OpenAI's public browser formatter explains much of the serialization

[`parser.py`](../src/view_as_ai/parser.py) is derived from the formatter in OpenAI's public `gpt-oss` repository:


[`gpt_oss/tools/simple_browser/page_contents.py`](https://github.com/openai/gpt-oss/blob/main/gpt_oss/tools/simple_browser/page_contents.py)


The project keeps the required Apache-2.0 attribution in [`THIRD_PARTY_NOTICES.md`](../THIRD_PARTY_NOTICES.md) and [`licenses/openai-gpt-oss.txt`](../licenses/openai-gpt-oss.txt).

The upstream formatter gave us a strong starting point. Native `web.run` captures were still required to reproduce controls, reference behavior, tables, whitespace boundaries, image handling, and provider-style pruning.

## Observed element behavior

These rules are supported by the active regression fixtures and the archived calibration corpus.

| Web content | Observed model-facing behavior |
| --- | --- |
| Headings | Preserved as Markdown-like headings. |
| Paragraphs and lists | Preserved as readable text in document order. |
| Code / preformatted text | Preserved; indentation matters more than Markdown fence parity. |
| `<script>`, `<style>`, `<math>` | Removed before readable labels are extracted. |
| Emphasis | Text is retained; bold/italic emphasis itself is generally discarded. |
| Normal links | Replaced with document-local references such as `【0†Label】`. |
| External links | Can include the external domain, e.g. `【0†Label†example.com】`. |
| Fragment links | Retained as references. |
| Repeated URL | Reuses the same local reference ID within the document. |
| HTTP(S) image-only link | Often omitted rather than represented as a clickable image. |
| Standalone image | Represented from image URL plus `title` or `alt` text when available. |
| iframe | The iframe source can appear as a reference; the iframe document itself is not fetched by View as AI. |
| Text input | `[Input]`, or `[Input: placeholder]` when a placeholder is exposed. |
| Input value / checked state | Not exposed in the captured native form behavior. |
| Hidden input | Can still produce an `[Input]` marker. |
| `<select>` | `[Select]`; option values/text are removed in the captured behavior. |
| Text-only button | `[Button: label]`. |
| Complex button with child markup | Child text/markup can remain without a synthesized button marker. |
| Table | Cell boundaries are retained; header-only first rows receive a simple separator. |
| `<base href>` | Used for reference resolution when it resolves to HTTP(S). |
| `mailto:` / other non-web links | Link wrapper is removed; readable text can remain. |

## Observed pruning behavior

Native output often keeps more surrounding page context than an SEO crawler's "main content" extraction would, but it still removes some UI and boilerplate.

Generic patterns supported by multiple captured pages include:

- explicit `role="navigation"` regions;
- breadcrumb containers;
- some non-main banner regions;
- framework-marked carousel clones;
- responsive duplicate header controls;
- control-only search utility bars;
- explicit menu popups;
- related/contextual navigation containers;
- `role="complementary"` sidebars;
- explicit `role="contentinfo"` regions;
- color-theme and language-switcher widgets;
- selected framework social widgets;
- bounded Bootstrap-style navbar chrome.

View as AI deliberately does **not** remove every `<nav>`, every repeated footer, every hidden element, or every accessibility-only node. Broad rules like those caused real regressions during calibration.

## What we learned from rules that failed

Several intuitive extraction rules looked reasonable and made the output worse:

- remove all navigation;
- remove all `aria-hidden` content;
- remove all repeated text;
- use a Readability-style main-content extractor;
- use the fully rendered browser DOM by default;
- aggressively infer accessibility labels;
- add site-specific selectors to chase one page.

The stable approach is conservative: keep uncertain information unless repeated native evidence supports removing it.

## What we do not know

The following parts of OpenAI's production browsing stack are private or cannot be inferred reliably from the page representation alone.

### Fetching and crawling

We do not know the complete production behavior for:

- crawler user agents;
- cache age and refresh policy;
- robots handling beyond externally visible effects;
- geographic or account-specific fetching;
- cookies and consent state;
- retry/fallback fetchers;
- whether a particular result came from a live fetch, cached fetch, index, or another source;
- when JavaScript rendering is or is not used upstream.

A website can therefore serve ChatGPT different HTML than it serves View as AI, even if both transformations are otherwise identical.

### Provider-side enrichment

Some native output contains information that is not present in the origin HTML used by View as AI.

One current example is Python's documentation, where native `web.run` can attach the description `Keyword-only parameters separator (PEP 3102)` to the `*` signature marker even though that text is absent from the fetched origin HTML.

That indicates there can be downstream semantic, accessibility, cached, or provider-specific enrichment that cannot be reconstructed from origin HTML alone.

We do not currently know which upstream component supplies those additions.

### Ranking, selection, and citations

Page representation is not search ranking.

View as AI does **not** tell you:

- whether OpenAI will crawl or index a URL;
- whether a URL will rank for a query;
- whether ChatGPT will choose the page as a source;
- whether a particular sentence will be cited;
- how source authority is evaluated;
- how query relevance is scored;
- how cached/indexed versions are selected.

It answers a narrower question:

> **If this page is opened and transformed in the observed way, what information is likely to be available to the model?**

## Calibration evidence

The development process treated native ChatGPT `web.run open()` output as a black-box oracle.

The loop was:

1. Capture a real native `web.run` representation.
2. Independently fetch the page HTML.
3. Run the same HTML through the local formatter.
4. Compare information presence, omission, links, images, controls, and order.
5. Test one generic explanation for each mismatch.
6. Keep changes only when they improve the wider corpus without unexplained regressions.
7. Preserve compact golden fixtures for stable rules.

The archived research includes:

- **109 verified native page captures across 16 page families** in the broad diagnostic corpus;
- **22 fully paired development pages** used for the main content-selection iteration;
- earlier exact and targeted captures for forms, controls, images, links, tables, static docs, service sites, and client-rendered pages;
- direct comparisons against conventional content extractors and browser-rendered DOM.

Important metric context:

- the 22-page tuned development benchmark reached **99.94% content-selection F1**;
- a separate 6-page untouched origin-paired validation set reached **98.34% selection F1**;
- the broad 109-page diagnostic stress corpus contained major acquisition and hard-page outliers and was **not** a 99%-certified universal holdout, but on the average, of the 109 pages, the F1 score was 99%.
- active golden fixtures include full-page cases that match native output byte-for-byte, plus layout-tolerant fixtures for rules where information matches but formatting differs.

So "99%" should be read as a calibration result on the primary tuned development corpus, not as a guarantee that every arbitrary website will match at 99%.

## Why this is still useful

For SEO and development work, the model-facing representation answers questions that browser screenshots and raw DOM inspection do not:

- Is the important copy actually present in the model-readable page?
- Is critical content only available after client-side JavaScript?
- Are headings and code blocks preserved sensibly?
- Do important links have meaningful labels?
- Is navigation or utility UI dominating the representation?
- Are images represented by useful alternative text?
- Do forms and controls retain enough context to be understandable?
- Is content visually obvious to a human but absent from the textual representation?

Those are representation questions. They matter independently of ranking.

## Revalidating behavior

`web.run` is a production system and can change.

The way we maintain this project is to keep doing exact empirical comparisons:

1. capture current native `web.run` text without manually rewriting it;
2. save it as immutable evidence;
3. fetch the corresponding origin HTML separately;
4. run View as AI against that HTML;
5. diff the outputs;
6. only change generic behavior supported by more than one page or a controlled probe.

The active regression evidence is documented in [`tests/fixtures/README.md`](../tests/fixtures/README.md).

## Scope boundary

View as AI is an independent reconstruction. It is not an OpenAI product, crawler, ranking simulator, or official specification of ChatGPT browsing.
