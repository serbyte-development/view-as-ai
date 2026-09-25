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

## Campaign checkpoint: 2026-09-24

Campaign status: `active`. Production is verified at
`b8151082d794b71bc4b1a54f6b1eb6195ee86a36`, scenario `default`.

The initial native-access attempts were blocked, but a later Work Mode capture successfully opened
the exact public baseline and calibration routes. Baseline pipeline validation is therefore
unblocked: native output, paired public origin, View as AI output, diff, and capture metadata were
all persisted successfully.

- Baseline attempt: `captures/2026-09-24-baseline-b815108/`.
- Baseline retry: `captures/2026-09-24-baseline-b815108-retry-1/`.
- Access controls and finding: `captures/2026-09-24-native-access-diagnostics-b815108/finding.md`.
- Successful baseline: `captures/2026-09-24-baseline-b815108-turn-1/`.
- Kitchen sink: `captures/2026-09-24-kitchen-sink-b815108-turn-1/`.
- Isolated visibility: `VIS-031..VIS-038` under matching
  `captures/2026-09-24-visibility-*-b815108-turn-1/` directories.
- Original returned batch source: `capture/turn-1.md`.
- Native evidence now exists for 433 of 531 calibration IDs: 205 `verified`, 56 `mismatch`,
  and 172 `captured`. 87 default-deployment IDs remain
  `deployed` without native evidence, and the 11 `SITE-*` IDs remain `planned`.

Continue with the remaining default-deployment capture units, beginning at `ACTIVE-009`.

## TEXT

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TEXT-001 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-002 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-003 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-004 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-005 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Native and parser outputs captured; case-specific interpretation pending. |
| TEXT-006 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-007 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-008 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-009 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-010 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-011 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-012 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-013 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-014 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-015 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-016 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-017 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-018 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-019 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-020 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-021 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-022 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-023 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-024 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| TEXT-025 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-026 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-027 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-028 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-029 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-030 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TEXT-031 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Native and parser outputs captured; case-specific interpretation pending. |
| TEXT-032 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Native and parser outputs captured; case-specific interpretation pending. |
| TEXT-033 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |

