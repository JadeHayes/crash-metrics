export interface CrashMetric {
  appVersion: string;
  crashCount: number[];
  timestamp: number[];
}
export interface MetricsResponse {
  end: string;
  start: string;
  step: number;
  data: CrashMetric[];
}
