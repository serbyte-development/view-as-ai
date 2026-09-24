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
| TEXT-001 | planned | — | — | — | — | — | — | — |
| TEXT-002 | planned | — | — | — | — | — | — | — |
| TEXT-003 | planned | — | — | — | — | — | — | — |
| TEXT-004 | planned | — | — | — | — | — | — | — |
| TEXT-005 | planned | — | — | — | — | — | — | — |
| TEXT-006 | planned | — | — | — | — | — | — | — |
| TEXT-007 | planned | — | — | — | — | — | — | — |
| TEXT-008 | planned | — | — | — | — | — | — | — |
| TEXT-009 | planned | — | — | — | — | — | — | — |
| TEXT-010 | planned | — | — | — | — | — | — | — |
| TEXT-011 | planned | — | — | — | — | — | — | — |
| TEXT-012 | planned | — | — | — | — | — | — | — |
| TEXT-013 | planned | — | — | — | — | — | — | — |
| TEXT-014 | planned | — | — | — | — | — | — | — |
| TEXT-015 | planned | — | — | — | — | — | — | — |
| TEXT-016 | planned | — | — | — | — | — | — | — |
| TEXT-017 | planned | — | — | — | — | — | — | — |
| TEXT-018 | planned | — | — | — | — | — | — | — |
| TEXT-019 | planned | — | — | — | — | — | — | — |
| TEXT-020 | planned | — | — | — | — | — | — | — |
| TEXT-021 | planned | — | — | — | — | — | — | — |
| TEXT-022 | planned | — | — | — | — | — | — | — |
| TEXT-023 | planned | — | — | — | — | — | — | — |
| TEXT-024 | planned | — | — | — | — | — | — | — |
| TEXT-025 | planned | — | — | — | — | — | — | — |
| TEXT-026 | planned | — | — | — | — | — | — | — |
| TEXT-027 | planned | — | — | — | — | — | — | — |
| TEXT-028 | planned | — | — | — | — | — | — | — |
| TEXT-029 | planned | — | — | — | — | — | — | — |
| TEXT-030 | planned | — | — | — | — | — | — | — |
| TEXT-031 | planned | — | — | — | — | — | — | — |
| TEXT-032 | planned | — | — | — | — | — | — | — |
| TEXT-033 | planned | — | — | — | — | — | — | — |

