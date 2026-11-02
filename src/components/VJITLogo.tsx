import vjitLogoImg from '@/assets/vjit-logo.png';

interface VJITLogoProps {
  className?: string;
  showText?: boolean;
  imageSrc?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Official VJIT Emblem Component.
 * Ensures the emblem is clearly visible with optimal contrast on dark backgrounds.
 */
export default function VJITLogo({
  className = '',
  showText = true,
  imageSrc,
  size = 'md',
}: VJITLogoProps) {
  const logoUrl = imageSrc || vjitLogoImg;

  const sizeDimensions = {
    sm: 'w-8 h-8 p-1',
    md: 'w-11 h-11 p-1.5',
    lg: 'w-14 h-14 p-2',
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official VJIT Crest - High contrast clean badge */}
      <div
        className={`relative ${sizeDimensions} rounded-xl bg-white flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.25)] border border-white/60 hover:scale-105 transition-transform duration-200`}
        title="Vidya Jyothi Institute of Technology (Autonomous)"
      >
        <img
          src={logoUrl}
          alt="Vidya Jyothi Institute of Technology (VJIT) Official Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black text-white tracking-wider font-mono">VJIT</span>
            <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-400/10 px-1.5 py-0.2 rounded border border-cyan-400/20">
              Autonomous
            </span>
          </div>
          <span className="text-xs font-semibold text-gray-100 leading-tight">
            Vidya Jyothi Institute of Technology
          </span>
          <span className="text-[10px] text-gray-400 leading-none mt-0.5">
            Hyderabad, Telangana
          </span>
        </div>
      )}
    </div>
  );
}
