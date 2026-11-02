import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Sparkles, Code2, Theater, ChevronDown } from 'lucide-react';
import type { EventCategory } from '@/data/events';
import { categoryInfo } from '@/data/events';

interface CategoryCardProps {
  category: EventCategory;
  isActive: boolean;
  onClick: () => void;
}

export default function CategoryCard({ category, isActive, onClick }: CategoryCardProps) {
  const info = categoryInfo[category];

  // Neon thematic configs matching the mockup
  const config = {
    sports: {
      accent: '#ff8c00',
      gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
      borderColor: isActive ? 'border-orange-400' : 'border-orange-500/30 group-hover:border-orange-400/80',
      glow: isActive ? 'shadow-[0_0_35px_rgba(255,140,0,0.4)]' : 'group-hover:shadow-[0_0_25px_rgba(255,140,0,0.25)]',
      textColor: 'text-orange-400',
      subtext: 'Basketball, Football, Cricket, Badminton & 5 more...',
      iconComp: Trophy,
      // Stylized SVG silhouette
      illustration: (
        <svg viewBox="0 0 160 160" className="w-28 h-28 opacity-35 group-hover:opacity-75 transition-opacity duration-300" fill="none">
          {/* Athlete dunking silhouette */}
          <circle cx="110" cy="30" r="14" fill="#ff8c00" className="drop-shadow-[0_0_10px_#ff8c00]" />
          <path d="M100 48 Q95 65 85 85 L65 125 L50 145 M85 85 L105 110 L130 140 M100 48 L115 65 L140 50 M100 48 L80 40 L65 50" stroke="#ffaa33" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="140" cy="46" r="10" fill="#ffa500" stroke="#fff" strokeWidth="1.5" />
        </svg>
      ),
    },
    cultural: {
      accent: '#ff007f',
      gradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
      borderColor: isActive ? 'border-pink-400' : 'border-pink-500/30 group-hover:border-pink-400/80',
      glow: isActive ? 'shadow-[0_0_35px_rgba(255,0,128,0.4)]' : 'group-hover:shadow-[0_0_25px_rgba(255,0,128,0.25)]',
      textColor: 'text-pink-400',
      subtext: 'Battle of Bands, Dance, Singing, Gaming & more...',
      iconComp: Theater,
      illustration: (
        <svg viewBox="0 0 160 160" className="w-28 h-28 opacity-35 group-hover:opacity-75 transition-opacity duration-300" fill="none">
          {/* Classical Dancer Silhouette with mudra */}
          <circle cx="80" cy="30" r="11" fill="#ff1493" className="drop-shadow-[0_0_10px_#ff1493]" />
          <path d="M80 42 Q82 60 80 75 Q60 85 45 65 M80 75 Q100 85 115 65 M80 75 L75 105 L60 140 M75 105 L95 115 L120 120" stroke="#ff69b4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 100 Q80 125 100 100 Z" fill="#ff007f" opacity="0.6" />
        </svg>
      ),
    },
    technical: {
      accent: '#00f0ff',
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      borderColor: isActive ? 'border-cyan-400' : 'border-cyan-500/30 group-hover:border-cyan-400/80',
      glow: isActive ? 'shadow-[0_0_35px_rgba(0,240,255,0.4)]' : 'group-hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]',
      textColor: 'text-cyan-400',
      subtext: 'Codeathon, Ideathon, Hackathons & Expo...',
      iconComp: Code2,
      illustration: (
        <svg viewBox="0 0 160 160" className="w-28 h-28 opacity-35 group-hover:opacity-75 transition-opacity duration-300" fill="none">
          {/* Coder hacker with glowing laptop */}
          <circle cx="70" cy="40" r="12" fill="#00f0ff" className="drop-shadow-[0_0_10px_#00f0ff]" />
          <path d="M70 54 L60 85 L90 85 L100 75" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
          <rect x="75" y="80" width="45" height="28" rx="3" stroke="#00f0ff" strokeWidth="3" fill="#0369a1" fillOpacity="0.4" />
          <line x1="70" y1="108" x2="125" y2="108" stroke="#00f0ff" strokeWidth="3" />
          <text x="82" y="98" fill="#00f0ff" fontSize="12" fontWeight="bold" fontFamily="monospace">&lt;/&gt;</text>
        </svg>
      ),
    },
  }[category];

  const IconComponent = config.iconComp;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full text-left p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md bg-midnight/80 ${config.borderColor} ${config.glow}`}
      aria-expanded={isActive}
      aria-controls={`category-events-${category}`}
    >
      {/* Background radial gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-40 group-hover:opacity-80 transition-opacity duration-300`}
        aria-hidden="true"
      />

      {/* Decorative illustration sitting in corner */}
      <div className="absolute -bottom-2 -right-2 pointer-events-none transition-transform duration-500 group-hover:scale-110">
        {config.illustration}
      </div>

      <div className="relative z-10">
        {/* Header: Icon & Active State Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
            style={{
              backgroundColor: `${config.accent}18`,
              borderColor: `${config.accent}40`,
            }}
          >
            <IconComponent size={24} className={config.textColor} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-gray-300">
              {info.eventCount} Events
            </span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isActive
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 text-gray-300 border-white/10 group-hover:border-white/30 group-hover:bg-white/10'
              }`}
            >
              {isActive ? (
                <ChevronDown size={16} className="text-black" />
              ) : (
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight group-hover:text-white transition-colors">
          {info.title}
        </h3>

        {/* Short subtitle preview */}
        <p className={`text-xs sm:text-sm font-medium ${config.textColor} mb-3`}>
          {config.subtext}
        </p>

        {/* Action cue */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
          <span className="text-gray-400 group-hover:text-gray-200 transition-colors">
            {isActive ? 'Click to collapse arena' : 'Click to expand all fixtures'}
          </span>
          <span className={`font-semibold ${config.textColor} underline underline-offset-4 group-hover:brightness-125`}>
            {isActive ? 'Hide Events' : 'View Arena →'}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
