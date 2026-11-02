import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FastForward } from 'lucide-react';
import type { EventData } from '@/data/events';

interface EventLaunchAnimationProps {
  event: EventData | null;
  onFinish: () => void;
  onCancel: () => void;
}

// Mini Mascot SVG Component (Udby - the Udbhav cyber-creature)
function MiniMascot({ action, color }: { action: string; color: string }) {
  return (
    <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]" fill="none">
        {/* Glow Aura */}
        <circle cx="60" cy="65" r="45" fill={color} fillOpacity="0.15" />

        {/* Mascot Body (Cute energetic cyber creature) */}
        <ellipse cx="60" cy="78" rx="26" ry="24" fill="#0d1527" stroke={color} strokeWidth="3" />
        
        {/* Chest Core */}
        <circle cx="60" cy="78" r="8" fill={color} className="animate-pulse" />
        <circle cx="60" cy="78" r="4" fill="#ffffff" />

        {/* Head */}
        <circle cx="60" cy="45" r="24" fill="#0f172a" stroke={color} strokeWidth="3" />

        {/* Cyber Ears / Antennae */}
        <path d="M42 32 L30 14 L46 22 Z" fill="#00f0ff" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M78 32 L90 14 L74 22 Z" fill="#ff007f" stroke="#ffffff" strokeWidth="1.5" />

        {/* Glowing Cyber Visor Eyes */}
        <rect x="44" y="38" width="32" height="12" rx="6" fill="#050811" stroke="#00f0ff" strokeWidth="2" />
        <circle cx="52" cy="44" r="3" fill="#00f0ff" />
        <circle cx="68" cy="44" r="3" fill="#00f0ff" />

        {/* Cute Cheeks */}
        <circle cx="43" cy="52" r="3" fill="#ff007f" opacity="0.8" />
        <circle cx="77" cy="52" r="3" fill="#ff007f" opacity="0.8" />

        {/* Dynamic Equipment based on action */}
        {action === 'cricket' && (
          <g>
            {/* Cricket Bat in Hands */}
            <motion.g
              animate={{ rotate: [-20, 45, 0], x: [0, 15, 0] }}
              transition={{ duration: 0.4, repeat: 1, ease: 'easeOut' }}
              style={{ originX: '45px', originY: '75px' }}
            >
              <rect x="70" y="45" width="8" height="42" rx="3" fill="#d97706" stroke="#fbbf24" strokeWidth="2" />
              <rect x="72" y="32" width="4" height="15" rx="2" fill="#78350f" />
              {/* Hands */}
              <circle cx="74" cy="46" r="5" fill="#38bdf8" />
            </motion.g>
          </g>
        )}

        {action === 'football' && (
          <g>
            {/* Sneaker Kicking */}
            <motion.path
              d="M72 90 L95 82 L90 95 Z"
              fill="#ff0055"
              stroke="#ffffff"
              strokeWidth="2"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.3 }}
            />
          </g>
        )}

        {action === 'basketball' && (
          <g>
            {/* Dunking Arms Up */}
            <path d="M42 60 L36 30" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
            <path d="M78 60 L84 30" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
          </g>
        )}

        {action === 'gaming' && (
          <g>
            {/* Cyber Blaster / Game Controller */}
            <rect x="68" y="55" width="28" height="14" rx="4" fill="#00f0ff" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="88" cy="62" r="2" fill="#ff0055" />
          </g>
        )}

        {action === 'tech' && (
          <g>
            {/* Holographic Keyboard Matrix */}
            <rect x="35" y="82" width="50" height="14" rx="3" fill="#00f0ff" fillOpacity="0.3" stroke="#00f0ff" strokeWidth="1.5" />
            <line x1="42" y1="89" x2="78" y2="89" stroke="#ffffff" strokeWidth="2" strokeDasharray="2 3" />
          </g>
        )}

        {action === 'dance' && (
          <g>
            {/* Ribbon Flourish */}
            <motion.path
              d="M30 70 Q10 40 50 20 T90 50"
              stroke="#ff00ff"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 0.6 }}
            />
          </g>
        )}
      </svg>
    </div>
  );
}

