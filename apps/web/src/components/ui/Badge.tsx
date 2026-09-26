import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', dot, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full';
    
    const variants = {
      primary: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
      secondary: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
      warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      neutral: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
      outline: 'border border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300',
    };
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {dot && <span className={cn('h-1.5 w-1.5 rounded-full', variant === 'outline' && 'bg-slate-400')} />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// Status badge helper
export function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { label: string; variant: BadgeProps['variant']; dot?: boolean }> = {
    OPEN: { label: 'Aberta', variant: 'primary', dot: true },
    PAUSED: { label: 'Pausada', variant: 'warning' },
    FILLED: { label: 'Preenchida', variant: 'success' },
    CLOSED: { label: 'Fechada', variant: 'neutral' },
    EXPIRED: { label: 'Expirada', variant: 'danger' },
    DRAFT: { label: 'Rascunho', variant: 'outline' },
    PENDING: { label: 'Pendente', variant: 'warning', dot: true },
    ACCEPTED: { label: 'Aceita', variant: 'success', dot: true },
    REJECTED: { label: 'Recusada', variant: 'danger' },
    WITHDRAWN: { label: 'Retirada', variant: 'neutral' },
    ACTIVE: { label: 'Ativo', variant: 'success', dot: true },
    COMPLETED: { label: 'Concluído', variant: 'primary' },
    CANCELLED: { label: 'Cancelado', variant: 'danger' },
    DISPUTED: { label: 'Em disputa', variant: 'warning' },
    SUCCEEDED: { label: 'Pago', variant: 'success', dot: true },
    PROCESSING: { label: 'Processando', variant: 'warning', dot: true },
    FAILED: { label: 'Falhou', variant: 'danger' },
    REFUNDED: { label: 'Reembolsado', variant: 'neutral' },
    FREE: { label: 'Free', variant: 'neutral' },
    PRO: { label: 'Pro', variant: 'primary' },
    ENTERPRISE: { label: 'Enterprise', variant: 'success' },
  };

  const config = statusConfig[status] || { label: status, variant: 'neutral' };
  
  return <Badge variant={config.variant} dot={config.dot}>{config.label}</Badge>;
}