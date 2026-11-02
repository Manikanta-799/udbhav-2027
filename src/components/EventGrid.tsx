import { AnimatePresence, motion } from 'framer-motion';
import EventCard from './EventCard';
import type { EventData } from '@/data/events';

interface EventGridProps {
  events: EventData[];
  category: string;
}

export default function EventGrid({ events, category }: EventGridProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category}
        id={`category-events-${category}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden"
        role="region"
        aria-label={`${category} events`}
      >
        <div className="pt-8 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
