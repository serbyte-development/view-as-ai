import type { FixtureRoute, StaticAsset } from "./fixture-types";
import { homeRoutes } from "./fixtures/home";

export const calibrationScenario = process.env.CALIBRATION_SITE_SCENARIO ?? "default";

export const requireFullCalibrationCoverage = false;

export const routes: FixtureRoute[] = [...homeRoutes];

export const assets: StaticAsset[] = [
  {
    path: "/styles.css",
    source: "src/styles.css",
  },
];
