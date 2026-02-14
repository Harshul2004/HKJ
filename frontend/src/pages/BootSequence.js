import React, { useState, useEffect } from 'react';
import './BootSequence.css';

const BootSequence = ({ onAccess }) => {
  const [lines, setLines] = useState([]);
  const [showEnter, setShowEnter] = useState(false);

  const bootLines = [
    'HKJ SYSTEM INITIALIZING...',
    'LOADING CORE MODULES...',
    'CALIBRATING INTERFACE...',
    'ESTABLISHING CONNECTION...',
    'ACCESS GRANTED.'
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootLines.length) {
        setLines(prev => [...prev, bootLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowEnter(true), 500);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && showEnter) {
        setTimeout(() => onAccess(), 500);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showEnter, onAccess]);

  return (
    <div className="boot-sequence">
      <div className="boot-container">
        <div className="boot-lines">
          {lines.map((line, index) => (
            <div key={index} className="boot-line">
              <span className="boot-prompt">&gt;</span> {line}
            </div>
          ))}
        </div>
        {showEnter && (
          <div className="boot-enter">
            <div className="enter-text">PRESS ENTER TO ACCESS</div>
            <div className="enter-cursor">_</div>
          </div>
        )}
      </div>
      <div className="boot-background">
        <div className="grid-overlay"></div>
      </div>
    </div>
  );
};

export default BootSequence;