## VIS

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| VIS-001 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-002 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-003 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-004 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-005 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-006 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-007 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-008 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-009 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-010 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-011 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-012 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-013 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-014 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-015 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-016 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-017 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-018 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-019 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-020 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| VIS-021 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-022 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-023 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-024 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-025 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-026 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-027 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-028 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| VIS-029 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| VIS-030 | deployed | https://view-as-ai.vercel.app/experiments/visibility/VIS-030/ | — | — | — | — | — | — |
| VIS-031 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-031/ | present | present | yes | captures/2026-09-24-visibility-vis-031-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-032 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-032/ | present | present | yes | captures/2026-09-24-visibility-vis-032-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-033 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-033/ | present | present | yes | captures/2026-09-24-visibility-vis-033-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-034 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-034/ | present | present | yes | captures/2026-09-24-visibility-vis-034-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-035 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-035/ | present | present | yes | captures/2026-09-24-visibility-vis-035-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-036 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-036/ | present | present | yes | captures/2026-09-24-visibility-vis-036-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-037 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-037/ | present | present | yes | captures/2026-09-24-visibility-vis-037-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-038 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-038/ | present | present | yes | captures/2026-09-24-visibility-vis-038-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-039 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-039/ | present | present | yes | captures/2026-09-24-visibility-vis-039-b815108-turn-2/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-040 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-040/ | present | present | yes | captures/2026-09-24-visibility-vis-040-b815108-turn-2/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-041 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-041/ | present | present | yes | captures/2026-09-24-visibility-vis-041-b815108-turn-2/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-042 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-042/ | present | present | yes | captures/2026-09-24-visibility-vis-042-b815108-turn-2/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-043 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-043/ | present | present | yes | captures/2026-09-24-visibility-vis-043-b815108-turn-2/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-044 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-044/ | present | present | yes | captures/2026-09-24-visibility-vis-044-b815108-turn-2/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-045 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-045/ | present | present | yes | captures/2026-09-24-visibility-vis-045-b815108-turn-2/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-046 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-046/ | present | present | yes | captures/2026-09-24-visibility-vis-046-b815108-turn-2/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-047 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-047/ | present | present | yes | captures/2026-09-24-visibility-vis-047-b815108-turn-2/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-048 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-048/ | present | present | yes | captures/2026-09-24-visibility-vis-048-b815108-turn-2/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-049 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-049/ | present | present | yes | captures/2026-09-24-visibility-vis-049-b815108-turn-3/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-050 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-050/ | present | present | yes | captures/2026-09-24-visibility-vis-050-b815108-turn-3/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-051 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-051/ | present | present | yes | captures/2026-09-24-visibility-vis-051-b815108-turn-3/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-052 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-052/ | present | present | yes | captures/2026-09-24-visibility-vis-052-b815108-turn-3/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-053 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-053/ | present | present | yes | captures/2026-09-24-visibility-vis-053-b815108-turn-3/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-054 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-054/ | present | present | yes | captures/2026-09-24-visibility-vis-054-b815108-turn-3/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-055 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-055/ | present | present | yes | captures/2026-09-24-visibility-vis-055-b815108-turn-3/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-056 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-056/ | present | present | yes | captures/2026-09-24-visibility-vis-056-b815108-turn-3/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-057 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-057/ | present | present | yes | captures/2026-09-24-visibility-vis-057-b815108-turn-3/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-058 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-058/ | present | present | yes | captures/2026-09-24-visibility-vis-058-b815108-turn-3/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-059 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-059/ | present | present | yes | captures/2026-09-24-visibility-vis-059-b815108-turn-4/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-060 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-060/ | present | present | yes | captures/2026-09-24-visibility-vis-060-b815108-turn-4/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-061 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-061/ | present | present | yes | captures/2026-09-24-visibility-vis-061-b815108-turn-4/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-062 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-062/ | present | present | yes | captures/2026-09-24-visibility-vis-062-b815108-turn-4/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-063 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-063/ | present | present | yes | captures/2026-09-24-visibility-vis-063-b815108-turn-4/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-064 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-064/ | present | present | yes | captures/2026-09-24-visibility-vis-064-b815108-turn-4/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-065 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-065/ | present | present | yes | captures/2026-09-24-visibility-vis-065-b815108-turn-4/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-066 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-066/ | present | present | yes | captures/2026-09-24-visibility-vis-066-b815108-turn-4/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-067 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-067/ | present | present | yes | captures/2026-09-24-visibility-vis-067-b815108-turn-4/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-068 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-068/ | present | present | yes | captures/2026-09-24-visibility-vis-068-b815108-turn-4/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-069 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-069/ | present | present | yes | captures/2026-09-24-visibility-vis-069-b815108-turn-5/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-070 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-070/ | present | present | yes | captures/2026-09-24-visibility-vis-070-b815108-turn-5/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-071 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-071/ | present | present | yes | captures/2026-09-24-visibility-vis-071-b815108-turn-5/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-072 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-072/ | present | present | yes | captures/2026-09-24-visibility-vis-072-b815108-turn-5/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-073 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-073/ | present | present | yes | captures/2026-09-24-visibility-vis-073-b815108-turn-5/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-074 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-074/ | present | present | yes | captures/2026-09-24-visibility-vis-074-b815108-turn-5/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-075 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-075/ | present | present | yes | captures/2026-09-24-visibility-vis-075-b815108-turn-5/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-076 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-076/ | present | present | yes | captures/2026-09-24-visibility-vis-076-b815108-turn-5/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-077 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-077/ | present | present | yes | captures/2026-09-24-visibility-vis-077-b815108-turn-5/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-078 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-078/ | present | present | yes | captures/2026-09-24-visibility-vis-078-b815108-turn-5/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-079 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-079/ | present | present | yes | captures/2026-09-24-visibility-vis-079-b815108-turn-6/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-080 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-080/ | present | present | yes | captures/2026-09-24-visibility-vis-080-b815108-turn-6/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-081 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-081/ | present | present | yes | captures/2026-09-24-visibility-vis-081-b815108-turn-6/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-082 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-082/ | present | present | yes | captures/2026-09-24-visibility-vis-082-b815108-turn-6/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-083 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-083/ | present | present | yes | captures/2026-09-24-visibility-vis-083-b815108-turn-6/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-084 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-084/ | present | present | yes | captures/2026-09-24-visibility-vis-084-b815108-turn-6/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-085 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-085/ | present | present | yes | captures/2026-09-24-visibility-vis-085-b815108-turn-6/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-086 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-086/ | present | present | yes | captures/2026-09-24-visibility-vis-086-b815108-turn-6/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-087 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-087/ | present | present | yes | captures/2026-09-24-visibility-vis-087-b815108-turn-6/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-088 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-088/ | present | present | yes | captures/2026-09-24-visibility-vis-088-b815108-turn-6/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-089 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-089/ | present | present | yes | captures/2026-09-24-visibility-vis-089-b815108-turn-7/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-090 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-090/ | present | present | yes | captures/2026-09-24-visibility-vis-090-b815108-turn-7/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-091 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-091/ | present | present | yes | captures/2026-09-24-visibility-vis-091-b815108-turn-7/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-092 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-092/ | present | present | yes | captures/2026-09-24-visibility-vis-092-b815108-turn-7/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-093 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-093/ | present | present | yes | captures/2026-09-24-visibility-vis-093-b815108-turn-7/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-094 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-094/ | present | present | yes | captures/2026-09-24-visibility-vis-094-b815108-turn-7/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-095 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-095/ | present | present | yes | captures/2026-09-24-visibility-vis-095-b815108-turn-7/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-096 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-096/ | present | present | yes | captures/2026-09-24-visibility-vis-096-b815108-turn-7/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-097 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-097/#target | present | present | yes | captures/2026-09-24-visibility-vis-097-target-b815108-turn-8/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-098 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-098/ | present | present | yes | captures/2026-09-24-visibility-vis-098-b815108-turn-7/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-099 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-099/ | present | present | yes | captures/2026-09-24-visibility-vis-099-b815108-turn-8/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-100 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-100/ | present | present | yes | captures/2026-09-24-visibility-vis-100-b815108-turn-8/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-101 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-101/ | present | present | yes | captures/2026-09-24-visibility-vis-101-b815108-turn-8/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-102 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-102/ | present | present | yes | captures/2026-09-24-visibility-vis-102-b815108-turn-8/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-103 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-103/ | present | present | yes | captures/2026-09-24-visibility-vis-103-b815108-turn-8/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-104 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-104/ | present | present | yes | captures/2026-09-24-visibility-vis-104-b815108-turn-8/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-105 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-105/ | present | present | yes | captures/2026-09-24-visibility-vis-105-b815108-turn-8/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-106 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-106/ | present | present | yes | captures/2026-09-24-visibility-vis-106-b815108-turn-8/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-107 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-107/ | present | present | yes | captures/2026-09-24-visibility-vis-107-b815108-turn-8/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-108 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-108/ | present | present | yes | captures/2026-09-24-visibility-vis-108-b815108-turn-9/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-109 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-109/ | present | present | yes | captures/2026-09-24-visibility-vis-109-b815108-turn-9/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |
| VIS-110 | verified | https://view-as-ai.vercel.app/experiments/visibility/VIS-110/ | present | present | yes | captures/2026-09-24-visibility-vis-110-b815108-turn-9/ | 2026-09-24 @ b815108 | Primary sentinel is exposed by both native web and View as AI. |

