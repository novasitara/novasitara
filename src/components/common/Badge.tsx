import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'dark' | 'outline' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'md',
  className = '',
}) => {
  const getStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'purple':
        return {
          backgroundColor: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          border: '1px solid rgba(134, 78, 168, 0.2)',
        };
      case 'dark':
        return {
          backgroundColor: 'rgba(134, 78, 168, 0.15)',
          color: '#C084FC',
          border: '1px solid rgba(134, 78, 168, 0.3)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-text-muted)',
          border: '1px solid var(--color-border)',
        };
      case 'gray':
      default:
        return {
          backgroundColor: 'var(--color-bg-alt)',
          color: 'var(--color-text-body)',
          border: '1px solid var(--color-border-subtle)',
        };
    }
  };

  const sizeStyle: React.CSSProperties =
    size === 'sm'
      ? { padding: '0.2rem 0.55rem', fontSize: '0.75rem' }
      : { padding: '0.3rem 0.75rem', fontSize: '0.8125rem' };

  return (
    <span
      className={`badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 600,
        borderRadius: 'var(--radius-full)',
        letterSpacing: '0.02em',
        lineHeight: 1.2,
        ...getStyles(),
        ...sizeStyle,
      }}
    >
      {children}
    </span>
  );
};
