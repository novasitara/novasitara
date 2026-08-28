import React, { useEffect, useState } from 'react';

interface TechnicalGridBackgroundProps {
  dark?: boolean;
}

export const TechnicalGridBackground: React.FC<TechnicalGridBackgroundProps> = ({ dark = false }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Very subtle micro movement on scroll (capped at a few pixels)
      setScrollY(window.scrollY * 0.05);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lineColor = dark ? 'rgba(134, 78, 168, 0.15)' : 'rgba(0, 0, 0, 0.04)';
  const dotColor = dark ? '#C084FC' : '#864EA8';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        style={{
          transform: `translateY(${scrollY % 40}px)`,
          transition: 'transform 100ms linear',
          opacity: 0.8,
        }}
      >
        <defs>
          <pattern id={`grid-pattern-${dark ? 'dark' : 'light'}`} width="50" height="50" patternUnits="userSpaceOnUse">
            {/* Grid lines */}
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke={lineColor} strokeWidth="1" />
            {/* Intersection dots */}
            <circle cx="50" cy="0" r="1.5" fill={dotColor} opacity={dark ? "0.6" : "0.4"} />
            <circle cx="0" cy="50" r="1.5" fill={dotColor} opacity={dark ? "0.6" : "0.4"} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-pattern-${dark ? 'dark' : 'light'})`} />
      </svg>
    </div>
  );
};
