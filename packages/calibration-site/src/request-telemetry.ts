const REDACTED = "<redacted>";

const SENSITIVE_HEADER_NAMES = new Set([
  "authorization",
  "cookie",
  "proxy-authorization",
  "x-api-key",
  "x-vercel-protection-bypass",
  "x-vercel-set-bypass-cookie",
]);

function isSensitiveHeader(name: string): boolean {
  const lower = name.toLowerCase();
  return (
    SENSITIVE_HEADER_NAMES.has(lower) ||
    lower.includes("authorization") ||
    lower.includes("cookie") ||
    lower.includes("password") ||
    lower.includes("secret") ||
    lower.endsWith("-token")
  );
}

export function sanitizeRequestHeaders(headers: Headers): Record<string, string> {
  return Object.fromEntries(
    [...headers.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([name, value]) => [name, isSensitiveHeader(name) ? REDACTED : value]),
  );
}

function runtimeEnvironment(): Record<string, string | undefined> {
  if (typeof process === "undefined") return {};
  return {
    vercelDeploymentId: process.env.VERCEL_DEPLOYMENT_ID,
    vercelEnv: process.env.VERCEL_ENV,
    vercelGitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA,
    vercelRegion: process.env.VERCEL_REGION,
    vercelTargetEnv: process.env.VERCEL_TARGET_ENV,
    vercelUrl: process.env.VERCEL_URL,
  };
}

export interface RequestTelemetry {
  type: "vai_request_telemetry";
  telemetryId: string;
  timestamp: string;
  method: string;
  pathname: string;
  search: string;
  host: string;
  headers: Record<string, string>;
  runtime: Record<string, string | undefined>;
}

export function buildRequestTelemetry(
  request: Request,
  options: { telemetryId?: string; timestamp?: string } = {},
): RequestTelemetry {
  const url = new URL(request.url);
  return {
    type: "vai_request_telemetry",
    telemetryId: options.telemetryId ?? crypto.randomUUID(),
    timestamp: options.timestamp ?? new Date().toISOString(),
    method: request.method,
    pathname: url.pathname,
    search: url.search,
    host: url.host,
    headers: sanitizeRequestHeaders(request.headers),
    runtime: runtimeEnvironment(),
  };
}
