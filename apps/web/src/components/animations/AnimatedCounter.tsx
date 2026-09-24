import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/utils/cn';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  locale?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  locale = 'pt-BR',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(from);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView || started) return;
    setStarted(true);

    const startTime = performance.now();
    const endTime = startTime + duration * 1000;
    const range = to - from;

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      // Ease out exponential
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + range * eased;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, from, to, duration, started]);

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div ref={ref} className={cn('inline-flex items-baseline', className)}>
      {prefix && <span className="text-slate-500 dark:text-slate-400">{prefix}</span>}
      <span className="font-display font-bold">{formatter.format(count)}</span>
      {suffix && <span className="text-slate-500 dark:text-slate-400">{suffix}</span>}
    </div>
  );
}