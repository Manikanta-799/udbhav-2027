import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';
import CategoryCard from './CategoryCard';
import EventGrid from './EventGrid';
import type { EventCategory } from '@/data/events';
import { sportsEvents, culturalEvents, technicalEvents } from '@/data/events';

const categories: EventCategory[] = ['sports', 'cultural', 'technical'];

const eventsByCategory = {
  sports: sportsEvents,
  cultural: culturalEvents,
  technical: technicalEvents,
};

export default function CategorySection() {
  const [activeCategory, setActiveCategory] = useState<EventCategory | null>(null);

  const toggleCategory = (category: EventCategory) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  return (
    <section id="arenas" className="py-20 md:py-28 relative scroll-mt-20" aria-label="Event Arenas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching mockup */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold mb-3">
            <Layers size={13} />
            <span>Interactive Fest Arenas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Event <span className="gradient-text">Arenas</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mt-2.5">
            Choose your arena and explore the events. Click any category card to expand all fixtures directly below.
          </p>
        </div>

        {/* The 3 Interactive Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              isActive={activeCategory === category}
              onClick={() => toggleCategory(category)}
            />
          ))}
        </div>

        {/* Expanded Events Shelf Below Cards */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="mt-8 pt-8 border-t border-white/10"
            >
              {/* Shelf Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-cyan-400/20 text-cyan-300">
                    Active Shelf
                  </span>
                  <h3 className="text-lg font-bold text-white capitalize">
                    {activeCategory} Events ({eventsByCategory[activeCategory].length})
                  </h3>
                </div>

                <Link
                  to={`/${activeCategory}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Open Dedicated {activeCategory.toUpperCase()} Arena Page</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Event Card Grid */}
              <EventGrid
                events={eventsByCategory[activeCategory]}
                category={activeCategory}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
