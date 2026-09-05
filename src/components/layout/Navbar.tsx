import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { MobileNav } from './MobileNav';
import { useLanguage } from '../../context/LanguageContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.services, path: '/services' },
    { label: t.nav.expertise, path: '/expertise' },
    { label: t.nav.careers, path: '/careers' },
    { label: t.nav.contact, path: '/contact' },
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: isScrolled ? '0 2px 12px rgba(0, 0, 0, 0.03)' : 'none',
          transition: 'box-shadow 200ms ease',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '82px',
          }}
        >
          {/* Logo */}
          <Logo height={40} />

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.25rem',
                listStyle: 'none',
              }}
            >
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) => (isActive ? 'nav-link-editorial active' : 'nav-link-editorial')}
                    style={({ isActive }) => ({
                      fontSize: '0.925rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--color-primary)' : '#000000',
                      position: 'relative',
                      padding: '0.4rem 0',
                      transition: 'color 150ms ease',
                    })}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA Button & Language Switcher */}
          <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <LanguageSwitcher />

            <Link to="/contact">
              <Button variant="secondary" size="md">
                {t.nav.talkToUs}
              </Button>
            </Link>
          </div>

          {/* Mobile Right Controls: Language Switcher & Hamburger */}
          <div className="mobile-header-right" style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }}>
            <LanguageSwitcher compact />
            <button
              className="mobile-trigger"
              onClick={() => setMobileMenuOpen(true)}
              style={{
                padding: '0.5rem',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Open Mobile Menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <style>{`
        .desktop-nav {
          display: flex;
        }
        .desktop-cta {
          display: flex;
        }
        .nav-link-editorial::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--color-primary);
          transition: width 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link-editorial:hover::after, .nav-link-editorial.active::after {
          width: 100%;
        }

        @media (max-width: 991px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-cta {
            display: none !important;
          }
          .mobile-header-right {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
