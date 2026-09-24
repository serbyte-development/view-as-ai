import type { FixtureRoute, StaticAsset } from "./fixture-types";
import { baselineAssets, baselineRoutes } from "./fixtures/baseline";
import { boilerplateRoutes } from "./fixtures/boilerplate";
import { frameFollowupRoutes } from "./fixtures/frame-followups";
import { homeRoutes } from "./fixtures/home";
import { kitchenSinkAssets, kitchenSinkRoutes } from "./fixtures/kitchen-sink";
import { isolatedVisibilityAssets, isolatedVisibilityRoutes } from "./fixtures/visibility-isolated";

export const calibrationScenario = process.env.CALIBRATION_SITE_SCENARIO ?? "default";

export const requireFullCalibrationCoverage = false;

export const routes: FixtureRoute[] = [
  ...homeRoutes,
  ...baselineRoutes,
  ...kitchenSinkRoutes,
  ...isolatedVisibilityRoutes,
  ...boilerplateRoutes,
  ...frameFollowupRoutes,
];

export const assets: StaticAsset[] = [
  ...baselineAssets,
  ...kitchenSinkAssets,
  ...isolatedVisibilityAssets,
  {
    path: "/styles.css",
    source: "src/styles.css",
  },
];
