export interface APICrashMetric {
  app_version: string;
  "crash.count": number[]; // is an array of integers representing the number of crashes at each timestamp.
  timestamp: number[]; // an array of integers representing the timestamp of each data point in unix time.
}

export interface APIMetricsResponse {
  end: string; // ISO‐8601 timestamp
  start: string; // ISO‐8601 timestamp
  step: number; // time in seconds between each data point
  data: APICrashMetric[];
}
