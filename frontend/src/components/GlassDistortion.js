import React, { useEffect, useRef } from 'react';
import { useXP } from '../context/XPContext';
import './GlassDistortion.css';

const GlassDistortion = () => {
  const distortionRef = useRef(null);
  const { devModeUnlocked } = useXP();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!distortionRef.current) return;

      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      distortionRef.current.style.background = `
        radial-gradient(
          circle at ${x}% ${y}%,
          rgba(0, 255, 255, ${devModeUnlocked ? '0.15' : '0.08'}),
          rgba(0, 128, 255, ${devModeUnlocked ? '0.1' : '0.05'}),
          transparent 40%
        )
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [devModeUnlocked]);

  return (
    <div 
      ref={distortionRef} 
      className={`glass-distortion ${devModeUnlocked ? 'dev-mode' : ''}`}
    />
  );
};

export default GlassDistortion;
