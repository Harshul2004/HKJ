import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import ParticleBackground from './ParticleBackground';
import GlassDistortion from './GlassDistortion';
import XPNotifications from './XPNotifications';
import DevModeOverlay from './DevModeOverlay';
import { useXP } from '../context/XPContext';
import './MainLayout.css';

const MainLayout = () => {
  const { devModeUnlocked } = useXP();

  return (
    <div className={`main-layout ${devModeUnlocked ? 'dev-mode' : ''}`}>
      <ParticleBackground />
      <GlassDistortion />
      {devModeUnlocked && <DevModeOverlay />}
      <TopBar />
      <div className="main-content-wrapper">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <XPNotifications />
    </div>
  );
};

export default MainLayout;
