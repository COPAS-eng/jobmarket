import { forwardRef, HTMLAttributes, ImgHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { getInitials, generateAvatarColor } from '@/utils/cn';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square';
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, size = 'md', shape = 'circle', ...props }, ref) => {
    const sizeClasses = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
      '2xl': 'h-24 w-24 text-2xl',
    };

    const shapeClasses = {
      circle: 'rounded-full',
      square: 'rounded-xl',
    };

    const fallbackColor = name ? generateAvatarColor(name) : 'bg-cyan-500';
    const initials = name ? getInitials(name) : '?';

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium text-white overflow-hidden flex-shrink-0',
          sizeClasses[size],
          shapeClasses[shape],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className={cn(fallbackColor, 'w-full h-full flex items-center justify-center')}>
            {initials}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export const AvatarGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { max?: number }>(
  ({ className, max = 5, children, ...props }, ref) => {
    const childArray = Array.isArray(children) ? children : [children];
    const visibleChildren = childArray.slice(0, max);
    const remainingCount = childArray.length - max;

    return (
      <div ref={ref} className={cn('flex -space-x-2', className)} {...props}>
        {visibleChildren.map((child, index) => (
          <span key={index} className="relative z-[calc(100_-_var(--i))]" style={{ '--i': index }}>
            {child}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className={cn(
            'flex items-center justify-center font-medium text-white bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-2 border-white dark:border-slate-950',
            sizeClasses.md
          )}>
            +{remainingCount}
          </span>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';