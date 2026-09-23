# Calibration evidence

HTML bodies were fetched independently with curl. `.web.txt` files transcribe
native ChatGPT `web.run` results captured during this implementation session.
Tool headers and `L<n>:` prefixes are excluded. The rendered citation notation
is stored in its plain `【id†label†domain】` form. Expected files remain evidence;
change parser behavior to match them.

| Fixture | URL | Native observation |
| --- | --- | --- |
| example | https://example.com/ | `turn867519view0`, lines 0-4, complete body |
| httpbin | https://httpbin.org/forms/post | `turn867519view1`, lines 0-28, complete body |
| selenium | https://www.selenium.dev/selenium/web/web-form.html | `turn127105view3`, lines 0-16, complete body |
| xhtml | https://www.selenium.dev/selenium/web/xhtmlTest.html | `turn590540view3`, lines 0-41, complete body |
| openai-controls | https://developers.openai.com/api/docs/bots | `turn867519view2`, lines 24-29 and 42, selected excerpts |
| book-details | https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html | `turn127105view2`, lines 2 and 19-27, selected excerpts |

The first three comparisons require exact text and blank lines. XHTML permits
blank-line differences. OpenAI controls and book details are reduced HTML
excerpts; compare content after whitespace normalization and local reference-ID
normalization. These excerpt tests establish specific transformation rules;
they do not assert full-page equality. The fixture comments describe reductions.

Final native recheck confirmed the first three snapshots unchanged:
`turn520001view0`, `turn520001view1`, `turn520001view2`. Fresh HTML fetched by the
installed CLI produced an empty `diff` against each of those saved expectations.

On 2026-09-23, the exact-capture workflow was repeated against current `web.run`.
Example.com and the httpbin form still matched byte-for-byte after removing tool
line prefixes/citation wrappers. A current Python `html.parser` page check exposed
one downstream annotation that is not present in the origin HTML:
`Keyword-only parameters separator (PEP 3102)` attached to the `*` parameter.
Because View as AI intentionally operates on direct origin HTML and does not
reproduce downstream accessibility/semantic enrichment, that difference is a
documented boundary rather than a parser regression.

The much larger native-open calibration corpora used during reverse engineering
were archived after the 1.0 stabilization pass. The active suite intentionally
keeps only these small golden fixtures plus synthetic parser/pruner regressions.

Selenium's upstream page is an Apache-2.0 test fixture in SeleniumHQ/selenium;
httpbin's fixture is an example form attributed to the HTML5 specification in
its source. These are small, public test inputs, retained with their attribution.
License text for Apache-2.0 is in `licenses/openai-gpt-oss.txt`.
