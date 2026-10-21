import React, { useEffect, useState } from 'react';
import { useSiteImage } from '../../lib/siteContent';

export const IsometricHeroIllustration: React.FC = () => {
  const heroImage = useSiteImage('hero', '/images/hero.png');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
        transition: 'all 800ms cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: 'transparent',
      }}
    >
      <img
        src={heroImage}
        alt="Nova Sitara Enterprise SAP Sourcing & Technical Architecture"
        style={{
          width: '100%',
          maxHeight: '560px',
          objectFit: 'contain',
          display: 'block',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: '#FFFFFF',
        }}
      />
    </div>
  );
};
