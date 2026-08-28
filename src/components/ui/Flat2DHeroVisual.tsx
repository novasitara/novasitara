import React, { useEffect, useState } from 'react';

export const Flat2DHeroVisual: React.FC = () => {
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
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Flat 2D Purple Geometric Technical Visual Floating Directly on Light Background */}
      <svg
        viewBox="0 0 540 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      >
        {/* Curved Connection Lines */}
        <path
          d="M 60 210 Q 200 100 320 180 T 500 120"
          stroke="#864EA8"
          strokeWidth="1.5"
          strokeDasharray="600"
          strokeDashoffset={isDrawn ? '0' : '600'}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        <path
          d="M 100 320 C 220 380 380 340 480 240"
          stroke="rgba(134, 78, 168, 0.4)"
          strokeWidth="1.5"
          strokeDasharray="500"
          strokeDashoffset={isDrawn ? '0' : '500'}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s' }}
        />

        {/* Central Dark Purple Geometric Shape Block */}
        <g transform="translate(200, 110)">
          {/* Main Top Block */}
          <rect x="20" y="20" width="140" height="70" rx="8" fill="#864EA8" />
          <rect x="40" y="40" width="100" height="30" rx="4" fill="#6F3B8C" />
          <text x="90" y="60" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
            VISTEX / SAP
          </text>

          {/* Middle Tier Block */}
          <rect x="35" y="100" width="110" height="50" rx="6" fill="#4C2866" stroke="#864EA8" strokeWidth="1" />
          <text x="90" y="130" fill="#C084FC" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
            ENTERPRISE CORE
          </text>

          {/* Bottom Base Tier */}
          <rect x="45" y="160" width="90" height="40" rx="6" fill="#2E183E" stroke="rgba(134,78,168,0.5)" strokeWidth="1" />
          <text x="90" y="184" fill="rgba(255,255,255,0.7)" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
            SUPPORT
          </text>
        </g>

        {/* Small Floating Satellite Blocks */}
        <g transform="translate(60, 180)">
          <rect x="0" y="0" width="80" height="40" rx="6" fill="#FFFFFF" stroke="#864EA8" strokeWidth="1.5" />
          <text x="40" y="24" fill="#864EA8" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
            SAP EWM
          </text>
        </g>

        <g transform="translate(400, 80)">
          <rect x="0" y="0" width="80" height="40" rx="6" fill="#FFFFFF" stroke="#864EA8" strokeWidth="1.5" />
          <text x="40" y="24" fill="#864EA8" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
            SAP SD
          </text>
        </g>

        <g transform="translate(380, 260)">
          <rect x="0" y="0" width="90" height="40" rx="6" fill="#FFFFFF" stroke="#864EA8" strokeWidth="1.5" />
          <text x="45" y="24" fill="#864EA8" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
            ABAP
          </text>
        </g>

        {/* Small Purple Node Indicators */}
        <circle cx="140" cy="200" r="4" fill="#864EA8" />
        <circle cx="400" cy="100" r="4" fill="#864EA8" />
        <circle cx="380" cy="280" r="4" fill="#864EA8" />
        <circle cx="270" cy="145" r="5" fill="#C084FC" className="animate-node-pulse" />
      </svg>
    </div>
  );
};
