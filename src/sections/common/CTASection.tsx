import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  buttonText = 'Talk to Our Experts',
  buttonLink = '/contact',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
        backgroundColor: '#000000',
        color: '#FFFFFF',
        paddingTop: 'clamp(4rem, 8vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Purple Technical Line System Background */}
      <svg
        viewBox="0 0 1440 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.22,
        }}
      >
        <path d="M -100 200 Q 360 60 720 200 T 1540 200" stroke="#864EA8" strokeWidth="1.5" />
        <circle cx="720" cy="200" r="5" fill="#864EA8" />
        <circle cx="360" cy="130" r="4" fill="#C084FC" />
      </svg>

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          {/* Eyebrow */}
          <div
            style={{
              fontSize: '0.825rem',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#C084FC',
              marginBottom: '1.25rem',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 400ms ease',
            }}
          >
            PROJECT INQUIRY
          </div>

          {/* Large White Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.1rem, 4.2vw, 3.25rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
              wordBreak: 'normal',
              overflowWrap: 'break-word',
            }}
          >
            <span className="text-mask-wrapper">
              <span className={`text-mask-line ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '150ms' }}>
                {title ? title : 'Have an SAP project'}
              </span>
            </span>
            {!title && (
              <span className="text-mask-wrapper">
                <span className={`text-mask-line ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
                  that needs the right expertise?
                </span>
              </span>
            )}
          </h2>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '640px',
              margin: '0 auto 2.5rem auto',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 600ms ease 450ms, transform 600ms ease 450ms',
            }}
          >
            {subtitle ? subtitle : "Tell us what your project needs. We'll help connect you with the right expertise."}
          </p>

          {/* CTA Button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 600ms ease 600ms, transform 600ms ease 600ms',
              width: '100%',
            }}
          >
            <Link to={buttonLink} style={{ display: 'inline-block', width: '100%', maxWidth: '320px' }}>
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
                style={{
                  backgroundColor: '#864EA8',
                  borderRadius: '12px',
                  padding: '0.95rem 2rem',
                  boxShadow: '0 8px 24px rgba(134, 78, 168, 0.4)',
                  width: '100%',
                }}
              >
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 576px) {
          .desktop-br-only {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
