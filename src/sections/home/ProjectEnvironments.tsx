import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const ProjectEnvironments: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

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

  const categories = [
    {
      title: t.customerCards.card1Title,
      subtitle: t.customerCards.card1Subtitle,
      desc: t.customerCards.card1Desc,
      cta: t.customerCards.card1Cta,
    },
    {
      title: t.customerCards.card2Title,
      subtitle: t.customerCards.card2Subtitle,
      desc: t.customerCards.card2Desc,
      cta: t.customerCards.card2Cta,
    },
    {
      title: t.customerCards.card3Title,
      subtitle: t.customerCards.card3Subtitle,
      desc: t.customerCards.card3Desc,
      cta: t.customerCards.card3Cta,
    },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#FAFAFA',
        paddingTop: 'clamp(5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(5rem, 8vw, 7rem)',
        borderBottom: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '720px', marginBottom: '4rem' }}>
          <div className="eyebrow" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 400ms ease' }}>
            {t.customerCards.eyebrow}
          </div>
          <h2 style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', color: '#000000', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
            <span className="text-mask-wrapper">
              <span className={`text-mask-line ${isVisible ? 'is-visible' : ''}`}>
                {t.customerCards.title}
              </span>
            </span>
          </h2>
        </div>

        {/* Visual Information Architecture Pathway */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 2rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E8E5EC',
            marginBottom: '3rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {['PROJECT NEED', 'NOVA SITARA', 'SPECIALIZED EXPERTISE', 'ENGAGEMENT'].map((step, idx, arr) => (
            <React.Fragment key={step}>
              <span style={{ fontSize: '0.825rem', fontWeight: 800, letterSpacing: '0.12em', color: '#111116' }}>
                {step}
              </span>
              {idx < arr.length - 1 && (
                <div style={{ width: '36px', height: '2px', backgroundColor: '#864EA8', position: 'relative' }} className="flow-arrow-2">
                  <div style={{ position: 'absolute', right: 0, top: '-3px', width: '0', height: '0', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid #864EA8' }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 3 Strong Editorial Areas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.75rem',
          }}
        >
          {categories.map((cat, idx) => (
            <div
              key={cat.title}
              style={{
                gridColumn: 'span 4',
                padding: '2rem',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E5EC',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '250px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 600ms ease ${300 + idx * 150}ms, transform 600ms ease ${300 + idx * 150}ms`,
              }}
              className="support-cat-card"
            >
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#864EA8', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                  {cat.subtitle}
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111116', marginBottom: '0.75rem' }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {cat.desc}
                </p>
              </div>

              <div style={{ paddingTop: '1.25rem', borderTop: '1px solid #F0EDF5', marginTop: '1.5rem' }}>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 700, color: '#864EA8' }}>
                  <span>{cat.cta}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .support-cat-card {
            grid-column: span 12 !important;
          }
          .flow-arrow-2 {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
