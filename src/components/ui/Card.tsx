import { ReactNode } from 'react';

type CardVariant = 'default' | 'glow' | 'gradient';
type CardPadding = 'sm' | 'md' | 'lg';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    'bg-dark-lighter border border-titanium/30 hover:border-primary/30',
  glow: 'bg-dark-lighter border border-neon-cyan/30 shadow-glow-sm hover:shadow-glow-md',
  gradient:
    'bg-gradient-dark border border-primary/20 hover:border-primary/40',
};

const paddingStyles: Record<CardPadding, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = true,
  className = '',
  onClick,
}: CardProps) {
  return (
    <div
      className={`
        rounded-xl
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hover ? 'transition-all duration-300' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
