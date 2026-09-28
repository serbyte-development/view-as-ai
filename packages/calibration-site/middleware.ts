import { buildRequestTelemetry } from "./src/request-telemetry";

export default function middleware(request: Request): void {
  const telemetry = buildRequestTelemetry(request);

  console.log(`VAI_REQUEST_TELEMETRY ${JSON.stringify(telemetry)}`);
}