export default function EventLaunchAnimation({ event, onFinish, onCancel }: EventLaunchAnimationProps) {
  const [phase, setPhase] = useState<'intro' | 'impact' | 'zoom'>('intro');

  useEffect(() => {
    if (!event) return;

    // Sequence timing:
    // 0ms - 450ms: Udby dashes in & ball approaches
    // 450ms - 850ms: Impact / Hit / Crack!
    // 850ms - 1200ms: Zoom into camera & open page!
    const t1 = setTimeout(() => setPhase('impact'), 450);
    const t2 = setTimeout(() => setPhase('zoom'), 850);
    const t3 = setTimeout(() => onFinish(), 1250);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onFinish, onCancel]);

  if (!event) return null;

  // Determine game theme
  const isCricket = event.id === 'cricket';
  const isFootball = event.id === 'football';
  const isBasketball = event.id === 'basketball';
  const isGaming = event.category === 'cultural' && event.subCategory === 'gaming';
  const isTech = event.category === 'technical';
  const isDance = event.id.includes('dance');

  const actionType = isCricket
    ? 'cricket'
    : isFootball
    ? 'football'
    : isBasketball
    ? 'basketball'
    : isGaming
    ? 'gaming'
    : isTech
    ? 'tech'
    : isDance
    ? 'dance'
    : 'general';

  const soundWord = isCricket
    ? 'SIXER!! 🏏'
    : isFootball
    ? 'GOAL!! ⚽'
    : isBasketball
    ? 'SLAM DUNK!! 🏀'
    : isGaming
    ? 'HEADSHOT!! 🎯'
    : isTech
    ? 'COMPILE SUCCESS! ⚡'
    : isDance
    ? 'SHOWSTOPPER!! 💃'
    : 'SMASH!! 🔥';

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl overflow-hidden select-none"
        role="dialog"
        aria-modal="true"
        aria-label={`Launching ${event.name}`}
      >
        {/* Background Speed Lines & Cosmic Warp */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at center, ${event.color}40 0%, transparent 70%)`,
            }}
          />
          {phase === 'zoom' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 2 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-white"
            />
          )}
        </div>

        {/* Skip Button */}
        <button
          onClick={onFinish}
          className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
        >
          <span>Skip</span>
          <FastForward size={14} />
        </button>

        {/* Stage Area */}
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center justify-center p-6 text-center">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-1">
              Entering Arena...
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
              {event.name}
            </h2>
          </motion.div>

          {/* Animation Canvas Stage */}
          <div className="relative w-80 h-64 flex items-center justify-center overflow-visible">
            {/* 1. Mascot Udby */}
            <motion.div
              initial={{ x: -160, y: 40, opacity: 0, scale: 0.8 }}
              animate={
                phase === 'intro'
                  ? { x: -40, y: 10, opacity: 1, scale: 1 }
                  : phase === 'impact'
                  ? { x: -20, y: 0, opacity: 1, scale: 1.15 }
                  : { x: 30, y: -10, opacity: 0.8, scale: 1.3 }
              }
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute"
            >
              <MiniMascot action={actionType} color={event.color} />
            </motion.div>

            {/* 2. Projectile / Ball (Cricket Ball, Football, Basketball, Disc, Tech Cube) */}
            <motion.div
              initial={{ x: 180, y: -30, scale: 0.6, opacity: 0 }}
              animate={
                phase === 'intro'
                  ? { x: 0, y: 5, scale: 1, opacity: 1 }
                  : phase === 'impact'
                  ? { x: 10, y: 0, scale: 1.3, opacity: 1 }
                  : { x: -50, y: -200, scale: 6, opacity: 0 } // Fly straight toward camera!
              }
              transition={
                phase === 'zoom'
                  ? { duration: 0.35, ease: 'easeIn' }
                  : { duration: 0.4, ease: 'easeOut' }
              }
              className="absolute z-10"
            >
              {/* Ball Graphic */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-2xl relative"
                style={{
                  filter: `drop-shadow(0 0 15px ${event.color})`,
                }}
              >
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-60"
                  style={{ backgroundColor: event.color }}
                />
                <span role="img" aria-label={event.name} className="relative z-10">
                  {event.icon}
                </span>
              </div>
            </motion.div>

            {/* 3. Impact Shockwave Burst */}
            {phase === 'impact' && (
              <motion.div
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 2.8, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute w-24 h-24 rounded-full border-4 pointer-events-none"
                style={{ borderColor: event.color }}
              />
            )}

            {/* 4. Comic Punch Words on Impact */}
            {phase !== 'intro' && (
              <motion.div
                initial={{ scale: 0, rotate: -15, opacity: 0 }}
                animate={{ scale: [1.3, 1], rotate: [-10, 5], opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, type: 'spring' }}
                className="absolute -top-4 right-2 z-20 pointer-events-none"
              >
                <div
                  className="px-4 py-1.5 rounded-xl font-black text-sm sm:text-base tracking-wider uppercase text-black shadow-2xl skew-x-[-8deg] border-2 border-white"
                  style={{
                    backgroundColor: event.color,
                    boxShadow: `0 0 25px ${event.color}`,
                  }}
                >
                  {soundWord}
                </div>
              </motion.div>
            )}
          </div>

          {/* Loading status indicator bar */}
          <div className="w-56 h-1.5 rounded-full bg-white/10 mt-6 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="h-full rounded-full"
              style={{ backgroundColor: event.color }}
            />
          </div>
          <span className="text-[11px] font-mono text-gray-400 mt-2">
            Loading {event.name} arena fixtures...
          </span>
        </div>
      </div>
    </AnimatePresence>
  );
}

