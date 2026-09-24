import { Document } from "../components/Document";
import type { FixtureRoute, StaticAsset } from "../fixture-types";

const BASELINE_SENTINEL = "VAI_BASELINE_PARAGRAPH_2E7C9A";

function BaselinePage() {
  return (
    <Document
      head={<title>View as AI Baseline Fixture</title>}
      body={
        <main>
          <h1>Baseline Fixture</h1>
          <p>{BASELINE_SENTINEL} Ordinary readable baseline content.</p>
          <p>
            <a href="/baseline/linked/">Same-origin baseline link</a>
          </p>
          <p>
            <a href="https://example.com/">External baseline link</a>
          </p>
          <img src="/assets/baseline.svg" alt="Baseline geometric fixture" />
          <form>
            <label htmlFor="baseline-name">Baseline name</label>
            <input id="baseline-name" name="baseline-name" placeholder="Baseline placeholder" />
            <button type="button">Baseline button</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Baseline column</th>
                <th>Baseline value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alpha</td>
                <td>One</td>
              </tr>
            </tbody>
          </table>
        </main>
      }
    />
  );
}

function BaselineLinkedPage() {
  return (
    <Document
      head={<title>Baseline Linked Target</title>}
      body={<p>VAI_BASELINE_LINK_TARGET_6A42DD Same-origin target page.</p>}
    />
  );
}

export const baselineRoutes: FixtureRoute[] = [
  {
    kind: "tsx",
    path: "/baseline/",
    render: () => <BaselinePage />,
    metadata: {
      phase: 1,
      source: "src/fixtures/baseline.tsx",
      testIds: [],
      notes: "Capture-pipeline sanity page; not a calibration result ID.",
    },
  },
  {
    kind: "tsx",
    path: "/baseline/linked/",
    render: () => <BaselineLinkedPage />,
    metadata: {
      phase: 1,
      source: "src/fixtures/baseline.tsx",
      testIds: [],
      notes: "Supporting same-origin link target for the baseline route.",
    },
  },
];

export const baselineAssets: StaticAsset[] = [
  {
    path: "/assets/baseline.svg",
    source: "src/assets/baseline.svg",
  },
];