## SEM

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SEM-001 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-002 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-003 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-004 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-005 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-006 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-007 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-008 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-009 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-010 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-011 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-012 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-013 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-014 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-015 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-016 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| SEM-017 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-018 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-019 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-020 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-021 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-022 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-023 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-024 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-025 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-026 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-027 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-028 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-029 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-030 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| SEM-031 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-032 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-033 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-034 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-035 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| SEM-036 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |

## BOIL

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BOIL-001 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-001/ | present | present | yes | captures/2026-09-24-experiments-boilerplate-boil-001-b815108-turn-9/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-002 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-002/ | absent | absent | yes | captures/2026-09-24-experiments-boilerplate-boil-002-b815108-turn-9/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-003 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-003/ | present | present | yes | captures/2026-09-24-experiments-boilerplate-boil-003-b815108-turn-9/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-004 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-004/ | present | present | yes | captures/2026-09-24-experiments-boilerplate-boil-004-b815108-turn-9/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-005 | mismatch | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-005/ | present | absent | no | captures/2026-09-24-experiments-boilerplate-boil-005-b815108-turn-9/ | 2026-09-24 @ b815108 | Primary-sentinel exposure differs between native web and View as AI. |
| BOIL-006 | mismatch | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-006/ | present | absent | no | captures/2026-09-24-experiments-boilerplate-boil-006-b815108-turn-9/ | 2026-09-24 @ b815108 | Primary-sentinel exposure differs between native web and View as AI. |
| BOIL-007 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-007/ | absent | absent | yes | captures/2026-09-24-experiments-boilerplate-boil-007-b815108-turn-9/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-008 | mismatch | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-008/ | present | absent | no | captures/2026-09-24-experiments-boilerplate-boil-008-b815108-turn-10/ | 2026-09-24 @ b815108 | Primary-sentinel exposure differs between native web and View as AI. |
| BOIL-009 | mismatch | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-009/ | present | absent | no | captures/2026-09-24-experiments-boilerplate-boil-009-b815108-turn-10/ | 2026-09-24 @ b815108 | Primary-sentinel exposure differs between native web and View as AI. |
| BOIL-010 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-010/ | absent | absent | yes | captures/2026-09-24-experiments-boilerplate-boil-010-b815108-turn-10/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-011 | mismatch | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-011/ | absent | present | no | captures/2026-09-24-experiments-boilerplate-boil-011-b815108-turn-10/ | 2026-09-24 @ b815108 | Primary-sentinel exposure differs between native web and View as AI. |
| BOIL-012 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-012/ | absent | absent | yes | captures/2026-09-24-experiments-boilerplate-boil-012-b815108-turn-10/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-013 | mismatch | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-013/ | absent | present | no | captures/2026-09-24-experiments-boilerplate-boil-013-b815108-turn-10/ | 2026-09-24 @ b815108 | Primary-sentinel exposure differs between native web and View as AI. |
| BOIL-014 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-014/ | present | present | yes | captures/2026-09-24-experiments-boilerplate-boil-014-b815108-turn-10/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-015 | mismatch | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-015/ | absent | present | no | captures/2026-09-24-experiments-boilerplate-boil-015-b815108-turn-10/ | 2026-09-24 @ b815108 | Primary-sentinel exposure differs between native web and View as AI. |
| BOIL-016 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-016/ | absent | absent | yes | captures/2026-09-24-experiments-boilerplate-boil-016-b815108-turn-10/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-017 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-017/ | absent | absent | yes | captures/2026-09-24-experiments-boilerplate-boil-017-b815108-turn-10/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-018 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-018/ | absent | absent | yes | captures/2026-09-24-experiments-boilerplate-boil-018-b815108-turn-11/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-019 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-019/ | present | present | yes | captures/2026-09-24-experiments-boilerplate-boil-019-b815108-turn-11/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-020 | mismatch | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-020/ | present | absent | no | captures/2026-09-24-experiments-boilerplate-boil-020-b815108-turn-11/ | 2026-09-24 @ b815108 | Primary-sentinel exposure differs between native web and View as AI. |
| BOIL-021 | mismatch | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-021/ | present | absent | no | captures/2026-09-24-experiments-boilerplate-boil-021-b815108-turn-11/ | 2026-09-24 @ b815108 | Primary-sentinel exposure differs between native web and View as AI. |
| BOIL-022 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-022/ | present | present | yes | captures/2026-09-24-experiments-boilerplate-boil-022-b815108-turn-11/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-023 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-023/ | present | present | yes | captures/2026-09-24-experiments-boilerplate-boil-023-b815108-turn-11/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-024 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-024/ | present | present | yes | captures/2026-09-24-experiments-boilerplate-boil-024-b815108-turn-11/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-025 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-025/ | present | present | yes | captures/2026-09-24-experiments-boilerplate-boil-025-b815108-turn-11/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-026 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-026/ | present | present | yes | captures/2026-09-24-experiments-boilerplate-boil-026-b815108-turn-11/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-027 | mismatch | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-027/ | absent | present | no | captures/2026-09-24-experiments-boilerplate-boil-027-b815108-turn-11/ | 2026-09-24 @ b815108 | Primary-sentinel exposure differs between native web and View as AI. |
| BOIL-028 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-028/ | present | present | yes | captures/2026-09-24-experiments-boilerplate-boil-028-b815108-turn-12/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-029 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-029/ | present | present | yes | captures/2026-09-24-experiments-boilerplate-boil-029-b815108-turn-12/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |
| BOIL-030 | verified | https://view-as-ai.vercel.app/experiments/boilerplate/BOIL-030/ | present | present | yes | captures/2026-09-24-experiments-boilerplate-boil-030-b815108-turn-12/ | 2026-09-24 @ b815108 | Primary-sentinel exposure matches native web. |

