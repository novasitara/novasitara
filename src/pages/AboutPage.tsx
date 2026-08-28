import React from 'react';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../sections/common/CTASection';
import { CheckCircle2, Shield, Target, Lightbulb, Users2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const principles = [
    {
      icon: <Target size={24} />,
      title: "Domain Specialization",
      description: "Focusing on niche Vistex requirements alongside core SAP functional and technical modules."
    },
    {
      icon: <Shield size={24} />,
      title: "Quality & Alignment",
      description: "Carefully selecting experienced consultants whose skills match your exact project scope and objectives."
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Flexible Engagement",
      description: "Offering adaptable engagement models designed to support consulting firms, partners, and enterprise clients."
    },
    {
      icon: <Users2 size={24} />,
      title: "Collaborative Focus",
      description: "Building long-term consulting relationships grounded in practical execution and open communication."
    }
  ];

  return (
    <>
      <SEO
        title="About Nova Sitara | SAP & Vistex Expertise"
        description="Learn about Nova Sitara Private Limited, our focus on specialized SAP and Vistex consulting, technology staffing, and flexible engagement models."
      />
      <main>
        {/* Page Hero */}
        <section
          style={{
            backgroundColor: 'var(--color-bg-subtle)',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container">
            <div style={{ maxWidth: '800px' }}>
              <div className="eyebrow">About Nova Sitara</div>
              <h1 style={{ marginBottom: '1.25rem', color: 'var(--color-text-heading)', fontSize: 'clamp(1.85rem, 5vw, 3.5rem)', wordBreak: 'break-word' }}>
                Specialized SAP & Vistex Consulting <br className="desktop-br-only" />
                <span style={{ color: 'var(--color-primary)' }}>& Technology Staffing.</span>
              </h1>
              <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', lineHeight: 1.6, color: 'var(--color-text-body)' }}>
                Nova Sitara Private Limited is a specialized SAP and Vistex consulting and technology staffing company connecting organizations with experienced professionals for implementations, enhancements, migrations, and support.
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview & Positioning */}
        <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-light)' }}>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '2.5rem',
                alignItems: 'center',
              }}
            >
              <div style={{ gridColumn: 'span 12' }} className="about-hero-left">
                <h2 style={{ marginBottom: '1.25rem', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}>Our Business Positioning</h2>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-body)', marginBottom: '1.25rem' }}>
                  Enterprise SAP implementations and specialized solution enhancements require precise domain expertise. Nova Sitara has a particular focus on the niche Vistex market, helping consulting firms, implementation partners, and end clients access qualified professionals for specific project roles.
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  In addition to Vistex, we support core SAP functional modules—including SAP EWM (Extended Warehouse Management), SAP SD (Sales & Distribution), and SAP MM (Materials Management)—as well as custom ABAP Development.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {[
                    "Specialized focus on niche Vistex project requirements.",
                    "Core SAP functional expertise in EWM, SD, and MM modules.",
                    "Technical engineering and custom ABAP development.",
                    "Flexible engagement models for implementation support and staffing."
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                      <CheckCircle2 size={18} color="var(--color-primary)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, color: 'var(--color-text-heading)', fontSize: '0.95rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission & Positioning Cards */}
              <div style={{ gridColumn: 'span 12' }} className="about-hero-right">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div
                    style={{
                      padding: '1.75rem 1.5rem',
                      borderRadius: 'var(--radius-xl)',
                      backgroundColor: 'var(--color-dark-surface)',
                      color: 'var(--color-text-on-dark)',
                      border: '1px solid var(--color-dark-border)',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#C084FC' }}>
                      OUR PURPOSE
                    </span>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.35rem', marginTop: '0.5rem', marginBottom: '0.85rem' }}>
                      Connecting Expertise with Opportunity
                    </h3>
                    <p style={{ color: 'var(--color-text-muted-on-dark)', lineHeight: 1.6, fontSize: '0.925rem' }}>
                      To connect enterprise organizations and implementation partners with carefully selected SAP and Vistex consultants who help accelerate critical project initiatives.
                    </p>
                  </div>

                  <div
                    style={{
                      padding: '1.75rem 1.5rem',
                      borderRadius: 'var(--radius-xl)',
                      backgroundColor: 'var(--color-primary-light)',
                      border: '1.5px solid rgba(134, 78, 168, 0.3)',
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-primary)' }}>
                      OUR APPROACH
                    </span>
                    <h3 style={{ color: 'var(--color-primary-dark)', fontSize: '1.35rem', marginTop: '0.5rem', marginBottom: '0.85rem' }}>
                      Flexible & Role-Focused
                    </h3>
                    <p style={{ color: 'var(--color-text-body)', lineHeight: 1.6, fontSize: '0.925rem' }}>
                      Providing flexible staffing models and specialized expertise tailored to project-specific SAP and Vistex requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Core Approach */}
        <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-subtle)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
              <div className="eyebrow">Our Principles</div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}>How We Partner With You</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginTop: '0.75rem' }}>
                Delivering reliable SAP and Vistex resource alignment for project success.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {principles.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.75rem 1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--color-bg-light)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {item.icon}
                  </div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <style>{`
        @media (min-width: 992px) {
          .about-hero-left {
            grid-column: span 7 !important;
          }
          .about-hero-right {
            grid-column: span 5 !important;
          }
        }
        @media (max-width: 576px) {
          .desktop-br-only {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
