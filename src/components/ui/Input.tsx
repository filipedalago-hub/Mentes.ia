import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, icon, fullWidth = true, className = '', ...props }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm md:text-base font-medium text-soft-white mb-2">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-muted">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full px-4 py-3
              ${icon ? 'pl-12' : ''}
              bg-dark-lighter
              border ${error ? 'border-red-500' : 'border-titanium/30'}
              rounded-xl
              text-soft-white
              placeholder-soft-muted
              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
              focus:outline-none
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition-all duration-300
              ${className}
            `}
            {...props}
          />
        </div>

        {error && (
          <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
            <span>⚠</span>
            {error}
          </p>
        )}

        {helper && !error && (
          <p className="mt-1.5 text-sm text-soft-muted">{helper}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
