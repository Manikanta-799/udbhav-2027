import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EventData } from '@/data/events';

interface EventLaunchContextType {
  activeEvent: EventData | null;
  triggerLaunch: (event: EventData) => void;
  cancelLaunch: () => void;
  finishLaunch: () => void;
}

const EventLaunchContext = createContext<EventLaunchContextType | undefined>(undefined);

export function EventLaunchProvider({ children }: { children: React.ReactNode }) {
  const [activeEvent, setActiveEvent] = useState<EventData | null>(null);
  const navigate = useNavigate();

  const triggerLaunch = useCallback((event: EventData) => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      navigate(`/event/${event.id}`);
      return;
    }

    setActiveEvent(event);
  }, [navigate]);

  const finishLaunch = useCallback(() => {
    if (activeEvent) {
      const targetId = activeEvent.id;
      setActiveEvent(null);
      navigate(`/event/${targetId}`);
    }
  }, [activeEvent, navigate]);

  const cancelLaunch = useCallback(() => {
    setActiveEvent(null);
  }, []);

  return (
    <EventLaunchContext.Provider value={{ activeEvent, triggerLaunch, cancelLaunch, finishLaunch }}>
      {children}
    </EventLaunchContext.Provider>
  );
}

export function useEventLaunch() {
  const context = useContext(EventLaunchContext);
  if (!context) {
    throw new Error('useEventLaunch must be used within an EventLaunchProvider');
  }
  return context;
}

