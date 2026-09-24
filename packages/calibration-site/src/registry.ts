import type { FixtureRoute, StaticAsset } from "./fixture-types";
import { baselineAssets, baselineRoutes } from "./fixtures/baseline";
import { homeRoutes } from "./fixtures/home";
import { kitchenSinkAssets, kitchenSinkRoutes } from "./fixtures/kitchen-sink";

export const calibrationScenario = process.env.CALIBRATION_SITE_SCENARIO ?? "default";

export const requireFullCalibrationCoverage = false;

export const routes: FixtureRoute[] = [...homeRoutes, ...baselineRoutes, ...kitchenSinkRoutes];

export const assets: StaticAsset[] = [
  ...baselineAssets,
  ...kitchenSinkAssets,
  {
    path: "/styles.css",
    source: "src/styles.css",
  },
];
