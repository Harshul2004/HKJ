import React, { useState } from 'react';
import { useXP } from '../context/XPContext';
import './Missions.css';

const Missions = () => {
  const { addXP } = useXP();
  const [selectedMission, setSelectedMission] = useState(null);

  const missions = [
    {
      id: 1,
      name: 'Simple POS',
      objective: 'Secure, Local, Efficient Billing System',
      status: 'ACTIVE',
      duration: 'July 2025 – Present',
      techStack: ['Python', 'tkinter', 'SQLite'],
      details: [
        'Built a robust system with over 1,300 lines of code supporting 100% end-to-end billing',
        'Implemented architecture handling 5+ core operations including cart management',
        'Designed dynamic cart logic with instant total recalculation in <10ms',
        'Developed password-protected Admin Panel for inventory operations',
        'Created Sales Dashboard for 100% sales data access across custom date ranges',
        'Optimized with Dark mode UI and 10+ color-coded buttons',
        'Reduced total app size to under 20 MB'
      ]
    },
    {
      id: 2,
      name: 'Audio Format Converter',
      objective: 'Audio Format & Audio-to-Video Conversion Tools',
      status: 'COMPLETED',
      duration: 'Jan 2025 – Apr 2025 | Aug 2024 – Nov 2024',
      techStack: ['Python', 'FFmpeg', 'Multi-threading'],
      details: [
        'Orchestrated Python-based tools utilizing FFmpeg for local, secure processing',
        'Successfully tested across 500+ audio files',
        'Ensured real-time conversion with live status updates',
        'Reduced average conversion time by 30% through multi-threading',
        'Integrated real-time progress tracking reducing user errors by 40%'
      ]
    },
    {
      id: 3,
      name: 'SnapMINT',
      objective: 'Online Library for Sharing Artworks',
      status: 'COMPLETED',
      duration: 'Jan 2024 – June 2024',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      details: [
        'Developed using MERN stack',
        'Enabled 20+ student artists to showcase work',
        'Supported 100+ artwork uploads with fast retrieval',
        'Built profile systems and live feeds with follow/update features',
        'Increased artist engagement by 30%',
        'Created modular admin panel using PDFKit for activity reports',
        'Cut manual generation time by 70%'
      ]
    },
    {
      id: 4,
      name: 'Bhagat Ji Fast Food',
      objective: 'E-Commerce Website',
      status: 'COMPLETED',
      duration: 'Aug 2023 – Nov 2023',
      techStack: ['HTML5', 'CSS3', 'Tailwind CSS', 'Netlify', 'Git'],
      details: [
        'Crafted mobile-first cloud-based solution for real-world restaurant',
        'Optimized page load times by 30%',
        'Engineered secure login system',
        'Built cart functionality supporting 90+ menu items',
        'Handled 20+ concurrent sessions'
      ]
    },
    {
      id: 5,
      name: 'Speech to Text Translation',
      objective: 'Real-time Speech Transcription Tool',
      status: 'COMPLETED',
      duration: 'Nov 2022 – March 2023',
      techStack: ['Python', 'Google Translation API'],
      details: [
        'Developed Python application for instant transcription',
        'Provided "Listening..." prompt for user feedback',
        'Automated saving of transcribed text into .txt files',
        'Utilized Google translation packages for effective translation'
      ]
    },
    {
      id: 6,
      name: 'Interactive Survey Form',
      objective: 'Animated Survey Collection System',
      status: 'COMPLETED',
      duration: 'Apr 2023 – July 2023',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      details: [
        'Built with HTML, CSS, and JavaScript',
        'Featured animated transitions for each question',
        'Enhanced user engagement through interactive design',
        'Included admin login for secure response management'
      ]
    }
  ];

  const handleMissionClick = (mission) => {
    setSelectedMission(selectedMission?.id === mission.id ? null : mission);
    addXP(5);
  };

  return (
    <div className="missions-page">
      <div className="page-header">
        <h1 className="page-title">MISSIONS</h1>
        <div className="page-subtitle">PROJECT LOGS</div>
      </div>

      <div className="missions-grid">
        {missions.map((mission) => (
          <div key={mission.id} className="mission-card glass">
            <div className="mission-header" onClick={() => handleMissionClick(mission)}>
              <div className="mission-id">MISSION #{mission.id.toString().padStart(3, '0')}</div>
              <div className={`mission-status ${mission.status.toLowerCase()}`}>
                {mission.status}
              </div>
            </div>
            <h3 className="mission-name">{mission.name}</h3>
            <div className="mission-objective">{mission.objective}</div>
            <div className="mission-duration">{mission.duration}</div>
            
            <div className="mission-tech">
              {mission.techStack.map((tech, idx) => (
                <span key={idx} className="tech-tag">{tech}</span>
              ))}
            </div>

            <button 
              className="mission-expand"
              onClick={() => handleMissionClick(mission)}
            >
              {selectedMission?.id === mission.id ? 'COLLAPSE' : 'VIEW DETAILS'}
            </button>
          </div>
        ))}
      </div>

      {selectedMission && (
        <div className="mission-detail-panel glass-strong">
          <div className="detail-header">
            <h2 className="detail-title">{selectedMission.name}</h2>
            <button 
              className="detail-close"
              onClick={() => setSelectedMission(null)}
            >
              ×
            </button>
          </div>
          <div className="detail-content">
            <h3 className="detail-section-title">MISSION BRIEFING</h3>
            <ul className="detail-list">
              {selectedMission.details.map((detail, idx) => (
                <li key={idx} className="detail-item">
                  <span className="detail-bullet">▸</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Missions;
