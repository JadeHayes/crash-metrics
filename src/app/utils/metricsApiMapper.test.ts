import { mapApiMetrics } from "./metricsApiMapper";

describe("API metrics data mapper", () => {
  it("successfully maps keys to expected structure", () => {
    const data = {
      end: "2025-05-17T10:30:00Z",
      start: "2025-05-16T11:30:00Z",
      step: 100,
      data: [
        {
          app_version: "25.11.0.1",
          "crash.count": [2, 1, 3],
          timestamp: [1742143800, 1742144400, 1742145000],
        },
      ],
    };
    const actual = mapApiMetrics(data);
    const expected = {
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
    expect(actual).toStrictEqual(expected);
  });

  it("throws on an empty data array", () => {
    // @ts-expect-error: added empty data simulating a bad server response
    expect(() => mapApiMetrics({})).toThrow();
  });
});