## VIS

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| VIS-001 | planned | — | — | — | — | — | — | — |
| VIS-002 | planned | — | — | — | — | — | — | — |
| VIS-003 | planned | — | — | — | — | — | — | — |
| VIS-004 | planned | — | — | — | — | — | — | — |
| VIS-005 | planned | — | — | — | — | — | — | — |
| VIS-006 | planned | — | — | — | — | — | — | — |
| VIS-007 | planned | — | — | — | — | — | — | — |
| VIS-008 | planned | — | — | — | — | — | — | — |
| VIS-009 | planned | — | — | — | — | — | — | — |
| VIS-010 | planned | — | — | — | — | — | — | — |
| VIS-011 | planned | — | — | — | — | — | — | — |
| VIS-012 | planned | — | — | — | — | — | — | — |
| VIS-013 | planned | — | — | — | — | — | — | — |
| VIS-014 | planned | — | — | — | — | — | — | — |
| VIS-015 | planned | — | — | — | — | — | — | — |
| VIS-016 | planned | — | — | — | — | — | — | — |
| VIS-017 | planned | — | — | — | — | — | — | — |
| VIS-018 | planned | — | — | — | — | — | — | — |
| VIS-019 | planned | — | — | — | — | — | — | — |
| VIS-020 | planned | — | — | — | — | — | — | — |
| VIS-021 | planned | — | — | — | — | — | — | — |
| VIS-022 | planned | — | — | — | — | — | — | — |
| VIS-023 | planned | — | — | — | — | — | — | — |
| VIS-024 | planned | — | — | — | — | — | — | — |
| VIS-025 | planned | — | — | — | — | — | — | — |
| VIS-026 | planned | — | — | — | — | — | — | — |
| VIS-027 | planned | — | — | — | — | — | — | — |
| VIS-028 | planned | — | — | — | — | — | — | — |
| VIS-029 | planned | — | — | — | — | — | — | — |
| VIS-030 | planned | — | — | — | — | — | — | — |
| VIS-031 | planned | — | — | — | — | — | — | — |
| VIS-032 | planned | — | — | — | — | — | — | — |
| VIS-033 | planned | — | — | — | — | — | — | — |
| VIS-034 | planned | — | — | — | — | — | — | — |
| VIS-035 | planned | — | — | — | — | — | — | — |
| VIS-036 | planned | — | — | — | — | — | — | — |
| VIS-037 | planned | — | — | — | — | — | — | — |
| VIS-038 | planned | — | — | — | — | — | — | — |
| VIS-039 | planned | — | — | — | — | — | — | — |
| VIS-040 | planned | — | — | — | — | — | — | — |
| VIS-041 | planned | — | — | — | — | — | — | — |
| VIS-042 | planned | — | — | — | — | — | — | — |
| VIS-043 | planned | — | — | — | — | — | — | — |
| VIS-044 | planned | — | — | — | — | — | — | — |
| VIS-045 | planned | — | — | — | — | — | — | — |
| VIS-046 | planned | — | — | — | — | — | — | — |
| VIS-047 | planned | — | — | — | — | — | — | — |
| VIS-048 | planned | — | — | — | — | — | — | — |
| VIS-049 | planned | — | — | — | — | — | — | — |
| VIS-050 | planned | — | — | — | — | — | — | — |
| VIS-051 | planned | — | — | — | — | — | — | — |
| VIS-052 | planned | — | — | — | — | — | — | — |
| VIS-053 | planned | — | — | — | — | — | — | — |
| VIS-054 | planned | — | — | — | — | — | — | — |
| VIS-055 | planned | — | — | — | — | — | — | — |
| VIS-056 | planned | — | — | — | — | — | — | — |
| VIS-057 | planned | — | — | — | — | — | — | — |
| VIS-058 | planned | — | — | — | — | — | — | — |
| VIS-059 | planned | — | — | — | — | — | — | — |
| VIS-060 | planned | — | — | — | — | — | — | — |
| VIS-061 | planned | — | — | — | — | — | — | — |
| VIS-062 | planned | — | — | — | — | — | — | — |
| VIS-063 | planned | — | — | — | — | — | — | — |
| VIS-064 | planned | — | — | — | — | — | — | — |
| VIS-065 | planned | — | — | — | — | — | — | — |
| VIS-066 | planned | — | — | — | — | — | — | — |
| VIS-067 | planned | — | — | — | — | — | — | — |
| VIS-068 | planned | — | — | — | — | — | — | — |
| VIS-069 | planned | — | — | — | — | — | — | — |
| VIS-070 | planned | — | — | — | — | — | — | — |
| VIS-071 | planned | — | — | — | — | — | — | — |
| VIS-072 | planned | — | — | — | — | — | — | — |
| VIS-073 | planned | — | — | — | — | — | — | — |
| VIS-074 | planned | — | — | — | — | — | — | — |
| VIS-075 | planned | — | — | — | — | — | — | — |
| VIS-076 | planned | — | — | — | — | — | — | — |
| VIS-077 | planned | — | — | — | — | — | — | — |
| VIS-078 | planned | — | — | — | — | — | — | — |
| VIS-079 | planned | — | — | — | — | — | — | — |
| VIS-080 | planned | — | — | — | — | — | — | — |
| VIS-081 | planned | — | — | — | — | — | — | — |
| VIS-082 | planned | — | — | — | — | — | — | — |
| VIS-083 | planned | — | — | — | — | — | — | — |
| VIS-084 | planned | — | — | — | — | — | — | — |
| VIS-085 | planned | — | — | — | — | — | — | — |
| VIS-086 | planned | — | — | — | — | — | — | — |
| VIS-087 | planned | — | — | — | — | — | — | — |
| VIS-088 | planned | — | — | — | — | — | — | — |
| VIS-089 | planned | — | — | — | — | — | — | — |
| VIS-090 | planned | — | — | — | — | — | — | — |
| VIS-091 | planned | — | — | — | — | — | — | — |
| VIS-092 | planned | — | — | — | — | — | — | — |
| VIS-093 | planned | — | — | — | — | — | — | — |
| VIS-094 | planned | — | — | — | — | — | — | — |
| VIS-095 | planned | — | — | — | — | — | — | — |
| VIS-096 | planned | — | — | — | — | — | — | — |
| VIS-097 | planned | — | — | — | — | — | — | — |
| VIS-098 | planned | — | — | — | — | — | — | — |
| VIS-099 | planned | — | — | — | — | — | — | — |
| VIS-100 | planned | — | — | — | — | — | — | — |
| VIS-101 | planned | — | — | — | — | — | — | — |
| VIS-102 | planned | — | — | — | — | — | — | — |
| VIS-103 | planned | — | — | — | — | — | — | — |
| VIS-104 | planned | — | — | — | — | — | — | — |
| VIS-105 | planned | — | — | — | — | — | — | — |
| VIS-106 | planned | — | — | — | — | — | — | — |
| VIS-107 | planned | — | — | — | — | — | — | — |
| VIS-108 | planned | — | — | — | — | — | — | — |
| VIS-109 | planned | — | — | — | — | — | — | — |
| VIS-110 | planned | — | — | — | — | — | — | — |

