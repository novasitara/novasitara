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
  height = 23,
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
        gap: '6px',
        textDecoration: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {/* 
        Mathematical SVG ViewBox Crop:
        Renders the exact official logo.jpeg asset without any pixel cuts or DPI scaling clipping.
      */}
      <svg
        viewBox="240 280 570 340"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          height: '20px',
          width: 'auto',
          display: 'block',
          flexShrink: 0,
        }}
        role="img"
        aria-label="Nova Sitara Logo"
      >
        <image
          href="/images/logo.jpeg"
          x="0"
          y="0"
          width="1024"
          height="1024"
          preserveAspectRatio="none"
        />
      </svg>

      {showWordmark && (
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)',
            letterSpacing: '-0.02em',
            color: textColor,
            lineHeight: 1,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Nova Sitara
        </span>
      )}
    </Link>
  );
};
