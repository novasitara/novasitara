import React, { useEffect, useId, useRef, useState } from 'react';
import { Briefcase, ChevronDown, ShieldCheck, UserRound } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const portalBaseUrl = 'https://nova-sitara-expense-hub.ravipaidi1994.chatgpt.site';

interface PortalLoginMenuProps {
  mobile?: boolean;
}

export const PortalLoginMenu: React.FC<PortalLoginMenuProps> = ({ mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const { language } = useLanguage();

  const labels = language === 'DE'
    ? {
        button: 'Login',
        heading: 'Nova Sitara Mitarbeiterportal',
        intro: 'Wählen Sie Ihren sicheren Zugang.',
        employee: 'Mitarbeiter-Login',
        employeeDescription: 'Ausgaben, Dokumente und Mitarbeiterbereich',
        owner: 'Inhaber-Login',
        ownerDescription: 'Genehmigungen und Unternehmensübersicht',
        accountant: 'Die Buchhaltung nutzt den Mitarbeiter-Login mit der eingeladenen E-Mail-Adresse.',
      }
    : {
        button: 'Login',
        heading: 'Nova Sitara Employee Portal',
        intro: 'Choose your secure access.',
        employee: 'Employee Login',
        employeeDescription: 'Expenses, documents and employee workspace',
        owner: 'Owner Login',
        ownerDescription: 'Approvals and company dashboard',
        accountant: 'Accountants use Employee Login with their invited email address.',
      };

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const portalLinkStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '40px 1fr auto',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.9rem',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text-heading)',
    backgroundColor: '#FFFFFF',
    transition: 'border-color 180ms ease, background-color 180ms ease, transform 180ms ease',
  };

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'relative', width: mobile ? '100%' : 'auto' }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={`${headingId}-menu`}
        style={{
          width: mobile ? '100%' : 'auto',
          minHeight: mobile ? '48px' : '44px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: mobile ? 'space-between' : 'center',
          gap: '0.55rem',
          padding: mobile ? '0.8rem 1rem' : '0.7rem 1.15rem',
          border: '1.5px solid var(--color-primary)',
          borderRadius: mobile ? 'var(--radius-md)' : 'var(--radius-full)',
          color: 'var(--color-primary-dark)',
          backgroundColor: '#FFFFFF',
          fontWeight: 700,
          fontSize: mobile ? '1rem' : '0.925rem',
          lineHeight: 1,
          transition: 'background-color 180ms ease, box-shadow 180ms ease',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}>
          <UserRound size={mobile ? 19 : 18} aria-hidden="true" />
          {labels.button}
        </span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 180ms ease' }}
        />
      </button>

      {isOpen && (
        <div
          id={`${headingId}-menu`}
          role="dialog"
          aria-labelledby={headingId}
          style={{
            position: mobile ? 'relative' : 'absolute',
            top: mobile ? 'auto' : 'calc(100% + 0.75rem)',
            right: mobile ? 'auto' : 0,
            width: mobile ? '100%' : 'min(340px, calc(100vw - 2rem))',
            marginTop: mobile ? '0.65rem' : 0,
            padding: '1rem',
            border: '1px solid #DED5E5',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 18px 50px rgba(39, 20, 50, 0.16)',
            zIndex: 1200,
          }}
        >
          <div style={{ marginBottom: '0.85rem' }}>
            <h2 id={headingId} style={{ fontSize: '1.05rem', letterSpacing: '-0.015em' }}>
              {labels.heading}
            </h2>
            <p style={{ marginTop: '0.2rem', color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>
              {labels.intro}
            </p>
          </div>

          <div style={{ display: 'grid', gap: '0.6rem' }}>
            <a
              href={`${portalBaseUrl}/portal`}
              style={portalLinkStyle}
              onClick={() => setIsOpen(false)}
            >
              <span style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                <Briefcase size={19} aria-hidden="true" />
              </span>
              <span>
                <strong style={{ display: 'block', fontSize: '0.9rem' }}>{labels.employee}</strong>
                <span style={{ display: 'block', marginTop: '0.12rem', color: 'var(--color-text-muted)', fontSize: '0.72rem', lineHeight: 1.35 }}>
                  {labels.employeeDescription}
                </span>
              </span>
              <span aria-hidden="true" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>→</span>
            </a>

            <a
              href={`${portalBaseUrl}/hub.html`}
              style={portalLinkStyle}
              onClick={() => setIsOpen(false)}
            >
              <span style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-md)', backgroundColor: '#F1ECF6', color: 'var(--color-primary-dark)' }}>
                <ShieldCheck size={19} aria-hidden="true" />
              </span>
              <span>
                <strong style={{ display: 'block', fontSize: '0.9rem' }}>{labels.owner}</strong>
                <span style={{ display: 'block', marginTop: '0.12rem', color: 'var(--color-text-muted)', fontSize: '0.72rem', lineHeight: 1.35 }}>
                  {labels.ownerDescription}
                </span>
              </span>
              <span aria-hidden="true" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>→</span>
            </a>
          </div>

          <p style={{ marginTop: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.72rem', lineHeight: 1.45 }}>
            {labels.accountant}
          </p>
        </div>
      )}
    </div>
  );
};
