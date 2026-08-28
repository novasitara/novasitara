import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../sections/common/CTASection';
import { JobCard } from '../components/ui/JobCard';
import { jobsData } from '../data/jobs';
import { Search, Filter, Briefcase } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.overview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'all' || job.department.toLowerCase().includes(selectedDept.toLowerCase());
    return matchesSearch && matchesDept;
  });

  return (
    <>
      <SEO
        title="Careers | Nova Sitara SAP & Vistex Opportunities"
        description="Join Nova Sitara Private Limited. Explore active consulting career opportunities in Vistex, SAP EWM, SAP SD, SAP MM, and ABAP development."
      />
      <main>
        {/* Careers Hero */}
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
              <div className="eyebrow">Join Our Expert Team</div>
              <h1 style={{ marginBottom: '1.25rem', color: 'var(--color-text-heading)', fontSize: 'clamp(1.85rem, 5vw, 3.5rem)', wordBreak: 'break-word' }}>
                Build Your Consulting Career with <br className="desktop-br-only" />
                <span style={{ color: 'var(--color-primary)' }}>SAP & Vistex Leaders.</span>
              </h1>
              <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', lineHeight: 1.6, color: 'var(--color-text-body)' }}>
                Work on global enterprise implementation projects, solve complex incentive challenges, and accelerate your functional and technical mastery.
              </p>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-light)' }}>
          <div className="container">
            {/* Filter & Search Bar */}
            <div
              className="careers-filter-bar"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2.5rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
              }}
            >
              {/* Search Box */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  backgroundColor: 'var(--color-bg-light)',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  flex: 1,
                  minWidth: '200px',
                  width: '100%',
                }}
              >
                <Search size={18} color="var(--color-text-muted)" />
                <input
                  type="text"
                  placeholder="Search by job title or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    fontSize: '0.925rem',
                    fontFamily: 'inherit',
                    backgroundColor: 'transparent',
                  }}
                  aria-label="Search Job Listings"
                />
              </div>

              {/* Department Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', maxWidth: '280px' }}>
                <Filter size={16} color="var(--color-text-muted)" />
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  style={{
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg-light)',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    color: 'var(--color-text-heading)',
                    width: '100%',
                  }}
                  aria-label="Filter by Department"
                >
                  <option value="all">All Departments</option>
                  <option value="vistex">Vistex Practice</option>
                  <option value="supply chain">Supply Chain Consulting</option>
                  <option value="sap functional">SAP Functional Practice</option>
                  <option value="procurement">Procurement Consulting</option>
                  <option value="technical">Technical Engineering</option>
                </select>
              </div>
            </div>

            {/* Jobs Grid */}
            {filteredJobs.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: '4rem 1.5rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px dashed var(--color-border)',
                }}
              >
                <Briefcase size={40} color="var(--color-text-muted)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No positions match your search</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  Try resetting your search query or department filter.
                </p>
              </div>
            )}
          </div>
        </section>

        <CTASection title="Don't See Your Exact Role?" subtitle="We are always looking for exceptional SAP and Vistex consultants. Submit a general inquiry to our talent team." />
      </main>

      <style>{`
        @media (max-width: 576px) {
          .desktop-br-only {
            display: none !important;
          }
          .careers-filter-bar {
            flex-direction: column !important;
            align-items: stretch !important;
          }
        }
      `}</style>
    </>
  );
};
