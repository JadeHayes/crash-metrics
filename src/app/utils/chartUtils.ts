import { ChartPoint } from "../types/VersionedMetrics";

export const groupChartDataByVersion = (data: ChartPoint[]): { [version: string]: ChartPoint[] } => {
  const groups: { [version: string]: ChartPoint[] } = {};
  for (const point of data) {
    if (!groups[point.version]) {
      groups[point.version] = [];
    }
    groups[point.version].push(point);
  }
  return groups;
}; 