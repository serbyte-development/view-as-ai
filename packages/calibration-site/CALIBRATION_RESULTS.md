# View as AI Calibration Results

This file is the authoritative execution ledger for the tests defined in
`CALIBRATION_PLAN.md`. The plan defines what each test means; this file records what happened when
we actually ran it against the public calibration site.

Do not duplicate test definitions here. Keep rows compact and link to raw evidence when a result
needs explanation.

## Status vocabulary

Use exactly one of these values:

- `planned` — defined but not yet deployed/captured.
- `deployed` — fixture is live, but no authoritative native capture exists yet.
- `captured` — native evidence exists, but comparison/conclusion is not finalized.
- `verified` — native capture is complete and the result is understood.
- `mismatch` — native behavior and View as AI materially differ.
- `inconclusive` — capture exists but does not support a reliable conclusion.
- `follow-up` — initial evidence requires an isolated or repeated experiment.
- `blocked` — the experiment cannot currently be executed as designed.
- `deferred` — intentionally postponed to a later phase.

## Result fields

- **URL:** exact deployed route used for the authoritative capture.
- **Native:** concise native outcome, normally `present`, `absent`, `transformed`, `partial`,
  `unexpected`, or a short behavior-specific value.
- **View as AI:** the equivalent outcome from View as AI against the captured origin HTML.
- **Match:** `yes`, `no`, `partial`, or `—` before comparison.
- **Evidence:** repository-relative raw capture path or finding document. Raw native captures must be
  created using `capture/code-mode-prompt.md`.
- **Last tested:** use `YYYY-MM-DD @ <deployment-or-git-commit>`.
- **Finding:** one concise conclusion. Put longer analysis in a dedicated finding document and link
  it from this cell.

A test is not `verified` merely because its fixture was deployed. Native evidence must be captured
from the public URL.

For timing-sensitive, site-wide, or otherwise nondeterministic experiments, one row may represent
multiple captures. Put the capture set or detailed analysis in **Evidence**.

## Coverage check

Run:

```bash
npm run check:results --workspace @serbyte/view-as-ai-calibration-site
```

The check fails when a test ID exists in `CALIBRATION_PLAN.md` but not here, when this ledger has an
unknown/duplicate ID, or when a row uses an unsupported status.

## TEXT

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TEXT-001 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-002 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-003 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-004 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-005 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-006 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-007 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-008 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-009 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-010 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-011 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-012 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-013 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-014 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-015 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-016 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-017 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-018 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-019 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-020 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-021 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-022 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-023 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-024 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-025 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-026 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-027 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-028 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-029 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-030 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-031 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-032 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TEXT-033 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |

