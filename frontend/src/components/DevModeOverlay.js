import React, { useEffect, useState } from 'react';
import './DevModeOverlay.css';

const DevModeOverlay = () => {
  const [messages, setMessages] = useState([
    'DEVELOPER MODE ACTIVE',
    'ENHANCED VISUALS ENABLED',
    'SYSTEM PERFORMANCE: OPTIMAL',
    'EASTER EGG: Type "unlock_hkj" in terminal'
  ]);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);

    const glitchInterval = setInterval(() => {
      setShowGlitch(true);
      setTimeout(() => setShowGlitch(false), 200);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, [messages.length]);

  return (
    <>
      <div className="dev-mode-overlay" />
      <div className="dev-mode-indicator">
        <div className="dev-pulse" />
        <span className="dev-text">{messages[currentMessage]}</span>
      </div>
      {showGlitch && <div className="glitch-overlay" />}
    </>
  );
};

export default DevModeOverlay;
