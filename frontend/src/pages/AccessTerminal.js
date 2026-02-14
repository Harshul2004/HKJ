import React, { useState, useEffect, useRef } from 'react';
import { useXP } from '../context/XPContext';
import { useAudio } from '../context/AudioContext';
import './AccessTerminal.css';

const AccessTerminal = () => {
  const { xp, addXP, devModeUnlocked, triggerXPBoost } = useXP();
  const { currentTrack, isPlaying } = useAudio();

  const [terminalLines, setTerminalLines] = useState([
    '> HKJ SYSTEM TERMINAL v2.1.0',
    '> INITIALIZING...',
    '> DEVELOPER MODE: ACTIVE',
    '> TYPE "help" FOR COMMAND LIST'
  ]);
  const [input, setInput] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [glitchMode, setGlitchMode] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);

  const bottomRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLines]);

  const commands = {
    help: () => {
      return [
        '> FULL COMMAND REGISTRY:',
        '> ----------------------',
        '> [BASIC]',
        '> help, clear, connect',
        '',
        '> [PROFILE]',
        '> whoami, about, experience, stack',
        '> skills, missions, hire, why',
        '',
        '> [SYSTEM]',
        '> stats, system, music_status, music, aura',
        '',
        '> [INTERACTIVE]',
        '> choose, legend, coffee, burnout',
        '',
        '> [DEV MODE - LEVEL 500+]',
        '> unlock_hkj, xp_boost, override, core_dump',
        '> evolve, shadow, identity, 404'
      ];
    },
    'help --all': () => commands.help(),
    clear: () => {
      setTerminalLines(['> TERMINAL CLEARED']);
      return [];
    },
    connect: () => {
      setShowForm(true);
      return ['> INITIALIZING CONTACT PROTOCOL...', '> SECURE CHANNEL ESTABLISHED'];
    },
    whoami: () => {
      return [
        '> USER: HKJ SYSTEM CORE',
        '> ROLE: FRONTEND ARCHITECT',
        '> CLASS: AUDIO-DRIVEN INTERFACE DESIGNER',
        '> STATUS: ACTIVE'
      ];
    },
    about: () => {
      return [
        '> SYSTEM SUMMARY:',
        '> High-performance frontend architecture built on React.',
        '> Focused on premium UI/UX, glassmorphism, and audio integration.',
        '> Driven by obsession. Refined by repetition.'
      ];
    },
    experience: () => {
      return [
        '> HKJ EXPERIENCE:',
        '> Frontend Architecture',
        '> Immersive Interface Design',
        '> Audio-Driven UI Systems',
        '> Deployment Pipeline: GitHub -> Vercel'
      ];
    },
    stack: () => {
      return [
        '> TECH STACK:',
        '> Frontend: React / CRACO',
        '> State: Global XP Store',
        '> UI: Glassmorphism / Motion Effects',
        '> Audio: YouTube Iframe API',
        '> Deployment: CI/CD via Vercel'
      ];
    },
    choose: () => {
      return [
        '> CHOOSE YOUR PATH:',
        '> 1 - Skills',
        '> 2 - Missions',
        '> 3 - Music',
        '> Type "1", "2", or "3" to select.'
      ];
    },
    '1': () => commands.skills(),
    '2': () => commands.missions(),
    '3': () => commands.music_status(),
    skills: () => {
      return [
        '> SKILL MATRIX:',
        '> [React, Redux, Next.js] ........ 98%',
        '> [JavaScript, TypeScript] ....... 95%',
        '> [CSS3, Tailwind, Framer] ....... 99%',
        '> [Node.js, Express] ............. 90%',
        '> [Audio Engineering] ............ 85%'
      ];
    },
    missions: () => {
      return [
        '> MISSION LOGS:',
        '> - HKJ CORE SYSTEM (Active)',
        '> - PROJECT: NEON (Completed)',
        '> - PROJECT: VELOCITY (In Progress)',
        '> Access "Missions" tab for full details.'
      ];
    },
    stats: () => {
      return [
        '> SYSTEM STATISTICS:',
        `> XP LEVEL: ${xp} / 500`,
        `> MODE: ${devModeUnlocked ? 'DEVELOPER' : 'STANDARD'}`,
        `> AUDIO ENGINE: ${isPlaying ? 'ONLINE' : 'STANDBY'}`,
        '> SYSTEM STABILITY: 99.9%'
      ];
    },
    system: () => {
      return [
        '> MODULE STATUS:',
        '> [AUDIO ENGINE] ...... ONLINE',
        '> [SKILL MATRIX] ...... ONLINE',
        '> [MISSION LOGS] ...... ONLINE',
        '> [TERMINAL] .......... ACTIVE'
      ];
    },
    music_status: () => {
      return [
        '> AUDIO ENGINE REPORT:',
        `> STATUS: ${isPlaying ? 'PLAYING' : 'PAUSED'}`,
        `> TRACK: ${currentTrack || 'NONE'}`,
        '> FREQUENCY: STABLE'
      ];
    },
    music: () => commands.music_status(),
    legend: () => {
      return [
        '> LEGEND STATUS NOT DECLARED.',
        '> WORK IN PROGRESS.'
      ];
    },
    coffee: () => {
      return [
        '> CAFFEINE LEVEL: OPERATIONAL.'
      ];
    },
    burnout: () => {
      return [
        '> BURNOUT RISK DETECTED.',
        '> MITIGATION STRATEGY: MUSIC + MOTION.'
      ];
    },
    hire: () => {
      return [
        '> SYSTEM RESPONSE:',
        '> FIT DEPENDS ON AMBITION.',
        '> CHALLENGE ACCEPTED.'
      ];
    },
    why: () => {
      return [
        '> BECAUSE ORDINARY INTERFACES ARE FORGETTABLE.',
        '> THIS ONE ISNT.'
      ];
    },
    aura: () => {
      return [
        '> AURA ANALYSIS:',
        '> CONFIDENCE: ELEVATED',
        '> EXECUTION: PRECISE',
        '> TOLERANCE FOR AVERAGE: 0%'
      ];
    },
    director_mode: () => {
      return [
        '> DIRECTOR OVERRIDE ATTEMPT DETECTED.',
        '> AUTHORITY LEVEL VERIFIED.',
        '> WELCOME BACK, DIRECTOR.'
      ];
    },
    hkj: () => {
      return [
        '> IDENTITY VERIFICATION:',
        '> NOT A TEMPLATE.',
        '> NOT A CLONE.',
        '> NOT AVERAGE.'
      ];
    },
    matrix: () => {
      setMatrixMode(true);
      setTimeout(() => setMatrixMode(false), 3000);
      return [
        '> INITIATING VISUAL DIAGNOSTICS...',
        '> REALITY ENGINE: GLITCHING...',
        '> RESTORING STABILITY...'
      ];
    },
    evolve: () => {
      if (!devModeUnlocked) {
        return ['> ACCESS DENIED.', '> DEVELOPER MODE REQUIRED.'];
      }
      setMatrixMode(true);
      setTimeout(() => setMatrixMode(false), 3000);
      return [
        '> EVOLUTION ACKNOWLEDGED.',
        '> SYSTEM EXPANDING...'
      ];
    },
    shadow: () => {
      if (!devModeUnlocked) {
        return ['> ACCESS DENIED.'];
      }
      return [
        '> NOT EVERYTHING IS DOCUMENTED.'
      ];
    },
    xp_boost: () => {
      const success = triggerXPBoost();
      if (success) {
        return [
          '> XP SUPPLEMENT REQUESTED...',
          '> APPROVED.',
          '> +25 XP ADDED TO USER PROFILE.'
        ];
      } else {
        return [
          '> REQUEST DENIED.',
          '> BOOST ALREADY CONSUMED OR NOT APPLICABLE.',
          '> EARN IT.'
        ];
      }
    },
    unlock_hkj: () => {
      return [
        '> DECRYPTING...',
        '> "THE BEST WAY TO PREDICT THE FUTURE IS TO ENGINEER IT."',
        '> - HKJ'
      ];
    },
    identity: () => {
      return [
        '> CORE PHILOSOPHY:',
        '> BUILT FROM OBSESSION.',
        '> REFINED BY REPETITION.',
        '> POWERED BY AUDIO.'
      ];
    },
    override: () => {
      setGlitchMode(true);
      setTimeout(() => setGlitchMode(false), 2000);
      return [
        '> SYSTEM OVERRIDE INITIATED...',
        '> BYPASSING SECURITY...',
        '> ACCESS GRANTED.'
      ];
    },
    core_dump: () => {
      return [
        '> CORE DUMP:',
        '> MEMORY: 16TB [VIRTUAL]',
        '> PROCESSOR: QUANTUM [SIMULATED]',
        '> UPTIME: INFINITE',
        '> ERROR LOGS: 0'
      ];
    },
    404: () => {
      return [
        '> SEARCHING FOR AVERAGE...',
        '> RESULT: NOT FOUND.'
      ];
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const rawCommand = input.trim();
    const commandKey = rawCommand.toLowerCase();

    setTerminalLines(prev => [...prev, `> ${rawCommand}`]);

    if (commands[commandKey]) {
      const output = commands[commandKey]();
      if (output) {
        setTerminalLines(prev => [...prev, ...output]);
      }
      addXP(2); // Small XP for using terminal
    } else {
      setTerminalLines(prev => [
        ...prev,
        `> COMMAND NOT RECOGNIZED: "${rawCommand}"`,
        '> TYPE "help" FOR AVAILABLE COMMANDS.'
      ]);
    }

    setInput('');
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setTerminalLines(prev => [...prev, '> TRANSMITTING MESSAGE...']);

    // Simulate API call
    setTimeout(() => {
      setTerminalLines(prev => [
        ...prev,
        '> TRANSMISSION SUCCESSFUL.',
        '> CONNECTION TERMINATED.',
        '> STANDING BY.'
      ]);
      setSubmitted(true);
      addXP(10);
    }, 1500);
  };

  if (!devModeUnlocked) {
    return (
      <div className="access-terminal-page restricted-mode">
        <div className="page-header">
          <h1 className="page-title">ACCESS TERMINAL</h1>
          <div className="page-subtitle">SECURE CONNECTION</div>
        </div>

        <div className="restricted-container glass-panel">
          <div className="lock-icon">🔒</div>
          <h2>ACCESS RESTRICTED</h2>
          <p>DEVELOPER MODE REQUIRED</p>

          <div className="progress-section">
            <div className="progress-label">
              <span>SYSTEM ACCESS PROGRESS</span>
              <span>{xp} / 500 XP</span>
            </div>
            <div className="restricted-progress-track">
              <div
                className="restricted-progress-fill"
                style={{ width: `${Math.min((xp / 500) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="hint-text">EXPLORE THE SYSTEM TO EARN XP</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`access-terminal-page ${glitchMode ? 'glitch-active' : ''} ${matrixMode ? 'matrix-active' : ''}`}>
      <div className="page-header">
        <h1 className="page-title">ACCESS TERMINAL</h1>
        <div className="page-subtitle">COMMUNICATION INTERFACE</div>
      </div>

      <div className="terminal-container glass-strong">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button red"></span>
            <span className="terminal-button yellow"></span>
            <span className="terminal-button green"></span>
          </div>
          <div className="terminal-title">HKJ_TERMINAL_ROOT_ACCESS</div>
        </div>

        <div className="terminal-body">
          <div className="terminal-output">
            {terminalLines.map((line, idx) => (
              <div key={idx} className="terminal-line">{line}</div>
            ))}
            <div ref={bottomRef} />
          </div>

          {!showForm ? (
            <form onSubmit={handleInputSubmit} className="terminal-input-form">
              <span className="terminal-prompt">{'>'}</span>
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className="terminal-input"
                placeholder="ENTER COMMAND..."
                autoFocus
                spellCheck="false"
              />
            </form>
          ) : (
            <div className="form-placeholder-message">
              {'> FORM ACTIVE BELOW...'}
            </div>
          )}
        </div>
      </div>

      {showForm && !submitted && (
        <div className="contact-form-container glass-strong">
          <h2 className="form-title">CONTACT PROTOCOL</h2>
          <form onSubmit={handleFormSubmit} className="contact-form">
            <div className="form-group">
              <label className="form-label">
                <span className="label-prompt">{'>'}</span> NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="form-input"
                required
                placeholder="IDENTITY..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-prompt">{'>'}</span> EMAIL
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="form-input"
                required
                placeholder="CONTACT FREQUENCY..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-prompt">{'>'}</span> MESSAGE
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                className="form-textarea"
                required
                rows="6"
                placeholder="DATA PACKET..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="form-submit">TRANSMIT</button>
              <button
                type="button"
                className="form-cancel"
                onClick={() => setShowForm(false)}
              >
                ABORT
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccessTerminal;
