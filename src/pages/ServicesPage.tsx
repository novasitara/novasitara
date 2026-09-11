import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../sections/common/CTASection';
import { servicesData } from '../data/services';
import { CheckCircle2, ArrowRight, Layers, Compass, Workflow, ArrowUpRight, ShieldCheck, Users, Code2, Cpu, UserCheck } from 'lucide-react';
import { Button } from '../components/common/Button';

export const ServicesPage: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Layers': return <Layers size={28} />;
      case 'Compass': return <Compass size={28} />;
      case 'Workflow': return <Workflow size={28} />;
      case 'ArrowUpRight': return <ArrowUpRight size={28} />;
      case 'ShieldCheck': return <ShieldCheck size={28} />;
      case 'Users': return <Users size={28} />;
      case 'Code2': return <Code2 size={28} />;
      case 'Cpu': return <Cpu size={28} />;
      case 'UserCheck': return <UserCheck size={28} />;
      default: return <Compass size={28} />;
    }
  };

  return (
    <>
      <SEO
        title="SAP & Vistex Consulting Services | Nova Sitara"
        description="Explore Nova Sitara's complete range of enterprise services: Vistex Consulting, SAP Implementation, AMS Support, Technology Staffing, and ABAP Engineering."
      />
      <main>
        {/* Services Page Hero */}
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
              <div className="eyebrow">Enterprise Solutions</div>
              <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2.1rem, 4.2vw, 3.25rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1.25rem', color: 'var(--color-text-heading)', wordBreak: 'normal', overflowWrap: 'break-word' }}>
                Specialized SAP & Vistex Services <br className="desktop-br-only" />
                <span style={{ color: 'var(--color-primary)' }}>Tailored for Enterprise Impact.</span>
              </h1>
              <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', lineHeight: 1.6, color: 'var(--color-text-body)' }}>
                From specialized Vistex consulting and SAP functional guidance to technical ABAP development and technology staffing.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Services Listing */}
        <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-light)' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {servicesData.map((service, index) => {
                const isVistex = service.id === 'vistex-consulting';
                return (
                  <div
                    key={service.id}
                    id={service.id}
                    style={{
                      padding: 'clamp(1.5rem, 4vw, 3.25rem)',
                      borderRadius: 'var(--radius-xl)',
                      backgroundColor: isVistex ? 'var(--color-dark-surface)' : index % 2 === 0 ? 'var(--color-bg-light)' : 'var(--color-bg-subtle)',
                      color: isVistex ? 'var(--color-text-on-dark)' : 'var(--color-text-body)',
                      border: isVistex ? '1px solid var(--color-dark-border)' : '1px solid var(--color-border)',
                      boxShadow: isVistex ? 'var(--shadow-xl)' : 'var(--shadow-sm)',
                      scrollMarginTop: '100px',
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, 1fr)',
                        gap: '2rem',
                        alignItems: 'flex-start',
                      }}
                    >
                      {/* Left: Info */}
                      <div style={{ gridColumn: 'span 12' }} className="service-info-col">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                          <div
                            style={{
                              width: '52px',
                              height: '52px',
                              borderRadius: 'var(--radius-md)',
                              backgroundColor: isVistex ? 'rgba(134, 78, 168, 0.2)' : 'var(--color-primary-light)',
                              color: isVistex ? '#C084FC' : 'var(--color-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {getIcon(service.iconName)}
                          </div>
                          <div>
                            {isVistex && (
                              <span style={{ fontSize: '0.725rem', fontWeight: 700, textTransform: 'uppercase', color: '#C084FC', letterSpacing: '0.1em', display: 'block', marginBottom: '0.2rem' }}>
                                PRIMARY NICHE SPECIALTY
                              </span>
                            )}
                            <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.75rem)', color: isVistex ? '#FFFFFF' : 'var(--color-text-heading)' }}>
                              {service.title}
                            </h2>
                          </div>
                        </div>

                        <p style={{ fontSize: '1rem', lineHeight: 1.65, color: isVistex ? 'var(--color-text-muted-on-dark)' : 'var(--color-text-body)', marginBottom: '1.5rem' }}>
                          {service.fullDescription}
                        </p>

                        <div style={{ marginBottom: '1.75rem' }}>
                          <h4 style={{ fontSize: '1.05rem', color: isVistex ? '#FFFFFF' : 'var(--color-text-heading)', marginBottom: '1rem' }}>
                            Key Capabilities & Scope:
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                            {service.capabilities.map((cap, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                                <CheckCircle2 size={18} color={isVistex ? '#C084FC' : 'var(--color-primary)'} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                                <span style={{ fontSize: '0.9rem', color: isVistex ? '#E5E5EB' : 'var(--color-text-heading)' }}>
                                  {cap}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div style={{ width: '100%' }}>
                          <Link to="/contact" style={{ display: 'inline-block', width: '100%', maxWidth: '320px' }}>
                            <Button variant={isVistex ? 'primary' : 'secondary'} size="md" rightIcon={<ArrowRight size={16} />} style={{ width: '100%' }}>
                              Request Consultation
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Right: Benefits Box */}
                      <div style={{ gridColumn: 'span 12' }} className="service-benefits-col">
                        <div
                          style={{
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            backgroundColor: isVistex ? 'var(--color-dark-card)' : 'var(--color-primary-light)',
                            border: isVistex ? '1px solid var(--color-dark-border)' : '1px solid rgba(134, 78, 168, 0.25)',
                          }}
                        >
                          <h4 style={{ fontSize: '1.05rem', color: isVistex ? '#FFFFFF' : 'var(--color-primary-dark)', marginBottom: '1rem' }}>
                            Business Benefits
                          </h4>
                          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {service.businessBenefits.map((benefit, i) => (
                              <li key={i} style={{ fontSize: '0.875rem', color: isVistex ? 'var(--color-text-muted-on-dark)' : 'var(--color-text-body)', lineHeight: 1.5 }}>
                                • {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <style>{`
        @media (min-width: 992px) {
          .service-info-col {
            grid-column: span 8 !important;
          }
          .service-benefits-col {
            grid-column: span 4 !important;
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