## VIS

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| VIS-001 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-002 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-003 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-004 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-005 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-006 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-007 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-008 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-009 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-010 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-011 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-012 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-013 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-014 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-015 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-016 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-017 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-018 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-019 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-020 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-021 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-022 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-023 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-024 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-025 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-026 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-027 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-028 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-029 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| VIS-030 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-030/ | — | — | — | — | — | — |
| VIS-031 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-031/ | — | — | — | — | — | — |
| VIS-032 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-032/ | — | — | — | — | — | — |
| VIS-033 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-033/ | — | — | — | — | — | — |
| VIS-034 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-034/ | — | — | — | — | — | — |
| VIS-035 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-035/ | — | — | — | — | — | — |
| VIS-036 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-036/ | — | — | — | — | — | — |
| VIS-037 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-037/ | — | — | — | — | — | — |
| VIS-038 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-038/ | — | — | — | — | — | — |
| VIS-039 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-039/ | — | — | — | — | — | — |
| VIS-040 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-040/ | — | — | — | — | — | — |
| VIS-041 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-041/ | — | — | — | — | — | — |
| VIS-042 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-042/ | — | — | — | — | — | — |
| VIS-043 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-043/ | — | — | — | — | — | — |
| VIS-044 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-044/ | — | — | — | — | — | — |
| VIS-045 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-045/ | — | — | — | — | — | — |
| VIS-046 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-046/ | — | — | — | — | — | — |
| VIS-047 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-047/ | — | — | — | — | — | — |
| VIS-048 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-048/ | — | — | — | — | — | — |
| VIS-049 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-049/ | — | — | — | — | — | — |
| VIS-050 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-050/ | — | — | — | — | — | — |
| VIS-051 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-051/ | — | — | — | — | — | — |
| VIS-052 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-052/ | — | — | — | — | — | — |
| VIS-053 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-053/ | — | — | — | — | — | — |
| VIS-054 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-054/ | — | — | — | — | — | — |
| VIS-055 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-055/ | — | — | — | — | — | — |
| VIS-056 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-056/ | — | — | — | — | — | — |
| VIS-057 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-057/ | — | — | — | — | — | — |
| VIS-058 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-058/ | — | — | — | — | — | — |
| VIS-059 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-059/ | — | — | — | — | — | — |
| VIS-060 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-060/ | — | — | — | — | — | — |
| VIS-061 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-061/ | — | — | — | — | — | — |
| VIS-062 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-062/ | — | — | — | — | — | — |
| VIS-063 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-063/ | — | — | — | — | — | — |
| VIS-064 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-064/ | — | — | — | — | — | — |
| VIS-065 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-065/ | — | — | — | — | — | — |
| VIS-066 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-066/ | — | — | — | — | — | — |
| VIS-067 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-067/ | — | — | — | — | — | — |
| VIS-068 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-068/ | — | — | — | — | — | — |
| VIS-069 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-069/ | — | — | — | — | — | — |
| VIS-070 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-070/ | — | — | — | — | — | — |
| VIS-071 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-071/ | — | — | — | — | — | — |
| VIS-072 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-072/ | — | — | — | — | — | — |
| VIS-073 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-073/ | — | — | — | — | — | — |
| VIS-074 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-074/ | — | — | — | — | — | — |
| VIS-075 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-075/ | — | — | — | — | — | — |
| VIS-076 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-076/ | — | — | — | — | — | — |
| VIS-077 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-077/ | — | — | — | — | — | — |
| VIS-078 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-078/ | — | — | — | — | — | — |
| VIS-079 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-079/ | — | — | — | — | — | — |
| VIS-080 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-080/ | — | — | — | — | — | — |
| VIS-081 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-081/ | — | — | — | — | — | — |
| VIS-082 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-082/ | — | — | — | — | — | — |
| VIS-083 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-083/ | — | — | — | — | — | — |
| VIS-084 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-084/ | — | — | — | — | — | — |
| VIS-085 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-085/ | — | — | — | — | — | — |
| VIS-086 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-086/ | — | — | — | — | — | — |
| VIS-087 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-087/ | — | — | — | — | — | — |
| VIS-088 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-088/ | — | — | — | — | — | — |
| VIS-089 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-089/ | — | — | — | — | — | — |
| VIS-090 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-090/ | — | — | — | — | — | — |
| VIS-091 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-091/ | — | — | — | — | — | — |
| VIS-092 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-092/ | — | — | — | — | — | — |
| VIS-093 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-093/ | — | — | — | — | — | — |
| VIS-094 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-094/ | — | — | — | — | — | — |
| VIS-095 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-095/ | — | — | — | — | — | — |
| VIS-096 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-096/ | — | — | — | — | — | — |
| VIS-097 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-097/ | — | — | — | — | — | — |
| VIS-098 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-098/ | — | — | — | — | — | — |
| VIS-099 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-099/ | — | — | — | — | — | — |
| VIS-100 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-100/ | — | — | — | — | — | — |
| VIS-101 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-101/ | — | — | — | — | — | — |
| VIS-102 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-102/ | — | — | — | — | — | — |
| VIS-103 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-103/ | — | — | — | — | — | — |
| VIS-104 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-104/ | — | — | — | — | — | — |
| VIS-105 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-105/ | — | — | — | — | — | — |
| VIS-106 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-106/ | — | — | — | — | — | — |
| VIS-107 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-107/ | — | — | — | — | — | — |
| VIS-108 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-108/ | — | — | — | — | — | — |
| VIS-109 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-109/ | — | — | — | — | — | — |
| VIS-110 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-110/ | — | — | — | — | — | — |

