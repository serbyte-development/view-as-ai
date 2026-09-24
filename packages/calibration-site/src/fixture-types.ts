import type { ReactElement } from "react";

export type FixtureKind = "tsx" | "raw";

export interface FixtureMetadata {
  phase: number;
  source: string;
  testIds: string[];
  sentinels?: Record<string, string>;
  sentinelGroups?: Record<string, string[]>;
  notes?: string;
  allowDuplicateTestIds?: boolean;
  allowRepeatedSentinels?: boolean;
}

interface BaseFixtureRoute {
  path: string;
  metadata: FixtureMetadata;
}

export interface TsxFixtureRoute extends BaseFixtureRoute {
  kind: "tsx";
  render: () => ReactElement;
}

export interface RawFixtureRoute extends BaseFixtureRoute {
  kind: "raw";
  render: () => string;
}

export type FixtureRoute = TsxFixtureRoute | RawFixtureRoute;

export interface FixtureEndpoint {
  path: string;
  metadata: FixtureMetadata;
}

export interface StaticAsset {
  content?: string | Uint8Array;
  path: string;
  source?: string;
}

export interface FixtureManifestEntry {
  allowDuplicateTestIds: boolean;
  allowRepeatedSentinels: boolean;
  kind: FixtureKind;
  notes?: string;
  path: string;
  phase: number;
  source: string;
  testIds: string[];
  sentinels: Record<string, string>;
  sentinelGroups: Record<string, string[]>;
}

export interface FixtureManifestEndpoint {
  notes?: string;
  path: string;
  phase: number;
  source: string;
  testIds: string[];
  sentinels: Record<string, string>;
  sentinelGroups: Record<string, string[]>;
}

export interface FixtureManifest {
  endpoints: FixtureManifestEndpoint[];
  generatedAt: string;
  scenario: string;
  routes: FixtureManifestEntry[];
}
