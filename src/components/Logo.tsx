interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Logo({ variant = 'full', size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  };

  const iconSizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-14 w-auto',
    xl: 'h-20 w-auto',
  };

  const logoSrc = variant === 'icon'
    ? '/assets/logo/mentes-ia-icon.png'
    : '/assets/logo/mentes-ia-full.png';

  const logoAlt = 'Mentes.ia - Desenvolvimento Mental com IA';

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt={logoAlt}
        className={`${variant === 'icon' ? iconSizeClasses[size] : sizeClasses[size]} object-contain`}
        loading="eager"
      />
    </div>
  );
}
