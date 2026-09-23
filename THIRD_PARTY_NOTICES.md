# Third-party notices

## OpenAI gpt-oss formatter

`src/view_as_ai/parser.py` includes adapted functions from OpenAI's public
`gpt_oss/tools/simple_browser/page_contents.py`.

- Repository: https://github.com/openai/gpt-oss
- Source revision: `750cfe908fdc9dd1f0e9bfcd92a4bb1adb0aa81c`
- Source file: https://github.com/openai/gpt-oss/blob/750cfe908fdc9dd1f0e9bfcd92a4bb1adb0aa81c/gpt_oss/tools/simple_browser/page_contents.py
- Upstream license: Apache License 2.0, copied in `licenses/openai-gpt-oss.txt`.
- The source file's module docstring describes View as AI modifications.

The entire gpt-oss package is unnecessary for this tool. View as AI retains the
formatter functions it uses, with its own small CLI and regression tests.

## Installed dependencies

`html2text` is distributed under GPLv3; `lxml` uses BSD-style licensing;
`httpx` uses BSD-3-Clause. Dependency licenses remain part of their respective
distributions. Review combined distribution licensing before publishing a release.

View as AI is an independent best-effort approximation. OpenAI's public browser
example provides source ancestry; production equivalence is evaluated through
recorded native ChatGPT `web.run` observations.
