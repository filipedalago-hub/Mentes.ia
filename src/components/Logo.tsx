interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Logo({ variant = 'full', size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-16',
    md: 'h-20',
    lg: 'h-28',
    xl: 'h-40',
  };

  const iconSizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-20 w-20',
    lg: 'h-28 w-28',
    xl: 'h-40 w-40',
  };

  const logoSrc = variant === 'icon'
    ? '/assets/logo/mentes-ia-icon.png'
    : '/assets/logo/mentes-ia-full.png';

  const logoAlt = 'Mentes.ia - Transforme sua mente, transforme sua vida';

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src={logoSrc}
        alt={logoAlt}
        className={`${variant === 'icon' ? iconSizeClasses[size] : sizeClasses[size]} object-contain`}
        loading="eager"
        draggable={false}
      />
    </div>
  );
}
