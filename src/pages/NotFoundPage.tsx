import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/common/Button';
import { ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO title="Page Not Found | Nova Sitara" description="The page you are looking for does not exist." />
      <main
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem var(--container-padding)',
          backgroundColor: 'var(--color-bg-light)',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '560px' }}>
          <span
            style={{
              fontSize: '5rem',
              fontWeight: 900,
              color: 'var(--color-primary)',
              lineHeight: 1,
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            404
          </span>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
            The requested page URL might have been relocated, removed, or is temporarily unavailable.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/">
              <Button variant="primary" size="lg" leftIcon={<Home size={18} />}>
                Return to Homepage
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg" rightIcon={<ArrowLeft size={18} />}>
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
