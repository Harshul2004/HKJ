import React, { useState } from 'react';
import { useXP } from '../context/XPContext';
import './SkillTree.css';

const SkillTree = () => {
  const { addXP } = useXP();
  const [expandedNode, setExpandedNode] = useState(null);

  const skillTree = {
    core: {
      id: 'core',
      label: 'HKJ CORE',
      description: 'Central processing unit of all capabilities'
    },
    branches: [
      {
        id: 'web',
        label: 'Software & Web Development',
        color: '#00FFFF',
        skills: [
          { name: 'Languages', items: 'Python, C#.NET, JavaScript, JSON' },
          { name: 'Frontend', items: 'React, HTML5, CSS, Tailwind CSS, UI Development' },
          { name: 'Backend', items: 'Node.js, Express.js, REST API integration' },
          { name: 'Databases', items: 'MongoDB, MySQL' },
          { name: 'Methodologies', items: 'SDLC, Logical Reasoning' }
        ]
      },
      {
        id: 'ai',
        label: 'Generative AI & Modern Tooling',
        color: '#0080FF',
        skills: [
          { name: 'AI Assistants', items: 'ChatGPT, Gemini, Deepseek, Perplexity' },
          { name: 'AI Dev Tools', items: 'GitHub Copilot, Cursor, Windsurf, Lovable' },
          { name: 'Content Gen', items: 'AI Image Generation, AI Video Generation' }
        ]
      },
      {
        id: 'design',
        label: 'Design & Creative Media',
        color: '#00DDFF',
        skills: [
          { name: 'UI/UX', items: 'UI & UX Design, Frontend Development' },
          { name: 'Visual Tools', items: 'Photoshop Lightroom CC, Canva, Image Editing' },
          { name: 'Creative', items: 'Color Grading, Digital Art, Music Production, Audio Making' }
        ]
      },
      {
        id: 'professional',
        label: 'Professional & Recruitment',
        color: '#00AAFF',
        skills: [
          { name: 'Acquisition', items: 'Recruitment, CRM, Customer Acquisition' },
          { name: 'Productivity', items: 'MS-Office, Google Workspace, Computer Skills' },
          { name: 'Soft Skills', items: 'Interpersonal Skills, Attention to Detail' },
          { name: 'Languages', items: 'English, Hindi, Punjabi (Spoken)' }
        ]
      },
      {
        id: 'tools',
        label: 'Technical Tools & Environments',
        color: '#0099FF',
        skills: [
          { name: 'Version Control', items: 'GitHub' },
          { name: 'IDEs', items: 'VS Code, Microsoft Visual Studio' },
          { name: 'OS', items: 'Windows' },
          { name: 'No-Code', items: 'No-code development platforms' }
        ]
      }
    ]
  };

  const handleNodeClick = (nodeId) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId);
    addXP(5);
  };

  return (
    <div className="skill-tree-page">
      <div className="page-header">
        <h1 className="page-title">SKILL TREE</h1>
        <div className="page-subtitle">CAPABILITY MATRIX</div>
      </div>

      <div className="skill-tree-container">
        <div className="core-node" onClick={() => handleNodeClick('core')}>
          <div className="core-circle">
            <div className="core-pulse" />
            <div className="core-label">{skillTree.core.label}</div>
          </div>
        </div>

        <div className="branches-container">
          {skillTree.branches.map((branch, index) => (
            <div key={branch.id} className="branch-wrapper" style={{ animationDelay: `${index * 0.1}s` }}>
              <svg className="branch-line" height="100" width="200">
                <line
                  x1="0"
                  y1="50"
                  x2="200"
                  y2="50"
                  stroke={branch.color}
                  strokeWidth="2"
                  opacity="0.5"
                />
              </svg>
              <div
                className={`branch-node ${expandedNode === branch.id ? 'expanded' : ''}`}
                style={{ borderColor: branch.color }}
                onClick={() => handleNodeClick(branch.id)}
              >
                <div className="branch-label" style={{ color: branch.color }}>
                  {branch.label}
                </div>
                {expandedNode === branch.id && (
                  <div className="branch-details">
                    {branch.skills.map((skill, idx) => (
                      <div key={idx} className="skill-item">
                        <div className="skill-name">{skill.name}</div>
                        <div className="skill-items">{skill.items}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillTree;