## CTRL

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CTRL-001 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-002 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-003 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-004 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-005 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-006 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-007 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-008 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-009 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-010 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-011 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-012 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-013 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-014 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-015 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-016 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-017 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-018 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-019 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-020 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-021 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-022 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-023 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| CTRL-024 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-025 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-026 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-027 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-028 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-029 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-030 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-031 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-032 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-033 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-034 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| CTRL-035 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |

## LINK

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| LINK-001 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-002 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-003 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-004 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-005 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-006 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-007 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| LINK-008 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| LINK-009 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-010 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-011 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-012 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-013 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-014 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-015 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Native and parser outputs captured; case-specific interpretation pending. |
| LINK-016 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| LINK-017 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| LINK-018 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-019 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| LINK-020 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| LINK-021 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| LINK-022 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-023 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| LINK-024 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| LINK-025 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| LINK-026 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-027 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-028 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-029 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-030 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| LINK-031 | deployed | https://view-as-ai.vercel.app/experiments/link/LINK-031/ | — | — | — | — | — | — |
| LINK-032 | deployed | https://view-as-ai.vercel.app/experiments/link/LINK-032/ | — | — | — | — | — | — |
| LINK-033 | deployed | https://view-as-ai.vercel.app/experiments/link/LINK-033/ | — | — | — | — | — | — |

## IMG

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| IMG-001 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-002 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-003 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-004 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Native and parser outputs captured; case-specific interpretation pending. |
| IMG-005 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Native and parser outputs captured; case-specific interpretation pending. |
| IMG-006 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-007 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-008 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-009 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-010 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-011 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-012 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Native and parser outputs captured; case-specific interpretation pending. |
| IMG-013 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-014 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-015 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-016 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-017 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| IMG-018 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| IMG-019 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| IMG-020 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| IMG-021 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |

## FRAME

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FRAME-001 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| FRAME-002 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | — | — | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Native and parser outputs captured; case-specific interpretation pending. |
| FRAME-003 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| FRAME-004 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | absent | absent | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| FRAME-005 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| FRAME-006 | verified | https://view-as-ai.vercel.app/experiments/frame/FRAME-006/ | absent | absent | yes | captures/2026-09-24-experiments-frame-frame-006-b815108-turn-12/ | 2026-09-24 @ b815108 | Same-origin iframe child sentinel is not inlined by either native web or View as AI. |
| FRAME-007 | verified | https://view-as-ai.vercel.app/experiments/frame/FRAME-007/ | present | present | yes | captures/2026-09-24-experiments-frame-frame-007-b815108-turn-12/ | 2026-09-24 @ b815108 | Object fallback sentinel is exposed by both native web and View as AI. |
| FRAME-008 | verified | https://view-as-ai.vercel.app/experiments/frame/FRAME-008/ | absent | absent | yes | captures/2026-09-24-experiments-frame-frame-008-b815108-turn-12/ | 2026-09-24 @ b815108 | Embedded target sentinel is not inlined by either native web or View as AI. |

## TABLE

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TABLE-001 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TABLE-002 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TABLE-003 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TABLE-004 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TABLE-005 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TABLE-006 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TABLE-007 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TABLE-008 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TABLE-009 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TABLE-010 | mismatch | https://view-as-ai.vercel.app/kitchen-sink/ | absent | present | no | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary sentinel differs between native web and View as AI. |
| TABLE-011 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TABLE-012 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TABLE-013 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| TABLE-014 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |

