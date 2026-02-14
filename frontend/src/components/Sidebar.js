import React from 'react';
import { NavLink } from 'react-router-dom';
import { useXP } from '../context/XPContext';
import './Sidebar.css';

const Sidebar = () => {
  const { addXP } = useXP();

  const navItems = [
    { path: '/system-status', label: 'SYSTEM STATUS', icon: '◉' },
    { path: '/skill-tree', label: 'SKILL TREE', icon: '◈' },
    { path: '/missions', label: 'MISSIONS', icon: '◆' },
    { path: '/audio-vault', label: 'AUDIO VAULT', icon: '◐' },
    { path: '/access-terminal', label: 'ACCESS TERMINAL', icon: '◎' }
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => addXP(5)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="footer-text">v2.1.0</div>
      </div>
    </aside>
  );
};

export default Sidebar;
