import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const CareersPreview: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
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

  const roles = [
    { role: 'Vistex Consultant', spec: 'Niche Vistex Sourcing & Consulting' },
    { role: 'SAP EWM Consultant', spec: 'Extended Warehouse Management' },
    { role: 'SAP SD Consultant', spec: 'Sales & Distribution' },
    { role: 'SAP MM Consultant', spec: 'Materials Management' },
    { role: 'ABAP Developer', spec: 'Custom ABAP Software Engineering' },
  ];

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
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT: Statement & Supporting Copy */}
          <div style={{ gridColumn: 'span 12' }} className="careers-left-col">
            <div className="eyebrow" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 400ms ease' }}>
              CAREER OPPORTUNITIES
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
                wordBreak: 'normal',
                overflowWrap: 'break-word',
              }}
            >
              Bring Your Expertise to the Next Project.
            </h2>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--color-text-body)', marginBottom: '2rem' }}>
              Explore opportunities with Nova Sitara and contribute your expertise across SAP and Vistex project environments.
            </p>

            <Link to="/careers">
              <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={18} />}>
                View All Opportunities
              </Button>
            </Link>
          </div>

          {/* RIGHT: Clean Editorial Roles List */}
          <div style={{ gridColumn: 'span 12' }} className="careers-right-col">
            <div style={{ width: '100%', borderTop: '1px solid var(--color-border)' }}>
              {roles.map((item, idx) => {
                const isHovered = hoveredIdx === idx;

                return (
                  <div
                    key={item.role}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      position: 'relative',
                      padding: '1.5rem 0 1.5rem 1.25rem',
                      borderBottom: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                      backgroundColor: isHovered ? '#FAFAFA' : 'transparent',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                      transitionDelay: `${idx * 80}ms`,
                    }}
                  >
                    {/* Active Left Purple Line Indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        backgroundColor: '#864EA8',
                        transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'top',
                        transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />

                    <div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: isHovered ? '#864EA8' : '#000000',
                          marginBottom: '0.25rem',
                          transition: 'transform 200ms ease, color 150ms ease',
                          transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
                          margin: 0,
                        }}
                      >
                        {item.role}
                      </h3>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                        {item.spec}
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        backgroundColor: isHovered ? '#864EA8' : 'transparent',
                        color: isHovered ? '#FFFFFF' : '#000000',
                        transition: 'all 200ms ease',
                      }}
                    >
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .careers-left-col {
            grid-column: span 5 !important;
          }
          .careers-right-col {
            grid-column: span 7 !important;
          }
        }
      `}</style>
    </section>
  );
};
