import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  style = {},
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-primary)',
          color: '#FFFFFF',
          border: '1px solid var(--color-primary)',
        };
      case 'secondary':
        return {
          backgroundColor: '#FFFFFF',
          color: '#000000',
          border: '1.5px solid #000000',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: '#000000',
          border: '1.5px solid var(--color-border)',
        };
      case 'dark':
        return {
          backgroundColor: '#000000',
          color: '#FFFFFF',
          border: '1px solid #000000',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: '#000000',
          border: 'none',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return { padding: '0.5rem 1.1rem', fontSize: '0.875rem', borderRadius: 'var(--radius-sm)' };
      case 'lg':
        return { padding: '0.95rem 2.2rem', fontSize: '1.05rem', borderRadius: 'var(--radius-sm)' };
      case 'md':
      default:
        return { padding: '0.75rem 1.6rem', fontSize: '0.95rem', borderRadius: 'var(--radius-sm)' };
    }
  };

  return (
    <>
      <button
        className={`btn-editorial btn-${variant} ${className}`}
        disabled={disabled || isLoading}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          fontWeight: 600,
          cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
          opacity: disabled || isLoading ? 0.7 : 1,
          transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          ...getVariantStyles(),
          ...getSizeStyles(),
          ...style,
        }}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={18} aria-hidden="true" />
        ) : (
          <>
            {leftIcon && <span className="btn-icon left-icon">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="btn-icon right-icon">{rightIcon}</span>}
          </>
        )}
      </button>

      <style>{`
        .btn-editorial:hover:not(:disabled) {
          transform: translateY(-1px);
        }
        .btn-editorial:active:not(:disabled) {
          transform: translateY(0);
        }
        .btn-editorial .right-icon {
          transition: transform 200ms ease;
        }
        .btn-editorial:hover:not(:disabled) .right-icon {
          transform: translateX(4px);
        }
        .btn-editorial .left-icon {
          transition: transform 200ms ease;
        }
        .btn-editorial:hover:not(:disabled) .left-icon {
          transform: translateX(-4px);
        }
      `}</style>
    </>
  );
};
