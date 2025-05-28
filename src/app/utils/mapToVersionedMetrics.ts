import { MetricsResponse } from "../types/CrashMetrics";
import { VersionedMetrics } from "../types/VersionedMetrics";

export function mapToVersionedMetrics(
  metrics: MetricsResponse
): VersionedMetrics {
  return {
    start: Date.parse(metrics.start),
    end: Date.parse(metrics.end),
    step: metrics.step,
    data: metrics.data.flatMap(({ appVersion, crashCount, timestamp }) =>
      crashCount.map((count, i) => ({
        version: appVersion,
        crashCount: count,
        timestamp: timestamp[i] * 1000, // assuming seconds from the API and we want MS
      }))
    ),
  };
}

export default mapToVersionedMetrics;