## SEM

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SEM-001 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-002 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-003 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-004 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-005 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-006 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-007 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-008 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-009 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-010 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-011 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-012 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-013 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-014 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-015 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-016 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-017 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-018 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-019 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-020 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-021 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-022 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-023 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-024 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-025 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-026 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-027 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-028 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-029 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-030 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-031 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-032 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-033 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-034 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-035 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| SEM-036 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |

## BOIL

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BOIL-001 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-001/ | — | — | — | — | — | — |
| BOIL-002 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-002/ | — | — | — | — | — | — |
| BOIL-003 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-003/ | — | — | — | — | — | — |
| BOIL-004 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-004/ | — | — | — | — | — | — |
| BOIL-005 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-005/ | — | — | — | — | — | — |
| BOIL-006 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-006/ | — | — | — | — | — | — |
| BOIL-007 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-007/ | — | — | — | — | — | — |
| BOIL-008 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-008/ | — | — | — | — | — | — |
| BOIL-009 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-009/ | — | — | — | — | — | — |
| BOIL-010 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-010/ | — | — | — | — | — | — |
| BOIL-011 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-011/ | — | — | — | — | — | — |
| BOIL-012 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-012/ | — | — | — | — | — | — |
| BOIL-013 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-013/ | — | — | — | — | — | — |
| BOIL-014 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-014/ | — | — | — | — | — | — |
| BOIL-015 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-015/ | — | — | — | — | — | — |
| BOIL-016 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-016/ | — | — | — | — | — | — |
| BOIL-017 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-017/ | — | — | — | — | — | — |
| BOIL-018 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-018/ | — | — | — | — | — | — |
| BOIL-019 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-019/ | — | — | — | — | — | — |
| BOIL-020 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-020/ | — | — | — | — | — | — |
| BOIL-021 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-021/ | — | — | — | — | — | — |
| BOIL-022 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-022/ | — | — | — | — | — | — |
| BOIL-023 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-023/ | — | — | — | — | — | — |
| BOIL-024 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-024/ | — | — | — | — | — | — |
| BOIL-025 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-025/ | — | — | — | — | — | — |
| BOIL-026 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-026/ | — | — | — | — | — | — |
| BOIL-027 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-027/ | — | — | — | — | — | — |
| BOIL-028 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-028/ | — | — | — | — | — | — |
| BOIL-029 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-029/ | — | — | — | — | — | — |
| BOIL-030 | deployed | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-030/ | — | — | — | — | — | — |

## CTRL

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CTRL-001 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-002 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-003 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-004 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-005 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-006 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-007 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-008 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-009 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-010 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-011 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-012 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-013 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-014 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-015 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-016 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-017 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-018 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-019 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-020 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-021 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-022 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-023 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-024 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-025 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-026 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-027 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-028 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-029 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-030 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-031 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-032 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-033 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-034 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| CTRL-035 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |

## LINK

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| LINK-001 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-002 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-003 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-004 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-005 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-006 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-007 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-008 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-009 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-010 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-011 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-012 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-013 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-014 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-015 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-016 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-017 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-018 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-019 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-020 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-021 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-022 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-023 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-024 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-025 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-026 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-027 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-028 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-029 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-030 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| LINK-031 | deployed | https://view-as-ai.vercel.app/experiments/link/LINK-031/ | — | — | — | — | — | — |
| LINK-032 | deployed | https://view-as-ai.vercel.app/experiments/link/LINK-032/ | — | — | — | — | — | — |
| LINK-033 | deployed | https://view-as-ai.vercel.app/experiments/link/LINK-033/ | — | — | — | — | — | — |

