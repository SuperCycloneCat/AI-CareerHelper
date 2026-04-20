import React, { useMemo } from 'react';

interface MeteorEffectProps {
  isDarkMode: boolean;
}

const MeteorEffect: React.FC<MeteorEffectProps> = ({ isDarkMode }) => {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      size: Math.random() * 2 + 1,
    }));
  }, []);

  if (!isDarkMode) return null;

  return (
    <>
      <div className="stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </div>
      <div className="moon-glow">
        <div className="crater-1" />
        <div className="crater-2" />
        <div className="crater-3" />
      </div>
      <div className="meteor-container">
        <div className="meteor meteor-1" />
        <div className="meteor meteor-2" />
        <div className="meteor meteor-3" />
        <div className="meteor meteor-4" />
      </div>
    </>
  );
};

export default MeteorEffect;
