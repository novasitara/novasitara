import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'flat' | 'bordered' | 'elevated' | 'dark';
  className?: string;
  hoverable?: boolean;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'bordered',
  className = '',
  hoverable = true,
  style = {},
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'dark':
        return {
          backgroundColor: 'var(--color-dark-card)',
          borderColor: 'var(--color-dark-border)',
          color: 'var(--color-text-on-dark)',
        };
      case 'elevated':
        return {
          backgroundColor: 'var(--color-bg-light)',
          borderColor: 'transparent',
          boxShadow: 'var(--shadow-md)',
        };
      case 'flat':
        return {
          backgroundColor: 'var(--color-bg-subtle)',
          borderColor: 'transparent',
        };
      case 'bordered':
      default:
        return {
          backgroundColor: 'var(--color-bg-light)',
          borderColor: 'var(--color-border)',
        };
    }
  };

  return (
    <div
      className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`}
      style={{
        borderRadius: 'var(--radius-lg)',
        borderWidth: '1px',
        borderStyle: 'solid',
        padding: '1.75rem',
        transition: 'transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease',
        ...getVariantStyles(),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
