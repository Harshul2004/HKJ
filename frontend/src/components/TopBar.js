import React from 'react';
import { useXP } from '../context/XPContext';
import './TopBar.css';

const TopBar = () => {
  const { xp, devModeUnlocked, unlockDevMode } = useXP();

  const handleDevModeClick = () => {
    if (xp >= 500 && !devModeUnlocked) {
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
          className={`xp-container ${xp >= 500 && !devModeUnlocked ? 'unlockable' : ''} ${devModeUnlocked ? 'dev-active' : ''}`}
          onClick={handleDevModeClick}
        >
          <div className="xp-info-row">
            <div className="xp-text">
              <span className="xp-label">XP:</span>
              <span className="xp-value">{xp}</span>
              <span className="xp-separator">/</span>
              <span className="xp-target">500</span>
            </div>

            <div className="xp-status-text">
              {devModeUnlocked ? (
                <span className="status-active">DEVELOPER MODE ACTIVE</span>
              ) : (
                <span className="status-pending">
                  {xp >= 500 ? "CLICK TO UNLOCK" : "DEV MODE PROGRESS"}
                </span>
              )}
            </div>
          </div>

          <div className="xp-progress-track">
            <div
              className="xp-progress-fill"
              style={{ width: `${Math.min((xp / 500) * 100, 100)}%` }}
            ></div>
          </div>

          {/* Visual Badge for Dev Mode - Optional/Subtle */}
          {devModeUnlocked && <div className="dev-mode-glow"></div>}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
