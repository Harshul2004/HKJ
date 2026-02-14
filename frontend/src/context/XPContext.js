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

  const [xpBoostUsed, setXpBoostUsed] = useState(false);

  useEffect(() => {
    const savedXP = localStorage.getItem('hkj_xp');
    const savedDevMode = localStorage.getItem('hkj_dev_mode');
    const savedBoost = localStorage.getItem('hkj_xp_boost');

    if (savedXP) setXp(parseInt(savedXP));
    if (savedDevMode === 'true') setDevModeUnlocked(true);
    if (savedBoost === 'true') setXpBoostUsed(true);
  }, []);

  const addXP = (amount = 5) => {
    const newXP = xp + amount;
    setXp(newXP);
    localStorage.setItem('hkj_xp', newXP.toString());

    setShowXPNotification(true);
    setTimeout(() => setShowXPNotification(false), 2000);

    if (newXP >= 500 && !devModeUnlocked) {
      setShowDevModeNotification(true);
      setTimeout(() => setShowDevModeNotification(false), 5000);
    }
  };

  const triggerXPBoost = () => {
    if (xpBoostUsed) return false;

    const amount = 25;
    const newXP = xp + amount;

    setXp(newXP);
    localStorage.setItem('hkj_xp', newXP.toString());

    setXpBoostUsed(true);
    localStorage.setItem('hkj_xp_boost', 'true');

    setShowXPNotification(true);
    setTimeout(() => setShowXPNotification(false), 2000);

    if (newXP >= 500 && !devModeUnlocked) {
      setShowDevModeNotification(true);
      setTimeout(() => setShowDevModeNotification(false), 5000);
    }

    return true;
  };

  const unlockDevMode = () => {
    setDevModeUnlocked(true);
    localStorage.setItem('hkj_dev_mode', 'true');
  };

  const resetProgress = () => {
    setXp(0);
    setDevModeUnlocked(false);
    setXpBoostUsed(false);
    localStorage.removeItem('hkj_xp');
    localStorage.removeItem('hkj_dev_mode');
    localStorage.removeItem('hkj_xp_boost');
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
        showDevModeNotification,
        xpBoostUsed,
        triggerXPBoost
      }}
    >
      {children}
    </XPContext.Provider>
  );
};
