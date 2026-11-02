import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Search, Sparkles, Filter } from 'lucide-react';
import { sportsEvents } from '@/data/events';
import EventCard from '@/components/EventCard';

export default function Sports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [participationFilter, setParticipationFilter] = useState<'all' | 'Team' | 'Individual or Team' | 'Individual'>('all');

  const filteredEvents = useMemo(() => {
    return sportsEvents.filter((ev) => {
      const matchesSearch =
        ev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        participationFilter === 'all' || ev.participationType === participationFilter;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, participationFilter]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Back navigation matching mockup */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header Banner matching mockup */}
      <div className="relative rounded-3xl p-8 sm:p-12 mb-10 overflow-hidden border border-orange-500/30 bg-gradient-to-r from-orange-950/40 via-amber-950/20 to-midnight shadow-[0_0_50px_rgba(255,140,0,0.15)] text-center">
        {/* Ambient neon radial */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Trophy icon */}
          <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-orange-400 mb-4 shadow-[0_0_25px_rgba(255,140,0,0.3)]">
            <Trophy size={34} />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-2">
            Games / <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">Sports</span>
          </h1>

          <p className="text-sm sm:text-base font-semibold text-orange-300/80 tracking-widest uppercase mb-4">
            Compete • Play • Win
          </p>

          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Experience the pulse of athletics at VJIT. 9 competitive sports tournaments bringing together collegiate athletes from across the state.
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-card p-4 rounded-2xl mb-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search sports (e.g. Cricket, Basketball)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-orange-400"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <span className="text-xs text-gray-500 font-semibold mr-1">Type:</span>
          {(['all', 'Team', 'Individual or Team', 'Individual'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setParticipationFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                participationFilter === filter
                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-sm'
                  : 'text-gray-400 bg-white/5 hover:text-white border-white/5'
              }`}
            >
              {filter === 'all' ? 'All (9)' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* 9 Sports Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl border border-white/10">
          <p className="text-gray-400 text-sm">No sports events matched your search query.</p>
          <button
            onClick={() => { setSearchQuery(''); setParticipationFilter('all'); }}
            className="mt-3 text-xs text-orange-400 underline font-semibold"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

