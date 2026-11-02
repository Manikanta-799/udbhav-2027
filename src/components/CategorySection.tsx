import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, ChevronUp, Sparkles } from 'lucide-react';
import CategoryCard from './CategoryCard';
import EventCard from './EventCard';
import type { EventCategory } from '@/data/events';
import { sportsEvents, culturalEvents, technicalEvents } from '@/data/events';

const categories: EventCategory[] = ['sports', 'cultural', 'technical'];

const eventsByCategory = {
  sports: sportsEvents,
  cultural: culturalEvents,
  technical: technicalEvents,
};

const categoryTheme = {
  sports: {
    accent: '#ff8c00',
    title: 'Games / Sports Fixtures',
    subtitle: '9 Official Tournaments at VJIT Grounds & Courts',
    badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    border: 'border-orange-500/30',
    glow: 'shadow-[0_0_30px_rgba(255,140,0,0.15)]',
    pageUrl: '/sports',
    pageLabel: 'Open Full Sports Arena Page',
  },
  cultural: {
    accent: '#ff007f',
    title: 'Cultural & Arts Competitions',
    subtitle: '13 Stage, Dance, Music, E-Sports & Media Events',
    badge: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
    border: 'border-pink-500/30',
    glow: 'shadow-[0_0_30px_rgba(255,0,128,0.15)]',
    pageUrl: '/cultural',
    pageLabel: 'Open Full Cultural Arena Page',
  },
  technical: {
    accent: '#00f0ff',
    title: 'Technical & Innovation Tracks',
    subtitle: '4 Hackathon, Coding, Ideation & Expo Tracks',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    border: 'border-cyan-500/30',
    glow: 'shadow-[0_0_30px_rgba(0,240,255,0.15)]',
    pageUrl: '/technical',
    pageLabel: 'Open Full Technical Arena Page',
  },
};

export default function CategorySection() {
  const [activeCategory, setActiveCategory] = useState<EventCategory | null>('sports'); // Sports expanded by default so games are immediately visible under that field!
  const sectionRefs = {
    sports: useRef<HTMLDivElement>(null),
    cultural: useRef<HTMLDivElement>(null),
    technical: useRef<HTMLDivElement>(null),
  };

  const toggleCategory = (category: EventCategory) => {
    const isExpanding = activeCategory !== category;
    setActiveCategory(isExpanding ? category : null);

    if (isExpanding) {
      setTimeout(() => {
        const el = document.getElementById(`arena-field-${category}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 150);
    }
  };

  return (
    <section id="arenas" className="py-20 md:py-28 relative scroll-mt-20" aria-label="Event Arenas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold mb-3">
            <Layers size={13} />
            <span>Interactive Fest Arenas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Event <span className="gradient-text">Arenas</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mt-2.5">
            Click any field below to expand all of its games and competitions directly under that field.
          </p>
        </div>

        {/* Categories Stack: Each category expands its events DIRECTLY under its own card! */}
        <div className="space-y-8">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const theme = categoryTheme[category];
            const events = eventsByCategory[category];

            return (
              <div
                key={category}
                id={`arena-field-${category}`}
                ref={sectionRefs[category]}
                className="scroll-mt-24 transition-all duration-300"
              >
                {/* 1. The Arena Field Card */}
                <CategoryCard
                  category={category}
                  isActive={isActive}
                  onClick={() => toggleCategory(category)}
                />

                {/* 2. Events expand DIRECTLY UNDER THIS FIELD ONLY! */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.38, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`mt-4 p-5 sm:p-7 rounded-2xl bg-midnight/90 border ${theme.border} ${theme.glow} backdrop-blur-xl relative`}
                      >
                        {/* Connecting Visual Pointer Arrow pointing up to the card */}
                        <div
                          className="absolute -top-3 left-10 w-6 h-6 rotate-45 border-l border-t bg-midnight"
                          style={{ borderColor: `${theme.accent}60` }}
                        />

                        {/* Shelf Header Banner */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-white/10">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
                                {events.length} Events Inside
                              </span>
                              <span className="text-xs text-gray-400 font-mono">
                                Interactive Arena
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                              {theme.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {theme.subtitle}. Click any game card to trigger the launch mascot!
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <Link
                              to={theme.pageUrl}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 shrink-0"
                            >
                              <span>{theme.pageLabel}</span>
                              <ArrowRight size={13} />
                            </Link>

                            <button
                              type="button"
                              onClick={() => toggleCategory(category)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors shrink-0 cursor-pointer"
                              title="Collapse this field"
                              aria-label="Collapse this field"
                            >
                              <ChevronUp size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Event Cards Grid for THIS category directly underneath! */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {events.map((event, index) => (
                            <EventCard key={event.id} event={event} index={index} />
                          ))}
                        </div>

                        {/* Bottom Collapse Bar */}
                        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                          <span>Showing all {events.length} {category} fixtures</span>
                          <button
                            type="button"
                            onClick={() => toggleCategory(category)}
                            className="inline-flex items-center gap-1 text-gray-400 hover:text-white font-semibold transition-colors cursor-pointer"
                          >
                            <span>Close {category}</span>
                            <ChevronUp size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
