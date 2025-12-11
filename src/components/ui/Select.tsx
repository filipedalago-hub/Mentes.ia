import { SelectHTMLAttributes, ReactNode, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  fullWidth?: boolean;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helper, fullWidth = true, className = '', children, ...props }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm md:text-base font-medium text-soft-white mb-2">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full px-4 py-3 pr-10
              bg-dark-lighter
              border ${error ? 'border-red-500' : 'border-titanium/30'}
              rounded-xl
              text-soft-white
              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
              focus:outline-none
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition-all duration-300
              appearance-none
              cursor-pointer
              ${className}
            `}
            {...props}
          >
            {children}
          </select>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-soft-muted">
            <ChevronDown size={20} />
          </div>
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

Select.displayName = 'Select';