## SEM

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SEM-001 | planned | — | — | — | — | — | — | — |
| SEM-002 | planned | — | — | — | — | — | — | — |
| SEM-003 | planned | — | — | — | — | — | — | — |
| SEM-004 | planned | — | — | — | — | — | — | — |
| SEM-005 | planned | — | — | — | — | — | — | — |
| SEM-006 | planned | — | — | — | — | — | — | — |
| SEM-007 | planned | — | — | — | — | — | — | — |
| SEM-008 | planned | — | — | — | — | — | — | — |
| SEM-009 | planned | — | — | — | — | — | — | — |
| SEM-010 | planned | — | — | — | — | — | — | — |
| SEM-011 | planned | — | — | — | — | — | — | — |
| SEM-012 | planned | — | — | — | — | — | — | — |
| SEM-013 | planned | — | — | — | — | — | — | — |
| SEM-014 | planned | — | — | — | — | — | — | — |
| SEM-015 | planned | — | — | — | — | — | — | — |
| SEM-016 | planned | — | — | — | — | — | — | — |
| SEM-017 | planned | — | — | — | — | — | — | — |
| SEM-018 | planned | — | — | — | — | — | — | — |
| SEM-019 | planned | — | — | — | — | — | — | — |
| SEM-020 | planned | — | — | — | — | — | — | — |
| SEM-021 | planned | — | — | — | — | — | — | — |
| SEM-022 | planned | — | — | — | — | — | — | — |
| SEM-023 | planned | — | — | — | — | — | — | — |
| SEM-024 | planned | — | — | — | — | — | — | — |
| SEM-025 | planned | — | — | — | — | — | — | — |
| SEM-026 | planned | — | — | — | — | — | — | — |
| SEM-027 | planned | — | — | — | — | — | — | — |
| SEM-028 | planned | — | — | — | — | — | — | — |
| SEM-029 | planned | — | — | — | — | — | — | — |
| SEM-030 | planned | — | — | — | — | — | — | — |
| SEM-031 | planned | — | — | — | — | — | — | — |
| SEM-032 | planned | — | — | — | — | — | — | — |
| SEM-033 | planned | — | — | — | — | — | — | — |
| SEM-034 | planned | — | — | — | — | — | — | — |
| SEM-035 | planned | — | — | — | — | — | — | — |
| SEM-036 | planned | — | — | — | — | — | — | — |

## BOIL

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BOIL-001 | planned | — | — | — | — | — | — | — |
| BOIL-002 | planned | — | — | — | — | — | — | — |
| BOIL-003 | planned | — | — | — | — | — | — | — |
| BOIL-004 | planned | — | — | — | — | — | — | — |
| BOIL-005 | planned | — | — | — | — | — | — | — |
| BOIL-006 | planned | — | — | — | — | — | — | — |
| BOIL-007 | planned | — | — | — | — | — | — | — |
| BOIL-008 | planned | — | — | — | — | — | — | — |
| BOIL-009 | planned | — | — | — | — | — | — | — |
| BOIL-010 | planned | — | — | — | — | — | — | — |
| BOIL-011 | planned | — | — | — | — | — | — | — |
| BOIL-012 | planned | — | — | — | — | — | — | — |
| BOIL-013 | planned | — | — | — | — | — | — | — |
| BOIL-014 | planned | — | — | — | — | — | — | — |
| BOIL-015 | planned | — | — | — | — | — | — | — |
| BOIL-016 | planned | — | — | — | — | — | — | — |
| BOIL-017 | planned | — | — | — | — | — | — | — |
| BOIL-018 | planned | — | — | — | — | — | — | — |
| BOIL-019 | planned | — | — | — | — | — | — | — |
| BOIL-020 | planned | — | — | — | — | — | — | — |
| BOIL-021 | planned | — | — | — | — | — | — | — |
| BOIL-022 | planned | — | — | — | — | — | — | — |
| BOIL-023 | planned | — | — | — | — | — | — | — |
| BOIL-024 | planned | — | — | — | — | — | — | — |
| BOIL-025 | planned | — | — | — | — | — | — | — |
| BOIL-026 | planned | — | — | — | — | — | — | — |
| BOIL-027 | planned | — | — | — | — | — | — | — |
| BOIL-028 | planned | — | — | — | — | — | — | — |
| BOIL-029 | planned | — | — | — | — | — | — | — |
| BOIL-030 | planned | — | — | — | — | — | — | — |

