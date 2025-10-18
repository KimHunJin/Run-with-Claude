import type { PaceLevelData } from '../../../shared/types/pace';
import { calculate400mTime, formatTime, paceToSpeed } from '../../../shared/lib/pace-calculator';

/**
 * 다양한 러닝 페이스 레벨 정의
 * 각 레벨은 일반적인 러닝 훈련 존(training zone)을 나타냅니다
 */
export const PACE_LEVELS: PaceLevelData[] = [
  {
    level: 'easy',
    label: '이지 런',
    description: '편안한 대화가 가능한 속도',
    pace: '7:00',
    speed: paceToSpeed(7),
    time400m: calculate400mTime(7),
    timePerKm: formatTime(7 * 60),
    color: '#10b981', // green
  },
  {
    level: 'moderate',
    label: '조깅',
    description: '적당히 편안한 속도',
    pace: '6:00',
    speed: paceToSpeed(6),
    time400m: calculate400mTime(6),
    timePerKm: formatTime(6 * 60),
    color: '#3b82f6', // blue
  },
  {
    level: 'tempo',
    label: '템포 런',
    description: '약간 힘든 속도',
    pace: '5:00',
    speed: paceToSpeed(5),
    time400m: calculate400mTime(5),
    timePerKm: formatTime(5 * 60),
    color: '#f59e0b', // amber
  },
  {
    level: 'threshold',
    label: '역치 훈련',
    description: '힘들지만 유지 가능한 속도',
    pace: '4:30',
    speed: paceToSpeed(4.5),
    time400m: calculate400mTime(4.5),
    timePerKm: formatTime(4.5 * 60),
    color: '#f97316', // orange
  },
  {
    level: 'interval',
    label: '인터벌',
    description: '고강도 구간 훈련',
    pace: '4:00',
    speed: paceToSpeed(4),
    time400m: calculate400mTime(4),
    timePerKm: formatTime(4 * 60),
    color: '#ef4444', // red
  },
  {
    level: 'sprint',
    label: '전력 질주',
    description: '최대 속도',
    pace: '3:30',
    speed: paceToSpeed(3.5),
    time400m: calculate400mTime(3.5),
    timePerKm: formatTime(3.5 * 60),
    color: '#dc2626', // dark red
  },
];