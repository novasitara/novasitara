import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { JobItem } from '../../data/jobs';
import { Badge } from '../common/Badge';

interface JobCardProps {
  job: JobItem;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const isVistex = job.id === 'vistex-consultant';

  return (
    <div
      style={{
        padding: '1.75rem',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: 'var(--color-bg-light)',
        border: isVistex ? '1.5px solid rgba(134, 78, 168, 0.4)' : '1px solid var(--color-border)',
        boxShadow: isVistex ? '0 4px 20px rgba(134, 78, 168, 0.1)' : 'var(--color-shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 200ms ease',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <Badge variant={isVistex ? 'purple' : 'gray'} size="sm">
            {job.department}
          </Badge>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Posted {job.postedDate}
          </span>
        </div>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-text-heading)' }}>
          {job.title}
        </h3>

        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
            marginBottom: '1.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {job.overview}
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.825rem',
            color: 'var(--color-text-body)',
            paddingTop: '1rem',
            borderTop: '1px solid var(--color-border-subtle)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <MapPin size={14} color="var(--color-primary)" />
            <span>{job.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Briefcase size={14} color="var(--color-primary)" />
            <span>{job.type}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={14} color="var(--color-primary)" />
            <span>{job.experience} Exp</span>
          </div>
        </div>
      </div>

      <div>
        <Link
          to={`/careers/${job.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '0.65rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: isVistex ? 'var(--color-primary)' : 'var(--color-bg-subtle)',
            color: isVistex ? '#FFFFFF' : 'var(--color-text-heading)',
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'all 150ms ease',
            border: isVistex ? 'none' : '1px solid var(--color-border)',
          }}
        >
          <span>View Details & Apply</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