## CTRL

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CTRL-001 | planned | — | — | — | — | — | — | — |
| CTRL-002 | planned | — | — | — | — | — | — | — |
| CTRL-003 | planned | — | — | — | — | — | — | — |
| CTRL-004 | planned | — | — | — | — | — | — | — |
| CTRL-005 | planned | — | — | — | — | — | — | — |
| CTRL-006 | planned | — | — | — | — | — | — | — |
| CTRL-007 | planned | — | — | — | — | — | — | — |
| CTRL-008 | planned | — | — | — | — | — | — | — |
| CTRL-009 | planned | — | — | — | — | — | — | — |
| CTRL-010 | planned | — | — | — | — | — | — | — |
| CTRL-011 | planned | — | — | — | — | — | — | — |
| CTRL-012 | planned | — | — | — | — | — | — | — |
| CTRL-013 | planned | — | — | — | — | — | — | — |
| CTRL-014 | planned | — | — | — | — | — | — | — |
| CTRL-015 | planned | — | — | — | — | — | — | — |
| CTRL-016 | planned | — | — | — | — | — | — | — |
| CTRL-017 | planned | — | — | — | — | — | — | — |
| CTRL-018 | planned | — | — | — | — | — | — | — |
| CTRL-019 | planned | — | — | — | — | — | — | — |
| CTRL-020 | planned | — | — | — | — | — | — | — |
| CTRL-021 | planned | — | — | — | — | — | — | — |
| CTRL-022 | planned | — | — | — | — | — | — | — |
| CTRL-023 | planned | — | — | — | — | — | — | — |
| CTRL-024 | planned | — | — | — | — | — | — | — |
| CTRL-025 | planned | — | — | — | — | — | — | — |
| CTRL-026 | planned | — | — | — | — | — | — | — |
| CTRL-027 | planned | — | — | — | — | — | — | — |
| CTRL-028 | planned | — | — | — | — | — | — | — |
| CTRL-029 | planned | — | — | — | — | — | — | — |
| CTRL-030 | planned | — | — | — | — | — | — | — |
| CTRL-031 | planned | — | — | — | — | — | — | — |
| CTRL-032 | planned | — | — | — | — | — | — | — |
| CTRL-033 | planned | — | — | — | — | — | — | — |
| CTRL-034 | planned | — | — | — | — | — | — | — |
| CTRL-035 | planned | — | — | — | — | — | — | — |

## LINK

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| LINK-001 | planned | — | — | — | — | — | — | — |
| LINK-002 | planned | — | — | — | — | — | — | — |
| LINK-003 | planned | — | — | — | — | — | — | — |
| LINK-004 | planned | — | — | — | — | — | — | — |
| LINK-005 | planned | — | — | — | — | — | — | — |
| LINK-006 | planned | — | — | — | — | — | — | — |
| LINK-007 | planned | — | — | — | — | — | — | — |
| LINK-008 | planned | — | — | — | — | — | — | — |
| LINK-009 | planned | — | — | — | — | — | — | — |
| LINK-010 | planned | — | — | — | — | — | — | — |
| LINK-011 | planned | — | — | — | — | — | — | — |
| LINK-012 | planned | — | — | — | — | — | — | — |
| LINK-013 | planned | — | — | — | — | — | — | — |
| LINK-014 | planned | — | — | — | — | — | — | — |
| LINK-015 | planned | — | — | — | — | — | — | — |
| LINK-016 | planned | — | — | — | — | — | — | — |
| LINK-017 | planned | — | — | — | — | — | — | — |
| LINK-018 | planned | — | — | — | — | — | — | — |
| LINK-019 | planned | — | — | — | — | — | — | — |
| LINK-020 | planned | — | — | — | — | — | — | — |
| LINK-021 | planned | — | — | — | — | — | — | — |
| LINK-022 | planned | — | — | — | — | — | — | — |
| LINK-023 | planned | — | — | — | — | — | — | — |
| LINK-024 | planned | — | — | — | — | — | — | — |
| LINK-025 | planned | — | — | — | — | — | — | — |
| LINK-026 | planned | — | — | — | — | — | — | — |
| LINK-027 | planned | — | — | — | — | — | — | — |
| LINK-028 | planned | — | — | — | — | — | — | — |
| LINK-029 | planned | — | — | — | — | — | — | — |
| LINK-030 | planned | — | — | — | — | — | — | — |
| LINK-031 | planned | — | — | — | — | — | — | — |
| LINK-032 | planned | — | — | — | — | — | — | — |
| LINK-033 | planned | — | — | — | — | — | — | — |

