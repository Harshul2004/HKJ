import React, { createContext, useContext, useState } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [youtubeActive, setYoutubeActive] = useState(false);

  const setYoutubePlayback = (active) => {
    setYoutubeActive(active);
  };

  return (
    <AudioContext.Provider
      value={{
        youtubeActive,
        setYoutubePlayback
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
