import { ButtonHTMLAttributes, ReactNode } from 'react';

type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  icon: ReactNode;
  label?: string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary/90 shadow-glow-primary disabled:bg-primary/50',
  secondary:
    'bg-titanium text-soft-white hover:bg-titanium/80 disabled:bg-titanium/30',
  ghost:
    'bg-transparent text-soft-white hover:bg-titanium/30 disabled:opacity-50',
  danger:
    'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-600/50',
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
};

export function IconButton({
  variant = 'ghost',
  size = 'md',
  icon,
  label,
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`
        rounded-xl
        transition-all duration-300
        disabled:cursor-not-allowed
        flex items-center justify-center
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  );
}