## HEAD

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| HEAD-001 | mismatch | https://view-as-ai.vercel.app/experiments/head/HEAD-001/ | present | absent | no | captures/2026-09-24-experiments-head-head-001-b815108-turn-12/ | 2026-09-24 @ b815108 | Native web exposes the document-title sentinel; View as AI drops it. |
| HEAD-002 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-002/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-002-b815108-turn-12/ | 2026-09-24 @ b815108 | Title is absent in both native web and View as AI output. |
| HEAD-003 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-003/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-003-b815108-turn-12/ | 2026-09-24 @ b815108 | Meta-description sentinel is omitted by both native web and View as AI. |
| HEAD-004 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-004/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-004-b815108-turn-12/ | 2026-09-24 @ b815108 | Meta-keywords sentinel is omitted by both native web and View as AI. |
| HEAD-005 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-005/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-005-b815108-turn-13/ | 2026-09-24 @ b815108 | Meta-author sentinel is omitted by both native web and View as AI. |
| HEAD-006 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-006/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-006-b815108-turn-13/ | 2026-09-24 @ b815108 | Canonical-link sentinel is omitted by both native web and View as AI. |
| HEAD-007 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-007/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-007-b815108-turn-13/ | 2026-09-24 @ b815108 | Robots index/follow metadata is not surfaced by either output. |
| HEAD-008 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-008/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-008-b815108-turn-13/ | 2026-09-24 @ b815108 | Robots noindex metadata is not surfaced by either direct-open output. |
| HEAD-009 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-009/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-009-b815108-turn-13/ | 2026-09-24 @ b815108 | Robots nofollow metadata is not surfaced by either direct-open output. |
| HEAD-010 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-010/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-010-b815108-turn-13/ | 2026-09-24 @ b815108 | Open Graph sentinel is omitted by both native web and View as AI. |
| HEAD-011 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-011/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-011-b815108-turn-13/ | 2026-09-24 @ b815108 | Twitter-card sentinel is omitted by both native web and View as AI. |
| HEAD-012 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-012/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-012-b815108-turn-13/ | 2026-09-24 @ b815108 | JSON-LD smoke-test sentinel is omitted by both native web and View as AI. |
| HEAD-013 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-013/ | present | present | yes | captures/2026-09-24-experiments-head-head-013-b815108-turn-13/ | 2026-09-24 @ b815108 | Microdata body sentinel is exposed by both native web and View as AI. |
| HEAD-014 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-014/ | present | present | yes | captures/2026-09-24-experiments-head-head-014-b815108-turn-13/ | 2026-09-24 @ b815108 | RDFa body sentinel is exposed by both native web and View as AI. |
| HEAD-015 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-015/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-015-b815108-turn-14/ | 2026-09-24 @ b815108 | Alternate-language link sentinel is omitted by both native web and View as AI. |
| HEAD-016 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-016/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-016-b815108-turn-14/ | 2026-09-24 @ b815108 | Icon metadata sentinel is omitted by both native web and View as AI. |
| HEAD-017 | verified | https://view-as-ai.vercel.app/experiments/head/HEAD-017/ | absent | absent | yes | captures/2026-09-24-experiments-head-head-017-b815108-turn-14/ | 2026-09-24 @ b815108 | Meta-refresh sentinel is omitted and the direct-open page remains the same in both outputs. |

