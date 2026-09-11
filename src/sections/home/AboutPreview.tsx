import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Hexagon, Users, ShieldCheck, UserCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const AboutPreview: React.FC = () => {
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

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        paddingTop: 'clamp(3rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
        borderBottom: '1px solid #E6E0EB',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ maxWidth: '1420px', position: 'relative', zIndex: 2 }}>
        {/* Main Two-Column Composition: ~42% Left Content / ~58% Right Image Asset */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2rem',
            alignItems: 'start',
            marginBottom: '2.5rem',
          }}
        >
          {/* LEFT COLUMN (~42% Width / 5 Columns): Headline, Story Paragraphs & Outlined CTA */}
          <div style={{ gridColumn: 'span 12' }} className="about-redesign-left">
            {/* Eyebrow & Purple Accent Line */}
            <div style={{ marginBottom: '1rem' }}>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: '#864EA8',
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem',
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 400ms ease',
                }}
              >
                ABOUT NOVA SITARA
              </div>
              <div
                style={{
                  width: '32px',
                  height: '2px',
                  backgroundColor: '#864EA8',
                  borderRadius: '2px',
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 400ms ease 150ms',
                }}
              />
            </div>

            {/* Main Headline (Exact 3 Lines: Line 1 = 'The Right Expertise', Line 2 = 'for Complex SAP', Line 3 = 'Environments.') */}
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.1rem, 4.2vw, 3.25rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
                color: '#080808',
                textAlign: 'left',
                maxWidth: '100%',
                wordBreak: 'normal',
                overflowWrap: 'break-word',
              }}
            >
              <span
                style={{
                  display: 'block',
                  color: '#080808',
                  margin: 0,
                  padding: 0,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'all 500ms ease 100ms',
                }}
              >
                The Right Expertise
              </span>
              <span
                style={{
                  display: 'block',
                  whiteSpace: 'normal',
                  margin: 0,
                  padding: 0,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'all 500ms ease 220ms',
                }}
              >
                <span style={{ color: '#080808' }}>for </span>
                <span style={{ color: '#864EA8' }}>Complex SAP</span>
              </span>
              <span
                style={{
                  display: 'block',
                  color: '#864EA8',
                  margin: 0,
                  padding: 0,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'all 500ms ease 340ms',
                }}
              >
                Environments.
              </span>
            </h2>

            {/* Headline Bottom Accent Line with Terminal Dot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.65rem' }}>
              <div style={{ width: '38px', height: '2.5px', backgroundColor: '#864EA8', borderRadius: '2px' }} />
              <div style={{ width: '4.5px', height: '4.5px', borderRadius: '50%', backgroundColor: '#864EA8' }} />
            </div>

            {/* Content Paragraphs */}
            <div style={{ maxWidth: '530px', marginBottom: '1.75rem' }}>
              <p
                style={{
                  fontSize: '0.975rem',
                  lineHeight: 1.65,
                  color: '#080808',
                  fontWeight: 500,
                  marginBottom: '0.95rem',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 500ms ease 450ms, transform 500ms ease 450ms',
                }}
              >
                Nova Sitara Private Limited is a specialized SAP and Vistex consulting and technology staffing company. We connect organizations with experienced consultants who can support ongoing implementations, enhancements, migrations and application support requirements.
              </p>

              <p
                style={{
                  fontSize: '0.925rem',
                  lineHeight: 1.65,
                  color: '#4F4F5A',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 500ms ease 550ms, transform 500ms ease 550ms',
                }}
              >
                With a particular focus on the niche Vistex market, we help consulting firms, implementation partners and end clients quickly access qualified professionals for specific project roles and skill requirements.
              </p>
            </div>

            {/* Refined Outlined CTA Button */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 500ms ease 650ms, transform 500ms ease 650ms',
                width: '100%',
              }}
            >
              <Link to="/about" style={{ display: 'inline-block', width: '100%', maxWidth: '280px' }}>
                <Button
                  variant="outline"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #111116',
                    color: '#111116',
                    borderRadius: '8px',
                    padding: '0.7rem 1.6rem',
                    fontWeight: 700,
                    width: '100%',
                  }}
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN (~58% Width / 7 Columns): Public Image Asset /images/about.png */}
          <div style={{ gridColumn: 'span 12' }} className="about-redesign-right">
            <div
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 700ms cubic-bezier(0.16, 1, 0.3, 1) 300ms',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '580px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 40px rgba(134, 78, 168, 0.12), 0 4px 16px rgba(0, 0, 0, 0.03)',
                  border: '1px solid #E6E0EB',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <img
                  src="/images/about.png"
                  alt="Nova Sitara Enterprise Architecture & Sourcing Flow"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM VALUE STRIP: Compact Full-Width 5-Card Strip */}
        <div
          className="about-value-strip"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E6E0EB',
            borderRadius: '16px',
            padding: '1.35rem 1.5rem',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.02)',
            display: 'grid',
            gap: '1.25rem',
            alignItems: 'start',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 600ms ease 750ms',
          }}
        >
          {/* Column 1: Vistex Focus */}
          <div className="target-value-col">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F5F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <Target size={20} color="#864EA8" />
              </div>
              <div>
                <h5 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#080808', margin: '0 0 0.15rem 0' }}>
                  Vistex Focus
                </h5>
                <p style={{ fontSize: '0.8rem', color: '#4F4F5A', margin: 0, lineHeight: 1.35 }}>
                  Deep expertise in the niche Vistex market.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: SAP Expertise */}
          <div className="target-value-col">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F5F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <Hexagon size={20} color="#864EA8" />
              </div>
              <div>
                <h5 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#080808', margin: '0 0 0.15rem 0' }}>
                  SAP Expertise
                </h5>
                <p style={{ fontSize: '0.8rem', color: '#4F4F5A', margin: 0, lineHeight: 1.35 }}>
                  Strong capabilities across key SAP modules.
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: SAP SuccessFactors */}
          <div className="target-value-col">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F5F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <UserCheck size={20} color="#864EA8" />
              </div>
              <div>
                <h5 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#080808', margin: '0 0 0.15rem 0' }}>
                  SAP SuccessFactors
                </h5>
                <p style={{ fontSize: '0.8rem', color: '#4F4F5A', margin: 0, lineHeight: 1.35 }}>
                  Cloud HXM expertise across Employee Central, Recruiting, Onboarding, Performance, Learning, Compensation and integrations.
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Flexible Engagement */}
          <div className="target-value-col">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F5F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <Users size={20} color="#864EA8" />
              </div>
              <div>
                <h5 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#080808', margin: '0 0 0.15rem 0' }}>
                  Flexible Engagement
                </h5>
                <p style={{ fontSize: '0.8rem', color: '#4F4F5A', margin: 0, lineHeight: 1.35 }}>
                  Scalable models to match your project needs.
                </p>
              </div>
            </div>
          </div>

          {/* Column 5: Project Support */}
          <div className="target-value-col target-value-col-last">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F5F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <ShieldCheck size={20} color="#864EA8" />
              </div>
              <div>
                <h5 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#080808', margin: '0 0 0.15rem 0' }}>
                  Project Support
                </h5>
                <p style={{ fontSize: '0.8rem', color: '#4F4F5A', margin: 0, lineHeight: 1.35 }}>
                  End-to-end support for successful outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1200px) {
          .about-value-strip {
            grid-template-columns: repeat(5, 1fr) !important;
          }
          .target-value-col {
            border-right: 1px solid #E6E0EB;
            padding-right: 1rem;
          }
          .target-value-col-last {
            border-right: none !important;
            padding-right: 0 !important;
          }
        }
        @media (min-width: 992px) and (max-width: 1199px) {
          .about-value-strip {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .target-value-col {
            border-right: none !important;
            padding-right: 0 !important;
          }
        }
        @media (min-width: 768px) and (max-width: 991px) {
          .about-value-strip {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .target-value-col {
            border-right: none !important;
            padding-right: 0 !important;
          }
        }
        @media (min-width: 992px) {
          .about-redesign-left {
            grid-column: span 5 !important;
          }
          .about-redesign-right {
            grid-column: span 7 !important;
          }
        }
        @media (max-width: 767px) {
          .about-value-strip {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
            padding: 1.25rem 1rem !important;
          }
          .target-value-col {
            border-right: none !important;
            padding-right: 0 !important;
            border-bottom: 1px solid #F0EDF5;
            padding-bottom: 1rem;
          }
          .target-value-col-last {
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

