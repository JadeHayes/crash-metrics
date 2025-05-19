import { metrics } from "../data/metrics";
import { mapApiMetrics } from "../utils/metricsApiMapper";
import mapToVersionedMetrics from "../utils/mapToVersionedMetrics";

interface FetchMetricsParams {
  start: string;
  end: string;
  step: number;
}

export const fetchMetrics = async ({
  start,
  end,
  step,
}: FetchMetricsParams) => {
  try {
    // fetchMetricsFromApi(start, end, step). console.logging for now
    console.log({ start, end, step });
    //--- Note for interviewers on two mapping steps
    // 1. mapApiMetrics   →  *normalizes raw API data (casing, typos, etc.)*.
    //    This belongs in the middleware layer so the rest of the app never
    //    knows the transport-level quirks.
    //
    // 2. mapToVersionedMetrics  →  *reshapes the already-clean payload into the
    //    chart-friendly structure the client needs*.
    //
    // Keeping these concerns separate makes each mapper:
    //   • Easy to unit-test in isolation
    //   • Swappable (if the API or the UI changes)
    //
    const response = mapApiMetrics(metrics);
    const data = mapToVersionedMetrics(response);
    return data;
  } catch (err) {
    const cause = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to fetch and transform metrics data: ${cause}`);
  }
};
