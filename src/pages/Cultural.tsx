import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Theater, Search, Gamepad2, Music2, Sparkles, Film } from 'lucide-react';
import { culturalEvents } from '@/data/events';
import EventCard from '@/components/EventCard';

export default function Cultural() {
  const [searchQuery, setSearchQuery] = useState('');
  const [subCategoryFilter, setSubCategoryFilter] = useState<'all' | 'dance' | 'gaming' | 'music' | 'art' | 'general'>('all');

  const filteredEvents = useMemo(() => {
    return culturalEvents.filter((ev) => {
      const matchesSearch =
        ev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSub =
        subCategoryFilter === 'all' || ev.subCategory === subCategoryFilter;
      return matchesSearch && matchesSub;
    });
  }, [searchQuery, subCategoryFilter]);

  const categories = [
    { id: 'all', label: 'All Cultural (13)' },
    { id: 'dance', label: 'Dance & Stage' },
    { id: 'gaming', label: 'E-Sports & Gaming' },
    { id: 'music', label: 'Music & Bands' },
    { id: 'art', label: 'Media & Arts' },
    { id: 'general', label: 'Campus Thrills' },
  ] as const;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="relative rounded-3xl p-8 sm:p-12 mb-10 overflow-hidden border border-pink-500/30 bg-gradient-to-r from-pink-950/40 via-purple-950/20 to-midnight shadow-[0_0_50px_rgba(255,20,147,0.15)] text-center">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-400 mb-4 shadow-[0_0_25px_rgba(255,20,147,0.3)]">
            <Theater size={34} />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-2">
            Cultural / <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-400">Arts Arena</span>
          </h1>

          <p className="text-sm sm:text-base font-semibold text-pink-300/80 tracking-widest uppercase mb-4">
            Perform • Express • Captivate
          </p>

          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            The grandest stage of expression in Hyderabad. 13 headline competitions spanning live music, classical & western dance battles, e-sports arenas, and creative media.
          </p>
        </div>
      </div>

      {/* Quick Gaming Callout Bar */}
      <div className="p-4 rounded-2xl bg-purple-900/20 border border-purple-500/30 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300">
            <Gamepad2 size={20} />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">E-Sports Championship Arenas Included</span>
            <span className="text-[11px] text-gray-300">BGMI, Free Fire, and Valorant tournaments with live projected LAN streaming.</span>
          </div>
        </div>
        <button
          onClick={() => setSubCategoryFilter('gaming')}
          className="px-4 py-2 rounded-xl bg-purple-500/30 hover:bg-purple-500/40 text-purple-200 border border-purple-400/40 text-xs font-semibold transition-all shrink-0 cursor-pointer"
        >
          View E-Sports (3) →
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 rounded-2xl mb-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search cultural events (e.g. Battle of Bands, BGMI)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-pink-400"
          />
        </div>

        {/* Subcategory Pills */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSubCategoryFilter(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                subCategoryFilter === c.id
                  ? 'bg-pink-500/20 text-pink-300 border-pink-500/50 shadow-sm'
                  : 'text-gray-400 bg-white/5 hover:text-white border-white/5'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* 13 Cultural Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl border border-white/10">
          <p className="text-gray-400 text-sm">No cultural events matched your filter criteria.</p>
          <button
            onClick={() => { setSearchQuery(''); setSubCategoryFilter('all'); }}
            className="mt-3 text-xs text-pink-400 underline font-semibold"
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

