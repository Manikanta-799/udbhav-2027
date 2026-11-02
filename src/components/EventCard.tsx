import { motion } from 'framer-motion';
import { ArrowRight, Users, Sparkles } from 'lucide-react';
import type { EventData } from '@/data/events';
import { useEventLaunch } from '@/context/EventLaunchContext';

interface EventCardProps {
  event: EventData;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const { triggerLaunch } = useEventLaunch();

  // Theme specific colors
  const theme = {
    sports: {
      border: 'hover:border-orange-500/60',
      glow: 'group-hover:shadow-[0_0_25px_rgba(255,140,0,0.25)]',
      tagBg: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
      badge: 'border-orange-500/30',
      btn: 'group-hover:bg-orange-500 group-hover:text-black',
    },
    cultural: {
      border: 'hover:border-pink-500/60',
      glow: 'group-hover:shadow-[0_0_25px_rgba(255,20,147,0.25)]',
      tagBg: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
      badge: 'border-pink-500/30',
      btn: 'group-hover:bg-pink-500 group-hover:text-black',
    },
    technical: {
      border: 'hover:border-cyan-500/60',
      glow: 'group-hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]',
      tagBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      badge: 'border-cyan-500/30',
      btn: 'group-hover:bg-cyan-400 group-hover:text-black',
    },
  }[event.category];

  const handleClick = (e: React.MouseEvent) => {
    // If user holds Ctrl/Cmd or middle clicks, let browser open new tab
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    e.preventDefault();
    triggerLaunch(event);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      className="h-full"
    >
      <a
        href={`/event/${event.id}`}
        onClick={handleClick}
        className={`group relative flex flex-col justify-between h-full p-5 rounded-2xl bg-midnight/80 border border-white/10 ${theme.border} ${theme.glow} transition-all duration-300 backdrop-blur-md overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer`}
        aria-label={`View details and enter ${event.name}`}
      >
        {/* Subtle hover gradient background */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${event.color}15, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          {/* Top Bar: Icon Badge & Category Tag */}
          <div className="flex items-start justify-between gap-2 mb-3.5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border transition-transform duration-300 group-hover:scale-110 shadow-inner`}
              style={{
                backgroundColor: `${event.color}18`,
                borderColor: `${event.color}40`,
              }}
            >
              <span role="img" aria-label={event.name}>
                {event.icon}
              </span>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${theme.tagBg}`}>
                {event.category}
              </span>
              {event.subCategory && (
                <span className="text-[9px] uppercase tracking-wider text-gray-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5 font-mono">
                  {event.subCategory}
                </span>
              )}
            </div>
          </div>

          {/* Event Name */}
          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors tracking-tight">
            {event.name}
          </h4>

          {/* Description */}
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
            {event.description}
          </p>

          {/* Sub-events pills if applicable */}
          {event.subEvents && event.subEvents.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {event.subEvents.map((sub) => (
                <span
                  key={sub.name}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/10"
                >
                  {sub.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Bar: Team / Participation Info & CTA */}
        <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Users size={13} className="text-gray-500" />
            <span className="font-mono text-[11px]">{event.teamSize}</span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-gray-300 group-hover:text-cyan-400 transition-colors">
            <span>Play / Enter</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </a>
    </motion.div>
  );
}
