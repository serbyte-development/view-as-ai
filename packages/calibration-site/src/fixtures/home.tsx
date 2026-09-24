import type { FixtureRoute } from "../fixture-types";
import { HomePage } from "../pages/HomePage";

export const homeRoutes: FixtureRoute[] = [
  {
    kind: "tsx",
    path: "/",
    render: () => <HomePage />,
    metadata: {
      phase: 1,
      source: "src/fixtures/home.tsx",
      testIds: [],
    },
  },
];