## IMG

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| IMG-001 | planned | — | — | — | — | — | — | — |
| IMG-002 | planned | — | — | — | — | — | — | — |
| IMG-003 | planned | — | — | — | — | — | — | — |
| IMG-004 | planned | — | — | — | — | — | — | — |
| IMG-005 | planned | — | — | — | — | — | — | — |
| IMG-006 | planned | — | — | — | — | — | — | — |
| IMG-007 | planned | — | — | — | — | — | — | — |
| IMG-008 | planned | — | — | — | — | — | — | — |
| IMG-009 | planned | — | — | — | — | — | — | — |
| IMG-010 | planned | — | — | — | — | — | — | — |
| IMG-011 | planned | — | — | — | — | — | — | — |
| IMG-012 | planned | — | — | — | — | — | — | — |
| IMG-013 | planned | — | — | — | — | — | — | — |
| IMG-014 | planned | — | — | — | — | — | — | — |
| IMG-015 | planned | — | — | — | — | — | — | — |
| IMG-016 | planned | — | — | — | — | — | — | — |
| IMG-017 | planned | — | — | — | — | — | — | — |
| IMG-018 | planned | — | — | — | — | — | — | — |
| IMG-019 | planned | — | — | — | — | — | — | — |
| IMG-020 | planned | — | — | — | — | — | — | — |
| IMG-021 | planned | — | — | — | — | — | — | — |

## FRAME

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FRAME-001 | planned | — | — | — | — | — | — | — |
| FRAME-002 | planned | — | — | — | — | — | — | — |
| FRAME-003 | planned | — | — | — | — | — | — | — |
| FRAME-004 | planned | — | — | — | — | — | — | — |
| FRAME-005 | planned | — | — | — | — | — | — | — |
| FRAME-006 | planned | — | — | — | — | — | — | — |
| FRAME-007 | planned | — | — | — | — | — | — | — |
| FRAME-008 | planned | — | — | — | — | — | — | — |

## TABLE

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TABLE-001 | planned | — | — | — | — | — | — | — |
| TABLE-002 | planned | — | — | — | — | — | — | — |
| TABLE-003 | planned | — | — | — | — | — | — | — |
| TABLE-004 | planned | — | — | — | — | — | — | — |
| TABLE-005 | planned | — | — | — | — | — | — | — |
| TABLE-006 | planned | — | — | — | — | — | — | — |
| TABLE-007 | planned | — | — | — | — | — | — | — |
| TABLE-008 | planned | — | — | — | — | — | — | — |
| TABLE-009 | planned | — | — | — | — | — | — | — |
| TABLE-010 | planned | — | — | — | — | — | — | — |
| TABLE-011 | planned | — | — | — | — | — | — | — |
| TABLE-012 | planned | — | — | — | — | — | — | — |
| TABLE-013 | planned | — | — | — | — | — | — | — |
| TABLE-014 | planned | — | — | — | — | — | — | — |

## HEAD

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| HEAD-001 | planned | — | — | — | — | — | — | — |
| HEAD-002 | planned | — | — | — | — | — | — | — |
| HEAD-003 | planned | — | — | — | — | — | — | — |
| HEAD-004 | planned | — | — | — | — | — | — | — |
| HEAD-005 | planned | — | — | — | — | — | — | — |
| HEAD-006 | planned | — | — | — | — | — | — | — |
| HEAD-007 | planned | — | — | — | — | — | — | — |
| HEAD-008 | planned | — | — | — | — | — | — | — |
| HEAD-009 | planned | — | — | — | — | — | — | — |
| HEAD-010 | planned | — | — | — | — | — | — | — |
| HEAD-011 | planned | — | — | — | — | — | — | — |
| HEAD-012 | planned | — | — | — | — | — | — | — |
| HEAD-013 | planned | — | — | — | — | — | — | — |
| HEAD-014 | planned | — | — | — | — | — | — | — |
| HEAD-015 | planned | — | — | — | — | — | — | — |
| HEAD-016 | planned | — | — | — | — | — | — | — |
| HEAD-017 | planned | — | — | — | — | — | — | — |

