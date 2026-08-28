import React, { useEffect, useRef, useState } from 'react';

export const WhyNovaSitara: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const stages = [
    {
      num: '01',
      title: 'Understand',
      desc: 'Understand the project requirement and skill gap.',
    },
    {
      num: '02',
      title: 'Identify',
      desc: 'Identify the right SAP / Vistex expertise.',
    },
    {
      num: '03',
      title: 'Connect',
      desc: 'Connect organizations with qualified professionals.',
    },
    {
      num: '04',
      title: 'Deliver',
      desc: 'Support the project through the required engagement.',
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
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '720px', marginBottom: '4rem' }}>
          <div className="eyebrow" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 400ms ease' }}>
            HOW WE WORK
          </div>
          <h2 style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', color: '#000000', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            <span className="text-mask-wrapper">
              <span className={`text-mask-line ${isVisible ? 'is-visible' : ''}`}>
                From Requirement to the
              </span>
            </span>
            <br />
            <span className="text-mask-wrapper">
              <span className={`text-mask-line ${isVisible ? 'is-visible' : ''}`} style={{ color: '#864EA8', transitionDelay: '150ms' }}>
                Right Expertise.
              </span>
            </span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
            Flexible engagement models and carefully selected consultants help organizations address specific SAP and Vistex project requirements.
          </p>
        </div>

        {/* Editorial Horizontal Timeline */}
        <div style={{ position: 'relative', marginTop: '2.5rem' }}>
          {/* Base Vector Line Track */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '2%',
              right: '2%',
              height: '2px',
              backgroundColor: 'rgba(134, 78, 168, 0.15)',
              zIndex: 1,
            }}
          />

          {/* Progressive Purple Line Fill */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '2%',
              height: '2px',
              backgroundColor: '#864EA8',
              width: isVisible ? '96%' : '0%',
              transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 300ms',
              zIndex: 2,
            }}
          />

          {/* 4 Stage Timeline Items */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '1.75rem',
              position: 'relative',
              zIndex: 3,
            }}
          >
            {stages.map((stage, idx) => (
              <div
                key={stage.num}
                style={{
                  gridColumn: 'span 3',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 600ms ease ${350 + idx * 180}ms, transform 600ms ease ${350 + idx * 180}ms`,
                }}
                className="timeline-stage-col"
              >
                {/* Number & Node Accent */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: isVisible ? '#864EA8' : '#FFFFFF',
                      border: '2px solid #864EA8',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      boxShadow: '0 4px 12px rgba(134, 78, 168, 0.18)',
                      transition: 'all 300ms ease',
                    }}
                  >
                    {stage.num}
                  </div>
                </div>

                {/* Stage Title */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#000000', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                  {stage.title}
                </h3>

                {/* Stage Description */}
                <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-stage-col {
            grid-column: span 12 !important;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </section>
  );
};
