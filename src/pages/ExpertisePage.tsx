import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../sections/common/CTASection';
import { expertiseData } from '../data/expertise';
import { CheckCircle2, ArrowRight, Sparkles, Layers, Box, ShoppingCart, Truck, Terminal } from 'lucide-react';
import { Button } from '../components/common/Button';

export const ExpertisePage: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'vistex': return <Layers size={32} />;
      case 'sap-ewm': return <Box size={32} />;
      case 'sap-sd': return <ShoppingCart size={32} />;
      case 'sap-mm': return <Truck size={32} />;
      case 'abap': return <Terminal size={32} />;
      default: return <Sparkles size={32} />;
    }
  };

  return (
    <>
      <SEO
        title="SAP & Vistex Technical Expertise | Nova Sitara"
        description="Explore Nova Sitara's technical capabilities across Vistex Consulting, SAP EWM, SAP SD, SAP MM, and ABAP Development."
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
            <div style={{ maxWidth: '820px' }}>
              <div className="eyebrow">Technical Mastery</div>
              <h1 style={{ marginBottom: '1.25rem', color: 'var(--color-text-heading)' }}>
                Deep Domain Specialization <br />
                <span style={{ color: 'var(--color-primary)' }}>Across Core SAP & Vistex Ecosystems.</span>
              </h1>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--color-text-body)' }}>
                We combine deep functional knowledge with high-speed technical engineering to configure, customize, and maintain mission-critical enterprise systems.
              </p>
            </div>
          </div>
        </section>

        {/* Expertise Sections */}
        <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-light)' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
              {expertiseData.map((item) => {
                const isVistex = item.id === 'vistex';

                return (
                  <div
                    key={item.id}
                    id={item.id}
                    style={{
                      borderRadius: 'var(--radius-xl)',
                      padding: 'clamp(2rem, 5vw, 3.5rem)',
                      backgroundColor: isVistex ? 'var(--color-dark-surface)' : 'var(--color-bg-subtle)',
                      color: isVistex ? 'var(--color-text-on-dark)' : 'var(--color-text-body)',
                      border: isVistex ? '1.5px solid rgba(134, 78, 168, 0.4)' : '1px solid var(--color-border)',
                      boxShadow: isVistex ? 'var(--shadow-xl)' : 'var(--shadow-sm)',
                      scrollMarginTop: '100px',
                    }}
                  >
                    {/* Header bar */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        marginBottom: '1.75rem',
                        paddingBottom: '1.5rem',
                        borderBottom: isVistex ? '1px solid var(--color-dark-border)' : '1px solid var(--color-border)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div
                          style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: 'var(--radius-lg)',
                            backgroundColor: isVistex ? 'rgba(134, 78, 168, 0.25)' : 'var(--color-primary-light)',
                            color: isVistex ? '#C084FC' : 'var(--color-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {getIcon(item.id)}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: isVistex ? '#C084FC' : 'var(--color-primary)' }}>
                              {item.category}
                            </span>
                            {isVistex && (
                              <span style={{ fontSize: '0.65rem', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                                FLAGSHIP NICHE
                              </span>
                            )}
                          </div>
                          <h2 style={{ fontSize: '1.85rem', color: isVistex ? '#FFFFFF' : 'var(--color-text-heading)' }}>
                            {item.name}
                          </h2>
                        </div>
                      </div>

                      <Link to="/contact">
                        <Button variant={isVistex ? 'primary' : 'outline'} size="sm" rightIcon={<ArrowRight size={14} />}>
                          Hire {item.name} Experts
                        </Button>
                      </Link>
                    </div>

                    <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: isVistex ? 'var(--color-text-muted-on-dark)' : 'var(--color-text-body)', marginBottom: '2rem' }}>
                      {item.overview}
                    </p>

                    {/* Grid of Modules & Capabilities */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, 1fr)',
                        gap: '2rem',
                      }}
                    >
                      {/* Left: Core Sub-Modules */}
                      <div style={{ gridColumn: 'span 12' }} className="exp-left-col">
                        <h4 style={{ fontSize: '1.05rem', color: isVistex ? '#FFFFFF' : 'var(--color-text-heading)', marginBottom: '1rem' }}>
                          Core Sub-Modules & Components:
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                          {item.coreModules.map((mod, i) => (
                            <span
                              key={i}
                              style={{
                                padding: '0.45rem 0.9rem',
                                borderRadius: 'var(--radius-full)',
                                backgroundColor: isVistex ? 'rgba(255,255,255,0.1)' : 'var(--color-bg-light)',
                                border: isVistex ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--color-border)',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: isVistex ? '#FFFFFF' : 'var(--color-text-heading)',
                              }}
                            >
                              {mod}
                            </span>
                          ))}
                        </div>

                        <h4 style={{ fontSize: '1.05rem', color: isVistex ? '#FFFFFF' : 'var(--color-text-heading)', marginTop: '2rem', marginBottom: '1rem' }}>
                          Technical Capabilities:
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                          {item.keyCapabilities.map((cap, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                              <CheckCircle2 size={18} color={isVistex ? '#C084FC' : 'var(--color-primary)'} />
                              <span style={{ fontSize: '0.95rem', color: isVistex ? '#E5E5EB' : 'var(--color-text-body)' }}>
                                {cap}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Real-World Use Cases */}
                      <div style={{ gridColumn: 'span 12' }} className="exp-right-col">
                        <div
                          style={{
                            padding: '1.75rem',
                            borderRadius: 'var(--radius-lg)',
                            backgroundColor: isVistex ? 'var(--color-dark-card)' : 'var(--color-bg-light)',
                            border: isVistex ? '1px solid var(--color-dark-border)' : '1px solid var(--color-border)',
                          }}
                        >
                          <h4 style={{ fontSize: '1.05rem', color: isVistex ? '#FFFFFF' : 'var(--color-text-heading)', marginBottom: '1rem' }}>
                            Industry Implementation Scenarios:
                          </h4>
                          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {item.useCases.map((uc, i) => (
                              <li key={i} style={{ fontSize: '0.9rem', color: isVistex ? 'var(--color-text-muted-on-dark)' : 'var(--color-text-muted)', lineHeight: 1.5 }}>
                                • {uc}
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
          .exp-left-col {
            grid-column: span 7 !important;
          }
          .exp-right-col {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </>
  );
};