## IMG

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| IMG-001 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-002 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-003 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-004 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-005 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-006 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-007 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-008 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-009 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-010 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-011 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-012 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-013 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-014 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-015 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-016 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-017 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-018 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-019 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-020 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| IMG-021 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |

## FRAME

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FRAME-001 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| FRAME-002 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| FRAME-003 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| FRAME-004 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| FRAME-005 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| FRAME-006 | deployed | https://view-as-ai.vercel.app/experiments/frame/FRAME-006/ | — | — | — | — | — | — |
| FRAME-007 | deployed | https://view-as-ai.vercel.app/experiments/frame/FRAME-007/ | — | — | — | — | — | — |
| FRAME-008 | deployed | https://view-as-ai.vercel.app/experiments/frame/FRAME-008/ | — | — | — | — | — | — |

## TABLE

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TABLE-001 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TABLE-002 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TABLE-003 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TABLE-004 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TABLE-005 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TABLE-006 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TABLE-007 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TABLE-008 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TABLE-009 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TABLE-010 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TABLE-011 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TABLE-012 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TABLE-013 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| TABLE-014 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |

## HEAD

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| HEAD-001 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-001/ | — | — | — | — | — | — |
| HEAD-002 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-002/ | — | — | — | — | — | — |
| HEAD-003 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-003/ | — | — | — | — | — | — |
| HEAD-004 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-004/ | — | — | — | — | — | — |
| HEAD-005 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-005/ | — | — | — | — | — | — |
| HEAD-006 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-006/ | — | — | — | — | — | — |
| HEAD-007 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-007/ | — | — | — | — | — | — |
| HEAD-008 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-008/ | — | — | — | — | — | — |
| HEAD-009 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-009/ | — | — | — | — | — | — |
| HEAD-010 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-010/ | — | — | — | — | — | — |
| HEAD-011 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-011/ | — | — | — | — | — | — |
| HEAD-012 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-012/ | — | — | — | — | — | — |
| HEAD-013 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-013/ | — | — | — | — | — | — |
| HEAD-014 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-014/ | — | — | — | — | — | — |
| HEAD-015 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-015/ | — | — | — | — | — | — |
| HEAD-016 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-016/ | — | — | — | — | — | — |
| HEAD-017 | deployed | https://view-as-ai.vercel.app/experiments/head/HEAD-017/ | — | — | — | — | — | — |

