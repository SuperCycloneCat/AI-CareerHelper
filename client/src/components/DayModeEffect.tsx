import React from 'react';

interface DayModeEffectProps {
  isDarkMode: boolean;
}

const DayModeEffect: React.FC<DayModeEffectProps> = ({ isDarkMode }) => {
  if (isDarkMode) return null;

  return (
    <div className="day-mode-container">
      <div className="sun-glow" />
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />
      <div className="cloud cloud-4" />
      <div className="cloud cloud-5" />
    </div>
  );
};

export default DayModeEffect;
