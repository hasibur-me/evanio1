export const Logo = ({ className = '', showTagline = false, size = 'default' }) => {
  const sizeClasses = {
    small: 'text-xl',
    default: 'text-2xl md:text-3xl',
    large: 'text-3xl md:text-4xl lg:text-5xl',
  };

  const taglineSizeClasses = {
    small: 'text-[8px] md:text-[10px]',
    default: 'text-[10px] md:text-xs',
    large: 'text-xs md:text-sm',
  };

  // Green diamond with dollar sign
  const DollarDiamond = ({ size: diamondSize = '0.5em' }) => (
    <svg
      width={diamondSize}
      height={diamondSize}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 text-green-400"
      style={{ 
        top: '-0.2em',
        transform: 'translateX(-50%) rotate(45deg)',
      }}
    >
      {/* Green diamond shape */}
      <path
        d="M10 2L18 10L10 18L2 10L10 2Z"
        fill="#22c55e"
        stroke="#16a34a"
        strokeWidth="0.5"
      />
      {/* White dollar sign inside diamond */}
      <text
        x="10"
        y="13"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        style={{ transform: 'rotate(-45deg)', transformOrigin: '10px 10px' }}
      >
        $
      </text>
    </svg>
  );

  // Better dollar sign implementation
  const DollarDiamondV2 = ({ size: diamondSize = '0.5em' }) => {
    const baseSize = parseFloat(diamondSize);
    const fontSize = baseSize * 0.6;
    
    return (
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ 
          top: '-0.25em',
          width: diamondSize,
          height: diamondSize,
          transform: 'rotate(45deg)',
          backgroundColor: '#22c55e',
          border: '1px solid #16a34a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            transform: 'rotate(-45deg)',
            color: 'white',
            fontSize: `${fontSize}`,
            fontWeight: 'bold',
            lineHeight: '1',
          }}
        >
          $
        </span>
      </div>
    );
  };

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="flex items-center gap-0 font-bold text-white tracking-tight" style={{ fontFamily: 'sans-serif', fontWeight: 700 }}>
        {/* E - Capital */}
        <span className={sizeClasses[size]} style={{ textTransform: 'uppercase' }}>E</span>
        
        {/* v - lowercase */}
        <span className={sizeClasses[size]} style={{ textTransform: 'lowercase' }}>v</span>
        
        {/* a - lowercase */}
        <span className={sizeClasses[size]} style={{ textTransform: 'lowercase' }}>a</span>
        
        {/* n - lowercase */}
        <span className={sizeClasses[size]} style={{ textTransform: 'lowercase' }}>n</span>
        
        {/* i - lowercase with green diamond dollar sign */}
        <div className={`${sizeClasses[size]} relative flex items-center justify-center`} style={{ lineHeight: '1' }}>
          <span className="text-white font-bold" style={{ textTransform: 'lowercase' }}>i</span>
          {/* Green Diamond with Dollar Sign */}
          <DollarDiamondV2 
            size={size === 'small' ? '0.5em' : size === 'large' ? '0.7em' : '0.6em'}
          />
        </div>
        
        {/* o - lowercase */}
        <span className={sizeClasses[size]} style={{ textTransform: 'lowercase' }}>o</span>
      </div>
      
      {showTagline && (
        <div className={`${taglineSizeClasses[size]} text-white/90 uppercase tracking-wider mt-0.5 md:mt-1 font-medium`} style={{ fontFamily: 'sans-serif', letterSpacing: '0.05em' }}>
          LET'S GROW TOGETHER IN THIS DIGITAL ERA
        </div>
      )}
    </div>
  );
};