## JSONLD

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| JSONLD-001 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-001/ | — | — | — | — | — | — |
| JSONLD-002 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-002/ | — | — | — | — | — | — |
| JSONLD-003 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-003/ | — | — | — | — | — | — |
| JSONLD-004 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-004/ | — | — | — | — | — | — |
| JSONLD-005 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-005/ | — | — | — | — | — | — |
| JSONLD-006 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-006/ | — | — | — | — | — | — |
| JSONLD-007 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-007/ | — | — | — | — | — | — |
| JSONLD-008 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-008/ | — | — | — | — | — | — |
| JSONLD-009 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-009/ | — | — | — | — | — | — |
| JSONLD-010 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-010/ | — | — | — | — | — | — |
| JSONLD-011 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-011/ | — | — | — | — | — | — |
| JSONLD-012 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-012/ | — | — | — | — | — | — |
| JSONLD-013 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-013/ | — | — | — | — | — | — |
| JSONLD-014 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-014/ | — | — | — | — | — | — |
| JSONLD-015 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-015/ | — | — | — | — | — | — |
| JSONLD-016 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-016/ | — | — | — | — | — | — |
| JSONLD-017 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-017/ | — | — | — | — | — | — |
| JSONLD-018 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-018/ | — | — | — | — | — | — |
| JSONLD-019 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-019/ | — | — | — | — | — | — |
| JSONLD-020 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-020/ | — | — | — | — | — | — |
| JSONLD-021 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-021/ | — | — | — | — | — | — |
| JSONLD-022 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-022/ | — | — | — | — | — | — |
| JSONLD-023 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-023/ | — | — | — | — | — | — |
| JSONLD-024 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-024/ | — | — | — | — | — | — |
| JSONLD-025 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-025/ | — | — | — | — | — | — |
| JSONLD-026 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-026/ | — | — | — | — | — | — |
| JSONLD-027 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-027/ | — | — | — | — | — | — |
| JSONLD-028 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-028/ | — | — | — | — | — | — |
| JSONLD-029 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-029/ | — | — | — | — | — | — |
| JSONLD-030 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-030/ | — | — | — | — | — | — |
| JSONLD-031 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-031/ | — | — | — | — | — | — |
| JSONLD-032 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-032/ | — | — | — | — | — | — |
| JSONLD-033 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-033/ | — | — | — | — | — | — |
| JSONLD-034 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-034/ | — | — | — | — | — | — |
| JSONLD-035 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-035/ | — | — | — | — | — | — |
| JSONLD-036 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-036/ | — | — | — | — | — | — |
| JSONLD-037 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-037/ | — | — | — | — | — | — |
| JSONLD-038 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-038/ | — | — | — | — | — | — |
| JSONLD-039 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-039/ | — | — | — | — | — | — |
| JSONLD-040 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-040/ | — | — | — | — | — | — |
| JSONLD-041 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-041/ | — | — | — | — | — | — |
| JSONLD-042 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-042/ | — | — | — | — | — | — |
| JSONLD-043 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-043/ | — | — | — | — | — | — |
| JSONLD-044 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-044/ | — | — | — | — | — | — |
| JSONLD-045 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-045/ | — | — | — | — | — | — |
| JSONLD-046 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-046/ | — | — | — | — | — | — |
| JSONLD-047 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-047/ | — | — | — | — | — | — |
| JSONLD-048 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-048/ | — | — | — | — | — | — |
| JSONLD-049 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-049/ | — | — | — | — | — | — |
| JSONLD-050 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-050/ | — | — | — | — | — | — |
| JSONLD-051 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-051/ | — | — | — | — | — | — |
| JSONLD-052 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-052/ | — | — | — | — | — | — |
| JSONLD-053 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-053/ | — | — | — | — | — | — |
| JSONLD-054 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-054/ | — | — | — | — | — | — |
| JSONLD-055 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-055/ | — | — | — | — | — | — |
| JSONLD-056 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-056/ | — | — | — | — | — | — |
| JSONLD-057 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-057/ | — | — | — | — | — | — |
| JSONLD-058 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-058/ | — | — | — | — | — | — |
| JSONLD-059 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-059/ | — | — | — | — | — | — |
| JSONLD-060 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-060/ | — | — | — | — | — | — |
| JSONLD-061 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-061/ | — | — | — | — | — | — |
| JSONLD-062 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-062/ | — | — | — | — | — | — |
| JSONLD-063 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-063/ | — | — | — | — | — | — |
| JSONLD-064 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-064/ | — | — | — | — | — | — |
| JSONLD-065 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-065/ | — | — | — | — | — | — |
| JSONLD-066 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-066/ | — | — | — | — | — | — |
| JSONLD-067 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-067/ | — | — | — | — | — | — |
| JSONLD-068 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-068/ | — | — | — | — | — | — |
| JSONLD-069 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-069/ | — | — | — | — | — | — |
| JSONLD-070 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-070/ | — | — | — | — | — | — |
| JSONLD-071 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-071/ | — | — | — | — | — | — |
| JSONLD-072 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-072/ | — | — | — | — | — | — |
| JSONLD-073 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-073/ | — | — | — | — | — | — |
| JSONLD-074 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-074/ | — | — | — | — | — | — |
| JSONLD-075 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-075/ | — | — | — | — | — | — |
| JSONLD-076 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-076/ | — | — | — | — | — | — |
| JSONLD-077 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-077/ | — | — | — | — | — | — |
| JSONLD-078 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-078/ | — | — | — | — | — | — |
| JSONLD-079 | deployed | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-079/ | — | — | — | — | — | — |

