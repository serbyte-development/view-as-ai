import type { FixtureRoute, StaticAsset } from "./fixture-types";
import { baselineAssets, baselineRoutes } from "./fixtures/baseline";
import { homeRoutes } from "./fixtures/home";

export const calibrationScenario = process.env.CALIBRATION_SITE_SCENARIO ?? "default";

export const requireFullCalibrationCoverage = false;

export const routes: FixtureRoute[] = [...homeRoutes, ...baselineRoutes];

export const assets: StaticAsset[] = [
  ...baselineAssets,
  {
    path: "/styles.css",
    source: "src/styles.css",
  },
];
