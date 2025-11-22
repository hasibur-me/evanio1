import { cn } from '../utils/cn';

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn('animate-pulse bg-white/10 rounded', className)}
      {...props}
    />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
};

export const TableSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-12 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

export const ImageSkeleton = ({ className }) => {
  return <Skeleton className={cn('aspect-video w-full', className)} />;
};

export const TextSkeleton = ({ lines = 3, className }) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  );
};

export const ButtonSkeleton = ({ className }) => {
  return <Skeleton className={cn('h-10 w-24 rounded-full', className)} />;
};

export const AvatarSkeleton = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  return <Skeleton className={cn('rounded-full', sizes[size])} />;
};


