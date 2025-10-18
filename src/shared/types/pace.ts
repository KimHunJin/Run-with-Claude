export interface PaceData {
  pace: string; // "mm:ss" format per km
  speed: number; // km/h
  time400m: string; // "mm:ss" format for 400m
  timePerKm: string; // "mm:ss" format
}

export type PaceLevel = 'easy' | 'moderate' | 'tempo' | 'threshold' | 'interval' | 'sprint';

export interface PaceLevelData extends PaceData {
  level: PaceLevel;
  label: string;
  description: string;
  color: string;
}
