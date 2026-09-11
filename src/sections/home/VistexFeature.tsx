import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useLanguage } from '../../context/LanguageContext';

export const VistexFeature: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imgError, setImgError] = useState(false);
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
          {/* LEFT: Clean Branded Vistex Consulting Expertise AI Graphic */}
          <div style={{ gridColumn: 'span 12' }} className="vistex-feat-left">
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 16px 40px rgba(134, 78, 168, 0.22)',
                backgroundColor: '#864EA8',
                backgroundImage: 'linear-gradient(145deg, #864EA8 0%, #5B21B6 100%)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 600ms ease 100ms, transform 600ms ease 100ms',
                position: 'relative',
                minHeight: '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!imgError ? (
                <img
                  src="/images/vistex-feature.png"
                  alt="Vistex Consulting Expertise"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                  onError={() => setImgError(true)}
                />
              ) : (
                /* High-fidelity Branded Fallback if image path is not cached */
                <div
                  style={{
                    padding: 'clamp(2.5rem, 4.5vw, 3.75rem)',
                    color: '#FFFFFF',
                    width: '100%',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Sparkles size={18} color="#FFFFFF" />
                    <span style={{ fontSize: '0.825rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
                      {t.vistexFeature.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.75rem, 3.8vw, 2.35rem)', fontWeight: 800, color: '#FFFFFF', margin: 0, overflowWrap: 'break-word', wordBreak: 'normal', lineHeight: 1.15 }}>
                    {t.vistexFeature.cardTitle}
                  </h3>
                  <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    Specialized SAP & Vistex Solutions, Incentive Management & Strategic Consulting.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Copy & Concise Capability Badges */}
          <div style={{ gridColumn: 'span 12' }} className="vistex-feat-right">
            <div className="eyebrow" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 400ms ease' }}>
              NICHE FOCUS
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.1rem, 4.2vw, 3.25rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: '#000000',
                marginBottom: '1.25rem',
                overflowWrap: 'break-word',
                wordBreak: 'normal',
              }}
            >
              {t.vistexFeature.headline}
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.65,
                color: '#22222A',
                marginBottom: '2rem',
                overflowWrap: 'break-word',
                wordBreak: 'normal',
              }}
            >
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
