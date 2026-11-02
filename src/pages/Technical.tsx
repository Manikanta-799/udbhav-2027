import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code2, Search, Cpu, Terminal, Sparkles, Lightbulb } from 'lucide-react';
import { technicalEvents } from '@/data/events';
import EventCard from '@/components/EventCard';

export default function Technical() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return technicalEvents.filter((ev) =>
      ev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

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
      <div className="relative rounded-3xl p-8 sm:p-12 mb-10 overflow-hidden border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-midnight shadow-[0_0_50px_rgba(0,240,255,0.15)] text-center">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_25px_rgba(0,240,255,0.3)]">
            <Code2 size={34} />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-2">
            Technical / <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">Innovation Hub</span>
          </h1>

          <p className="text-sm sm:text-base font-semibold text-cyan-300/80 tracking-widest uppercase mb-4">
            Innovate • Code • Pioneer
          </p>

          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Harnessing engineering ingenuity at Autonomous VJIT. 4 signature innovation events designed for developers, researchers, circuit designers, and startup ideators.
          </p>
        </div>
      </div>

      {/* Innovation Highlights Pill Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-4 rounded-xl border border-cyan-500/20 flex items-center gap-3">
          <Terminal size={22} className="text-cyan-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block">Algorithmic Competitive Coding</span>
            <span className="text-gray-400">Real-time leaderboard & stress-testing engines.</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-cyan-500/20 flex items-center gap-3">
          <Cpu size={22} className="text-cyan-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block">Department Specific Hackathons</span>
            <span className="text-gray-400">CSE, ECE, EEE, Mechanical & Civil tracks.</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-cyan-500/20 flex items-center gap-3">
          <Lightbulb size={22} className="text-cyan-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block">Project & Hardware Expo</span>
            <span className="text-gray-400">Jury evaluation with incubation mentorship.</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4 rounded-2xl mb-8 border border-white/10 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search tech events (Codeathon, Ideathon, Expo)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>
        <span className="text-xs font-mono text-cyan-400 hidden sm:block">
          {filteredEvents.length} Innovation Tracks
        </span>
      </div>

      {/* 4 Technical Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}

