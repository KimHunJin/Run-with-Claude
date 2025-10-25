import { useState, useEffect } from 'react';
import { calculateTimeForDistance, formatTimeHMS, formatSeconds } from '../../../shared/lib/pace-calculator';
import { getLocalStorage, setLocalStorage } from '../../../shared/lib/storage';
import './IntervalPaceTable.css';

interface PaceEntry {
  id: string;
  minutes: string;
  seconds: string;
}

const INTERVAL_DISTANCES = [100, 200, 300, 400, 800, 1000, 1200, 2000, 3000];

export function IntervalPaceTable() {
  const [paceEntries, setPaceEntries] = useState<PaceEntry[]>(() =>
    getLocalStorage('intervalPaces', [
      { id: '1', minutes: '4', seconds: '00' }
    ])
  );

  // 로컬 스토리지에 저장
  useEffect(() => {
    setLocalStorage('intervalPaces', paceEntries);
  }, [paceEntries]);

  const addPace = () => {
    const newId = String(Date.now());
    setPaceEntries([...paceEntries, { id: newId, minutes: '5', seconds: '00' }]);
  };

  const removePace = (id: string) => {
    if (paceEntries.length > 1) {
      setPaceEntries(paceEntries.filter(entry => entry.id !== id));
    }
  };

  const updatePace = (id: string, field: 'minutes' | 'seconds', value: string) => {
    setPaceEntries(paceEntries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const calculateTimeInSeconds = (paceMinutes: string, paceSeconds: string, distanceMeters: number) => {
    const mins = parseInt(paceMinutes) || 0;
    const secs = parseInt(paceSeconds) || 0;
    const pacePerKm = mins + secs / 60;
    return calculateTimeForDistance(pacePerKm, distanceMeters);
  };

  return (
    <div className="interval-pace-container">
      <div className="interval-pace-header">
        <h3 className="interval-pace-title">인터벌 페이스 계산기</h3>
        <p className="interval-pace-subtitle">
          다양한 페이스로 인터벌 훈련 시간을 계산하세요
        </p>
      </div>

      <div className="pace-inputs">
        {paceEntries.map((entry, index) => (
          <div key={entry.id} className="pace-input-row">
            <label className="pace-label">페이스 {index + 1}</label>
            <div className="pace-input-group">
              <input
                type="number"
                min="0"
                max="20"
                value={entry.minutes}
                onChange={(e) => updatePace(entry.id, 'minutes', e.target.value)}
                className="pace-input-field"
                placeholder="분"
              />
              <span className="pace-separator">분</span>
              <input
                type="number"
                min="0"
                max="59"
                value={entry.seconds}
                onChange={(e) => updatePace(entry.id, 'seconds', e.target.value)}
                className="pace-input-field"
                placeholder="초"
              />
              <span className="pace-unit">초/km</span>
              {paceEntries.length > 1 && (
                <button
                  onClick={() => removePace(entry.id)}
                  className="remove-pace-btn"
                  aria-label="페이스 삭제"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
        <button onClick={addPace} className="add-pace-btn">
          + 페이스 추가
        </button>
      </div>

      <div className="interval-table-scroll">
        <table className="interval-pace-table">
          <thead>
            <tr>
              <th className="sticky-col">거리</th>
              {paceEntries.map((entry, index) => {
                const mins = parseInt(entry.minutes) || 0;
                const secs = parseInt(entry.seconds) || 0;
                return (
                  <th key={entry.id}>
                    페이스 {index + 1}<br />
                    <span className="pace-value">
                      {mins}'{secs.toString().padStart(2, '0')}"
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {INTERVAL_DISTANCES.map((distance) => (
              <tr key={distance}>
                <td className="sticky-col distance-label">{distance}m</td>
                {paceEntries.map((entry) => {
                  const timeInSeconds = calculateTimeInSeconds(entry.minutes, entry.seconds, distance);
                  return (
                    <td key={entry.id} className="time-cell">
                      <span className="time-seconds">{formatSeconds(timeInSeconds)}s</span>
                      <span className="time-mmss">({formatTimeHMS(timeInSeconds)})</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="interval-hint">
        💡 페이스를 추가하여 여러 강도의 인터벌 훈련을 비교해보세요
      </p>
    </div>
  );
}
