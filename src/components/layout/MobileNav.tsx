import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { X, ArrowRight, Phone, Mail } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { companyInfo } from '../../data/companyInfo';
import { useLanguage } from '../../context/LanguageContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Handle body scroll lock & keydown (Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.services, path: '/services' },
    { label: t.nav.expertise, path: '/expertise' },
    { label: t.nav.careers, path: '/careers' },
    { label: t.nav.contact, path: '/contact' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 200ms ease forwards',
        }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        style={{
          position: 'relative',
          marginLeft: 'auto',
          width: '100%',
          maxWidth: '320px',
          height: '100%',
          backgroundColor: 'var(--color-bg-light)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.2)',
          zIndex: 10000,
          overflowY: 'auto',
          animation: 'fadeIn 250ms ease forwards',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem var(--container-padding)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <Logo height={32} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LanguageSwitcher compact />
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem',
                borderRadius: 'var(--radius-full)',
                color: 'var(--color-text-heading)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close Mobile Menu"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Links */}
        <nav style={{ padding: '1.5rem var(--container-padding)', flex: 1 }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navLinks.map((link, idx) => (
              <li
                key={link.path}
                style={{
                  animation: `fadeIn 300ms ease forwards ${idx * 60}ms`,
                }}
              >
                <NavLink
                  to={link.path}
                  onClick={onClose}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '1.05rem',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-heading)',
                    backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                    transition: 'all 150ms ease',
                  })}
                  end={link.path === '/'}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={16} style={{ opacity: 0.5 }} />
                </NavLink>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '2rem' }}>
            <NavLink to="/contact" onClick={onClose} style={{ textDecoration: 'none' }}>
              <Button variant="primary" style={{ width: '100%' }}>
                {t.nav.talkToUs}
              </Button>
            </NavLink>
          </div>
        </nav>

        {/* Contact info footer */}
        <div
          style={{
            padding: '1.5rem var(--container-padding)',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-subtle)',
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={14} color="var(--color-primary)" />
            <span>{companyInfo.phones.india}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={14} color="var(--color-primary)" />
            <span>{companyInfo.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
