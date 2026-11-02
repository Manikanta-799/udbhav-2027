import { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import type { EventCategory } from '@/data/events';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: EventCategory | 'all';
  onFilterChange: (filter: EventCategory | 'all') => void;
  resultCount: number;
}

const filters: { value: EventCategory | 'all'; label: string; activeClass: string }[] = [
  { value: 'all', label: 'All Arenas', activeClass: 'bg-white/15 text-white border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]' },
  { value: 'sports', label: 'Sports', activeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-[0_0_15px_rgba(255,140,0,0.3)]' },
  { value: 'cultural', label: 'Cultural', activeClass: 'bg-pink-500/20 text-pink-400 border-pink-500/50 shadow-[0_0_15px_rgba(255,20,147,0.3)]' },
  { value: 'technical', label: 'Technical', activeClass: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]' },
];

export default function SearchFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  resultCount,
}: SearchFiltersProps) {
  const [isFocused, setIsFocused] = useState(false);

  const hasActiveFilters = searchQuery.trim() !== '' || activeFilter !== 'all';

  const clearFilters = () => {
    onSearchChange('');
    onFilterChange('all');
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search
          size={20}
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
            isFocused ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]' : 'text-gray-500'
          }`}
        />
        <input
          type="search"
          placeholder="Search by event name, rules, or keyword (e.g. Cricket, Valorant, Codeathon)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 focus:bg-white/[0.08] transition-all backdrop-blur-md shadow-inner"
          aria-label="Search events"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Clear search text"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter Tabs & Count */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mr-1">
            <Filter size={14} className="text-cyan-400" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">Filter:</span>
          </div>
          {filters.map((filter) => {
            const isSelected = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => onFilterChange(filter.value)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border ${
                  isSelected
                    ? filter.activeClass
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border-white/5'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Counter and Clear button */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-gray-400 font-mono">
            Showing <span className="text-cyan-400 font-bold">{resultCount}</span> event{resultCount !== 1 ? 's' : ''}
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

