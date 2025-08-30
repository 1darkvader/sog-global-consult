interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'full' | 'icon-only'
  className?: string
  darkMode?: boolean
}

export function Logo({ size = 'md', variant = 'full', className = '', darkMode = false }: LogoProps) {
  const sizeClasses = {
    sm: variant === 'full' ? 'h-8' : 'h-6',
    md: variant === 'full' ? 'h-12' : 'h-8',
    lg: variant === 'full' ? 'h-16' : 'h-12'
  }

  // Using your actual logo design - navy blue buildings with text
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo SVG based on your uploaded design */}
      <div className={`${sizeClasses[size]} flex items-center`}>
        <svg
          viewBox="0 0 400 300"
          className={sizeClasses[size]}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Buildings - matching your navy blue design */}
          <g fill={darkMode ? "#3b82f6" : "#1e40af"}>
            {/* Left building complex */}
            <rect x="20" y="120" width="25" height="100" />
            <rect x="50" y="100" width="30" height="120" />
            <rect x="85" y="110" width="25" height="110" />

            {/* Main central tower */}
            <rect x="120" y="40" width="45" height="180" />

            {/* Windows on main tower */}
            <rect x="125" y="50" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="134" y="50" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="143" y="50" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="152" y="50" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />

            <rect x="125" y="65" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="134" y="65" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="143" y="65" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="152" y="65" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />

            <rect x="125" y="80" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="134" y="80" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="143" y="80" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="152" y="80" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />

            <rect x="125" y="95" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="134" y="95" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="143" y="95" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="152" y="95" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />

            <rect x="125" y="110" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="134" y="110" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="143" y="110" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="152" y="110" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />

            <rect x="125" y="125" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="134" y="125" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="143" y="125" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="152" y="125" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />

            <rect x="125" y="140" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="134" y="140" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="143" y="140" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="152" y="140" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />

            <rect x="125" y="155" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="134" y="155" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="143" y="155" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="152" y="155" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />

            <rect x="125" y="170" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="134" y="170" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="143" y="170" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="152" y="170" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />

            <rect x="125" y="185" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="134" y="185" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="143" y="185" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="152" y="185" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />

            <rect x="125" y="200" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="134" y="200" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="143" y="200" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="152" y="200" width="6" height="8" fill={darkMode ? "#60a5fa" : "#3b82f6"} />

            {/* Right building complex */}
            <rect x="170" y="80" width="35" height="140" />
            <rect x="210" y="90" width="25" height="130" />
            <rect x="240" y="105" width="30" height="115" />

            {/* Windows on right buildings */}
            <rect x="175" y="90" width="4" height="6" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="182" y="90" width="4" height="6" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="189" y="90" width="4" height="6" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="196" y="90" width="4" height="6" fill={darkMode ? "#60a5fa" : "#3b82f6"} />

            <rect x="175" y="100" width="4" height="6" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="182" y="100" width="4" height="6" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="189" y="100" width="4" height="6" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="196" y="100" width="4" height="6" fill={darkMode ? "#60a5fa" : "#3b82f6"} />

            <rect x="215" y="100" width="4" height="6" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="222" y="100" width="4" height="6" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
            <rect x="229" y="100" width="4" height="6" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
          </g>

          {/* Base/Foundation curves */}
          <path
            d="M 15 220 Q 145 210 275 220 Q 200 225 145 225 Q 90 225 15 220 Z"
            fill={darkMode ? "#3b82f6" : "#1e40af"}
          />
          <path
            d="M 25 225 Q 145 218 265 225"
            stroke={darkMode ? "#3b82f6" : "#1e40af"}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 35 228 Q 145 223 255 228"
            stroke={darkMode ? "#3b82f6" : "#1e40af"}
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col">
          <div className={`font-bold leading-none ${
            darkMode ? 'text-blue-300' : 'text-blue-800'
          } ${size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'}`}>
            SOG GLOBAL
          </div>
          <div className={`tracking-wider leading-none ${
            darkMode ? 'text-blue-400' : 'text-blue-600'
          } ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}`}>
            CONSULT LIMITED
          </div>
        </div>
      )}
    </div>
  )
}
