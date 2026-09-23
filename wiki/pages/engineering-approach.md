---
summary: "Project-wide coding rules: direct implementation, minimal abstraction, evidence before architecture, and proportional verification."
---

# Engineering Approach

Prefer simplicity over complexity or cleverness.

- Make smallest coherent change that fully satisfies current requirement.
- Prefer direct code over abstractions. Do not create helper functions, utility modules, wrapper functions or classes, interfaces, factories, or generic frameworks unless they remove meaningful duplication or encapsulate meaningful behavior.
- Do not create pass-through abstractions that merely rename an existing function, forward same arguments, or return another function's result unchanged.
- Do not design for hypothetical future requirements or scale that has not been requested.
- Prefer existing patterns when sound. Introduce new patterns or abstractions when they reduce total complexity, remove meaningful duplication, clarify an important boundary, or are required by design.
- For structured data, use structured APIs or parsers instead of ad hoc string manipulation when reasonable.
- Validate assumptions with repository evidence, authoritative source, or controlled production comparison before adding architecture around them.
- Add validation at system boundaries. Trust framework guarantees and internal code where scenarios cannot occur.
- Verify changes proportionally to scope. Use targeted fixtures and diffs before broad test suites.
- Keep architecture and integration decisions with primary implementation path. Use isolated experiments for uncertain behavior.

For View as AI specifically: preserve proven formatter/pruner behavior and extend only where real `web.run` comparisons show a meaningful information gap.
