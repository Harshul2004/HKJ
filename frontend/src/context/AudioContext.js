import React, { createContext, useContext, useState, useCallback } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [youtubeActive, setYoutubeActive] = useState(false); // Legacy

  // formatted state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('Loading Audio Data...');
  const [activePlaylist, setActivePlaylist] = useState('PLdopaBPe4-jlgTgsolJdF7nwBCJqap4CB'); // Default to English

  // Controls registry (functions populated by the engine)
  const [controls, setControls] = useState({
    play: () => console.warn('Audio Engine not ready'),
    pause: () => console.warn('Audio Engine not ready'),
    next: () => console.warn('Audio Engine not ready'),
    prev: () => console.warn('Audio Engine not ready'),
    seek: () => console.warn('Audio Engine not ready'),
    loadPlaylist: () => console.warn('Audio Engine not ready'),
  });

  const setYoutubePlayback = (active) => {
    setYoutubeActive(active);
    setIsPlaying(active);
  };

  const registerControls = useCallback((newControls) => {
    setControls(prev => ({ ...prev, ...newControls }));
  }, []);

  const updatePlayerState = useCallback((state) => {
    if (state.isPlaying !== undefined) setIsPlaying(state.isPlaying);
    if (state.isReady !== undefined) setIsReady(state.isReady);
    if (state.currentTrack !== undefined) setCurrentTrack(state.currentTrack);

    // Sync legacy state
    if (state.isPlaying !== undefined) setYoutubeActive(state.isPlaying);
  }, []);

  const switchPlaylist = (playlistId) => {
    if (controls.loadPlaylist) {
      controls.loadPlaylist(playlistId);
      setActivePlaylist(playlistId);
      setIsPlaying(true); // Auto-play when switching
    }
  };

  return (
    <AudioContext.Provider
      value={{
        youtubeActive,
        setYoutubePlayback,
        isPlaying,
        isReady,
        currentTrack,
        activePlaylist,
        switchPlaylist,
        controls,
        registerControls,
        updatePlayerState
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
