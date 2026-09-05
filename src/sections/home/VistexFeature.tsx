import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useLanguage } from '../../context/LanguageContext';

export const VistexFeature: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const capabilities = language === 'DE'
    ? ['Beratung & Konzeption', 'Implementierungsunterstützung', 'Systemerweiterung', 'Migration', 'Anwendungsbetreuung']
    : ['Consulting', 'Implementation Support', 'Enhancement', 'Migration', 'Application Support'];

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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* LEFT: Large "VISTEX" Header & Custom Technical Architecture SVG Illustration */}
          <div style={{ gridColumn: 'span 12' }} className="vistex-feat-left">
            <div
              style={{
                padding: 'clamp(2.25rem, 4vw, 3.5rem)',
                borderRadius: '24px',
                backgroundColor: '#864EA8',
                backgroundImage: 'linear-gradient(140deg, #864EA8 0%, #5B21B6 100%)',
                color: '#FFFFFF',
                boxShadow: '0 16px 40px rgba(134, 78, 168, 0.22)',
                position: 'relative',
                overflow: 'hidden',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 600ms ease 100ms, transform 600ms ease 100ms',
              }}
            >
              {/* Giant Background Watermark */}
              <span
                style={{
                  fontSize: 'clamp(5rem, 12vw, 9rem)',
                  fontWeight: 900,
                  color: 'rgba(255, 255, 255, 0.08)',
                  position: 'absolute',
                  top: '-15%',
                  right: '-10%',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                VISTEX
              </span>

              {/* Technical Architecture Line Diagram */}
              <div style={{ width: '100%', height: '220px', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
                <svg viewBox="0 0 360 220" fill="none" style={{ width: '100%', height: '100%' }}>
                  <path d="M 40 110 L 180 30 L 320 110 L 180 190 Z" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
                  <path d="M 80 110 L 180 55 L 280 110 L 180 165 Z" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.7" />

                  {/* Connected Core Cuboid */}
                  <path d="M 140 100 L 180 80 L 220 100 L 180 120 Z" fill="#FFFFFF" opacity="0.9" />
                  <path d="M 140 100 L 180 120 L 180 140 L 140 120 Z" fill="rgba(255,255,255,0.7)" />
                  <path d="M 180 120 L 220 100 L 220 120 L 180 140 Z" fill="rgba(255,255,255,0.5)" />

                  <circle cx="180" cy="80" r="5" fill="#FFFFFF" className="animate-node-pulse" />
                </svg>
              </div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>
                  {t.vistexFeature.badge}
                </span>
                <h3 style={{ fontSize: 'clamp(1.75rem, 3.8vw, 2.35rem)', fontWeight: 800, color: '#FFFFFF', margin: '0.25rem 0 0 0', wordBreak: 'break-word', lineHeight: 1.15 }}>
                  {t.vistexFeature.cardTitle}
                </h3>
              </div>
            </div>
          </div>

          {/* RIGHT: Copy & Concise Capability Badges */}
          <div style={{ gridColumn: 'span 12' }} className="vistex-feat-right">
            <div className="eyebrow" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 400ms ease' }}>
              NICHE FOCUS
            </div>

            <h2 style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', color: '#000000', lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
              {t.vistexFeature.headline}
            </h2>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#22222A', marginBottom: '2rem' }}>
              {t.vistexFeature.description}
            </p>

            {/* Concise Capability Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              {capabilities.map((cap, idx) => (
                <div
                  key={cap}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                    transition: `opacity 400ms ease ${300 + idx * 100}ms, transform 400ms ease ${300 + idx * 100}ms`,
                  }}
                >
                  <CheckCircle size={18} color="#864EA8" />
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#111116' }}>{cap}</span>
                </div>
              ))}
            </div>

            <div>
              <Link to="/expertise#vistex">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
                  {t.vistexFeature.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .vistex-feat-left {
            grid-column: span 5 !important;
          }
          .vistex-feat-right {
            grid-column: span 7 !important;
          }
        }
      `}</style>
    </section>
  );
};
