import React, { createContext, useContext, useState, useEffect } from 'react';

export type InputMode = 'raw' | 'frequency' | 'grouped';

interface SettingsContextType {
  decimalPrecision: number;
  defaultInputMode: InputMode;
  setDecimalPrecision: (precision: number) => void;
  setDefaultInputMode: (mode: InputMode) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [decimalPrecision, setDecimalPrecisionState] = useState<number>(() => {
    const saved = localStorage.getItem('decimalPrecision');
    return saved ? parseInt(saved) : 4;
  });

  const [defaultInputMode, setDefaultInputModeState] = useState<InputMode>(() => {
    const saved = localStorage.getItem('defaultInputMode');
    return (saved as InputMode) || 'raw';
  });

  useEffect(() => {
    localStorage.setItem('decimalPrecision', decimalPrecision.toString());
  }, [decimalPrecision]);

  useEffect(() => {
    localStorage.setItem('defaultInputMode', defaultInputMode);
  }, [defaultInputMode]);

  const setDecimalPrecision = (precision: number) => {
    if (precision >= 0 && precision <= 10) {
      setDecimalPrecisionState(precision);
    }
  };

  const setDefaultInputMode = (mode: InputMode) => {
    setDefaultInputModeState(mode);
  };

  return (
    <SettingsContext.Provider
      value={{
        decimalPrecision,
        defaultInputMode,
        setDecimalPrecision,
        setDefaultInputMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