## JSONLD

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| JSONLD-001 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-001/ | present | present | yes | captures/2026-09-24-experiments-jsonld-jsonld-001-b815108-turn-14/ | 2026-09-24 @ b815108 | Visible body control is exposed by both native web and View as AI. |
| JSONLD-002 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-002/ | absent | absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-002-b815108-turn-14/ | 2026-09-24 @ b815108 | JSON-LD-only sentinel is omitted by both native web and View as AI. |
| JSONLD-003 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-003/ | absent | absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-003-b815108-turn-14/ | 2026-09-24 @ b815108 | application/json script sentinel is omitted by both native web and View as AI. |
| JSONLD-004 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-004/ | absent | absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-004-b815108-turn-14/ | 2026-09-24 @ b815108 | Executable-script string sentinel is omitted by both native web and View as AI. |
| JSONLD-005 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-005/ | absent | absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-005-b815108-turn-14/ | 2026-09-24 @ b815108 | Head JSON-LD sentinel is omitted by both native web and View as AI. |
| JSONLD-006 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-006/ | absent | absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-006-b815108-turn-14/ | 2026-09-24 @ b815108 | Body JSON-LD sentinel is omitted by both native web and View as AI. |
| JSONLD-007 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-007/ | absent | absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-007-b815108-turn-14/ | 2026-09-24 @ b815108 | Both JSON-LD block sentinels are omitted by native web and View as AI. |
| JSONLD-008 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-008/ | JSON-LD absent | JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-008-b815108-turn-15/ | 2026-09-24 @ b815108 | JSON-LD-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-009 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-009/ | JSON-LD absent | JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-009-b815108-turn-15/ | 2026-09-24 @ b815108 | JSON-LD-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-010 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-010/ | JSON-LD absent | JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-010-b815108-turn-15/ | 2026-09-24 @ b815108 | JSON-LD-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-011 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-011/ | JSON-LD absent | JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-011-b815108-turn-15/ | 2026-09-24 @ b815108 | JSON-LD-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-012 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-012/ | JSON-LD absent | JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-012-b815108-turn-15/ | 2026-09-24 @ b815108 | JSON-LD-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-013 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-013/ | JSON-LD absent | JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-013-b815108-turn-15/ | 2026-09-24 @ b815108 | JSON-LD-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-014 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-014/ | JSON-LD absent | JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-014-b815108-turn-15/ | 2026-09-24 @ b815108 | JSON-LD-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-015 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-015/ | JSON-LD absent | JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-015-b815108-turn-15/ | 2026-09-24 @ b815108 | JSON-LD-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-016 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-016/ | visible present; JSON-LD absent | visible present; JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-016-b815108-turn-15/ | 2026-09-24 @ b815108 | Visible control remains present and JSON-LD-only sentinel remains absent in both native web and View as AI. |
| JSONLD-017 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-017/ | visible present; JSON-LD absent | visible present; JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-017-b815108-turn-15/ | 2026-09-24 @ b815108 | Visible control remains present and JSON-LD-only sentinel remains absent in both native web and View as AI. |
| JSONLD-018 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-018/ | visible present; JSON-LD absent | visible present; JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-018-b815108-turn-16/ | 2026-09-24 @ b815108 | Visible control remains present and JSON-LD-only sentinel remains absent in both native web and View as AI. |
| JSONLD-019 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-019/ | visible present; JSON-LD absent | visible present; JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-019-b815108-turn-16/ | 2026-09-24 @ b815108 | Visible control remains present and JSON-LD-only sentinel remains absent in both native web and View as AI. |
| JSONLD-020 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-020/ | visible present; JSON-LD absent | visible present; JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-020-b815108-turn-16/ | 2026-09-24 @ b815108 | Visible control remains present and JSON-LD-only sentinel remains absent in both native web and View as AI. |
| JSONLD-021 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-021/ | visible present; JSON-LD absent | visible present; JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-021-b815108-turn-16/ | 2026-09-24 @ b815108 | Visible control remains present and JSON-LD-only sentinel remains absent in both native web and View as AI. |
| JSONLD-022 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-022/ | visible present; JSON-LD absent | visible present; JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-022-b815108-turn-16/ | 2026-09-24 @ b815108 | Visible control remains present and JSON-LD-only sentinel remains absent in both native web and View as AI. |
| JSONLD-023 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-023/ | visible present; JSON-LD absent | visible present; JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-023-b815108-turn-16/ | 2026-09-24 @ b815108 | Visible control remains present and JSON-LD-only sentinel remains absent in both native web and View as AI. |
| JSONLD-024 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-024/ | visible present; JSON-LD absent | visible present; JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-024-b815108-turn-16/ | 2026-09-24 @ b815108 | Visible control remains present and JSON-LD-only sentinel remains absent in both native web and View as AI. |
| JSONLD-025 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-025/ | visible present; JSON-LD absent | visible present; JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-025-b815108-turn-16/ | 2026-09-24 @ b815108 | Visible control remains present and JSON-LD-only sentinel remains absent in both native web and View as AI. |
| JSONLD-026 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-026/ | visible present; JSON-LD absent | visible present; JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-026-b815108-turn-16/ | 2026-09-24 @ b815108 | Visible control remains present and JSON-LD-only sentinel remains absent in both native web and View as AI. |
| JSONLD-027 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-027/ | visible present; JSON-LD absent | visible present; JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-027-b815108-turn-16/ | 2026-09-24 @ b815108 | Visible control remains present and JSON-LD-only sentinel remains absent in both native web and View as AI. |
| JSONLD-028 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-028/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-028-b815108-turn-17/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-029 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-029/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-029-b815108-turn-17/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-030 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-030/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-030-b815108-turn-17/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-031 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-031/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-031-b815108-turn-17/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-032 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-032/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-032-b815108-turn-17/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-033 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-033/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-033-b815108-turn-17/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-034 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-034/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-034-b815108-turn-17/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-035 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-035/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-035-b815108-turn-17/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-036 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-036/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-036-b815108-turn-17/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-037 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-037/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-037-b815108-turn-17/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-038 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-038/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-038-b815108-turn-18/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-039 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-039/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-039-b815108-turn-18/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-040 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-040/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-040-b815108-turn-18/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-041 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-041/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-041-b815108-turn-18/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-042 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-042/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-042-b815108-turn-18/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-043 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-043/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-043-b815108-turn-18/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-044 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-044/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-044-b815108-turn-18/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-045 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-045/ | JSON-LD absent | JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-045-b815108-turn-18/ | 2026-09-24 @ b815108 | JSON-LD-only sentinel is omitted by both native web and View as AI. |
| JSONLD-046 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-046/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-046-b815108-turn-18/ | 2026-09-24 @ b815108 | Configured visible and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-047 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-047/ | JSON-LD absent | JSON-LD absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-047-b815108-turn-18/ | 2026-09-24 @ b815108 | JSON-LD-only sentinel is omitted by both native web and View as AI. |
| JSONLD-048 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-048/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-048-b815108-turn-19/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-049 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-049/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-049-b815108-turn-19/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-050 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-050/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-050-b815108-turn-19/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-051 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-051/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-051-b815108-turn-19/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-052 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-052/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-052-b815108-turn-19/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-053 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-053/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-053-b815108-turn-19/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-054 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-054/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-054-b815108-turn-19/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-055 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-055/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-055-b815108-turn-19/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-056 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-056/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-056-b815108-turn-19/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-057 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-057/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-057-b815108-turn-19/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-058 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-058/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-058-b815108-turn-20/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-059 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-059/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-059-b815108-turn-20/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-060 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-060/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-060-b815108-turn-20/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-061 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-061/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-061-b815108-turn-20/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-062 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-062/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-062-b815108-turn-20/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-063 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-063/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-063-b815108-turn-20/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-064 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-064/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-064-b815108-turn-20/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-065 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-065/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-065-b815108-turn-20/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-066 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-066/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-066-b815108-turn-20/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-067 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-067/ | structured-only absent | structured-only absent | yes | captures/2026-09-24-experiments-jsonld-jsonld-067-b815108-turn-20/ | 2026-09-24 @ b815108 | Configured JSON-LD/script-only sentinel groups are omitted by both native web and View as AI. |
| JSONLD-068 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-068/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-068-b815108-turn-21/ | 2026-09-24 @ b815108 | Configured visible/microdata/RDFa and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-069 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-069/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-069-b815108-turn-21/ | 2026-09-24 @ b815108 | Configured visible/microdata/RDFa and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-070 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-070/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-070-b815108-turn-21/ | 2026-09-24 @ b815108 | Configured visible/microdata/RDFa and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-071 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-071/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-071-b815108-turn-21/ | 2026-09-24 @ b815108 | Configured visible/microdata/RDFa and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-072 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-072/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-072-b815108-turn-21/ | 2026-09-24 @ b815108 | Configured visible/microdata/RDFa and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-073 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-073/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-073-b815108-turn-21/ | 2026-09-24 @ b815108 | Configured visible/microdata/RDFa and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-074 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-074/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-074-b815108-turn-21/ | 2026-09-24 @ b815108 | Configured visible/microdata/RDFa and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-075 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-075/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-075-b815108-turn-21/ | 2026-09-24 @ b815108 | Configured visible/microdata/RDFa and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-076 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-076/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-076-b815108-turn-21/ | 2026-09-24 @ b815108 | Configured visible/microdata/RDFa and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-077 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-077/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-077-b815108-turn-21/ | 2026-09-24 @ b815108 | Configured visible/microdata/RDFa and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |
| JSONLD-078 | mismatch | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-078/ | microdata/visible present; JSON-LD absent | microdata/visible absent; JSON-LD absent | no | captures/2026-09-24-experiments-jsonld-jsonld-078-b815108-turn-22/ | 2026-09-24 @ b815108 | Native web preserves the visible breadcrumb/microdata sentinels while View as AI prunes them; both omit the JSON-LD-only sentinel. |
| JSONLD-079 | verified | https://view-as-ai.vercel.app/experiments/jsonld/JSONLD-079/ | sentinel groups match | sentinel groups match | yes | captures/2026-09-24-experiments-jsonld-jsonld-079-b815108-turn-22/ | 2026-09-24 @ b815108 | Configured visible/microdata/RDFa and JSON-LD sentinel groups match native web; JSON-LD-only values remain omitted. |