## ACTIVE

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ACTIVE-001 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-001/ | — | — | — | — | — | — |
| ACTIVE-002 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-002/ | — | — | — | — | — | — |
| ACTIVE-003 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-003/ | — | — | — | — | — | — |
| ACTIVE-004 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-004/ | — | — | — | — | — | — |
| ACTIVE-005 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-005/ | — | — | — | — | — | — |
| ACTIVE-006 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-006/ | — | — | — | — | — | — |
| ACTIVE-007 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-007/ | — | — | — | — | — | — |
| ACTIVE-008 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-008/ | — | — | — | — | — | — |
| ACTIVE-009 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-009/ | — | — | — | — | — | — |
| ACTIVE-010 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-010/ | — | — | — | — | — | — |
| ACTIVE-011 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-011/ | — | — | — | — | — | — |
| ACTIVE-012 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-012/ | — | — | — | — | — | — |
| ACTIVE-013 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-013/ | — | — | — | — | — | — |
| ACTIVE-014 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-014/ | — | — | — | — | — | — |
| ACTIVE-015 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-015/ | — | — | — | — | — | — |
| ACTIVE-016 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-016/ | — | — | — | — | — | — |
| ACTIVE-017 | deployed | https://view-as-ai.vercel.app/experiments/active/ACTIVE-017/ | — | — | — | — | — | — |

## ORDER

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ORDER-001 | deployed | https://view-as-ai.vercel.app/experiments/order/ORDER-001/ | — | — | — | — | — | — |
| ORDER-002 | deployed | https://view-as-ai.vercel.app/experiments/order/ORDER-002/ | — | — | — | — | — | — |
| ORDER-003 | deployed | https://view-as-ai.vercel.app/experiments/order/ORDER-003/ | — | — | — | — | — | — |
| ORDER-004 | deployed | https://view-as-ai.vercel.app/experiments/order/ORDER-004/ | — | — | — | — | — | — |
| ORDER-005 | deployed | https://view-as-ai.vercel.app/experiments/order/ORDER-005/ | — | — | — | — | — | — |
| ORDER-006 | deployed | https://view-as-ai.vercel.app/experiments/order/ORDER-006/ | — | — | — | — | — | — |
| ORDER-007 | deployed | https://view-as-ai.vercel.app/experiments/order/ORDER-007/ | — | — | — | — | — | — |
| ORDER-008 | deployed | https://view-as-ai.vercel.app/experiments/order/ORDER-008/ | — | — | — | — | — | — |
| ORDER-009 | deployed | https://view-as-ai.vercel.app/experiments/order/ORDER-009/ | — | — | — | — | — | — |

## DUP

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DUP-001 | deployed | https://view-as-ai.vercel.app/experiments/duplicate/DUP-001/ | — | — | — | — | — | — |
| DUP-002 | deployed | https://view-as-ai.vercel.app/experiments/duplicate/DUP-002/ | — | — | — | — | — | — |
| DUP-003 | deployed | https://view-as-ai.vercel.app/experiments/duplicate/DUP-003/ | — | — | — | — | — | — |
| DUP-004 | deployed | https://view-as-ai.vercel.app/experiments/duplicate/DUP-004/ | — | — | — | — | — | — |
| DUP-005 | deployed | https://view-as-ai.vercel.app/experiments/duplicate/DUP-005/ | — | — | — | — | — | — |
| DUP-006 | deployed | https://view-as-ai.vercel.app/experiments/duplicate/DUP-006/ | — | — | — | — | — | — |
| DUP-007 | deployed | https://view-as-ai.vercel.app/experiments/duplicate/DUP-007/ | — | — | — | — | — | — |
| DUP-008 | deployed | https://view-as-ai.vercel.app/experiments/duplicate/DUP-008/ | — | — | — | — | — | — |
| DUP-009 | deployed | https://view-as-ai.vercel.app/experiments/duplicate/DUP-009/ | — | — | — | — | — | — |
| DUP-010 | deployed | https://view-as-ai.vercel.app/experiments/duplicate/DUP-010/ | — | — | — | — | — | — |
| DUP-011 | deployed | https://view-as-ai.vercel.app/experiments/duplicate/DUP-011/ | — | — | — | — | — | — |

