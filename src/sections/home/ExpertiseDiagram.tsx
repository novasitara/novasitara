import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import sapLogoImg from '/@fs/C:/Users/Mohithsai Malla/.gemini/antigravity/brain/cff265d6-6700-4d41-a668-ad0601c90b86/.user_uploaded/media_1787794648343.png';

export const ExpertiseDiagram: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        paddingTop: 'clamp(5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(5rem, 8vw, 7rem)',
        borderBottom: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '760px', marginBottom: '3.5rem' }}>
          <div className="eyebrow" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 400ms ease' }}>
            SPECIALIZED CAPABILITIES
          </div>
          <h2 style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', color: '#000000', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            <span className="text-mask-wrapper">
              <span className={`text-mask-line ${isVisible ? 'is-visible' : ''}`}>
                Specialized Where Expertise
              </span>
            </span>
            <br />
            <span className="text-mask-wrapper">
              <span className={`text-mask-line ${isVisible ? 'is-visible' : ''}`} style={{ color: '#864EA8', transitionDelay: '150ms' }}>
                Matters Most.
              </span>
            </span>
          </h2>
          <p style={{ color: 'var(--color-text-body)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
            Focused SAP and Vistex capabilities for organizations, consulting firms and implementation partners.
          </p>
        </div>

        {/* Asymmetric Ecosystem Composition (~40% Left Vistex Card, ~60% Right 2x2 Grid) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.75rem',
            alignItems: 'stretch',
          }}
        >
          {/* LEFT: Large Primary VISTEX Focus Area (5 Columns / ~40% Width) */}
          <div style={{ gridColumn: 'span 12' }} className="exp-vistex-col">
            <div
              onMouseEnter={() => setHoveredCard('vistex')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                height: '100%',
                minHeight: '580px',
                padding: 'clamp(2rem, 3.5vw, 3rem)',
                borderRadius: '24px',
                backgroundColor: '#864EA8',
                backgroundImage: 'linear-gradient(145deg, #864EA8 0%, #5B21B6 100%)',
                color: '#FFFFFF',
                boxShadow: hoveredCard === 'vistex' ? '0 20px 48px rgba(134, 78, 168, 0.32)' : '0 12px 32px rgba(134, 78, 168, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transform: hoveredCard === 'vistex' ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease',
                opacity: isVisible ? 1 : 0,
                transitionDelay: '100ms',
              }}
            >
              {/* Top Typography Header */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(255, 255, 255, 0.75)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  NICHE CORE FOCUS
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(2.75rem, 5vw, 3.75rem)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  VISTEX
                </h3>
              </div>

              {/* Large Custom Technical Enterprise Illustration */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '260px',
                  margin: '1.5rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                <svg viewBox="0 0 380 260" fill="none" style={{ width: '100%', height: '100%' }}>
                  <g opacity="0.3">
                    <path d="M 40 130 L 190 50 L 340 130 L 190 210 Z" stroke="#FFFFFF" strokeWidth="1" />
                    <line x1="190" y1="50" x2="190" y2="210" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" />
                  </g>

                  <g transform="translate(0, -5)">
                    {/* Base Architectural Platform */}
                    <path d="M 90 150 L 190 100 L 290 150 L 190 200 Z" fill="rgba(255, 255, 255, 0.12)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />
                    <path d="M 90 150 L 190 200 L 190 215 L 90 165 Z" fill="rgba(255, 255, 255, 0.08)" />
                    <path d="M 190 200 L 290 150 L 290 165 L 190 215 Z" fill="rgba(255, 255, 255, 0.05)" />

                    {/* Middle Core Tier Block */}
                    <path d="M 120 125 L 190 90 L 260 125 L 190 160 Z" fill="rgba(255, 255, 255, 0.25)" stroke="#FFFFFF" strokeWidth="1.5" />

                    {/* Top Central Hub Cuboid */}
                    <path d="M 150 100 L 190 80 L 230 100 L 190 120 Z" fill="#FFFFFF" opacity="0.9" />
                    <path d="M 150 100 L 190 120 L 190 140 L 150 120 Z" fill="rgba(255, 255, 255, 0.75)" />
                    <path d="M 190 120 L 230 100 L 230 120 L 190 140 Z" fill="rgba(255, 255, 255, 0.6)" />

                    {/* Glowing Vertical Light Beam */}
                    <path d="M 165 90 L 215 90 L 215 20 L 165 20 Z" fill="url(#vistexBeamGrad2)" opacity="0.4" />
                  </g>

                  {/* Satellite Connected Module Nodes */}
                  <circle cx="80" cy="100" r="14" fill="rgba(255, 255, 255, 0.2)" stroke="#FFFFFF" strokeWidth="1.5" />
                  <path d="M 80 100 L 150 120" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" />

                  <circle cx="300" cy="100" r="14" fill="rgba(255, 255, 255, 0.2)" stroke="#FFFFFF" strokeWidth="1.5" />
                  <path d="M 300 100 L 230 120" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" />

                  <defs>
                    <linearGradient id="vistexBeamGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Lower Title, Copy & CTA */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h4 style={{ fontSize: '1.4rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Vistex Sourcing & Consulting
                </h4>
                <p style={{ fontSize: '0.925rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.9)', maxWidth: '340px', marginBottom: '1.5rem' }}>
                  Nova Sitara's primary focus in providing specialized Vistex consultants for project roles.
                </p>

                <Link
                  to="/expertise#vistex"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#FFFFFF',
                    backgroundColor: 'rgba(255, 255, 255, 0.18)',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '12px',
                    backdropFilter: 'blur(6px)',
                    transition: 'all 200ms ease',
                  }}
                >
                  <span>Explore Vistex Capabilities</span>
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: Supporting 2x2 Bento Grid (7 Columns / ~60% Width) */}
          <div style={{ gridColumn: 'span 12' }} className="exp-grid-col">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
                height: '100%',
              }}
              className="exp-sub-grid"
            >
              {/* CARD 1: SAP EWM */}
              <div
                onMouseEnter={() => setHoveredCard('ewm')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: '1.75rem',
                  borderRadius: '20px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E5EC',
                  boxShadow: hoveredCard === 'ewm' ? '0 12px 32px rgba(134, 78, 168, 0.12)' : '0 4px 16px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '275px',
                  transform: hoveredCard === 'ewm' ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: '200ms',
                }}
              >
                <div style={{ width: '100%', height: '120px', marginBottom: '1rem' }}>
                  <svg viewBox="0 0 220 120" fill="none" style={{ width: '100%', height: '100%' }}>
                    <image href={sapLogoImg} x="0" y="0" height="26" />

                    <g transform="translate(50, 10)">
                      <path d="M 60 10 L 110 35 L 60 60 L 10 35 Z" fill="#F3E8FF" stroke="#864EA8" strokeWidth="1.5" />
                      <path d="M 10 35 L 60 60 L 60 80 L 10 55 Z" fill="#E9D5FF" stroke="#864EA8" strokeWidth="1.5" />
                      <path d="M 60 60 L 110 35 L 110 55 L 60 80 Z" fill="#D8B4FE" stroke="#864EA8" strokeWidth="1.5" />

                      <path d="M 40 25 L 75 42 L 40 60 L 5 42 Z" fill="#864EA8" />
                      <path d="M 5 42 L 40 60 L 40 70 L 5 52 Z" fill="#6F3B8C" />
                      <path d="M 40 60 L 75 42 L 75 52 L 40 70 Z" fill="#5B2F75" />
                    </g>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111116', marginBottom: '0.35rem' }}>
                    SAP EWM
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.55, margin: 0 }}>
                    Extended Warehouse Management solutions for complex logistics and placement workflows.
                  </p>
                </div>
              </div>

              {/* CARD 2: SAP SD */}
              <div
                onMouseEnter={() => setHoveredCard('sd')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: '1.75rem',
                  borderRadius: '20px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E5EC',
                  boxShadow: hoveredCard === 'sd' ? '0 12px 32px rgba(134, 78, 168, 0.12)' : '0 4px 16px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '275px',
                  transform: hoveredCard === 'sd' ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: '300ms',
                }}
              >
                <div style={{ width: '100%', height: '120px', marginBottom: '1rem' }}>
                  <svg viewBox="0 0 220 120" fill="none" style={{ width: '100%', height: '100%' }}>
                    <g transform="translate(0, 0)">
                      <rect x="0" y="0" width="38" height="22" rx="4" fill="#0284C7" />
                      <text x="19" y="15" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
                        SD
                      </text>
                    </g>

                    <g transform="translate(45, 5)">
                      <rect x="20" y="10" width="65" height="80" rx="6" fill="#F3E8FF" stroke="#864EA8" strokeWidth="1.5" />
                      <line x1="30" y1="24" x2="70" y2="24" stroke="#864EA8" strokeWidth="2" />
                      <line x1="30" y1="36" x2="60" y2="36" stroke="#C084FC" strokeWidth="2" />

                      <rect x="48" y="28" width="70" height="80" rx="6" fill="#FFFFFF" stroke="#864EA8" strokeWidth="1.5" />
                      <rect x="58" y="40" width="50" height="8" rx="2" fill="#864EA8" />
                      <line x1="58" y1="58" x2="105" y2="58" stroke="#6F3B8C" strokeWidth="2" />
                    </g>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111116', marginBottom: '0.35rem' }}>
                    SAP SD
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.55, margin: 0 }}>
                    Sales & Distribution expertise supporting order-to-cash lifecycle and pricing processes.
                  </p>
                </div>
              </div>

              {/* CARD 3: SAP MM */}
              <div
                onMouseEnter={() => setHoveredCard('mm')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: '1.75rem',
                  borderRadius: '20px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E5EC',
                  boxShadow: hoveredCard === 'mm' ? '0 12px 32px rgba(134, 78, 168, 0.12)' : '0 4px 16px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '275px',
                  transform: hoveredCard === 'mm' ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: '400ms',
                }}
              >
                <div style={{ width: '100%', height: '120px', marginBottom: '1rem' }}>
                  <svg viewBox="0 0 220 120" fill="none" style={{ width: '100%', height: '100%' }}>
                    <image href={sapLogoImg} x="0" y="0" height="26" />

                    <g transform="translate(60, 5)">
                      <path d="M 45 10 L 90 32 L 45 55 L 0 32 Z" stroke="#864EA8" strokeWidth="1.5" fill="rgba(134,78,168,0.08)" />
                      <path d="M 0 32 L 45 55 L 45 100 L 0 77 Z" stroke="#864EA8" strokeWidth="1.5" />
                      <path d="M 45 55 L 90 32 L 90 77 L 45 100 Z" stroke="#864EA8" strokeWidth="1.5" />

                      <path d="M 45 32 L 72 45 L 45 58 L 18 45 Z" fill="#864EA8" />
                      <path d="M 18 45 L 45 58 L 45 80 L 18 67 Z" fill="#6F3B8C" />
                      <path d="M 45 58 L 72 45 L 72 67 L 45 80 Z" fill="#5B2F75" />
                    </g>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111116', marginBottom: '0.35rem' }}>
                    SAP MM
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.55, margin: 0 }}>
                    Materials Management capability for procurement automation and inventory control.
                  </p>
                </div>
              </div>

              {/* CARD 4: ABAP Development (Highlighted Active Purple Card) */}
              <div
                onMouseEnter={() => setHoveredCard('abap')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: '1.75rem',
                  borderRadius: '20px',
                  backgroundColor: '#6D28D9',
                  backgroundImage: 'linear-gradient(145deg, #7C3AED 0%, #5B21B6 100%)',
                  color: '#FFFFFF',
                  boxShadow: hoveredCard === 'abap' ? '0 16px 36px rgba(109, 40, 217, 0.32)' : '0 8px 24px rgba(109, 40, 217, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '275px',
                  transform: hoveredCard === 'abap' ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: '500ms',
                }}
              >
                <div style={{ width: '100%', height: '120px', marginBottom: '1rem' }}>
                  <svg viewBox="0 0 220 120" fill="none" style={{ width: '100%', height: '100%' }}>
                    <g transform="translate(40, 5)">
                      <rect x="0" y="10" width="120" height="85" rx="8" fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />
                      <rect x="18" y="24" width="110" height="80" rx="8" fill="#FFFFFF" opacity="0.95" />
                      <path d="M 18 31 C 18 27.13 21.13 24 25 24 L 121 24 C 124.87 24 128 27.13 128 31 L 128 40 L 18 40 Z" fill="#4C1D95" />
                      <circle cx="28" cy="32" r="3" fill="#EF4444" />
                      <circle cx="37" cy="32" r="3" fill="#F59E0B" />
                      <circle cx="46" cy="32" r="3" fill="#10B981" />

                      <line x1="28" y1="52" x2="80" y2="52" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="28" y1="64" x2="110" y2="64" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="28" y1="76" x2="68" y2="76" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
                    </g>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.35rem' }}>
                    ABAP Development
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.55, margin: 0 }}>
                    Custom ABAP software engineering, RICEFW development, and technical enhancements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .exp-vistex-col {
            grid-column: span 5 !important;
          }
          .exp-grid-col {
            grid-column: span 7 !important;
          }
        }
        @media (max-width: 768px) {
          .exp-sub-grid {
            grid-template-columns: repeat(1, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};
