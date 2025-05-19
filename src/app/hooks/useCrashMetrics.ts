import { useEffect, useState } from "react";
import { fetchMetrics } from "@/app/api/fetchMetrics";
import { VersionedMetrics } from "@/app/types/VersionedMertrics";
import { test_start, test_end, test_step } from "../data/metrics";

/**
 * Custom hook to fetch and manage crash metrics.
 * @returns An object containing crashMetrics data, loading state, and error state.
 */

interface UseCrashMetricsResult {
  crashMetrics: VersionedMetrics | undefined;
  loading: boolean;
  error: Error | null;
}

export const useCrashMetrics = (): UseCrashMetricsResult => {
  const [crashMetrics, setCrashMetrics] = useState<
    VersionedMetrics | undefined
  >();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadMetrics() {
      try {
        // NOTE: Victoria mentioned this "data {would come} from a time series endpoint."
        // while the function is not currently asynchronous, I'm assuming it will be.
        // Also, I'm assuming filtering on the backend for metrics.
        const metrics = await fetchMetrics({
          start: test_start,
          end: test_end,
          step: test_step,
        });
        setCrashMetrics(metrics);
      } catch (err) {
        console.error("Failed to fetch crash metrics:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  return { crashMetrics, loading, error };
};
