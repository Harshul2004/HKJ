import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './SkillTree.css';

const initialNodes = [
  // CORe Node
  {
    id: 'core',
    type: 'default',
    data: { label: 'HKJ CORE' },
    position: { x: 0, y: 0 },
    className: 'node-core',
  },

  // 1. Software & Web Development (Top)
  {
    id: 'web',
    data: { label: 'Software & Web Dev' },
    position: { x: 0, y: -300 },
    className: 'node-branch node-web',
  },
  {
    id: 'web-lang',
    data: { label: 'Languages: Python, C#.NET, JS, JSON' },
    position: { x: -250, y: -450 },
    className: 'node-child',
    style: { width: 180 },
  },
  {
    id: 'web-front',
    data: { label: 'Frontend: React, HTML5, CSS, Tailwind' },
    position: { x: 0, y: -500 },
    className: 'node-child',
    style: { width: 180 },
  },
  {
    id: 'web-back',
    data: { label: 'Backend: Node.js, Express, REST' },
    position: { x: 250, y: -450 },
    className: 'node-child',
    style: { width: 180 },
  },
  {
    id: 'web-db',
    data: { label: 'Databases: MongoDB, MySQL' },
    position: { x: 350, y: -350 },
    className: 'node-child',
  },
  {
    id: 'web-method',
    data: { label: 'Methodologies: SDLC, Logic' },
    position: { x: -350, y: -350 },
    className: 'node-child',
  },

  // 2. Generative AI & Modern Tooling (Top Right)
  {
    id: 'ai',
    data: { label: 'Gen AI & Tools' },
    position: { x: 400, y: -150 },
    className: 'node-branch node-ai',
  },
  {
    id: 'ai-assist',
    data: { label: 'Assistants: ChatGPT, Gemini, Deepseek' },
    position: { x: 600, y: -250 },
    className: 'node-child',
    style: { width: 180 },
  },
  {
    id: 'ai-dev',
    data: { label: 'Dev Tools: Copilot, Cursor, Lovable' },
    position: { x: 650, y: -100 },
    className: 'node-child',
    style: { width: 180 },
  },
  {
    id: 'ai-content',
    data: { label: 'Content Gen: Image & Video' },
    position: { x: 550, y: 0 },
    className: 'node-child',
  },

  // 3. Design & Creative Media (Bottom Right)
  {
    id: 'design',
    data: { label: 'Design & Creative' },
    position: { x: 300, y: 250 },
    className: 'node-branch node-design',
  },
  {
    id: 'design-ui',
    data: { label: 'UI/UX & Frontend' },
    position: { x: 450, y: 350 },
    className: 'node-child',
  },
  {
    id: 'design-visual',
    data: { label: 'Visual: PS/LR, Canva' },
    position: { x: 300, y: 450 },
    className: 'node-child',
  },
  {
    id: 'design-creative',
    data: { label: 'Creative: Audio, Color, Art' },
    position: { x: 150, y: 350 },
    className: 'node-child',
  },

  // 4. Professional & Recruitment (Bottom Left)
  {
    id: 'prof',
    data: { label: 'Professional Ops' },
    position: { x: -300, y: 250 },
    className: 'node-branch node-prof',
  },
  {
    id: 'prof-talent',
    data: { label: 'Talent Acquisition & CRM' },
    position: { x: -450, y: 350 },
    className: 'node-child',
    style: { width: 180 },
  },
  {
    id: 'prof-prod',
    data: { label: 'Productivity: Office, Google' },
    position: { x: -300, y: 450 },
    className: 'node-child',
    style: { width: 180 },
  },
  {
    id: 'prof-soft',
    data: { label: 'Soft Skills & Detail' },
    position: { x: -150, y: 350 },
    className: 'node-child',
  },
  {
    id: 'prof-lang',
    data: { label: 'Languages: En, Hi, Pb' },
    position: { x: -500, y: 200 },
    className: 'node-child',
  },

  // 5. Technical Tools & Environments (Top Left)
  {
    id: 'tools',
    data: { label: 'Tech Tools & Env' },
    position: { x: -400, y: -150 },
    className: 'node-branch node-tools',
  },
  {
    id: 'tools-git',
    data: { label: 'Version Control: GitHub' },
    position: { x: -600, y: -250 },
    className: 'node-child',
  },
  {
    id: 'tools-ide',
    data: { label: 'IDEs: VS Code, Visual Studio' },
    position: { x: -650, y: -100 },
    className: 'node-child',
    style: { width: 180 },
  },
  {
    id: 'tools-os',
    data: { label: 'OS: Windows' },
    position: { x: -550, y: 0 },
    className: 'node-child',
  },
  {
    id: 'tools-nocode',
    data: { label: 'No-Code Platforms' },
    position: { x: -500, y: -350 },
    className: 'node-child',
  },
];