## JSONLD

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| JSONLD-001 | planned | — | — | — | — | — | — | — |
| JSONLD-002 | planned | — | — | — | — | — | — | — |
| JSONLD-003 | planned | — | — | — | — | — | — | — |
| JSONLD-004 | planned | — | — | — | — | — | — | — |
| JSONLD-005 | planned | — | — | — | — | — | — | — |
| JSONLD-006 | planned | — | — | — | — | — | — | — |
| JSONLD-007 | planned | — | — | — | — | — | — | — |
| JSONLD-008 | planned | — | — | — | — | — | — | — |
| JSONLD-009 | planned | — | — | — | — | — | — | — |
| JSONLD-010 | planned | — | — | — | — | — | — | — |
| JSONLD-011 | planned | — | — | — | — | — | — | — |
| JSONLD-012 | planned | — | — | — | — | — | — | — |
| JSONLD-013 | planned | — | — | — | — | — | — | — |
| JSONLD-014 | planned | — | — | — | — | — | — | — |
| JSONLD-015 | planned | — | — | — | — | — | — | — |
| JSONLD-016 | planned | — | — | — | — | — | — | — |
| JSONLD-017 | planned | — | — | — | — | — | — | — |
| JSONLD-018 | planned | — | — | — | — | — | — | — |
| JSONLD-019 | planned | — | — | — | — | — | — | — |
| JSONLD-020 | planned | — | — | — | — | — | — | — |
| JSONLD-021 | planned | — | — | — | — | — | — | — |
| JSONLD-022 | planned | — | — | — | — | — | — | — |
| JSONLD-023 | planned | — | — | — | — | — | — | — |
| JSONLD-024 | planned | — | — | — | — | — | — | — |
| JSONLD-025 | planned | — | — | — | — | — | — | — |
| JSONLD-026 | planned | — | — | — | — | — | — | — |
| JSONLD-027 | planned | — | — | — | — | — | — | — |
| JSONLD-028 | planned | — | — | — | — | — | — | — |
| JSONLD-029 | planned | — | — | — | — | — | — | — |
| JSONLD-030 | planned | — | — | — | — | — | — | — |
| JSONLD-031 | planned | — | — | — | — | — | — | — |
| JSONLD-032 | planned | — | — | — | — | — | — | — |
| JSONLD-033 | planned | — | — | — | — | — | — | — |
| JSONLD-034 | planned | — | — | — | — | — | — | — |
| JSONLD-035 | planned | — | — | — | — | — | — | — |
| JSONLD-036 | planned | — | — | — | — | — | — | — |
| JSONLD-037 | planned | — | — | — | — | — | — | — |
| JSONLD-038 | planned | — | — | — | — | — | — | — |
| JSONLD-039 | planned | — | — | — | — | — | — | — |
| JSONLD-040 | planned | — | — | — | — | — | — | — |
| JSONLD-041 | planned | — | — | — | — | — | — | — |
| JSONLD-042 | planned | — | — | — | — | — | — | — |
| JSONLD-043 | planned | — | — | — | — | — | — | — |
| JSONLD-044 | planned | — | — | — | — | — | — | — |
| JSONLD-045 | planned | — | — | — | — | — | — | — |
| JSONLD-046 | planned | — | — | — | — | — | — | — |
| JSONLD-047 | planned | — | — | — | — | — | — | — |
| JSONLD-048 | planned | — | — | — | — | — | — | — |
| JSONLD-049 | planned | — | — | — | — | — | — | — |
| JSONLD-050 | planned | — | — | — | — | — | — | — |
| JSONLD-051 | planned | — | — | — | — | — | — | — |
| JSONLD-052 | planned | — | — | — | — | — | — | — |
| JSONLD-053 | planned | — | — | — | — | — | — | — |
| JSONLD-054 | planned | — | — | — | — | — | — | — |
| JSONLD-055 | planned | — | — | — | — | — | — | — |
| JSONLD-056 | planned | — | — | — | — | — | — | — |
| JSONLD-057 | planned | — | — | — | — | — | — | — |
| JSONLD-058 | planned | — | — | — | — | — | — | — |
| JSONLD-059 | planned | — | — | — | — | — | — | — |
| JSONLD-060 | planned | — | — | — | — | — | — | — |
| JSONLD-061 | planned | — | — | — | — | — | — | — |
| JSONLD-062 | planned | — | — | — | — | — | — | — |
| JSONLD-063 | planned | — | — | — | — | — | — | — |
| JSONLD-064 | planned | — | — | — | — | — | — | — |
| JSONLD-065 | planned | — | — | — | — | — | — | — |
| JSONLD-066 | planned | — | — | — | — | — | — | — |
| JSONLD-067 | planned | — | — | — | — | — | — | — |
| JSONLD-068 | planned | — | — | — | — | — | — | — |
| JSONLD-069 | planned | — | — | — | — | — | — | — |
| JSONLD-070 | planned | — | — | — | — | — | — | — |
| JSONLD-071 | planned | — | — | — | — | — | — | — |
| JSONLD-072 | planned | — | — | — | — | — | — | — |
| JSONLD-073 | planned | — | — | — | — | — | — | — |
| JSONLD-074 | planned | — | — | — | — | — | — | — |
| JSONLD-075 | planned | — | — | — | — | — | — | — |
| JSONLD-076 | planned | — | — | — | — | — | — | — |
| JSONLD-077 | planned | — | — | — | — | — | — | — |
| JSONLD-078 | planned | — | — | — | — | — | — | — |
| JSONLD-079 | planned | — | — | — | — | — | — | — |

