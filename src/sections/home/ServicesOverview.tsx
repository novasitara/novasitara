import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { servicesData } from '../../data/services';
import { Button } from '../../components/common/Button';

export const ServicesOverview: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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
        backgroundColor: '#FAFAFA',
        paddingTop: 'clamp(3.5rem, 6vw, 6rem)',
        paddingBottom: 'clamp(3.5rem, 6vw, 6rem)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '720px', marginBottom: '3rem' }}>
          <div className="eyebrow" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 400ms ease' }}>
            SERVICE DIRECTORY
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', color: '#000000', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            <span className="text-mask-wrapper">
              <span className={`text-mask-line ${isVisible ? 'is-visible' : ''}`}>
                How We Help.
              </span>
            </span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
            Structured consulting capabilities and technology staffing solutions designed for SAP and Vistex initiatives.
          </p>
        </div>

        {/* Editorial Vertical Service Directory Index */}
        <div style={{ width: '100%', marginBottom: '3rem', borderTop: '1px solid var(--color-border)' }}>
          {servicesData.map((service, idx) => {
            const isHovered = hoveredId === service.id;
            const numberFormatted = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="service-directory-row"
                style={{
                  position: 'relative',
                  padding: '1.75rem 0',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: '1.25rem',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 200ms ease',
                  backgroundColor: isHovered ? '#FFFFFF' : 'transparent',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${idx * 50}ms`,
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

                {/* Number */}
                <div className="service-row-num" style={{ gridColumn: 'span 1', paddingLeft: '0.75rem' }}>
                  <span
                    style={{
                      fontSize: '1rem',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      color: isHovered ? '#864EA8' : 'var(--color-text-muted)',
                      transition: 'color 150ms ease',
                    }}
                  >
                    {numberFormatted}
                  </span>
                </div>

                {/* Service Name */}
                <div className="service-row-title" style={{ gridColumn: 'span 5' }}>
                  <h3
                    style={{
                      fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
                      color: isHovered ? '#864EA8' : '#000000',
                      transition: 'transform 200ms ease, color 150ms ease',
                      transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Short Description */}
                <div className="service-row-desc" style={{ gridColumn: 'span 5' }}>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.55,
                      margin: 0,
                      opacity: isHovered ? 1 : 0.85,
                    }}
                  >
                    {service.shortDescription}
                  </p>
                </div>

                {/* Arrow Action Link */}
                <div className="service-row-arrow" style={{ gridColumn: 'span 1', textAlign: 'right', paddingRight: '0.75rem' }}>
                  <Link to={`/services#${service.id}`}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        backgroundColor: isHovered ? '#864EA8' : 'transparent',
                        color: isHovered ? '#864EA8' : '#000000',
                        transition: 'all 200ms ease',
                      }}
                    >
                      <ArrowUpRight size={18} />
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Services Link */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.925rem', margin: 0 }}>
            Dedicated functional and technical capabilities for your SAP enterprise environment.
          </p>
          <Link to="/services">
            <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={18} />}>
              View All 9 Services Directory
            </Button>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .service-directory-row {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 1.25rem 0.75rem !important;
            gap: 0.5rem !important;
          }
          .service-row-num {
            padding-left: 0 !important;
          }
          .service-row-arrow {
            align-self: flex-end !important;
            margin-top: -1.75rem !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};
