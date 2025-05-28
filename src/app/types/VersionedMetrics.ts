export interface VersionedMetrics {
  start: number;
  end: number;
  step: number;
  data: ChartPoint[];
}

export interface ChartPoint {
  timestamp: number; // in ms
  version: string;
  crashCount: number;
}
