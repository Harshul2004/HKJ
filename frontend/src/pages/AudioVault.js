import React, { useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { useXP } from '../context/XPContext';
import './AudioVault.css';

const AudioVault = () => {
  const { isPlaying, isReady, currentTrack, activePlaylist, switchPlaylist, controls } = useAudio();
  const { addXP } = useXP();

  // Playlist Constants (Verified Mappings)
  const PLAYLIST_ENGLISH = 'PLdopaBPe4-jlgTgsolJdF7nwBCJqap4CB';
  const PLAYLIST_PUNJABI = 'PLdopaBPe4-jkSQ3G4JyJ9HujlLbZ9gwo4';

  useEffect(() => {
    addXP(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    if (!isReady) return;

    if (isPlaying) {
      controls.pause();
    } else {
      controls.play();
      addXP(5);
    }
  };

  const loadEnglish = () => {
    if (activePlaylist !== PLAYLIST_ENGLISH) {
      switchPlaylist(PLAYLIST_ENGLISH);
      addXP(10);
    } else if (!isPlaying) {
      controls.play();
    }
  };

  const loadPunjabi = () => {
    if (activePlaylist !== PLAYLIST_PUNJABI) {
      switchPlaylist(PLAYLIST_PUNJABI);
      addXP(10);
    } else if (!isPlaying) {
      controls.play();
    }
  };

  return (
    <div className="audio-vault-page">
      <div className="page-header">
        <h1 className="page-title">AUDIO VAULT</h1>
        <div className="page-subtitle">SONIC ARCHIVE</div>
      </div>

      <div className="audio-console-container">

        <div className="console-layout-grid">
          {/* Left Column: Player Console */}
          <div className="console-left-col">
            <div className="console-interface glass-panel main-controls-panel">
              <div className="console-display">
                <div className="track-info">
                  <div className="label-text">CURRENT TRANSMISSION</div>
                  <div className="track-title-scroller">
                    <h2 className="track-title">{currentTrack}</h2>
                    {/* Duplicate for marquee effect if implemented in CSS */}
                    {/* <h2 className="track-title" aria-hidden="true">{currentTrack}</h2> */}
                  </div>
                </div>
                <div className="status-indicators">
                  <div className={`status-light ${isReady ? 'ready' : 'loading'}`}>
                    <div className="light-dot"></div>
                    <span>STATUS: {isReady ? 'ONLINE' : 'INIT'}</span>
                  </div>
                </div>
              </div>

              {/* Visualizer */}
              <div className={`visualizer-container ${isPlaying ? 'animating' : ''}`}>
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="viz-bar" style={{
                    animationDelay: `${i * 0.05}s`,
                    height: isPlaying ? undefined : '5px'
                  }}></div>
                ))}
              </div>

              {/* Global Transport Controls */}
              <div className="console-controls">
                <button className="control-btn secondary" onClick={controls.prev} disabled={!isReady}>
                  <span className="btn-icon">⏮</span>
                </button>
                <button className={`control-btn primary ${isPlaying ? 'playing' : ''}`} onClick={togglePlay} disabled={!isReady}>
                  <span className="btn-icon">{isPlaying ? '⏸' : '▶'}</span>
                </button>
                <button className="control-btn secondary" onClick={controls.next} disabled={!isReady}>
                  <span className="btn-icon">⏭</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Playlists Stack */}
          <div className="playlists-stack">

            {/* Panel 1: Linked to PLAYLIST_ENGLISH (...CB) - Displaying PUNJABI Info */}
            <div
              className={`playlist-panel glass-panel ${activePlaylist === PLAYLIST_ENGLISH ? 'active-panel' : ''}`}
              onClick={loadEnglish}
            >
              {/* {activePlaylist === PLAYLIST_ENGLISH && (
                <div className="active-badge">ACTIVE</div>
              )} */}
              <div className="panel-content">
                <div className="panel-header-small">
                  <h3>PUNJABI // DESI</h3>
                  <div className="genre-tag">HIP HOP</div>
                </div>
                <p className="panel-desc">
                  A powerful Punjabi and desi hip hop playlist featuring artists like Sidhu Moose Wala, Karan Aujla, Shubh, Diljit Dosanjh, SMG, Navaan Sandhu, Parmish Verma and more.
                </p>
              </div>
              <div className="panel-actions">
                <button
                  className={`load-btn ${activePlaylist === PLAYLIST_ENGLISH ? 'active' : ''}`}
                  disabled={!isReady}
                >
                  {activePlaylist === PLAYLIST_ENGLISH && isPlaying ? 'PLAYING' : 'LOAD PLAYLIST'}
                </button>
              </div>
            </div>

            {/* Panel 2: Linked to PLAYLIST_PUNJABI (...wo4) - Displaying ENGLISH Info */}
            <div
              className={`playlist-panel glass-panel ${activePlaylist === PLAYLIST_PUNJABI ? 'active-panel' : ''}`}
              onClick={loadPunjabi}
            >
              {/* {activePlaylist === PLAYLIST_PUNJABI && (
                <div className="active-badge">ACTIVE</div>
              )} */}
              <div className="panel-content">
                <div className="panel-header-small">
                  <h3>INTERNATIONAL // ENGLISH</h3>
                  <div className="genre-tag">HIP HOP</div>
                </div>
                <p className="panel-desc">
                  A curated collection of international and English hip hop featuring artists like Travis Scott, Don Toliver, Future, Kendrick Lamar, Metro Boomin, The Weeknd and more.
                </p>
              </div>
              <div className="panel-actions">
                <button
                  className={`load-btn ${activePlaylist === PLAYLIST_PUNJABI ? 'active' : ''}`}
                  disabled={!isReady}
                >
                  {activePlaylist === PLAYLIST_PUNJABI && isPlaying ? 'PLAYING' : 'LOAD PLAYLIST'}
                </button>
              </div>
            </div>

          </div>
        </div>

        <div className="console-footer">
          <p className="footer-text">
            ACCESSING ENCRYPTED AUDIO STREAMS VIA SECURE PROTOCOL
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioVault;
