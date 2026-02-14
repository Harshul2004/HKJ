import React from 'react';
import { useXP } from '../context/XPContext';
import './XPNotifications.css';

const XPNotifications = () => {
  const { showXPNotification, showDevModeNotification } = useXP();

  return (
    <>
      {showXPNotification && (
        <div className="xp-notification">
          +5 XP
        </div>
      )}
      {showDevModeNotification && (
        <div className="dev-mode-notification">
          <div className="notification-title">DEVELOPER MODE AVAILABLE</div>
          <div className="notification-text">Click XP counter to unlock</div>
        </div>
      )}
    </>
  );
};

export default XPNotifications;
