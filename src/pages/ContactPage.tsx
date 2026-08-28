import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/common/Button';
import { api, ContactFormData } from '../services/api';
import { companyInfo } from '../data/companyInfo';
import { Phone, Mail, Clock, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceRequirement: 'Vistex Consulting',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please describe your requirement or message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await api.submitContactForm(formData);
      setIsSubmitting(false);

      if (response.success) {
        setSubmitSuccess(true);
        setSubmitMessage(response.message);
      } else {
        setErrors({ form: response.message });
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrors({ form: 'An error occurred while submitting your message. Please try again.' });
    }
  };

  return (
    <>
      <SEO
        title="Contact Nova Sitara | SAP & Vistex Consulting"
        description="Get in touch with Nova Sitara Private Limited. Speak with our SAP and Vistex team."
      />
      <main>
        {/* Contact Hero */}
        <section
          style={{
            backgroundColor: 'var(--color-bg-subtle)',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container">
            <div style={{ maxWidth: '800px' }}>
              <div className="eyebrow">Connect With Us</div>
              <h1 style={{ marginBottom: '1.25rem', color: 'var(--color-text-heading)', fontSize: 'clamp(1.85rem, 5vw, 3.5rem)', wordBreak: 'break-word' }}>
                Contact Nova Sitara <br className="desktop-br-only" />
                <span style={{ color: 'var(--color-primary)' }}>Get in Touch with Our Team.</span>
              </h1>
              <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', lineHeight: 1.6, color: 'var(--color-text-body)' }}>
                Whether you need specialized Vistex consulting, SAP implementation support, or technology staffing, our team is ready to discuss your project requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content Grid */}
        <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-light)' }}>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '2.5rem',
              }}
            >
              {/* Left Column: Direct Contacts & Operating Hours */}
              <div style={{ gridColumn: 'span 12' }} className="contact-info-col">
                <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.75rem)', marginBottom: '1.25rem' }}>Contact Information</h2>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Reach out directly via phone or email, or submit an inquiry using the form below.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Phone Details */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.25rem 1.5rem',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--color-bg-subtle)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>Telephone Contacts</h4>
                      <p style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--color-text-heading)' }}>
                        India: {companyInfo.phones.india}
                      </p>
                      <p style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--color-text-heading)' }}>
                        Germany: {companyInfo.phones.germany}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.25rem 1.5rem',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--color-bg-subtle)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Mail size={20} />
                    </div>
                    <div style={{ wordBreak: 'break-word', maxWidth: '100%' }}>
                      <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>Email Inquiries</h4>
                      <a
                        href={`mailto:${companyInfo.email}`}
                        style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)', wordBreak: 'break-all' }}
                      >
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.25rem 1.5rem',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--color-bg-subtle)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>Business Hours</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-body)' }}>
                        {companyInfo.businessHours.weekdays}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                        {companyInfo.businessHours.weekends}
                      </p>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.25rem 1.5rem',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--color-dark-surface)',
                      color: '#FFFFFF',
                      wordBreak: 'break-word',
                    }}
                  >
                    <Linkedin size={22} color="#C084FC" style={{ flexShrink: 0 }} />
                    <div style={{ wordBreak: 'break-word', maxWidth: '100%' }}>
                      <p style={{ fontSize: '0.925rem', fontWeight: 600, margin: 0 }}>Nova Sitara LinkedIn</p>
                      <a
                        href={companyInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.825rem', color: '#C084FC', textDecoration: 'underline', wordBreak: 'break-all' }}
                      >
                        https://www.linkedin.com/company/novasitara/
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div style={{ gridColumn: 'span 12' }} className="contact-form-col">
                <div
                  style={{
                    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                    borderRadius: 'var(--radius-xl)',
                    backgroundColor: 'var(--color-bg-light)',
                    border: '1.5px solid var(--color-border)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>Send Us A Message</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>
                    Fill out your contact details and inquiry.
                  </p>

                  {submitSuccess ? (
                    <div
                      style={{
                        padding: '2rem 1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: 'var(--color-success-bg)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        textAlign: 'center',
                      }}
                    >
                      <CheckCircle2 size={44} color="var(--color-success)" style={{ margin: '0 auto 1rem auto' }} />
                      <h4 style={{ color: '#065F46', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Inquiry Submitted</h4>
                      <p style={{ fontSize: '0.9rem', color: '#047857', lineHeight: 1.6 }}>
                        {submitMessage}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitSuccess(false);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            company: '',
                            serviceRequirement: 'Vistex Consulting',
                            message: '',
                          });
                        }}
                        style={{
                          marginTop: '1.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: 'var(--color-primary)',
                          textDecoration: 'underline',
                        }}
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {errors.form && (
                        <div
                          style={{
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--color-error-bg)',
                            color: 'var(--color-error)',
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <AlertCircle size={16} />
                          <span>{errors.form}</span>
                        </div>
                      )}

                      {/* Name */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikram Mehta"
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            border: `1px solid ${errors.name ? 'var(--color-error)' : 'var(--color-border)'}`,
                            fontSize: '0.925rem',
                            fontFamily: 'inherit',
                          }}
                        />
                        {errors.name && <span style={{ color: 'var(--color-error)', fontSize: '0.775rem' }}>{errors.name}</span>}
                      </div>

                      {/* Email & Phone */}
                      <div className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="vikram@company.com"
                            style={{
                              width: '100%',
                              padding: '0.75rem 1rem',
                              borderRadius: 'var(--radius-md)',
                              border: `1px solid ${errors.email ? 'var(--color-error)' : 'var(--color-border)'}`,
                              fontSize: '0.925rem',
                              fontFamily: 'inherit',
                            }}
                          />
                          {errors.email && <span style={{ color: 'var(--color-error)', fontSize: '0.775rem' }}>{errors.email}</span>}
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            style={{
                              width: '100%',
                              padding: '0.75rem 1rem',
                              borderRadius: 'var(--radius-md)',
                              border: `1px solid ${errors.phone ? 'var(--color-error)' : 'var(--color-border)'}`,
                              fontSize: '0.925rem',
                              fontFamily: 'inherit',
                            }}
                          />
                          {errors.phone && <span style={{ color: 'var(--color-error)', fontSize: '0.775rem' }}>{errors.phone}</span>}
                        </div>
                      </div>

                      {/* Company & Service Requirement */}
                      <div className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                            Organization Name
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Company Name"
                            style={{
                              width: '100%',
                              padding: '0.75rem 1rem',
                              borderRadius: 'var(--radius-md)',
                              border: '1px solid var(--color-border)',
                              fontSize: '0.925rem',
                              fontFamily: 'inherit',
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                            Service / Requirement
                          </label>
                          <select
                            value={formData.serviceRequirement}
                            onChange={(e) => setFormData({ ...formData, serviceRequirement: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '0.75rem 1rem',
                              borderRadius: 'var(--radius-md)',
                              border: '1px solid var(--color-border)',
                              fontSize: '0.925rem',
                              fontFamily: 'inherit',
                              backgroundColor: '#FFFFFF',
                            }}
                          >
                            <option value="Vistex Consulting">Vistex Consulting</option>
                            <option value="SAP Consulting">SAP Consulting</option>
                            <option value="SAP Implementation Support">SAP Implementation Support</option>
                            <option value="SAP Enhancement & Migration">SAP Enhancement & Migration</option>
                            <option value="Application Support">Application Support</option>
                            <option value="SAP & Technology Staffing">SAP & Technology Staffing</option>
                            <option value="ABAP Development">ABAP Development</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                          Message / Project Requirements *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Please describe your specific project roles or service needs..."
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            border: `1px solid ${errors.message ? 'var(--color-error)' : 'var(--color-border)'}`,
                            fontSize: '0.925rem',
                            fontFamily: 'inherit',
                            resize: 'vertical',
                          }}
                        />
                        {errors.message && <span style={{ color: 'var(--color-error)', fontSize: '0.775rem' }}>{errors.message}</span>}
                      </div>

                      <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} rightIcon={<Send size={18} />} style={{ width: '100%' }}>
                        Submit Inquiry
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @media (min-width: 992px) {
          .contact-info-col {
            grid-column: span 5 !important;
          }
          .contact-form-col {
            grid-column: span 7 !important;
          }
        }
        @media (max-width: 576px) {
          .desktop-br-only {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
