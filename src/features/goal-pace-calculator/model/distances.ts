export interface DistanceInfo {
  label: string;
  distanceKm: number;
}

export const RACE_DISTANCES: DistanceInfo[] = [
  { label: '100m', distanceKm: 0.1 },
  { label: '400m', distanceKm: 0.4 },
  { label: '1km', distanceKm: 1 },
  { label: '5km', distanceKm: 5 },
  { label: '10km', distanceKm: 10 },
  { label: '20km', distanceKm: 20 },
  { label: '하프마라톤', distanceKm: 21.0975 },
  { label: '풀마라톤', distanceKm: 42.195 },
];
