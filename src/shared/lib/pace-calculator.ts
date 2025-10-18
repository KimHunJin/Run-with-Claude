/**
 * 초를 mm:ss 형식으로 변환
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * km당 페이스(분)를 기준으로 400m 소요 시간 계산
 */
export function calculate400mTime(pacePerKm: number): string {
  const secondsPerKm = pacePerKm * 60;
  const secondsFor400m = secondsPerKm * 0.4;
  return formatTime(secondsFor400m);
}

/**
 * km당 페이스(분)를 속도(km/h)로 변환
 */
export function paceToSpeed(pacePerKm: number): number {
  return Number((60 / pacePerKm).toFixed(2));
}

/**
 * 속도(km/h)를 km당 페이스(분)로 변환
 */
export function speedToPace(speedKmh: number): number {
  return Number((60 / speedKmh).toFixed(2));
}

/**
 * km당 페이스(분)를 기준으로 특정 거리의 소요 시간 계산 (초 단위)
 */
export function calculateTimeForDistance(pacePerKm: number, distanceInMeters: number): number {
  const secondsPerKm = pacePerKm * 60;
  return secondsPerKm * (distanceInMeters / 1000);
}

/**
 * 초를 초 단위로만 표시 (소수점 1자리)
 */
export function formatSeconds(seconds: number): string {
  return seconds.toFixed(1);
}

/**
 * 초를 HH:MM:SS 형식으로 변환 (시간이 0이면 MM:SS로 표시)
 */
export function formatTimeHMS(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * 거리(km)와 시간(초)으로부터 페이스(분/km) 계산
 */
export function calculatePaceFromDistanceAndTime(distanceKm: number, timeSeconds: number): number {
  return timeSeconds / 60 / distanceKm;
}
