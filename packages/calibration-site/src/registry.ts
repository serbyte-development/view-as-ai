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
import { malformedRoutes } from "./fixtures/malformed";
import { orderRoutes } from "./fixtures/order";
import { siteContextAssetsFor, siteContextRoutesFor } from "./fixtures/site-context";
import { sizeRoutes } from "./fixtures/size";
import { isolatedVisibilityAssets, isolatedVisibilityRoutes } from "./fixtures/visibility-isolated";

export const calibrationScenario = process.env.CALIBRATION_SITE_SCENARIO ?? "default";
const siteContextRoutes = siteContextRoutesFor(calibrationScenario);
const siteContextAssets = siteContextAssetsFor(calibrationScenario);

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
  ...malformedRoutes,
  ...sizeRoutes,
  ...siteContextRoutes,
];

export const assets: StaticAsset[] = [
  ...baselineAssets,
  ...kitchenSinkAssets,
  ...isolatedVisibilityAssets,
  ...activeAssets,
  ...siteContextAssets,
  {
    path: "/styles.css",
    source: "src/styles.css",
  },
];
