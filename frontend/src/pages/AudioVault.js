import React, { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { useXP } from '../context/XPContext';
import './AudioVault.css';

const AudioVault = () => {
  const { setYoutubePlayback } = useAudio();
  const { addXP } = useXP();
  const [isPlaying, setIsPlaying] = useState(false);

  const playlistUrl = 'https://youtube.com/playlist?list=PLdopaBPe4-jlgTgsolJdF7nwBCJqap4CB&si=gYd-3mp1wUzanWdo';
  const embedUrl = 'https://www.youtube.com/embed/videoseries?list=PLdopaBPe4-jlgTgsolJdF7nwBCJqap4CB&autoplay=0';

  useEffect(() => {
    addXP(5);
  }, []);

  useEffect(() => {
    setYoutubePlayback(isPlaying);
  }, [isPlaying, setYoutubePlayback]);

  return (
    <div className="audio-vault-page">
      <div className="page-header">
        <h1 className="page-title">AUDIO VAULT</h1>
        <div className="page-subtitle">SONIC ARCHIVE</div>
      </div>

      <div className="audio-console">
        <div className="console-left">
          <div className="player-frame glass-strong">
            <iframe
              src={embedUrl}
              width="100%"
              height="400"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Audio Vault Playlist"
              onLoad={() => {
                const iframe = document.querySelector('.player-frame iframe');
                if (iframe) {
                  iframe.contentWindow.postMessage(JSON.stringify({ event: 'listening' }), '*');
                }
              }}
            />
          </div>
          <div className="player-description glass">
            <h3 className="description-title">COLLECTION INFO</h3>
            <p className="description-text">
              Curated selection of audio works spanning music production, sound design, and creative audio engineering. 
              Each track represents a unique exploration in sonic landscapes and auditory experiences.
            </p>
          </div>
        </div>

        <div className="console-right">
          <div className="now-playing-panel glass-strong">
            <div className="panel-header">
              <h2 className="panel-title">NOW PLAYING</h2>
              <div className={`play-indicator ${isPlaying ? 'active' : ''}`}>
                <span className="indicator-dot"></span>
                {isPlaying ? 'ACTIVE' : 'STANDBY'}
              </div>
            </div>

            <div className="equalizer">
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
            </div>

            <div className="player-controls">
              <button 
                className="control-button"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>

            <a 
              href={playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
              onClick={() => addXP(5)}
            >
              <span>OPEN IN YOUTUBE MUSIC</span>
              <span className="link-icon">↗</span>
            </a>
          </div>

          <div className="audio-specs glass">
            <h3 className="specs-title">VAULT SPECIFICATIONS</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <div className="spec-label">FORMAT</div>
                <div className="spec-value">STREAMING</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">SOURCE</div>
                <div className="spec-value">YOUTUBE</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">TYPE</div>
                <div className="spec-value">PLAYLIST</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">ACCESS</div>
                <div className="spec-value">PUBLIC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioVault;
