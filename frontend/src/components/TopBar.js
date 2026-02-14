import React from 'react';
import { useXP } from '../context/XPContext';
import './TopBar.css';

const TopBar = () => {
  const { xp, devModeUnlocked, unlockDevMode } = useXP();

  const handleDevModeClick = () => {
    if (xp >= 100 && !devModeUnlocked) {
      unlockDevMode();
    }
  };

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div className="system-logo">HKJ SYSTEM</div>
        <div className="system-status">
          <span className="status-dot"></span>
          ONLINE
        </div>
      </div>
      <div className="top-bar-right">
        <div 
          className={`xp-counter ${xp >= 100 && !devModeUnlocked ? 'unlockable' : ''} ${devModeUnlocked ? 'dev-active' : ''}`}
          onClick={handleDevModeClick}
        >
          <span className="xp-label">XP:</span>
          <span className="xp-value">{xp}</span>
          {xp >= 100 && !devModeUnlocked && (
            <span className="xp-hint">CLICK TO UNLOCK</span>
          )}
          {devModeUnlocked && (
            <span className="dev-badge">DEV MODE</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
