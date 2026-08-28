import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Layers, UserCheck, Handshake, Target, Hexagon, Users, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Logo } from '../../components/common/Logo';

export const AboutPreview: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
        paddingTop: 'clamp(3.5rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(3.5rem, 5vw, 4.5rem)',
        borderBottom: '1px solid #E6E0EB',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ maxWidth: '1420px', position: 'relative', zIndex: 2 }}>
        {/* Main Two-Column Composition: ~42% Left Content / ~58% Right Enterprise Architecture Diagram */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem',
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
                fontSize: 'clamp(2.4rem, 3.6vw, 3.35rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.04em',
                fontWeight: 800,
                marginBottom: '1.25rem',
                color: '#080808',
                textAlign: 'left',
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
                  whiteSpace: 'nowrap',
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
              }}
            >
              <Link to="/about">
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
                  }}
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN (~58% Width / 7 Columns): Clean Architecture Infographic Diagram (100% Vector & Component-based) */}
          <div style={{ gridColumn: 'span 12' }} className="about-redesign-right">
            <div
              style={{
                position: 'relative',
                width: '100%',
                minHeight: '480px',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1px solid #E6E0EB',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 16px 40px rgba(134, 78, 168, 0.1), 0 4px 16px rgba(0, 0, 0, 0.02)',
              }}
            >
              {/* SVG Vector Connector Lines & Technical Concentric Rings */}
              <svg
                viewBox="0 0 620 440"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              >
                {/* Background Isometric Technical Grid Lines */}
                <g opacity="0.12">
                  <path d="M 0 110 L 620 420 M 0 220 L 620 530 M 0 0 L 620 310" stroke="#864EA8" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 620 110 L 0 420 M 620 220 L 0 530 M 620 0 L 0 310" stroke="#864EA8" strokeWidth="1" strokeDasharray="3 3" />
                </g>

                {/* Concentric Architectural Rings around Central Hub */}
                <circle cx="310" cy="220" r="82" stroke="#864EA8" strokeWidth="1.5" opacity="0.35" />
                <circle cx="310" cy="220" r="98" stroke="#864EA8" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

                {/* Right-Angle Thin Connector Vector Lines to 4 Process Cards */}
                {/* Connector to Card 01 (Top Left) */}
                <path d="M 228 180 L 160 180 L 160 135" stroke="#864EA8" strokeWidth="1.5" fill="none" />
                <polygon points="160,135 156,141 164,141" fill="#864EA8" />
                <rect x="180" y="177" width="6" height="6" fill="#864EA8" />

                {/* Connector to Card 02 (Top Right) */}
                <path d="M 392 180 L 460 180 L 460 135" stroke="#864EA8" strokeWidth="1.5" fill="none" />
                <polygon points="460,135 456,141 464,141" fill="#864EA8" />
                <rect x="424" y="177" width="6" height="6" fill="#864EA8" />

                {/* Connector to Card 03 (Bottom Right) */}
                <path d="M 392 260 L 460 260 L 460 305" stroke="#864EA8" strokeWidth="1.5" fill="none" />
                <polygon points="460,305 456,299 464,299" fill="#864EA8" />
                <rect x="424" y="257" width="6" height="6" fill="#864EA8" />

                {/* Connector to Card 04 (Bottom Left) */}
                <path d="M 228 260 L 160 260 L 160 305" stroke="#864EA8" strokeWidth="1.5" fill="none" />
                <polygon points="160,305 156,299 464,299" fill="#864EA8" />
                <rect x="180" y="257" width="6" height="6" fill="#864EA8" />
              </svg>

              {/* CENTRAL HUB: Multi-Ring Circle with Official Nova Sitara Logo */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 3,
                  width: '155px',
                  height: '155px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #864EA8',
                  boxShadow: '0 0 32px rgba(134, 78, 168, 0.2), 0 4px 16px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '0.85rem',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1)' : 'scale(0.85)',
                  transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1) 250ms',
                }}
              >
                <div>
                  <Logo variant="default" showWordmark={true} />
                </div>
              </div>

              {/* CARD 01: Top Left */}
              <div
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  width: '215px',
                  padding: '1.2rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1px solid #E6E0EB',
                  boxShadow: hoveredCard === 1 ? '0 12px 28px rgba(134, 78, 168, 0.18)' : '0 6px 18px rgba(134, 78, 168, 0.06)',
                  zIndex: 4,
                  transform: hoveredCard === 1 ? 'translateY(-3px)' : 'translateY(0)',
                  transition: 'all 250ms ease',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: '350ms',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#864EA8' }}>01</span>
                  <FileText size={20} color="#864EA8" />
                </div>
                <h4 style={{ fontSize: '0.825rem', fontWeight: 800, color: '#080808', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  PROJECT REQUIREMENT
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#4F4F5A', lineHeight: 1.4, margin: 0 }}>
                  Understanding business needs & skill gaps.
                </p>
              </div>

              {/* CARD 02: Top Right */}
              <div
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '215px',
                  padding: '1.2rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1px solid #E6E0EB',
                  boxShadow: hoveredCard === 2 ? '0 12px 28px rgba(134, 78, 168, 0.18)' : '0 6px 18px rgba(134, 78, 168, 0.06)',
                  zIndex: 4,
                  transform: hoveredCard === 2 ? 'translateY(-3px)' : 'translateY(0)',
                  transition: 'all 250ms ease',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: '450ms',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#864EA8' }}>02</span>
                  <Layers size={20} color="#864EA8" />
                </div>
                <h4 style={{ fontSize: '0.825rem', fontWeight: 800, color: '#080808', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  SPECIALIZED EXPERTISE
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#4F4F5A', lineHeight: 1.4, margin: 0 }}>
                  Access to SAP & Vistex domain experts.
                </p>
              </div>

              {/* CARD 03: Bottom Right */}
              <div
                onMouseEnter={() => setHoveredCard(3)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  width: '215px',
                  padding: '1.2rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1px solid #E6E0EB',
                  boxShadow: hoveredCard === 3 ? '0 12px 28px rgba(134, 78, 168, 0.18)' : '0 6px 18px rgba(134, 78, 168, 0.06)',
                  zIndex: 4,
                  transform: hoveredCard === 3 ? 'translateY(-3px)' : 'translateY(0)',
                  transition: 'all 250ms ease',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: '550ms',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#864EA8' }}>03</span>
                  <UserCheck size={20} color="#864EA8" />
                </div>
                <h4 style={{ fontSize: '0.825rem', fontWeight: 800, color: '#080808', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  QUALIFIED PROFESSIONAL
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#4F4F5A', lineHeight: 1.4, margin: 0 }}>
                  Connecting with the right consultant for the role.
                </p>
              </div>

              {/* CARD 04: Bottom Left */}
              <div
                onMouseEnter={() => setHoveredCard(4)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  width: '215px',
                  padding: '1.2rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1px solid #E6E0EB',
                  boxShadow: hoveredCard === 4 ? '0 12px 28px rgba(134, 78, 168, 0.18)' : '0 6px 18px rgba(134, 78, 168, 0.06)',
                  zIndex: 4,
                  transform: hoveredCard === 4 ? 'translateY(-3px)' : 'translateY(0)',
                  transition: 'all 250ms ease',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: '650ms',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#864EA8' }}>04</span>
                  <Handshake size={20} color="#864EA8" />
                </div>
                <h4 style={{ fontSize: '0.825rem', fontWeight: 800, color: '#080808', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  PROJECT SUPPORT
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#4F4F5A', lineHeight: 1.4, margin: 0 }}>
                  Delivery & maintenance for successful outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM VALUE STRIP: Compact Full-Width 4-Column Strip */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E6E0EB',
            borderRadius: '16px',
            padding: '1.35rem 1.75rem',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.02)',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.25rem',
            alignItems: 'center',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 600ms ease 750ms',
          }}
        >
          {/* Column 1: Vistex Focus */}
          <div style={{ gridColumn: 'span 3', borderRight: '1px solid #E6E0EB', paddingRight: '1rem' }} className="target-value-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F5F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
          <div style={{ gridColumn: 'span 3', borderRight: '1px solid #E6E0EB', paddingRight: '1rem' }} className="target-value-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F5F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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

          {/* Column 3: Flexible Engagement */}
          <div style={{ gridColumn: 'span 3', borderRight: '1px solid #E6E0EB', paddingRight: '1rem' }} className="target-value-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F5F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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

          {/* Column 4: Project Support */}
          <div style={{ gridColumn: 'span 3' }} className="target-value-col-last">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F5F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
        @media (min-width: 992px) {
          .about-redesign-left {
            grid-column: span 5 !important;
          }
          .about-redesign-right {
            grid-column: span 7 !important;
          }
        }
        @media (max-width: 991px) {
          .target-value-col {
            grid-column: span 6 !important;
            border-right: none !important;
            margin-bottom: 1rem;
          }
          .target-value-col-last {
            grid-column: span 6 !important;
          }
        }
        @media (max-width: 576px) {
          .target-value-col, .target-value-col-last {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
};