## ACTIVE

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ACTIVE-001 | planned | — | — | — | — | — | — | — |
| ACTIVE-002 | planned | — | — | — | — | — | — | — |
| ACTIVE-003 | planned | — | — | — | — | — | — | — |
| ACTIVE-004 | planned | — | — | — | — | — | — | — |
| ACTIVE-005 | planned | — | — | — | — | — | — | — |
| ACTIVE-006 | planned | — | — | — | — | — | — | — |
| ACTIVE-007 | planned | — | — | — | — | — | — | — |
| ACTIVE-008 | planned | — | — | — | — | — | — | — |
| ACTIVE-009 | planned | — | — | — | — | — | — | — |
| ACTIVE-010 | planned | — | — | — | — | — | — | — |
| ACTIVE-011 | planned | — | — | — | — | — | — | — |
| ACTIVE-012 | planned | — | — | — | — | — | — | — |
| ACTIVE-013 | planned | — | — | — | — | — | — | — |
| ACTIVE-014 | planned | — | — | — | — | — | — | — |
| ACTIVE-015 | planned | — | — | — | — | — | — | — |
| ACTIVE-016 | planned | — | — | — | — | — | — | — |
| ACTIVE-017 | planned | — | — | — | — | — | — | — |

## ORDER

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ORDER-001 | planned | — | — | — | — | — | — | — |
| ORDER-002 | planned | — | — | — | — | — | — | — |
| ORDER-003 | planned | — | — | — | — | — | — | — |
| ORDER-004 | planned | — | — | — | — | — | — | — |
| ORDER-005 | planned | — | — | — | — | — | — | — |
| ORDER-006 | planned | — | — | — | — | — | — | — |
| ORDER-007 | planned | — | — | — | — | — | — | — |
| ORDER-008 | planned | — | — | — | — | — | — | — |
| ORDER-009 | planned | — | — | — | — | — | — | — |

## DUP

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DUP-001 | planned | — | — | — | — | — | — | — |
| DUP-002 | planned | — | — | — | — | — | — | — |
| DUP-003 | planned | — | — | — | — | — | — | — |
| DUP-004 | planned | — | — | — | — | — | — | — |
| DUP-005 | planned | — | — | — | — | — | — | — |
| DUP-006 | planned | — | — | — | — | — | — | — |
| DUP-007 | planned | — | — | — | — | — | — | — |
| DUP-008 | planned | — | — | — | — | — | — | — |
| DUP-009 | planned | — | — | — | — | — | — | — |
| DUP-010 | planned | — | — | — | — | — | — | — |
| DUP-011 | planned | — | — | — | — | — | — | — |

