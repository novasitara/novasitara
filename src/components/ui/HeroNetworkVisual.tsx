import React, { useEffect, useState } from 'react';

export const HeroNetworkVisual: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const strokePurple = '#864EA8';
  const strokeLightPurple = 'rgba(134, 78, 168, 0.35)';
  const nodeDarkBg = '#16161E';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'var(--color-dark-surface)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem 1.5rem',
        border: '1px solid var(--color-dark-border)',
        boxShadow: 'var(--shadow-xl)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Dark Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(134, 78, 168, 0.18) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />

      {/* Header Bar */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
          <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
          <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
        </div>
        <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--color-text-muted-on-dark)', letterSpacing: '0.08em' }}>
          SYSTEM ARCHITECTURE // SAP & VISTEX
        </span>
      </div>

      {/* 2D Isometric & Vector Network Diagram */}
      <div style={{ position: 'relative', width: '100%', minHeight: '360px' }}>
        <svg
          viewBox="0 0 540 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          {/* Flowing Vector Connections */}
          <path
            d="M 60 190 Q 180 60 300 130 T 520 80"
            stroke={strokeLightPurple}
            strokeWidth="1.5"
            strokeDasharray="600"
            strokeDashoffset={isLoaded ? '0' : '600'}
            style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
          <path
            d="M 60 190 C 180 320 340 340 480 260"
            stroke={strokeLightPurple}
            strokeWidth="1.5"
            strokeDasharray="600"
            strokeDashoffset={isLoaded ? '0' : '600'}
            style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s' }}
          />

          {/* Central 2D Isometric Stacked Block (Server / Module Representation) */}
          <g transform="translate(190, 80)" style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}>
            {/* Top Isometric Layer - Vistex */}
            <path d="M 80 0 L 160 40 L 80 80 L 0 40 Z" fill="#864EA8" opacity="0.9" />
            <path d="M 0 40 L 80 80 L 80 110 L 0 70 Z" fill="#6F3B8C" />
            <path d="M 80 80 L 160 40 L 160 70 L 80 110 Z" fill="#5B2F75" />
            <text x="80" y="45" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
              VISTEX
            </text>

            {/* Middle Layer - SAP Core */}
            <g transform="translate(0, 45)">
              <path d="M 80 0 L 160 40 L 80 80 L 0 40 Z" fill="#1E1B2E" stroke={strokePurple} strokeWidth="1" />
              <path d="M 0 40 L 80 80 L 80 100 L 0 60 Z" fill="#141221" />
              <path d="M 80 80 L 160 40 L 160 60 L 80 100 Z" fill="#181526" />
              <text x="80" y="45" fill="#C084FC" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                SAP CORE
              </text>
            </g>

            {/* Bottom Layer - EWM / SD / MM / ABAP */}
            <g transform="translate(0, 85)">
              <path d="M 80 0 L 160 40 L 80 80 L 0 40 Z" fill="#16161E" stroke="var(--color-dark-border)" strokeWidth="1" />
              <path d="M 0 40 L 80 80 L 80 100 L 0 60 Z" fill="#0D0D11" />
              <path d="M 80 80 L 160 40 L 160 60 L 80 100 Z" fill="#121218" />
              <text x="80" y="45" fill="rgba(255,255,255,0.7)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
                EWM • SD • MM • ABAP
              </text>
            </g>
          </g>

          {/* Left Satellite Node: CONSULTING */}
          <g transform="translate(20, 160)" style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s ease 0.5s' }}>
            <rect x="0" y="0" width="110" height="46" rx="8" fill={nodeDarkBg} stroke="var(--color-dark-border)" strokeWidth="1" />
            <text x="55" y="22" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
              CONSULTING
            </text>
            <text x="55" y="36" fill="#C084FC" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">
              Implementation
            </text>
          </g>

          {/* Right Top Satellite Node: PROJECT ROLES */}
          <g transform="translate(410, 50)" style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s ease 0.6s' }}>
            <rect x="0" y="0" width="110" height="46" rx="8" fill={nodeDarkBg} stroke="var(--color-dark-border)" strokeWidth="1" />
            <text x="55" y="22" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
              STAFFING
            </text>
            <text x="55" y="36" fill="rgba(255,255,255,0.7)" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">
              Project Roles
            </text>
          </g>

          {/* Right Bottom Satellite Node: SUPPORT & ENHANCEMENTS */}
          <g transform="translate(390, 240)" style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s ease 0.7s' }}>
            <rect x="0" y="0" width="125" height="46" rx="8" fill={nodeDarkBg} stroke="var(--color-dark-border)" strokeWidth="1" />
            <text x="62" y="22" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
              SUPPORT
            </text>
            <text x="62" y="36" fill="#C084FC" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">
              Enhancements
            </text>
          </g>

          {/* Pulsing Dots along Paths */}
          <circle cx="130" cy="183" r="4.5" fill="#864EA8" className="animate-node-pulse" />
          <circle cx="410" cy="120" r="4" fill="#C084FC" className="animate-node-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="370" cy="275" r="4" fill="#864EA8" className="animate-node-pulse" style={{ animationDelay: '1.5s' }} />
        </svg>
      </div>
    </div>
  );
};
