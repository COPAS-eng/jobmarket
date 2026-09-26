import { motion, HTMLMotionProps } from 'framer-motion';
import { Children, ReactNode, cloneElement, isValidElement } from 'react';
import { cn } from '@/utils/cn';

interface ScrollRevealProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'viewport' | 'transition'> {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  ...props
}: ScrollRevealProps) {
  const variants = {
    up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  };

  return (
    <motion.div
      initial={variants[direction].initial}
      animate={variants[direction].animate}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.1,
  direction = 'up',
}: StaggerContainerProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="show"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {Children.map(children, child => {
        if (!isValidElement(child)) return child;
        return cloneElement(child, {
          variants: {
            hidden: { opacity: 0, y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0, x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0 },
            show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
          },
        });
      })}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0, className, ...props }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({ children, delay = 0, className, ...props }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}