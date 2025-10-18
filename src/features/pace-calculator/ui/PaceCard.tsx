import { useState } from 'react';
import type { PaceLevelData } from '../../../shared/types/pace';
import { Modal } from '../../../shared/ui';
import { PaceDetailTable } from './PaceDetailTable';
import './PaceCard.css';

interface PaceCardProps {
  paceData: PaceLevelData;
}

export function PaceCard({ paceData }: PaceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="pace-card"
        style={{ borderColor: paceData.color }}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
      >
        <div className="pace-card-header">
          <h3 className="pace-card-title" style={{ color: paceData.color }}>
            {paceData.label}
          </h3>
          <p className="pace-card-description">{paceData.description}</p>
        </div>

        <div className="pace-card-metrics">
          <div className="metric">
            <span className="metric-label">400m</span>
            <span className="metric-value" style={{ color: paceData.color }}>
              {paceData.time400m}
            </span>
          </div>

          <div className="metric">
            <span className="metric-label">페이스 (/km)</span>
            <span className="metric-value" style={{ color: paceData.color }}>
              {paceData.pace}
            </span>
          </div>

          <div className="metric">
            <span className="metric-label">속도</span>
            <span className="metric-value" style={{ color: paceData.color }}>
              {paceData.speed} km/h
            </span>
          </div>
        </div>

        <div className="pace-card-footer">
          <span className="click-hint">클릭하여 상세 보기</span>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${paceData.label} - 상세 페이스 표`}
      >
        <PaceDetailTable color={paceData.color} />
      </Modal>
    </>
  );
}