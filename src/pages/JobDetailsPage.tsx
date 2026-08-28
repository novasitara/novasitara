import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/common/Button';
import { FileUpload } from '../components/common/FileUpload';
import { Badge } from '../components/common/Badge';
import { api, ApplicationFormData } from '../services/api';
import { JobItem } from '../data/jobs';
import { MapPin, Briefcase, Clock, ArrowLeft, CheckCircle2, AlertCircle, Send, Sparkles } from 'lucide-react';

export const JobDetailsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobItem | null>(null);
  const [isLoadingJob, setIsLoadingJob] = useState(true);

  // Form State
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    currentLocation: '',
    yearsOfExperience: '',
    primarySkill: '',
    linkedInUrl: '',
    coverLetter: '',
    resumeFile: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (jobId) {
      setIsLoadingJob(true);
      api.getJobById(jobId).then((res) => {
        if (res.success && res.data) {
          setJob(res.data);
        } else {
          setJob(null);
        }
        setIsLoadingJob(false);
      });
    }
  }, [jobId]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.currentLocation.trim()) {
      newErrors.currentLocation = 'Current location is required';
    }

    if (!formData.primarySkill.trim()) {
      newErrors.primarySkill = 'Primary skill / module is required';
    }

    if (formData.linkedInUrl && formData.linkedInUrl.trim()) {
      if (!/^https?:\/\/(www\.)?linkedin\.com\/.*$/i.test(formData.linkedInUrl.trim())) {
        newErrors.linkedInUrl = 'Please enter a valid LinkedIn URL (e.g. https://linkedin.com/in/username)';
      }
    }

    if (!formData.resumeFile) {
      newErrors.resumeFile = 'Please upload your Resume / CV (PDF, DOC, DOCX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !jobId) return;

    setIsSubmitting(true);
    try {
      const response = await api.submitApplication(jobId, formData);
      setIsSubmitting(false);

      if (response.success) {
        setSubmitSuccess(true);
        setSubmitMessage(response.message);
      } else {
        setErrors({ form: response.message });
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
    }
  };

  if (isLoadingJob) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Sparkles className="animate-spin" size={32} color="var(--color-primary)" style={{ margin: '0 auto 1rem auto' }} />
          <p>Loading position specifications...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ minHeight: '60vh', padding: '4rem var(--container-padding)', textAlign: 'center' }}>
        <h2>Job Position Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', margin: '1rem 0 2rem 0' }}>
          The requested role may have been filled or updated.
        </p>
        <Link to="/careers">
          <Button variant="primary">Back to Careers</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${job.title} | Careers at Nova Sitara`}
        description={`Apply for the ${job.title} role at Nova Sitara Private Limited. ${job.location} | ${job.experience}`}
      />
      <main>
        {/* Header Bar */}
        <section
          style={{
            backgroundColor: 'var(--color-bg-subtle)',
            paddingTop: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container">
            <Link
              to="/careers"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
                marginBottom: '1.5rem',
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Job Listings</span>
            </Link>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <Badge variant="purple">{job.department}</Badge>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Posted {job.postedDate}</span>
                </div>
                <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: 'var(--color-text-heading)', wordBreak: 'break-word' }}>
                  {job.title}
                </h1>
              </div>

              <div style={{ width: '100%', maxWidth: '280px' }}>
                <a href="#apply-form" style={{ display: 'inline-block', width: '100%' }}>
                  <Button variant="primary" size="lg" style={{ width: '100%' }}>
                    Apply for Position
                  </Button>
                </a>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                fontSize: '0.925rem',
                marginTop: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--color-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} color="var(--color-primary)" />
                <span>{job.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Briefcase size={16} color="var(--color-primary)" />
                <span>{job.type}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} color="var(--color-primary)" />
                <span>{job.experience} Experience Required</span>
              </div>
            </div>
          </div>
        </section>

        {/* Job Content & Application Form Grid */}
        <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-light)' }}>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '2.5rem',
              }}
            >
              {/* Left Column: Job Details */}
              <div style={{ gridColumn: 'span 12' }} className="job-details-col">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  {/* Overview */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Role Overview</h3>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-body)' }}>
                      {job.overview}
                    </p>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Key Responsibilities</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {job.responsibilities.map((resp, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                          <CheckCircle2 size={18} color="var(--color-primary)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-body)' }}>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Requirements & Qualifications</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {job.requirements.map((req, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                          <CheckCircle2 size={18} color="var(--color-primary)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-body)' }}>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Skills */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Preferred Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {job.preferredSkills.map((ps, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '0.4rem 0.85rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'var(--color-bg-subtle)',
                            border: '1px solid var(--color-border)',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                          }}
                        >
                          {ps}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>What We Offer</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      {job.benefits.map((b, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '1rem 1.25rem',
                            borderRadius: 'var(--radius-lg)',
                            backgroundColor: 'var(--color-primary-light)',
                            border: '1px solid rgba(134, 78, 168, 0.2)',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: 'var(--color-primary-dark)',
                          }}
                        >
                          ✓ {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Application Form */}
              <div style={{ gridColumn: 'span 12' }} className="job-form-col" id="apply-form">
                <div
                  style={{
                    position: 'sticky',
                    top: '100px',
                    padding: 'clamp(1.5rem, 4vw, 2.25rem)',
                    borderRadius: 'var(--radius-xl)',
                    backgroundColor: 'var(--color-bg-subtle)',
                    border: '1.5px solid var(--color-border)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>Apply for this Role</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>
                    Submit your application details below. Our recruiting team will review your CV.
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
                      <CheckCircle2 size={40} color="var(--color-success)" style={{ margin: '0 auto 1rem auto' }} />
                      <h4 style={{ color: '#065F46', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Application Submitted!</h4>
                      <p style={{ fontSize: '0.9rem', color: '#047857', lineHeight: 1.6 }}>
                        {submitMessage}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitSuccess(false);
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            currentLocation: '',
                            yearsOfExperience: '',
                            primarySkill: '',
                            linkedInUrl: '',
                            coverLetter: '',
                            resumeFile: null,
                          });
                        }}
                        style={{
                          marginTop: '1.5rem',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: 'var(--color-primary)',
                          textDecoration: 'underline',
                        }}
                      >
                        Submit another application
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

                      {/* Full Name */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            borderRadius: 'var(--radius-md)',
                            border: `1px solid ${errors.fullName ? 'var(--color-error)' : 'var(--color-border)'}`,
                            fontSize: '0.9rem',
                            fontFamily: 'inherit',
                          }}
                        />
                        {errors.fullName && <span style={{ color: 'var(--color-error)', fontSize: '0.775rem' }}>{errors.fullName}</span>}
                      </div>

                      {/* Email & Phone Grid */}
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
                            placeholder="rahul@example.com"
                            style={{
                              width: '100%',
                              padding: '0.65rem 0.85rem',
                              borderRadius: 'var(--radius-md)',
                              border: `1px solid ${errors.email ? 'var(--color-error)' : 'var(--color-border)'}`,
                              fontSize: '0.9rem',
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
                            placeholder="+91 9876543210"
                            style={{
                              width: '100%',
                              padding: '0.65rem 0.85rem',
                              borderRadius: 'var(--radius-md)',
                              border: `1px solid ${errors.phone ? 'var(--color-error)' : 'var(--color-border)'}`,
                              fontSize: '0.9rem',
                              fontFamily: 'inherit',
                            }}
                          />
                          {errors.phone && <span style={{ color: 'var(--color-error)', fontSize: '0.775rem' }}>{errors.phone}</span>}
                        </div>
                      </div>

                      {/* Location & Experience Grid */}
                      <div className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                            Current Location *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.currentLocation}
                            onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                            placeholder="e.g. Bangalore, India"
                            style={{
                              width: '100%',
                              padding: '0.65rem 0.85rem',
                              borderRadius: 'var(--radius-md)',
                              border: `1px solid ${errors.currentLocation ? 'var(--color-error)' : 'var(--color-border)'}`,
                              fontSize: '0.9rem',
                              fontFamily: 'inherit',
                            }}
                          />
                          {errors.currentLocation && <span style={{ color: 'var(--color-error)', fontSize: '0.775rem' }}>{errors.currentLocation}</span>}
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                            Years of Exp *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.yearsOfExperience}
                            onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                            placeholder="e.g. 4 Years"
                            style={{
                              width: '100%',
                              padding: '0.65rem 0.85rem',
                              borderRadius: 'var(--radius-md)',
                              border: '1px solid var(--color-border)',
                              fontSize: '0.9rem',
                              fontFamily: 'inherit',
                            }}
                          />
                        </div>
                      </div>

                      {/* Primary Skill & LinkedIn URL */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                          Primary SAP / Vistex Specialty *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.primarySkill}
                          onChange={(e) => setFormData({ ...formData, primarySkill: e.target.value })}
                          placeholder="e.g. Vistex Rebates & Chargebacks, SAP SD"
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            borderRadius: 'var(--radius-md)',
                            border: `1px solid ${errors.primarySkill ? 'var(--color-error)' : 'var(--color-border)'}`,
                            fontSize: '0.9rem',
                            fontFamily: 'inherit',
                          }}
                        />
                        {errors.primarySkill && <span style={{ color: 'var(--color-error)', fontSize: '0.775rem' }}>{errors.primarySkill}</span>}
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                          LinkedIn Profile URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={formData.linkedInUrl}
                          onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })}
                          placeholder="https://linkedin.com/in/yourprofile"
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            borderRadius: 'var(--radius-md)',
                            border: `1px solid ${errors.linkedInUrl ? 'var(--color-error)' : 'var(--color-border)'}`,
                            fontSize: '0.9rem',
                            fontFamily: 'inherit',
                          }}
                        />
                        {errors.linkedInUrl && <span style={{ color: 'var(--color-error)', fontSize: '0.775rem' }}>{errors.linkedInUrl}</span>}
                      </div>

                      {/* Resume Drag & Drop Upload */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                          Upload Resume / CV *
                        </label>
                        <FileUpload
                          selectedFile={formData.resumeFile}
                          onFileSelect={(file) => {
                            setFormData({ ...formData, resumeFile: file });
                            if (file) {
                              setErrors((prev) => ({ ...prev, resumeFile: '' }));
                            }
                          }}
                          error={errors.resumeFile}
                        />
                      </div>

                      {/* Cover Letter */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                          Cover Letter / Additional Details (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={formData.coverLetter}
                          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                          placeholder="Briefly describe your relevant project experience..."
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)',
                            fontSize: '0.9rem',
                            fontFamily: 'inherit',
                            resize: 'vertical',
                          }}
                        />
                      </div>

                      <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} rightIcon={<Send size={16} />} style={{ width: '100%' }}>
                        Submit Application
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
          .job-details-col {
            grid-column: span 7 !important;
          }
          .job-form-col {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </>
  );
};