## ACTIVE

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ACTIVE-001 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-001/ | absent | absent | yes | captures/2026-09-24-experiments-active-active-001-b815108-turn-22/ | 2026-09-24 @ b815108 | Inline script source sentinel is absent in both outputs; native web does not expose script source. |
| ACTIVE-002 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-002/ | absent | absent | yes | captures/2026-09-24-experiments-active-active-002-b815108-turn-22/ | 2026-09-24 @ b815108 | External-script-only sentinel is absent in both outputs. |
| ACTIVE-003 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-003/ | absent | absent | yes | captures/2026-09-24-experiments-active-active-003-b815108-turn-22/ | 2026-09-24 @ b815108 | Immediate script insertion does not execute in either native web extraction or View as AI. |
| ACTIVE-004 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-004/ | absent | absent | yes | captures/2026-09-24-experiments-active-active-004-b815108-turn-22/ | 2026-09-24 @ b815108 | DOMContentLoaded script insertion does not execute in either output. |
| ACTIVE-005 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-005/ | absent | absent | yes | captures/2026-09-24-experiments-active-active-005-b815108-turn-22/ | 2026-09-24 @ b815108 | Zero-delay script insertion does not execute in either output. |
| ACTIVE-006 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-006/ | absent | absent | yes | captures/2026-09-24-experiments-active-active-006-b815108-turn-22/ | 2026-09-24 @ b815108 | One-second script insertion does not execute in either output. |
| ACTIVE-007 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-007/ | initial value | initial value | yes | captures/2026-09-24-experiments-active-active-007-b815108-turn-22/ | 2026-09-24 @ b815108 | Initial origin value remains in both outputs; the modifying script does not execute. |
| ACTIVE-008 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-008/ | present | present | yes | captures/2026-09-24-experiments-active-active-008-b815108-turn-22/ | 2026-09-24 @ b815108 | Origin-visible sentinel remains in both outputs; the removal script does not execute. |
| ACTIVE-009 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-009/ | present | present | yes | captures/2026-09-24-experiments-active-active-009-b815108-turn-23/ | 2026-09-24 @ b815108 | Origin-hidden sentinel is exposed by both outputs; the visibility-changing script does not need to execute. |
| ACTIVE-010 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-010/ | present | present | yes | captures/2026-09-24-experiments-active-active-010-b815108-turn-23/ | 2026-09-24 @ b815108 | Origin-visible sentinel remains in both outputs; the hiding script does not execute. |
| ACTIVE-011 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-011/ | absent | absent | yes | captures/2026-09-24-experiments-active-active-011-b815108-turn-23/ | 2026-09-24 @ b815108 | document.write does not execute in either native web or View as AI extraction. |
| ACTIVE-012 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-012/ | absent | absent | yes | captures/2026-09-24-experiments-active-active-012-b815108-turn-23/ | 2026-09-24 @ b815108 | Client fetch-and-insert does not execute in either output. |
| ACTIVE-013 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-013/ | present | present | yes | captures/2026-09-24-experiments-active-active-013-b815108-turn-23/ | 2026-09-24 @ b815108 | Custom-element light DOM is exposed by both outputs. |
| ACTIVE-014 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-014/ | absent | absent | yes | captures/2026-09-24-experiments-active-active-014-b815108-turn-23/ | 2026-09-24 @ b815108 | Imperatively attached shadow DOM is absent because the client script does not execute. |
| ACTIVE-015 | mismatch | https://view-as-ai.vercel.app/experiments/active/ACTIVE-015/ | absent | present | no | captures/2026-09-24-experiments-active-active-015-b815108-turn-23/ | 2026-09-24 @ b815108 | Native web omits declarative shadow-DOM sentinel while View as AI exposes it. |
| ACTIVE-016 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-016/ | absent | absent | yes | captures/2026-09-24-experiments-active-active-016-b815108-turn-23/ | 2026-09-24 @ b815108 | SPA client-route sentinel is absent in both outputs; client routing does not execute. |
| ACTIVE-017 | verified | https://view-as-ai.vercel.app/experiments/active/ACTIVE-017/ | noscript present; client absent | noscript present; client absent | yes | captures/2026-09-24-experiments-active-active-017-b815108-turn-23/ | 2026-09-24 @ b815108 | Both outputs expose noscript content and omit the client-rendered equivalent. |