const initialEdges = [
  // Core to Branches
  { id: 'e-core-web', source: 'core', target: 'web', animated: true, style: { stroke: '#00ffff' } },
  { id: 'e-core-ai', source: 'core', target: 'ai', animated: true, style: { stroke: '#00ffff' } },
  { id: 'e-core-design', source: 'core', target: 'design', animated: true, style: { stroke: '#00ffff' } },
  { id: 'e-core-prof', source: 'core', target: 'prof', animated: true, style: { stroke: '#00ffff' } },
  { id: 'e-core-tools', source: 'core', target: 'tools', animated: true, style: { stroke: '#00ffff' } },

  // Web Branch
  { id: 'e-web-lang', source: 'web', target: 'web-lang', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-web-front', source: 'web', target: 'web-front', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-web-back', source: 'web', target: 'web-back', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-web-db', source: 'web', target: 'web-db', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-web-method', source: 'web', target: 'web-method', type: 'smoothstep', style: { stroke: '#00ffff' } },

  // AI Branch
  { id: 'e-ai-assist', source: 'ai', target: 'ai-assist', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-ai-dev', source: 'ai', target: 'ai-dev', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-ai-content', source: 'ai', target: 'ai-content', type: 'smoothstep', style: { stroke: '#00ffff' } },

  // Design Branch
  { id: 'e-design-ui', source: 'design', target: 'design-ui', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-design-visual', source: 'design', target: 'design-visual', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-design-creative', source: 'design', target: 'design-creative', type: 'smoothstep', style: { stroke: '#00ffff' } },

  // Professional Branch
  { id: 'e-prof-talent', source: 'prof', target: 'prof-talent', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-prof-prod', source: 'prof', target: 'prof-prod', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-prof-soft', source: 'prof', target: 'prof-soft', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-prof-lang', source: 'prof', target: 'prof-lang', type: 'smoothstep', style: { stroke: '#00ffff' } },

  // Tools Branch
  { id: 'e-tools-git', source: 'tools', target: 'tools-git', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-tools-ide', source: 'tools', target: 'tools-ide', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-tools-os', source: 'tools', target: 'tools-os', type: 'smoothstep', style: { stroke: '#00ffff' } },
  { id: 'e-tools-nocode', source: 'tools', target: 'tools-nocode', type: 'smoothstep', style: { stroke: '#00ffff' } },
];

const SkillTree = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = (event, node) => {
    console.log('Node clicked:', node.data.label);
  };

  return (
    <div className="skill-tree-page">
      <div className="page-header">
        <h1 className="page-title">SKILL TREE</h1>
        <div className="page-subtitle">CAPABILITY MATRIX</div>
      </div>
      <div className="skill-tree-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          attributionPosition="bottom-right"
          nodesDraggable={false}
          panOnDrag={true}
          zoomOnScroll={true}
        >
          <Background color="#00ffff" gap={20} size={1} style={{ opacity: 0.1 }} />
          <Controls style={{ fill: '#00ffff' }} />
          {/* MiniMap is optional, adding if needed */}
        </ReactFlow>
      </div>
    </div>
  );
};

export default SkillTree;
