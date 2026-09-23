---
summary: "Startup context for View as AI: product goal, empirical calibration model, engineering posture, and global invariants."
---

# Project Overview

## What This Is

View as AI is a lightweight tool for seeing a website from the perspective of AI browsing systems, currently calibrated against ChatGPT web browsing.

The stable runtime path is direct HTTP origin HTML, conservative provider-style pruning, then the locally adapted OpenAI formatter. Exact Markdown and line layout are secondary; information presence is the target.

OpenAI's public `gpt-oss` `process_html()` implementation is the formatter lineage. The copied formatter is locally owned and intentionally small.

## Engineering Approach

Keep implementation direct and stable. Prefer practical maintenance fixes over new reverse-engineering work. See [Engineering Approach](engineering-approach.md).

## Global Invariants

- Direct HTTP origin HTML is the runtime input. JavaScript rendering was removed after broad calibration showed it usually moved output farther from native `web.run`.
- OpenAI formatter code is copied into this repository and becomes locally owned code. Avoid taking dependency on full `gpt-oss` package.
- Prefer keeping uncertain content over aggressive deletion. Pruning rules must remain generic and conservative.
- Large calibration/oracle evidence is intentionally not part of the active repository. Keep durable findings summarized in the maintained wiki and regression fixtures.

Read [Parser Calibration](parser-calibration.md) for source lineage and regression boundaries.
