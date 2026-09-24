import type { FixtureRoute, StaticAsset } from "./fixture-types";
import { activeAssets, activeRoutes } from "./fixtures/active";
import { baselineAssets, baselineRoutes } from "./fixtures/baseline";
import { boilerplateRoutes } from "./fixtures/boilerplate";
import { duplicateRoutes } from "./fixtures/duplicate";
import { frameFollowupRoutes } from "./fixtures/frame-followups";
import { headMetadataRoutes } from "./fixtures/head-metadata";
import { homeRoutes } from "./fixtures/home";
import { jsonLdRoutes } from "./fixtures/jsonld";
import { kitchenSinkAssets, kitchenSinkRoutes } from "./fixtures/kitchen-sink";
import { orderRoutes } from "./fixtures/order";
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
  ...headMetadataRoutes,
  ...jsonLdRoutes,
  ...activeRoutes,
  ...orderRoutes,
  ...duplicateRoutes,
];

export const assets: StaticAsset[] = [
  ...baselineAssets,
  ...kitchenSinkAssets,
  ...isolatedVisibilityAssets,
  ...activeAssets,
  {
    path: "/styles.css",
    source: "src/styles.css",
  },
];
