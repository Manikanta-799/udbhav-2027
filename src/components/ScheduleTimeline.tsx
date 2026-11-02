import { useState } from 'react';
import { Calendar, MapPin, Clock, Info, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ScheduleEntry } from '@/data/schedule';
import { festDays } from '@/data/schedule';
import type { EventCategory } from '@/data/events';

interface ScheduleTimelineProps {
  entries: ScheduleEntry[];
}

const categoryStyles: Record<EventCategory, { text: string; bg: string; border: string; glow: string }> = {
  sports: {
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    glow: 'shadow-[0_0_15px_rgba(255,140,0,0.15)]',
  },
  cultural: {
    text: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    glow: 'shadow-[0_0_15px_rgba(255,20,147,0.15)]',
  },
  technical: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    glow: 'shadow-[0_0_15px_rgba(0,240,255,0.15)]',
  },
};

export default function ScheduleTimeline({ entries }: ScheduleTimelineProps) {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | 'all'>('all');

  const filteredEntries = entries.filter(
    (e) => e.day === activeDay && (categoryFilter === 'all' || e.category === categoryFilter)
  );

  return (
    <div className="w-full space-y-8">
      {/* Day Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {festDays.map((d) => {
          const isSelected = activeDay === d.day;
          return (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 text-white border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar size={16} className={isSelected ? 'text-cyan-400' : 'text-gray-500'} />
                <span>{d.label}</span>
              </div>
              <span className="block text-xs font-normal text-gray-400 mt-0.5">{d.date}</span>
            </button>
          );
        })}
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(['all', 'sports', 'cultural', 'technical'] as const).map((cat) => {
          const isSelected = categoryFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-white/20 text-white border-white/40 shadow-sm'
                  : 'text-gray-400 border-white/5 bg-white/[0.03] hover:text-gray-200 hover:bg-white/[0.06]'
              }`}
            >
              {cat === 'all' ? 'All Arenas' : cat}
            </button>
          );
        })}
      </div>

      {/* Schedule Content */}
      {entries.length === 0 || filteredEntries.length === 0 ? (
        <div className="glass-card p-10 md:p-14 text-center rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <Clock size={32} />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Schedule To Be Announced</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              The organizing committee is actively finalizing the sequence of fixtures, stage line-ups, and lab sessions. Full minute-by-minute timeline for Day {activeDay} will be released right here once confirmed.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-cyan-300 mb-6">
              <Info size={14} />
              <span>Official dates and timing will be published following university clearance.</span>
            </div>

            <div>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
              >
                Register Your Team Early
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((item) => {
            const style = categoryStyles[item.category];
            return (
              <div
                key={item.id}
                className={`glass-card p-5 rounded-xl border ${style.border} ${style.bg} ${style.glow} flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 hover:translate-x-1`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-center min-w-[90px]">
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mb-0.5">
                      <Clock size={12} className={style.text} />
                      <span>TIME</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-white">{item.time}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.border} ${style.text}`}>
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white hover:text-cyan-400 transition-colors">
                      {item.eventName}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <MapPin size={13} className="text-gray-500" />
                      <span>{item.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider transition-colors border border-white/10"
                  >
                    Register
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

