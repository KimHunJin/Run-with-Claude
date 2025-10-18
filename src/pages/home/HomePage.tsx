import { useState } from 'react';
import { PaceDetailTable } from '../../features/pace-calculator/ui/PaceDetailTable';
import { PaceInput, GoalPaceCard } from '../../features/goal-pace-calculator';
import { Tabs, type Tab } from '../../shared/ui';
import './HomePage.css';

export function HomePage() {
  const [activeTab, setActiveTab] = useState('goal');
  const [goalPace, setGoalPace] = useState(5); // 기본값: 5분/km

  const tabs: Tab[] = [
    {
      id: 'goal',
      label: '목표 페이스 계산',
      content: (
        <div className="goal-tab-content">
          <PaceInput onPaceChange={setGoalPace} />
          <GoalPaceCard pace={goalPace} />
        </div>
      ),
    },
    {
      id: 'table',
      label: '상세 페이스 표',
      content: (
        <div className="table-tab-content">
          <PaceDetailTable color="#3b82f6" />
        </div>
      ),
    },
  ];

  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="home-title">러닝 페이스 가이드</h1>
        <p className="home-subtitle">
          400m 트랙 기준 페이스별 러닝 속도 시각화
        </p>
        <div className="track-info">
          <span className="track-icon">🏃‍♂️</span>
          <p className="track-description">
            표준 육상 트랙 1바퀴(400m)를 기준으로 다양한 훈련 강도별 페이스를 확인하세요
          </p>
        </div>
      </header>

      <main>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </main>
    </div>
  );
}
