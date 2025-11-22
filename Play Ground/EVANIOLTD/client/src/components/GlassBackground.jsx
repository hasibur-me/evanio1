export const GlassBackground = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden dark:bg-gray-900 transition-colors duration-300">
      {/* Glassmorphism Background with Gradient */}
      <div className="fixed inset-0 -z-10">
        {/* Light mode gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:hidden"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-purple-600/70 to-transparent dark:hidden"></div>
        {/* Dark mode gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/50 to-purple-900/50 hidden dark:block"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-blue-900/40 to-transparent hidden dark:block"></div>
        {/* Animated gradient orbs - Light mode */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse dark:hidden"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000 dark:hidden"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-500 dark:hidden"></div>
        {/* Animated gradient orbs - Dark mode */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse hidden dark:block"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000 hidden dark:block"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-500 hidden dark:block"></div>
      </div>

      {/* Optional noise texture overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

