import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#F5F2F8',
        borderRadius: '20px',
        padding: '3px',
        border: '1px solid #E4DDEC',
      }}
      role="group"
      aria-label="Language selection"
    >
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: compact ? '4px' : '6px', paddingRight: '2px', color: '#864EA8' }}>
        <Globe size={compact ? 13 : 15} />
      </div>

      <button
        type="button"
        onClick={() => setLanguage('EN')}
        style={{
          padding: compact ? '2px 8px' : '4px 10px',
          borderRadius: '16px',
          fontSize: compact ? '0.75rem' : '0.8rem',
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 180ms ease',
          backgroundColor: language === 'EN' ? '#864EA8' : 'transparent',
          color: language === 'EN' ? '#FFFFFF' : '#4A4A55',
          boxShadow: language === 'EN' ? '0 2px 6px rgba(134, 78, 168, 0.25)' : 'none',
        }}
        aria-pressed={language === 'EN'}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLanguage('DE')}
        style={{
          padding: compact ? '2px 8px' : '4px 10px',
          borderRadius: '16px',
          fontSize: compact ? '0.75rem' : '0.8rem',
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 180ms ease',
          backgroundColor: language === 'DE' ? '#864EA8' : 'transparent',
          color: language === 'DE' ? '#FFFFFF' : '#4A4A55',
          boxShadow: language === 'DE' ? '0 2px 6px rgba(134, 78, 168, 0.25)' : 'none',
        }}
        aria-pressed={language === 'DE'}
      >
        DE
      </button>
    </div>
  );
};