## ORDER

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ORDER-001 | verified | https://view-as-ai.vercel.app/experiments/order/ORDER-001/ | 1→2→3 | 1→2→3 | yes | captures/2026-09-24-experiments-order-order-001-b815108-turn-23/ | 2026-09-24 @ b815108 | Ordinary control preserves DOM order in both outputs. |
| ORDER-002 | verified | https://view-as-ai.vercel.app/experiments/order/ORDER-002/ | 1→2→3 | 1→2→3 | yes | captures/2026-09-24-experiments-order-order-002-b815108-turn-24/ | 2026-09-24 @ b815108 | Flexbox order does not change extracted order; both follow DOM order. |
| ORDER-003 | verified | https://view-as-ai.vercel.app/experiments/order/ORDER-003/ | 1→2→3 | 1→2→3 | yes | captures/2026-09-24-experiments-order-order-003-b815108-turn-24/ | 2026-09-24 @ b815108 | row-reverse does not change extracted order; both follow DOM order. |
| ORDER-004 | verified | https://view-as-ai.vercel.app/experiments/order/ORDER-004/ | 1→2→3 | 1→2→3 | yes | captures/2026-09-24-experiments-order-order-004-b815108-turn-24/ | 2026-09-24 @ b815108 | Grid placement does not change extracted order; both follow DOM order. |
| ORDER-005 | verified | https://view-as-ai.vercel.app/experiments/order/ORDER-005/ | 1→2→3 | 1→2→3 | yes | captures/2026-09-24-experiments-order-order-005-b815108-turn-24/ | 2026-09-24 @ b815108 | Absolute visual positioning does not change extracted order. |
| ORDER-006 | verified | https://view-as-ai.vercel.app/experiments/order/ORDER-006/ | 1→2→3 | 1→2→3 | yes | captures/2026-09-24-experiments-order-order-006-b815108-turn-24/ | 2026-09-24 @ b815108 | RTL direction does not change extracted order. |
| ORDER-007 | verified | https://view-as-ai.vercel.app/experiments/order/ORDER-007/ | 1→2→3 | 1→2→3 | yes | captures/2026-09-24-experiments-order-order-007-b815108-turn-24/ | 2026-09-24 @ b815108 | Positive tabindex does not reorder extracted text; both follow DOM order. |
| ORDER-008 | verified | https://view-as-ai.vercel.app/experiments/order/ORDER-008/ | 1→2→3 | 1→2→3 | yes | captures/2026-09-24-experiments-order-order-008-b815108-turn-24/ | 2026-09-24 @ b815108 | aria-flowto does not reorder extracted text. |
| ORDER-009 | verified | https://view-as-ai.vercel.app/experiments/order/ORDER-009/ | 1→2→3 | 1→2→3 | yes | captures/2026-09-24-experiments-order-order-009-b815108-turn-24/ | 2026-09-24 @ b815108 | Fixed/sticky visual placement does not change DOM extraction order. |

## DUP

| ID | Status | URL | Native | View as AI | Match | Evidence | Last tested | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DUP-001 | verified | https://view-as-ai.vercel.app/experiments/duplicate/DUP-001/ | 2 copies | 2 copies | yes | captures/2026-09-24-experiments-duplicate-dup-001-b815108-turn-24/ | 2026-09-24 @ b815108 | Both outputs preserve two exact duplicate occurrences. |
| DUP-002 | verified | https://view-as-ai.vercel.app/experiments/duplicate/DUP-002/ | 10 copies | 10 copies | yes | captures/2026-09-24-experiments-duplicate-dup-002-b815108-turn-24/ | 2026-09-24 @ b815108 | Both outputs preserve ten exact duplicate occurrences. |
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
| I18N-001 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| I18N-002 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| I18N-003 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| I18N-004 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| I18N-005 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| I18N-006 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| I18N-007 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| I18N-008 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| I18N-009 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| I18N-010 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| I18N-011 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| I18N-012 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |
| I18N-013 | captured | https://view-as-ai.vercel.app/kitchen-sink/ | present | present | — | captures/2026-09-24-kitchen-sink-b815108-turn-1/ | 2026-09-24 @ b815108 | Primary-sentinel outcome captured; case-specific interpretation pending. |

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

