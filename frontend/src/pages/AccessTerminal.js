import React, { useState } from 'react';
import { useXP } from '../context/XPContext';
import './AccessTerminal.css';

const AccessTerminal = () => {
  const { addXP, devModeUnlocked } = useXP();
  const [terminalLines, setTerminalLines] = useState([
    '> HKJ TERMINAL v2.1.0',
    '> Ready for communication',
    '> Type "connect" to initiate contact protocol'
  ]);
  const [input, setInput] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    
    setTerminalLines(prev => [...prev, `> ${input}`]);
    
    if (command === 'connect') {
      setTerminalLines(prev => [...prev, '> Initializing contact protocol...', '> Access granted']);
      setShowForm(true);
      addXP(5);
    } else if (command === 'unlock_hkj' && devModeUnlocked) {
      setTerminalLines(prev => [
        ...prev,
        '> EASTER EGG UNLOCKED!',
        '> "The best way to predict the future is to engineer it."',
        '> - HKJ System Philosophy',
        '> Special access: github.com/harshul-jangra (concept link)'
      ]);
      addXP(10);
    } else if (command === 'help') {
      setTerminalLines(prev => [
        ...prev,
        '> Available commands:',
        '> connect - Initialize contact form',
        '> help - Show this message',
        '> clear - Clear terminal'
      ]);
    } else if (command === 'clear') {
      setTerminalLines([
        '> Terminal cleared',
        '> Type "connect" to initiate contact protocol'
      ]);
      setShowForm(false);
    } else {
      setTerminalLines(prev => [...prev, `> Command not recognized: ${command}`, '> Type "help" for available commands']);
    }
    
    setInput('');
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setTerminalLines(prev => [
          ...prev,
          '> Message transmission successful',
          '> Connection established',
          `> Response expected within 24-48 hours`,
          '> Thank you for reaching out'
        ]);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        addXP(10);
      } else {
        setTerminalLines(prev => [...prev, '> Error: Transmission failed', '> Please try again']);
      }
    } catch (error) {
      setTerminalLines(prev => [...prev, '> Error: Connection failed', '> Please try again later']);
    }
  };

  return (
    <div className="access-terminal-page">
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
          <div className="terminal-title">HKJ_TERMINAL</div>
        </div>

        <div className="terminal-body">
          <div className="terminal-output">
            {terminalLines.map((line, idx) => (
              <div key={idx} className="terminal-line">{line}</div>
            ))}
          </div>

          {!showForm && (
            <form onSubmit={handleInputSubmit} className="terminal-input-form">
              <span className="terminal-prompt">&gt;</span>
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className="terminal-input"
                placeholder="Enter command..."
                autoFocus
              />
            </form>
          )}
        </div>
      </div>

      {showForm && !submitted && (
        <div className="contact-form-container glass-strong">
          <h2 className="form-title">CONTACT PROTOCOL</h2>
          <form onSubmit={handleFormSubmit} className="contact-form">
            <div className="form-group">
              <label className="form-label">
                <span className="label-prompt">&gt;</span> NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="form-input"
                required
                placeholder="Enter your name..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-prompt">&gt;</span> EMAIL
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="form-input"
                required
                placeholder="Enter your email..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-prompt">&gt;</span> MESSAGE
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                className="form-textarea"
                required
                rows="6"
                placeholder="Enter your message..."
              />
            </div>

            <button type="submit" className="form-submit">
              TRANSMIT MESSAGE
            </button>
          </form>

          <div className="contact-info">
            <div className="info-item">
              <span className="info-label">EMAIL:</span>
              <span className="info-value">jangraharshul@gmail.com</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessTerminal;
