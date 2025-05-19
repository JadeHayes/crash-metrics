import { MetricsResponse } from "../types/CrashMetrics";
import { mapToVersionedMetrics } from "./mapToVersionedMetrics";

describe("mapToVersionedMetrics", () => {
  it("builds appVersionData for a single version", () => {
    const response = {
      end: "2025-05-17T10:30:00Z",
      start: "2025-05-16T11:30:00Z",
      step: 100,
      data: [
        {
          appVersion: "25.11.0.1",
          crashCount: [2, 1, 3],
          timestamp: [1742143800, 1742144400, 1742145000],
        },
      ],
    };
    const actual = mapToVersionedMetrics(response);
    const expected = {
      end: 1747477800000,
      start: 1747395000000,
      step: 100,
      data: [
        { version: "25.11.0.1", crashCount: 2, timestamp: 1742143800000 },
        { version: "25.11.0.1", crashCount: 1, timestamp: 1742144400000 },
        { version: "25.11.0.1", crashCount: 3, timestamp: 1742145000000 },
      ],
    };
    expect(actual).toStrictEqual(expected);
  });

  it("Throws with invalid Metrics response", () => {
    expect(() => mapToVersionedMetrics({} as MetricsResponse)).toThrow();
  });
});
