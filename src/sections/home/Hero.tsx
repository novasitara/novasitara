import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { IsometricHeroIllustration } from '../../components/ui/IsometricHeroIllustration';
import { MarketFocusSlider } from '../../components/ui/MarketFocusSlider';
import { useLanguage } from '../../context/LanguageContext';

export const Hero: React.FC = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pills = ['Vistex', 'SAP EWM', 'SAP SD', 'SAP MM', 'SuccessFactors', 'ABAP'];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#FAFAFA',
        paddingTop: 'clamp(2.5rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(3.5rem, 7vw, 6rem)',
        overflow: 'hidden',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Dynamic Top Market Spotlight Slider (5 Configurable Target Market Slides) */}
        <MarketFocusSlider />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column — Clean Editorial Content */}
          <div style={{ gridColumn: 'span 12' }} className="hero-text-col">
            {/* Eyebrow */}
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                color: '#864EA8',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 400ms ease',
              }}
            >
              {t.hero.eyebrow}
            </div>

            {/* Headline */}
            <h1
              style={{
                marginBottom: '1.25rem',
                color: '#000000',
                lineHeight: 1.12,
                fontSize: 'clamp(2.1rem, 5vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                wordBreak: 'break-word',
              }}
            >
              <span className="text-mask-wrapper">
                <span className={`text-mask-line ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
                  {t.hero.titleLine1}
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
                  {t.hero.titleLine2}
                </span>
              </span>
            </h1>

            {/* Paragraph Text */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                lineHeight: 1.65,
                color: 'var(--color-text-body)',
                maxWidth: '600px',
                marginBottom: '2rem',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 600ms ease 650ms, transform 600ms ease 650ms',
              }}
            >
              {t.hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div
              className="hero-cta-buttons"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2rem',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 600ms ease 800ms, transform 600ms ease 800ms',
              }}
            >
              <Link to="/services" className="hero-btn-link">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />} style={{ width: '100%' }}>
                  {t.hero.exploreServices}
                </Button>
              </Link>
              <Link to="/contact" className="hero-btn-link">
                <Button variant="outline" size="lg" style={{ width: '100%' }}>
                  {t.hero.talkToExperts}
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
                maxWidth: '100%',
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginRight: '0.35rem' }}>
                {t.hero.specializedAcross}
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
          .hero-btn-link {
            width: auto !important;
          }
        }
        @media (max-width: 576px) {
          .hero-cta-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-btn-link {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