## I18N

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| I18N-001 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| I18N-002 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| I18N-003 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| I18N-004 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| I18N-005 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| I18N-006 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| I18N-007 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| I18N-008 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| I18N-009 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| I18N-010 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| I18N-011 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| I18N-012 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |
| I18N-013 | deployed | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | — | — | — |

## MAL

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MAL-001 | deployed | https://view-as-ai.vercel.app/experiments/malformed/MAL-001/ | — | — | — | — | — | — |
| MAL-002 | deployed | https://view-as-ai.vercel.app/experiments/malformed/MAL-002/ | — | — | — | — | — | — |
| MAL-003 | deployed | https://view-as-ai.vercel.app/experiments/malformed/MAL-003/ | — | — | — | — | — | — |
| MAL-004 | deployed | https://view-as-ai.vercel.app/experiments/malformed/MAL-004/ | — | — | — | — | — | — |
| MAL-005 | deployed | https://view-as-ai.vercel.app/experiments/malformed/MAL-005/ | — | — | — | — | — | — |
| MAL-006 | deployed | https://view-as-ai.vercel.app/experiments/malformed/MAL-006/ | — | — | — | — | — | — |
| MAL-007 | deployed | https://view-as-ai.vercel.app/experiments/malformed/MAL-007/ | — | — | — | — | — | — |
| MAL-008 | deployed | https://view-as-ai.vercel.app/experiments/malformed/MAL-008/ | — | — | — | — | — | — |
| MAL-009 | deployed | https://view-as-ai.vercel.app/experiments/malformed/MAL-009/ | — | — | — | — | — | — |
| MAL-010 | deployed | https://view-as-ai.vercel.app/experiments/malformed/MAL-010/ | — | — | — | — | — | — |
| MAL-011 | deployed | https://view-as-ai.vercel.app/experiments/malformed/MAL-011/ | — | — | — | — | — | — |
| MAL-012 | deployed | https://view-as-ai.vercel.app/experiments/malformed/MAL-012/ | — | — | — | — | — | — |

## SIZE

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SIZE-001 | deployed | https://view-as-ai.vercel.app/experiments/size/SIZE-001/ | — | — | — | — | — | — |
| SIZE-002 | deployed | https://view-as-ai.vercel.app/experiments/size/SIZE-002/ | — | — | — | — | — | — |
| SIZE-003 | deployed | https://view-as-ai.vercel.app/experiments/size/SIZE-003/ | — | — | — | — | — | — |
| SIZE-004 | deployed | https://view-as-ai.vercel.app/experiments/size/SIZE-004/ | — | — | — | — | — | — |
| SIZE-005 | deployed | https://view-as-ai.vercel.app/experiments/size/SIZE-005/ | — | — | — | — | — | — |
| SIZE-006 | deployed | https://view-as-ai.vercel.app/experiments/size/SIZE-006/ | — | — | — | — | — | — |
| SIZE-007 | deployed | https://view-as-ai.vercel.app/experiments/size/SIZE-007/ | — | — | — | — | — | — |
| SIZE-008 | deployed | https://view-as-ai.vercel.app/experiments/size/SIZE-008/ | — | — | — | — | — | — |
| SIZE-009 | deployed | https://view-as-ai.vercel.app/experiments/size/SIZE-009/ | — | — | — | — | — | — |
| SIZE-010 | deployed | https://view-as-ai.vercel.app/experiments/size/SIZE-010/ | — | — | — | — | — | — |
| SIZE-011 | deployed | https://view-as-ai.vercel.app/experiments/size/SIZE-011/ | — | — | — | — | — | — |

