import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { expertiseData } from '../../data/expertise';

export const ExpertiseStrip: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-bg-subtle)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: '2.25rem',
        paddingBottom: '2.25rem',
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
            CORE TECHNICAL SPECIALIZATIONS
          </span>
          <Link
            to="/expertise"
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <span>View All Modules</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {expertiseData.map((item) => {
            const isVistex = item.id === 'vistex';
            return (
              <Link
                key={item.id}
                to={`/expertise#${item.id}`}
                style={{
                  padding: '1.1rem 1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isVistex ? 'var(--color-primary-light)' : 'var(--color-bg-light)',
                  border: isVistex ? '1.5px solid rgba(134, 78, 168, 0.4)' : '1px solid var(--color-border)',
                  textDecoration: 'none',
                  transition: 'all 200ms ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isVistex ? '0 4px 12px rgba(134, 78, 168, 0.1)' : 'none',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: isVistex ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      }}
                    >
                      {isVistex ? 'PRIMARY NICHE' : item.category.split(' ')[0]}
                    </span>
                    {isVistex && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          backgroundColor: 'var(--color-primary)',
                          color: '#FFFFFF',
                          padding: '0.15rem 0.45rem',
                          borderRadius: 'var(--radius-full)',
                          fontWeight: 700,
                        }}
                      >
                        CORE
                      </span>
                    )}
                  </div>
                  <h4
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: isVistex ? 'var(--color-primary-dark)' : 'var(--color-text-heading)',
                    }}
                  >
                    {item.name}
                  </h4>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                  {item.tagline.split('&')[0]}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
