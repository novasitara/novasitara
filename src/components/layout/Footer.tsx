import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Linkedin, Clock } from 'lucide-react';
import { Logo } from '../common/Logo';
import { companyInfo } from '../../data/companyInfo';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#0A0A0E',
        color: '#A0A0B0',
        paddingTop: 'clamp(4rem, 7vw, 5.5rem)',
        paddingBottom: '2.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Left Column: Logo & Description */}
          <div style={{ gridColumn: 'span 12' }} className="footer-brand-col">
            <div style={{ marginBottom: '1.25rem' }}>
              <Logo variant="dark" height={42} />
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: '#A0A0B0', maxWidth: '360px', marginBottom: '1.5rem' }}>
              Nova Sitara Private Limited is a specialized SAP and Vistex consulting and technology staffing company connecting organizations with experienced consultants.
            </p>
            <a
              href={companyInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#FFFFFF',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'color 150ms ease',
              }}
            >
              <Linkedin size={18} color="#864EA8" />
              <span>Follow on LinkedIn</span>
            </a>
          </div>

          {/* Middle Column: Navigation */}
          <div style={{ gridColumn: 'span 12' }} className="footer-nav-col">
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em', color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              NAVIGATION
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <Link to="/" style={{ color: '#A0A0B0', fontSize: '0.925rem', transition: 'color 150ms ease' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#A0A0B0', fontSize: '0.925rem', transition: 'color 150ms ease' }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" style={{ color: '#A0A0B0', fontSize: '0.925rem', transition: 'color 150ms ease' }}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/expertise" style={{ color: '#A0A0B0', fontSize: '0.925rem', transition: 'color 150ms ease' }}>
                  Expertise Areas
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#A0A0B0', fontSize: '0.925rem', transition: 'color 150ms ease' }}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Contact & Hours */}
          <div style={{ gridColumn: 'span 12' }} className="footer-contact-col">
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em', color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              CONTACT INFO
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Phone size={18} color="#864EA8" style={{ marginTop: '2px' }} />
                <div>
                  <a href={`tel:${companyInfo.phones.india}`} style={{ display: 'block', color: '#FFFFFF', fontSize: '0.925rem', fontWeight: 600 }}>
                    {companyInfo.phones.india} (India)
                  </a>
                  <a href={`tel:${companyInfo.phones.germany}`} style={{ display: 'block', color: '#FFFFFF', fontSize: '0.925rem', fontWeight: 600 }}>
                    {companyInfo.phones.germany} (Germany)
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} color="#864EA8" />
                <a href={`mailto:${companyInfo.email}`} style={{ color: '#FFFFFF', fontSize: '0.925rem', fontWeight: 600 }}>
                  {companyInfo.email}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginTop: '0.5rem' }}>
                <Clock size={18} color="#864EA8" style={{ marginTop: '2px' }} />
                <div style={{ fontSize: '0.85rem', color: '#A0A0B0' }}>
                  <div style={{ color: '#FFFFFF', fontWeight: 600 }}>Business Hours</div>
                  <div>{companyInfo.businessHours.weekdays}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: '#707080',
          }}
        >
          <div>© {new Date().getFullYear()} Nova Sitara Private Limited. All rights reserved.</div>
          <div>SAP and Vistex Consulting + Technology Staffing</div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .footer-brand-col {
            grid-column: span 5 !important;
          }
          .footer-nav-col {
            grid-column: span 3 !important;
          }
          .footer-contact-col {
            grid-column: span 4 !important;
          }
        }
      `}</style>
    </footer>
  );
};
