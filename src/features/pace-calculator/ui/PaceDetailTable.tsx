import { calculateTimeForDistance, formatSeconds, formatTimeHMS } from '../../../shared/lib/pace-calculator';
import './PaceDetailTable.css';

interface PaceDetailTableProps {
  color: string;
}

export function PaceDetailTable({ color }: PaceDetailTableProps) {
  // 2'00" ~ 7'00" 범위의 페이스 (5초 단위)
  const paces = [];
  for (let minutes = 2; minutes <= 7; minutes++) {
    for (let seconds = 0; seconds < 60; seconds += 5) {
      if (minutes === 7 && seconds > 30) break; // 7'30"에서 종료
      paces.push(minutes + seconds / 60);
    }
  }

  // 거리 목록 (100m ~ 1000m, 그 이후 3km ~ 풀마라톤)
  const distances = [
    // 100m ~ 1000m (100m 단위)
    ...Array.from({ length: 10 }, (_, i) => ({
      meters: (i + 1) * 100,
      label: `${(i + 1) * 100}m`
    })),
    // 3km 이후
    { meters: 3000, label: '3km' },
    { meters: 5000, label: '5km' },
    { meters: 10000, label: '10km' },
    { meters: 15000, label: '15km' },
    { meters: 20000, label: '20km' },
    { meters: 21097.5, label: '하프' },
    { meters: 25000, label: '25km' },
    { meters: 30000, label: '30km' },
    { meters: 35000, label: '35km' },
    { meters: 40000, label: '40km' },
    { meters: 42195, label: '풀' },
  ];

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
                <th key={distance.label} style={{ borderColor: color }}>
                  {distance.label}
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
                    const timeInSeconds = calculateTimeForDistance(pace, distance.meters);
                    return (
                      <td key={distance.label} style={{ borderColor: color }}>
                        <div className="time-cell">
                          <span className="time-seconds">{formatSeconds(timeInSeconds)}s</span>
                          <span className="time-mmss">({formatTimeHMS(timeInSeconds)})</span>
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
