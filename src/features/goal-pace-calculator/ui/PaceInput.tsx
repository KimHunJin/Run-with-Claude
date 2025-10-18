import { useState, useEffect } from 'react';
import { calculatePaceFromDistanceAndTime } from '../../../shared/lib/pace-calculator';
import { getLocalStorage, setLocalStorage } from '../../../shared/lib/storage';
import './PaceInput.css';

interface PaceInputProps {
  onPaceChange: (pace: number) => void;
}

interface DistancePreset {
  label: string;
  distance: number;
}

const DISTANCE_PRESETS: DistancePreset[] = [
  { label: '400m', distance: 0.4 },
  { label: '1km', distance: 1 },
  { label: '5km', distance: 5 },
  { label: '10km', distance: 10 },
  { label: '20km', distance: 20 },
  { label: '하프', distance: 21.0975 },
  { label: '풀', distance: 42.195 },
];

export function PaceInput({ onPaceChange }: PaceInputProps) {
  const [inputMode, setInputMode] = useState<'pace' | 'distance'>('pace');

  // 페이스 직접 입력 (기본값: 6분)
  const [paceMinutes, setPaceMinutes] = useState(() =>
    getLocalStorage('paceMinutes', '6')
  );
  const [paceSeconds, setPaceSeconds] = useState(() =>
    getLocalStorage('paceSeconds', '00')
  );

  // 거리/시간 입력 (기본값: 10km, 1시간)
  const [distance, setDistance] = useState(() =>
    getLocalStorage('distance', '10')
  );
  const [timeHours, setTimeHours] = useState(() =>
    getLocalStorage('timeHours', '1')
  );
  const [timeMinutes, setTimeMinutes] = useState(() =>
    getLocalStorage('timeMinutes', '0')
  );
  const [timeSeconds, setTimeSeconds] = useState(() =>
    getLocalStorage('timeSeconds', '00')
  );

  // 로컬 스토리지에 저장
  useEffect(() => {
    setLocalStorage('paceMinutes', paceMinutes);
  }, [paceMinutes]);

  useEffect(() => {
    setLocalStorage('paceSeconds', paceSeconds);
  }, [paceSeconds]);

  useEffect(() => {
    setLocalStorage('distance', distance);
  }, [distance]);

  useEffect(() => {
    setLocalStorage('timeHours', timeHours);
  }, [timeHours]);

  useEffect(() => {
    setLocalStorage('timeMinutes', timeMinutes);
  }, [timeMinutes]);

  useEffect(() => {
    setLocalStorage('timeSeconds', timeSeconds);
  }, [timeSeconds]);

  // 컴포넌트 마운트 시 초기값으로 자동 계산
  useEffect(() => {
    const mins = parseInt(paceMinutes) || 0;
    const secs = parseInt(paceSeconds) || 0;
    const totalMinutes = mins + secs / 60;
    onPaceChange(totalMinutes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 최초 마운트 시에만 실행

  const handleCalculate = () => {
    if (inputMode === 'pace') {
      const mins = parseInt(paceMinutes) || 0;
      const secs = parseInt(paceSeconds) || 0;
      const totalMinutes = mins + secs / 60;
      onPaceChange(totalMinutes);
    } else {
      const dist = parseFloat(distance) || 1;
      const hours = parseInt(timeHours) || 0;
      const mins = parseInt(timeMinutes) || 0;
      const secs = parseInt(timeSeconds) || 0;
      const totalSeconds = hours * 3600 + mins * 60 + secs;
      const calculatedPace = calculatePaceFromDistanceAndTime(dist, totalSeconds);
      onPaceChange(calculatedPace);
    }
  };

  return (
    <div className="pace-input-container">
      <div className="input-mode-toggle">
        <button
          className={`mode-button ${inputMode === 'pace' ? 'active' : ''}`}
          onClick={() => setInputMode('pace')}
        >
          페이스 직접 입력
        </button>
        <button
          className={`mode-button ${inputMode === 'distance' ? 'active' : ''}`}
          onClick={() => setInputMode('distance')}
        >
          거리/시간 입력
        </button>
      </div>

      <div className="input-form">
        {inputMode === 'pace' ? (
          <div className="input-group">
            <label className="input-label">목표 페이스 (/km)</label>
            <div className="input-row">
              <input
                type="number"
                min="0"
                max="20"
                value={paceMinutes}
                onChange={(e) => setPaceMinutes(e.target.value)}
                className="time-input"
                placeholder="분"
              />
              <span className="input-separator">분</span>
              <input
                type="number"
                min="0"
                max="59"
                value={paceSeconds}
                onChange={(e) => setPaceSeconds(e.target.value)}
                className="time-input"
                placeholder="초"
              />
              <span className="input-unit">초/km</span>
            </div>
          </div>
        ) : (
          <div className="input-group">
            <label className="input-label">거리와 목표 시간</label>

            <div className="distance-presets">
              {DISTANCE_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  className="preset-button"
                  onClick={() => setDistance(preset.distance.toString())}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="input-row">
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="distance-input"
                placeholder="거리"
              />
              <span className="input-unit">km를</span>
              <input
                type="number"
                min="0"
                max="99"
                value={timeHours}
                onChange={(e) => setTimeHours(e.target.value)}
                className="time-input"
                placeholder="시"
              />
              <span className="input-separator">시간</span>
              <input
                type="number"
                min="0"
                max="59"
                value={timeMinutes}
                onChange={(e) => setTimeMinutes(e.target.value)}
                className="time-input"
                placeholder="분"
              />
              <span className="input-separator">분</span>
              <input
                type="number"
                min="0"
                max="59"
                value={timeSeconds}
                onChange={(e) => setTimeSeconds(e.target.value)}
                className="time-input"
                placeholder="초"
              />
              <span className="input-unit">초에</span>
            </div>
          </div>
        )}

        <button className="calculate-button" onClick={handleCalculate}>
          계산하기
        </button>
      </div>
    </div>
  );
}
