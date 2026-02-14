import React from 'react';
import { useXP } from '../context/XPContext';
import './SystemStatus.css';

const SystemStatus = () => {
  const { addXP } = useXP();

  const statusData = [
    {
      label: 'NAME',
      value: 'Harshul Kumar Jangra'
    },
    {
      label: 'STATUS',
      value: 'ACTIVE',
      highlight: true
    },
    {
      label: 'EDUCATION',
      value: 'BE, Computer Science & Engineering',
      sub: 'Chitkara University, Punjab (2022 – 2026)'
    },
    {
      label: 'CURRENT ROLE',
      value: 'Talent Acquisition Intern',
      sub: 'Tryfacta Inc, Mohali (Nov 2025 – Present)'
    },
    {
      label: 'PRIMARY FOCUS',
      value: 'Full-Stack Development • AI Integration • System Design'
    },
    {
      label: 'PHILOSOPHY',
      value: 'Building engineered digital experiences that merge functionality with aesthetic precision'
    }
  ];

  return (
    <div className="system-status-page">
      <div className="page-header">
        <h1 className="page-title">SYSTEM STATUS</h1>
        <div className="page-subtitle">DIAGNOSTIC PANEL</div>
      </div>

      <div className="status-grid">
        {statusData.map((item, index) => (
          <div 
            key={index} 
            className="status-card glass"
            onClick={() => addXP(5)}
          >
            <div className="status-label">{item.label}</div>
            <div className={`status-value ${item.highlight ? 'highlight' : ''}`}>
              {item.value}
            </div>
            {item.sub && <div className="status-sub">{item.sub}</div>}
          </div>
        ))}
      </div>

      <div className="objectives-section glass-strong">
        <h2 className="section-title">CURRENT OBJECTIVES</h2>
        <div className="objectives-list">
          <div className="objective-item">
            <span className="objective-icon">▸</span>
            <span>Develop production-grade web applications</span>
          </div>
          <div className="objective-item">
            <span className="objective-icon">▸</span>
            <span>Master modern AI integration patterns</span>
          </div>
          <div className="objective-item">
            <span className="objective-icon">▸</span>
            <span>Create immersive user experiences</span>
          </div>
          <div className="objective-item">
            <span className="objective-icon">▸</span>
            <span>Bridge design and engineering excellence</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
