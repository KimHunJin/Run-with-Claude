import { calculateTimeForDistance, formatSeconds, formatTime } from '../../../shared/lib/pace-calculator';
import './PaceDetailTable.css';

interface PaceDetailTableProps {
  color: string;
}

export function PaceDetailTable({ color }: PaceDetailTableProps) {
  // 3'00" ~ 7'00" 범위의 페이스 (5초 단위)
  const paces = [];
  for (let minutes = 3; minutes <= 7; minutes++) {
    for (let seconds = 0; seconds < 60; seconds += 5) {
      if (minutes === 7 && seconds > 0) break; // 7'00"에서 종료
      paces.push(minutes + seconds / 60);
    }
  }

  // 100m 단위 거리 (100m ~ 1000m)
  const distances = Array.from({ length: 10 }, (_, i) => (i + 1) * 100);

  return (
    <div className="pace-detail-table-container">
      <div className="table-scroll">
        <table className="pace-detail-table">
          <thead>
            <tr>
              <th className="sticky-col" style={{ borderColor: color }}>
                페이스/거리
              </th>
              {distances.map((distance) => (
                <th key={distance} style={{ borderColor: color }}>
                  {distance}m
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paces.map((pace) => {
              const minutes = Math.floor(pace);
              const seconds = Math.round((pace - minutes) * 60);
              const paceLabel = `${minutes}'${seconds.toString().padStart(2, '0')}"`;

              return (
                <tr key={paceLabel}>
                  <td className="sticky-col pace-label" style={{ borderColor: color, color }}>
                    {paceLabel}
                  </td>
                  {distances.map((distance) => {
                    const timeInSeconds = calculateTimeForDistance(pace, distance);
                    return (
                      <td key={distance} style={{ borderColor: color }}>
                        <div className="time-cell">
                          <span className="time-seconds">{formatSeconds(timeInSeconds)}s</span>
                          <span className="time-mmss">({formatTime(timeInSeconds)})</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="table-hint">💡 좌우로 스크롤하여 더 많은 거리를 확인하세요</p>
    </div>
  );
}
