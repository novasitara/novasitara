import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { IsometricHeroIllustration } from '../../components/ui/IsometricHeroIllustration';

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const pills = ['Vistex', 'SAP EWM', 'SAP SD', 'SAP MM', 'ABAP'];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#FAFAFA',
        paddingTop: 'clamp(4rem, 8vw, 6.5rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6.5rem)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column — Clean Editorial Content */}
          <div style={{ gridColumn: 'span 12' }} className="hero-text-col">
            {/* Headline */}
            <h1
              style={{
                marginBottom: '1.25rem',
                color: '#000000',
                lineHeight: 1.12,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
              }}
            >
              <span className="text-mask-wrapper">
                <span className={`text-mask-line ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
                  Specialized SAP & Vistex Expertise.
                </span>
              </span>
              <span className="text-mask-wrapper" style={{ marginTop: '0.25rem' }}>
                <span
                  className={`text-mask-line ${isVisible ? 'is-visible' : ''}`}
                  style={{
                    color: 'var(--color-primary)',
                    transitionDelay: '450ms',
                  }}
                >
                  Built for Your Success.
                </span>
              </span>
            </h1>

            {/* Paragraph Text */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
                lineHeight: 1.65,
                color: 'var(--color-text-body)',
                maxWidth: '600px',
                marginBottom: '2.25rem',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 600ms ease 650ms, transform 600ms ease 650ms',
              }}
            >
              Nova Sitara connects organizations with experienced SAP and Vistex professionals who help accelerate implementations, enhancements, migrations and application support.
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2.25rem',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 600ms ease 800ms, transform 600ms ease 800ms',
              }}
            >
              <Link to="/services">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
                  Explore Our Services
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Talk to Our Experts
                </Button>
              </Link>
            </div>

            {/* Specialized Expertise Pills Container */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.65rem',
                padding: '0.75rem 1.25rem',
                backgroundColor: 'rgba(230, 230, 238, 0.75)',
                borderRadius: '16px',
                border: '1px solid rgba(210, 210, 225, 0.8)',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 600ms ease 1000ms',
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginRight: '0.35rem' }}>
                Specialized expertise across:
              </span>
              {pills.map((pill) => (
                <Link key={pill} to={`/expertise#${pill.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span
                    style={{
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      color: '#000000',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #D2D2DC',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '20px',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.04)',
                      display: 'inline-block',
                      transition: 'all 150ms ease',
                    }}
                  >
                    {pill}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column — Exact Uploaded Hero Graphic Image */}
          <div style={{ gridColumn: 'span 12' }} className="hero-visual-col">
            <IsometricHeroIllustration />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-text-col {
            grid-column: span 7 !important;
          }
          .hero-visual-col {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </section>
  );
};
