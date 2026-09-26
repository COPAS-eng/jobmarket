import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { Spinner } from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  asChild?: boolean;
}

const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed';

const variantStyles = {
  primary: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:bg-cyan-600 shadow-lg shadow-cyan-500/20',
  secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-300',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-500/20',
  outline: 'border-2 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3.5 text-lg gap-2.5',
  xl: 'px-9 py-4.5 text-xl gap-3',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, asChild, children, disabled, ...props }, ref) => {
    const Comp = asChild ? 'a' : 'button';
    
    return (
      <Comp
        ref={ref as any}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || loading}
        {...props as any}
      >
        {loading && <Spinner className="h-4 w-4" />}
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';