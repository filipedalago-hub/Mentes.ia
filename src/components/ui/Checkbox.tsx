import { InputHTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only peer"
            {...props}
          />
          <div
            className={`
              w-6 h-6
              border-2 border-titanium/30
              rounded-lg
              bg-dark-lighter
              peer-checked:bg-primary
              peer-checked:border-primary
              peer-focus:ring-2
              peer-focus:ring-primary/20
              peer-disabled:opacity-50
              peer-disabled:cursor-not-allowed
              transition-all duration-300
              flex items-center justify-center
              ${className}
            `}
          >
            <Check
              size={16}
              className="text-white opacity-0 peer-checked:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {label && (
          <span className="text-sm md:text-base text-soft-white group-hover:text-primary transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
