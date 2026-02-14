import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BootSequence from './pages/BootSequence';
import MainLayout from './components/MainLayout';
import SystemStatus from './pages/SystemStatus';
import SkillTree from './pages/SkillTree';
import Missions from './pages/Missions';
import AudioVault from './pages/AudioVault';
import AccessTerminal from './pages/AccessTerminal';
import { AudioProvider } from './context/AudioContext';
import { XPProvider } from './context/XPContext';
import CustomCursor from './components/CustomCursor';
import GlobalAudioEngine from './components/GlobalAudioEngine';
import './App.css';

function App() {
  const [systemInitialized, setSystemInitialized] = useState(false);

  useEffect(() => {
    const initialized = localStorage.getItem('hkj_system_initialized');
    if (initialized === 'true') {
      setSystemInitialized(true);
    }
  }, []);

  const handleSystemAccess = () => {
    localStorage.setItem('hkj_system_initialized', 'true');
    setSystemInitialized(true);
  };

  return (
    <BrowserRouter>
      <AudioProvider>
        <XPProvider>
          <CustomCursor />
          <GlobalAudioEngine />
          <Routes>
            {!systemInitialized ? (
              <Route path="*" element={<BootSequence onAccess={handleSystemAccess} />} />
            ) : (
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/system-status" replace />} />
                <Route path="system-status" element={<SystemStatus />} />
                <Route path="skill-tree" element={<SkillTree />} />
                <Route path="missions" element={<Missions />} />
                <Route path="audio-vault" element={<AudioVault />} />
                <Route path="access-terminal" element={<AccessTerminal />} />
              </Route>
            )}
          </Routes>
        </XPProvider>
      </AudioProvider>
    </BrowserRouter>
  );
}

export default App;
