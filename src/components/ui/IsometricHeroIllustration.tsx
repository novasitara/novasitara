import React, { useEffect, useState } from 'react';
import heroImg from '/@fs/C:/Users/Mohithsai Malla/.gemini/antigravity/brain/cff265d6-6700-4d41-a668-ad0601c90b86/.user_uploaded/media_1787902924653.jpg';

export const IsometricHeroIllustration: React.FC = () => {
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
      {/* Exact Selected User Hero Image (media_1787902924653.jpg with official NS logo pedestal, SAP, Vistex, Integration Hub & Data Transformation Engine) */}
      <img
        src={heroImg}
        alt="Nova Sitara NS Enterprise Architecture System Graphic with Data Transformation Engine and NS Pedestal"
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
