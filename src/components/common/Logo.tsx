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
  height = 38,
}) => {
  const isDarkBg = variant === 'dark';
  const textColor = isDarkBg ? '#FFFFFF' : '#000000';

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
        userSelect: 'none',
      }}
    >
      <img
        src="/images/logo.jpeg"
        alt="Nova Sitara Private Limited Logo"
        style={{
          height: `${height}px`,
          width: 'auto',
          display: 'block',
          objectFit: 'contain',
          borderRadius: '4px',
        }}
      />

      {showWordmark && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '1.2rem',
              letterSpacing: '-0.02em',
              color: textColor,
              lineHeight: 1,
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
              marginTop: '0.15rem',
            }}
          >
            Private Limited
          </span>
        </div>
      )}
    </Link>
  );
};
