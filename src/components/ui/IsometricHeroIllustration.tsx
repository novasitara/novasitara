import React, { useEffect, useState } from 'react';
import { Logo } from '../common/Logo';
import { Cpu, Database, Network, Layers, Server } from 'lucide-react';

export const IsometricHeroIllustration: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '480px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
        transition: 'all 800ms cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid #E6E0EB',
        padding: '1.5rem',
        boxShadow: '0 16px 40px rgba(134, 78, 168, 0.1), 0 4px 16px rgba(0, 0, 0, 0.02)',
        overflow: 'hidden',
      }}
    >
      {/* Background Technical Grid */}
      <svg
        viewBox="0 0 540 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <g opacity="0.12">
          <path d="M 0 110 L 540 420 M 0 220 L 540 530 M 0 0 L 540 310" stroke="#864EA8" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 540 110 L 0 420 M 540 220 L 0 530 M 540 0 L 0 310" stroke="#864EA8" strokeWidth="1" strokeDasharray="3 3" />
        </g>

        {/* Dynamic Glowing Vector Connector Track Lines */}
        <path d="M 120 120 L 270 200 M 420 120 L 270 200 M 120 340 L 270 240 M 420 340 L 270 240" stroke="#864EA8" strokeWidth="1.5" opacity="0.4" />
        <circle cx="270" cy="220" r="110" stroke="#864EA8" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
      </svg>

      {/* Central Official NS Pedestal */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          border: '2px solid #864EA8',
          boxShadow: '0 0 36px rgba(134, 78, 168, 0.22), 0 6px 20px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0.85rem',
        }}
      >
        <Logo variant="default" showWordmark={true} />
      </div>

      {/* NODE 1: SAP Core Cube (Top Left) */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '1rem 1.25rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E6E0EB',
          boxShadow: '0 8px 20px rgba(134, 78, 168, 0.08)',
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#F4ECF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Layers size={18} color="#864EA8" />
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#864EA8', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
            ENTERPRISE CORE
          </span>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#080808', margin: 0 }}>
            SAP S/4HANA & ECC
          </h4>
        </div>
      </div>

      {/* NODE 2: Vistex Practice Tower (Top Right) */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '1rem 1.25rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E6E0EB',
          boxShadow: '0 8px 20px rgba(134, 78, 168, 0.08)',
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#F4ECF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Server size={18} color="#864EA8" />
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#864EA8', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
            NICHE PRACTICE
          </span>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#080808', margin: 0 }}>
            Vistex Solutions
          </h4>
        </div>
      </div>

      {/* NODE 3: Integration Hub (Bottom Left) */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          padding: '1rem 1.25rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E6E0EB',
          boxShadow: '0 8px 20px rgba(134, 78, 168, 0.08)',
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#F4ECF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Network size={18} color="#864EA8" />
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#864EA8', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
            CONNECTIVITY
          </span>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#080808', margin: 0 }}>
            Integration Hub
          </h4>
        </div>
      </div>

      {/* NODE 4: Data Transformation Engine (Bottom Right) */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '1rem 1.25rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E6E0EB',
          boxShadow: '0 8px 20px rgba(134, 78, 168, 0.08)',
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#F4ECF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Cpu size={18} color="#864EA8" />
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#864EA8', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
            ENGINEERING
          </span>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#080808', margin: 0 }}>
            Data Engine & ABAP
          </h4>
        </div>
      </div>
    </div>
  );
};
