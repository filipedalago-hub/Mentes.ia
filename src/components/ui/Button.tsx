import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'neon' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary/90 shadow-glow-primary disabled:bg-primary/50',
  secondary:
    'bg-titanium text-soft-white hover:bg-titanium/80 disabled:bg-titanium/30',
  neon: 'bg-gradient-accent text-dark hover:shadow-glow-md disabled:opacity-50',
  ghost:
    'bg-transparent text-primary border-2 border-primary hover:bg-primary/10 disabled:opacity-50',
  danger:
    'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-600/50',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        font-semibold rounded-xl
        transition-all duration-300
        disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${loading ? 'opacity-70 cursor-wait' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
      ) : (
        icon && <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
}
