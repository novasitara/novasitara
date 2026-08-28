import React, { useEffect, useState } from 'react';

export const EditorialHeroVisual: React.FC = () => {
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsDrawn(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Abstract Editorial Technical SVG Graphic Floating Directly on White Canvas */}
      <svg
        viewBox="0 0 460 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxHeight: '420px', display: 'block' }}
      >
        {/* Subtle Background Grid Points */}
        <g opacity="0.15">
          <circle cx="60" cy="60" r="1.5" fill="#000000" />
          <circle cx="230" cy="60" r="1.5" fill="#000000" />
          <circle cx="400" cy="60" r="1.5" fill="#000000" />
          <circle cx="60" cy="210" r="1.5" fill="#000000" />
          <circle cx="230" cy="210" r="1.5" fill="#864EA8" />
          <circle cx="400" cy="210" r="1.5" fill="#000000" />
          <circle cx="60" cy="360" r="1.5" fill="#000000" />
          <circle cx="230" cy="360" r="1.5" fill="#000000" />
          <circle cx="400" cy="360" r="1.5" fill="#000000" />
        </g>

        {/* Primary Thin Geometric Connecting Lines */}
        <path
          d="M 230 40 L 230 140 M 230 140 L 90 210 M 230 140 L 370 210 M 90 210 L 230 280 M 370 210 L 230 280 M 230 280 L 230 380"
          stroke="#000000"
          strokeWidth="1.25"
          strokeDasharray="800"
          strokeDashoffset={isDrawn ? '0' : '800'}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />

        {/* Purple Accent Flow Lines */}
        <path
          d="M 90 210 L 370 210"
          stroke="#864EA8"
          strokeWidth="1.5"
          strokeDasharray="300"
          strokeDashoffset={isDrawn ? '0' : '300'}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s' }}
        />
        <path
          d="M 60 120 Q 230 60 400 120"
          stroke="rgba(134, 78, 168, 0.3)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M 60 300 Q 230 360 400 300"
          stroke="rgba(134, 78, 168, 0.3)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Top Node: ORGANIZATIONS */}
        <g style={{ opacity: isDrawn ? 1 : 0, transition: 'opacity 0.5s ease 0.4s' }}>
          <circle cx="230" cy="40" r="14" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
          <circle cx="230" cy="40" r="4" fill="#864EA8" />
          <text x="230" y="16" fill="#000000" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.08em">
            ORGANIZATIONS
          </text>
        </g>

        {/* Central Anchor Node: VISTEX & SAP SYSTEM */}
        <g style={{ opacity: isDrawn ? 1 : 0, transition: 'opacity 0.5s ease 0.6s' }}>
          <rect x="170" y="115" width="120" height="50" rx="4" fill="#FFFFFF" stroke="#864EA8" strokeWidth="1.5" />
          <text x="230" y="137" fill="#864EA8" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.05em">
            VISTEX
          </text>
          <text x="230" y="152" fill="#000000" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.08em">
            SAP INTEGRATION
          </text>
        </g>

        {/* Left Node: CONSULTING & IMPLEMENTATION */}
        <g style={{ opacity: isDrawn ? 1 : 0, transition: 'opacity 0.5s ease 0.7s' }}>
          <rect x="30" y="190" width="120" height="40" rx="4" fill="#FFFFFF" stroke="#000000" strokeWidth="1.25" />
          <text x="90" y="209" fill="#000000" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.05em">
            CONSULTING
          </text>
          <text x="90" y="222" fill="var(--color-text-muted)" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">
            Implementations
          </text>
        </g>

        {/* Right Node: TECHNOLOGY STAFFING */}
        <g style={{ opacity: isDrawn ? 1 : 0, transition: 'opacity 0.5s ease 0.8s' }}>
          <rect x="310" y="190" width="120" height="40" rx="4" fill="#FFFFFF" stroke="#000000" strokeWidth="1.25" />
          <text x="370" y="209" fill="#000000" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.05em">
            STAFFING
          </text>
          <text x="370" y="222" fill="var(--color-text-muted)" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">
            Project Roles
          </text>
        </g>

        {/* Diamond Node: EXPERTISE ALIGNMENT */}
        <g style={{ opacity: isDrawn ? 1 : 0, transition: 'opacity 0.5s ease 0.9s' }}>
          <polygon points="230,260 250,280 230,300 210,280" fill="#FFFFFF" stroke="#864EA8" strokeWidth="1.5" />
          <circle cx="230" cy="280" r="3" fill="#864EA8" />
          <text x="230" y="318" fill="#000000" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.05em">
            EWM • SD • MM • ABAP
          </text>
        </g>

        {/* Bottom Endpoint Node: BUSINESS IMPACT */}
        <g style={{ opacity: isDrawn ? 1 : 0, transition: 'opacity 0.5s ease 1s' }}>
          <circle cx="230" cy="380" r="10" fill="#000000" />
          <circle cx="230" cy="380" r="4" fill="#FFFFFF" />
          <text x="230" y="405" fill="#864EA8" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.1em">
            PROJECT SUCCESS
          </text>
        </g>

        {/* Pulsing Intersection Dots */}
        <circle cx="90" cy="210" r="4" fill="#864EA8" className="animate-node-pulse" />
        <circle cx="370" cy="210" r="4" fill="#864EA8" className="animate-node-pulse" style={{ animationDelay: '1s' }} />
        <circle cx="230" cy="210" r="3.5" fill="#000000" />
      </svg>
    </div>
  );
};
