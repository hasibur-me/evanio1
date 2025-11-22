import { cn } from '../../utils/cn';

export const Card = ({ children, className, glass = false, ...props }) => {
  if (glass) {
    return (
      <div
        className={cn(
          'backdrop-blur-xl bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 rounded-lg shadow-xl p-6 transition-colors duration-300',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};


