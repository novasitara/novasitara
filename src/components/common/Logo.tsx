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
        gap: '0.75rem',
        textDecoration: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      <img
        src="/images/logo.jpeg"
        alt="Nova Sitara Logo"
        style={{
          height: `${height}px`,
          width: 'auto',
          display: 'block',
          objectFit: 'contain',
          borderRadius: '4px',
          flexShrink: 0,
        }}
      />

      {showWordmark && (
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)',
            letterSpacing: '-0.02em',
            color: textColor,
            lineHeight: 1,
            display: 'inline-block',
          }}
        >
          Nova Sitara
        </span>
      )}
    </Link>
  );
};
