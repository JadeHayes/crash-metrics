import { APIMetricsResponse } from "../types/ApiResponse";
import { MetricsResponse } from "../types/CrashMetrics";

export function mapApiMetrics(api: APIMetricsResponse): MetricsResponse {
  return {
    end: api.end,
    start: api.start,
    step: api.step,
    data: api.data.map((point) => ({
      appVersion: point.app_version,
      crashCount: point["crash.count"],
      timestamp: point.timestamp,
    })),
  };
}
