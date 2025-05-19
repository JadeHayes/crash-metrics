export const test_start = "2025-03-16T16:50:00Z";
export const test_end = "2025-03-16T17:10:00Z";
export const test_step = 600;

export const metrics = {
  start: test_start,
  end: test_end,
  step: test_step,
  data: [
    {
      app_version: "25.11.0.1",
      "crash.count": [2, 1, 3],
      timestamp: [1742143800, 1742144400, 1742145000],
    },
    {
      app_version: "25.11.0.2",
      "crash.count": [0, 2, 4],
      timestamp: [1742143800, 1742144400, 1742145000],
    },
    {
      app_version: "25.12.0",
      "crash.count": [1, 1, 0],
      timestamp: [1742143800, 1742144400, 1742145000],
    },
  ],
};
