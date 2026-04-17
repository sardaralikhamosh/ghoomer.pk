import React from 'react';
import { X, ChevronDown, Star, Clock, Users, Globe, Award, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export interface FilterState {
  priceRange: [number, number];
  rating: number;
  duration: [number, number];
  difficulty: string[];
  groupSize: string[];
  languages: string[];
  certifications: string[];
  sortBy: string;
}

interface AdvancedFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
  type: 'guides' | 'adventures';
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ filters, onChange, isOpen, onClose, type }) => {
  const difficulties = ['Easy', 'Moderate', 'Challenging', 'Extreme'];
  const groupSizes = ['Solo', 'Small Group', 'Large Group'];
  const languages = ['English', 'Urdu', 'Burushaski', 'Balti', 'Shina', 'Khowar', 'German'];
  const certifications = ['IFMGA Certified', 'First Aid Responder', 'National Guide License', 'Wilderness First Aid', 'High Altitude Specialist', 'Rescue Diver'];
  const sortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Rating: High to Low', value: 'rating_desc' },
    { label: 'Popularity', value: 'popularity' },
  ];

  const handleToggle = (key: keyof FilterState, value: string) => {
    const current = filters[key] as string[];
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-950 z-[101] shadow-2xl overflow-y-auto custom-scrollbar"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Filters</h2>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <X size={24} className="text-slate-500" />
                </button>
              </div>

              <div className="space-y-10">
                {/* Sort By */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Sort By</label>
                  <div className="grid grid-cols-1 gap-2">
                    {sortOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => onChange({ ...filters, sortBy: opt.value })}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl text-sm font-bold text-left transition-all border",
                          filters.sortBy === opt.value
                            ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-100 dark:shadow-none"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-sky-200"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Price Range</label>
                    <span className="text-xs font-bold text-sky-500">${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="number"
                        value={filters.priceRange[0]}
                        onChange={(e) => onChange({ ...filters, priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]] })}
                        className="w-full pl-8 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg text-sm font-bold outline-none focus:border-sky-500"
                        placeholder="Min"
                      />
                    </div>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="number"
                        value={filters.priceRange[1]}
                        onChange={(e) => onChange({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value) || 0] })}
                        className="w-full pl-8 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg text-sm font-bold outline-none focus:border-sky-500"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Minimum Rating</label>
                  <div className="flex gap-2">
                    {[0, 3, 3.5, 4, 4.5].map(r => (
                      <button
                        key={r}
                        onClick={() => onChange({ ...filters, rating: r })}
                        className={cn(
                          "flex-1 py-2 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1",
                          filters.rating === r
                            ? "bg-amber-500 border-amber-500 text-white"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500"
                        )}
                      >
                        {r === 0 ? 'Any' : <><Star size={12} fill={filters.rating === r ? "currentColor" : "none"} /> {r}+</>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration (Adventures only) */}
                {type === 'adventures' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Duration (Days)</label>
                      <span className="text-xs font-bold text-sky-500">{filters.duration[0]} - {filters.duration[1]} Days</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        value={filters.duration[0]}
                        onChange={(e) => onChange({ ...filters, duration: [parseInt(e.target.value) || 0, filters.duration[1]] })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg text-sm font-bold outline-none focus:border-sky-500"
                        placeholder="Min Days"
                      />
                      <input
                        type="number"
                        value={filters.duration[1]}
                        onChange={(e) => onChange({ ...filters, duration: [filters.duration[0], parseInt(e.target.value) || 0] })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg text-sm font-bold outline-none focus:border-sky-500"
                        placeholder="Max Days"
                      />
                    </div>
                  </div>
                )}

                {/* Difficulty */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Difficulty</label>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map(d => (
                      <button
                        key={d}
                        onClick={() => handleToggle('difficulty', d)}
                        className={cn(
                          "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
                          filters.difficulty.includes(d)
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-300"
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Group Size */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Group Size</label>
                  <div className="flex flex-wrap gap-2">
                    {groupSizes.map(s => (
                      <button
                        key={s}
                        onClick={() => handleToggle('groupSize', s)}
                        className={cn(
                          "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
                          filters.groupSize.includes(s)
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-300"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map(l => (
                      <button
                        key={l}
                        onClick={() => handleToggle('languages', l)}
                        className={cn(
                          "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
                          filters.languages.includes(l)
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-300"
                        )}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Certifications</label>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map(c => (
                      <button
                        key={c}
                        onClick={() => handleToggle('certifications', c)}
                        className={cn(
                          "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
                          filters.certifications.includes(c)
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-300"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                <button
                  onClick={() => onChange({
                    priceRange: [0, 2000],
                    rating: 0,
                    duration: [0, 30],
                    difficulty: [],
                    groupSize: [],
                    languages: [],
                    certifications: [],
                    sortBy: 'relevance'
                  })}
                  className="flex-1 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={onClose}
                  className="flex-[2] py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-sky-100 dark:shadow-none transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
