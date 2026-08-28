import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'light' | 'dark';
  showWordmark?: boolean;
  className?: string;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  showWordmark = true,
  className = '',
  height = 38
}) => {
  // Brand colors: #864EA8 (Primary Purple), #000000 (Black), #FFFFFF (White for dark backgrounds)
  const isDarkBg = variant === 'dark';
  const textColor = isDarkBg ? '#FFFFFF' : '#000000';
  const dotColor = '#864EA8';

  return (
    <Link 
      to="/" 
      aria-label="Nova Sitara Home"
      className={`logo-link ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        textDecoration: 'none',
        userSelect: 'none'
      }}
    >
      {/* Official Mark: NS with Purple Squares underneath stems */}
      <svg 
        height={height} 
        viewBox="0 0 160 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: `${height}px`, width: 'auto', display: 'block' }}
        role="img"
        aria-label="Nova Sitara Official Symbol"
      >
        {/* Letter N */}
        <path 
          d="M 22 28 H 38 V 74 L 62 28 H 78 V 92 H 62 V 46 L 38 92 H 22 V 28 Z" 
          fill={textColor} 
        />
        {/* Square under N's left leg */}
        <rect x="22" y="98" width="16" height="16" fill={dotColor} rx="1" />

        {/* Letter S */}
        <path 
          d="M 132 40 C 132 32.5 125 28 113 28 C 100 28 92 33 91 43 H 106 C 107 38.5 110 36.5 113 36.5 C 117 36.5 119 38 119 40.5 C 119 43 117 44.5 111 46 C 99 49 92 53 92 64.5 C 92 75.5 101 80 114 80 C 128 80 137 73 137 63.5 H 122 C 121 68 118 70.5 114 70.5 C 109.5 70.5 107 68.5 107 65.5 C 107 62.5 109.5 61 117 59.5 C 128 57 132 51.5 132 40 Z" 
          fill={textColor} 
        />
        {/* Square under S's lower-left terminal */}
        <rect x="92" y="86" width="16" height="16" fill={dotColor} rx="1" />
      </svg>

      {showWordmark && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span 
            style={{ 
              fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '1.2rem',
              letterSpacing: '-0.02em',
              color: textColor,
              lineHeight: 1
            }}
          >
            NOVA SITARA
          </span>
          <span 
            style={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '0.625rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: isDarkBg ? 'rgba(255,255,255,0.7)' : 'var(--color-primary)',
              marginTop: '0.15rem'
            }}
          >
            Private Limited
          </span>
        </div>
      )}
    </Link>
  );
};
