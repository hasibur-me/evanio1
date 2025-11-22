import { cn } from '../../utils/cn';

export const Input = ({ className, glass = false, ...props }) => {
  if (glass) {
    return (
      <input
        className={cn(
          'w-full px-4 py-2.5 backdrop-blur-sm bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-blue-500 focus:border-white/50 dark:focus:border-blue-500 text-white dark:text-gray-100 placeholder:text-white/60 dark:placeholder:text-gray-400 transition-colors duration-300',
          className
        )}
        {...props}
      />
    );
  }

  return (
    <input
      className={cn(
        'w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-300',
        className
      )}
      {...props}
    />
  );
};


