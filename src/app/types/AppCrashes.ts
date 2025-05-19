export interface AppCrashes {
  [appVersion: string]: CrashPoint[];
}
interface CrashPoint {
  timestamp: number;
  crashCount: number;
}
