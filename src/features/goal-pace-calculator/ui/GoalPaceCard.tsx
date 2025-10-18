import { calculateTimeForDistance, formatTimeHMS, formatSeconds } from '../../../shared/lib/pace-calculator';
import { RACE_DISTANCES } from '../model/distances';
import './GoalPaceCard.css';

interface GoalPaceCardProps {
  pace: number; // 분/km
}

export function GoalPaceCard({ pace }: GoalPaceCardProps) {
  const paceMinutes = Math.floor(pace);
  const paceSeconds = Math.round((pace - paceMinutes) * 60);

  return (
    <div className="goal-pace-card">
      <div className="goal-pace-header">
        <h3 className="goal-pace-title">목표 페이스</h3>
        <div className="goal-pace-value">
          {paceMinutes}'{paceSeconds.toString().padStart(2, '0')}" /km
        </div>
      </div>

      <div className="race-times-grid">
        {RACE_DISTANCES.map((distance) => {
          const timeInSeconds = calculateTimeForDistance(pace, distance.distanceKm * 1000);
          return (
            <div key={distance.label} className="race-time-item">
              <div className="race-distance">{distance.label}</div>
              <div className="race-time-main">{formatTimeHMS(timeInSeconds)}</div>
              <div className="race-time-seconds">{formatSeconds(timeInSeconds)}s</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
