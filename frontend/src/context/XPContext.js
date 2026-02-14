import React, { createContext, useContext, useState, useEffect } from 'react';

const XPContext = createContext();

export const useXP = () => {
  const context = useContext(XPContext);
  if (!context) {
    throw new Error('useXP must be used within XPProvider');
  }
  return context;
};

export const XPProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [devModeUnlocked, setDevModeUnlocked] = useState(false);
  const [showXPNotification, setShowXPNotification] = useState(false);
  const [showDevModeNotification, setShowDevModeNotification] = useState(false);

  useEffect(() => {
    const savedXP = localStorage.getItem('hkj_xp');
    const savedDevMode = localStorage.getItem('hkj_dev_mode');
    if (savedXP) setXp(parseInt(savedXP));
    if (savedDevMode === 'true') setDevModeUnlocked(true);
  }, []);

  const addXP = (amount = 5) => {
    const newXP = xp + amount;
    setXp(newXP);
    localStorage.setItem('hkj_xp', newXP.toString());
    
    setShowXPNotification(true);
    setTimeout(() => setShowXPNotification(false), 2000);

    if (newXP >= 100 && !devModeUnlocked) {
      setShowDevModeNotification(true);
      setTimeout(() => setShowDevModeNotification(false), 5000);
    }
  };

  const unlockDevMode = () => {
    setDevModeUnlocked(true);
    localStorage.setItem('hkj_dev_mode', 'true');
  };

  const resetProgress = () => {
    setXp(0);
    setDevModeUnlocked(false);
    localStorage.removeItem('hkj_xp');
    localStorage.removeItem('hkj_dev_mode');
  };

  return (
    <XPContext.Provider
      value={{
        xp,
        addXP,
        devModeUnlocked,
        unlockDevMode,
        resetProgress,
        showXPNotification,
        showDevModeNotification
      }}
    >
      {children}
    </XPContext.Provider>
  );
};