## I18N

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| I18N-001 | planned | — | — | — | — | — | — | — |
| I18N-002 | planned | — | — | — | — | — | — | — |
| I18N-003 | planned | — | — | — | — | — | — | — |
| I18N-004 | planned | — | — | — | — | — | — | — |
| I18N-005 | planned | — | — | — | — | — | — | — |
| I18N-006 | planned | — | — | — | — | — | — | — |
| I18N-007 | planned | — | — | — | — | — | — | — |
| I18N-008 | planned | — | — | — | — | — | — | — |
| I18N-009 | planned | — | — | — | — | — | — | — |
| I18N-010 | planned | — | — | — | — | — | — | — |
| I18N-011 | planned | — | — | — | — | — | — | — |
| I18N-012 | planned | — | — | — | — | — | — | — |
| I18N-013 | planned | — | — | — | — | — | — | — |

## MAL

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MAL-001 | planned | — | — | — | — | — | — | — |
| MAL-002 | planned | — | — | — | — | — | — | — |
| MAL-003 | planned | — | — | — | — | — | — | — |
| MAL-004 | planned | — | — | — | — | — | — | — |
| MAL-005 | planned | — | — | — | — | — | — | — |
| MAL-006 | planned | — | — | — | — | — | — | — |
| MAL-007 | planned | — | — | — | — | — | — | — |
| MAL-008 | planned | — | — | — | — | — | — | — |
| MAL-009 | planned | — | — | — | — | — | — | — |
| MAL-010 | planned | — | — | — | — | — | — | — |
| MAL-011 | planned | — | — | — | — | — | — | — |
| MAL-012 | planned | — | — | — | — | — | — | — |

## SIZE

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SIZE-001 | planned | — | — | — | — | — | — | — |
| SIZE-002 | planned | — | — | — | — | — | — | — |
| SIZE-003 | planned | — | — | — | — | — | — | — |
| SIZE-004 | planned | — | — | — | — | — | — | — |
| SIZE-005 | planned | — | — | — | — | — | — | — |
| SIZE-006 | planned | — | — | — | — | — | — | — |
| SIZE-007 | planned | — | — | — | — | — | — | — |
| SIZE-008 | planned | — | — | — | — | — | — | — |
| SIZE-009 | planned | — | — | — | — | — | — | — |
| SIZE-010 | planned | — | — | — | — | — | — | — |
| SIZE-011 | planned | — | — | — | — | — | — | — |

## HTTP

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| HTTP-001 | planned | — | — | — | — | — | — | — |
| HTTP-002 | planned | — | — | — | — | — | — | — |
| HTTP-003 | planned | — | — | — | — | — | — | — |
| HTTP-004 | planned | — | — | — | — | — | — | — |
| HTTP-005 | planned | — | — | — | — | — | — | — |
| HTTP-006 | planned | — | — | — | — | — | — | — |
| HTTP-007 | planned | — | — | — | — | — | — | — |
| HTTP-008 | planned | — | — | — | — | — | — | — |
| HTTP-009 | planned | — | — | — | — | — | — | — |
| HTTP-010 | planned | — | — | — | — | — | — | — |
| HTTP-011 | planned | — | — | — | — | — | — | — |
| HTTP-012 | planned | — | — | — | — | — | — | — |
| HTTP-013 | planned | — | — | — | — | — | — | — |
| HTTP-014 | planned | — | — | — | — | — | — | — |
| HTTP-015 | planned | — | — | — | — | — | — | — |
| HTTP-016 | planned | — | — | — | — | — | — | — |
| HTTP-017 | planned | — | — | — | — | — | — | — |
| HTTP-018 | planned | — | — | — | — | — | — | — |
| HTTP-019 | planned | — | — | — | — | — | — | — |
| HTTP-020 | planned | — | — | — | — | — | — | — |

## CRAWL

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CRAWL-001 | planned | — | — | — | — | — | — | — |
| CRAWL-002 | planned | — | — | — | — | — | — | — |
| CRAWL-003 | planned | — | — | — | — | — | — | — |
| CRAWL-004 | planned | — | — | — | — | — | — | — |
| CRAWL-005 | planned | — | — | — | — | — | — | — |
| CRAWL-006 | planned | — | — | — | — | — | — | — |
| CRAWL-007 | planned | — | — | — | — | — | — | — |
| CRAWL-008 | planned | — | — | — | — | — | — | — |
| CRAWL-009 | planned | — | — | — | — | — | — | — |
| CRAWL-010 | planned | — | — | — | — | — | — | — |
| CRAWL-011 | planned | — | — | — | — | — | — | — |

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