## HTTP

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| HTTP-001 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-001 | — | — | — | — | — | — |
| HTTP-002 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-002 | — | — | — | — | — | — |
| HTTP-003 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-003 | — | — | — | — | — | — |
| HTTP-004 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-004 | — | — | — | — | — | — |
| HTTP-005 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-005 | — | — | — | — | — | — |
| HTTP-006 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-006 | — | — | — | — | — | — |
| HTTP-007 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-007 | — | — | — | — | — | — |
| HTTP-008 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-008 | — | — | — | — | — | — |
| HTTP-009 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-009 | — | — | — | — | — | — |
| HTTP-010 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-010 | — | — | — | — | — | — |
| HTTP-011 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-011 | — | — | — | — | — | — |
| HTTP-012 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-012 | — | — | — | — | — | — |
| HTTP-013 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-013 | — | — | — | — | — | — |
| HTTP-014 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-014 | — | — | — | — | — | — |
| HTTP-015 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-015 | — | — | — | — | — | — |
| HTTP-016 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-016 | — | — | — | — | — | — |
| HTTP-017 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-017 | — | — | — | — | — | — |
| HTTP-018 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-018 | — | — | — | — | — | — |
| HTTP-019 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-019 | — | — | — | — | — | — |
| HTTP-020 | deployed | https://view-as-ai.vercel.app/api/http?case=HTTP-020 | — | — | — | — | — | — |

## CRAWL

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CRAWL-001 | deployed | https://view-as-ai.vercel.app/api/crawl?case=CRAWL-001 | — | — | — | — | — | — |
| CRAWL-002 | deployed | https://view-as-ai.vercel.app/api/crawl?case=CRAWL-002 | — | — | — | — | — | — |
| CRAWL-003 | deployed | https://view-as-ai.vercel.app/api/crawl?case=CRAWL-003 | — | — | — | — | — | — |
| CRAWL-004 | deployed | https://view-as-ai.vercel.app/api/crawl?case=CRAWL-004 | — | — | — | — | — | — |
| CRAWL-005 | deployed | https://view-as-ai.vercel.app/api/crawl-005 | — | — | — | — | — | — |
| CRAWL-006 | deployed | https://view-as-ai.vercel.app/api/crawl-006 | — | — | — | — | — | — |
| CRAWL-007 | deployed | https://view-as-ai.vercel.app/api/crawl?case=CRAWL-007 | — | — | — | — | — | — |
| CRAWL-008 | deployed | https://view-as-ai.vercel.app/api/crawl?case=CRAWL-008 | — | — | — | — | — | — |
| CRAWL-009 | deployed | https://view-as-ai.vercel.app/api/crawl?case=CRAWL-009 | — | — | — | — | — | — |
| CRAWL-010 | deployed | https://view-as-ai.vercel.app/api/crawl?case=CRAWL-010 | — | — | — | — | — | — |
| CRAWL-011 | deployed | https://view-as-ai.vercel.app/api/crawl?case=CRAWL-011 | — | — | — | — | — | — |

## SITE

Site-context experiments are multi-page experiments rather than single fixture cases. Their exact
controls and deployment sequences are defined in `CALIBRATION_PLAN.md`.

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SITE-BASE | planned | — | — | — | — | — | — | — |
| SITE-COUNT | planned | — | — | — | — | — | — | — |
| SITE-TEXT | planned | — | — | — | — | — | — | — |
| SITE-REGION | planned | — | — | — | — | — | — | — |
| SITE-UNIQUE-CHILD | planned | — | — | — | — | — | — | — |
| SITE-NAV-LINKAGE | planned | — | — | — | — | — | — | — |
| SITE-TEMPLATE | planned | — | — | — | — | — | — | — |
| SITE-CLASS | planned | — | — | — | — | — | — | — |
| SITE-CHANGE | planned | — | — | — | — | — | — | — |
| SITE-CONVERSATION | planned | — | — | — | — | — | — | — |
| SITE-SUBDOMAIN | planned | — | — | — | — | — | — | — |

