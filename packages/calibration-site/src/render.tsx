import { renderToStaticMarkup } from "react-dom/server";

import type { FixtureRoute } from "./fixture-types";

export function renderFixtureRoute(route: FixtureRoute): string {
  if (route.kind === "raw") return route.render();
  const rendered = renderToStaticMarkup(route.render());
  // React 19 injects image preload hints during server rendering. Calibration
  // origin HTML must contain only resource hints we author deliberately.
  const controlled = rendered.replace(/<link rel="preload" as="image"[^>]*\/>/g, "");
  return `<!doctype html>${controlled}\n`;
}
