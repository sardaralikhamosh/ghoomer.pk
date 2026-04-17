import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, MapPin, Clock, Star, ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { ADVENTURES } from '../data/sampleData';
import { useCurrency } from '../context/CurrencyContext';
import { DifficultyBadge } from '../components/common/DifficultyBadge';
import { AdvancedFilters, FilterState } from '../components/search/AdvancedFilters';

export const AdventuresPage: React.FC = () => {
  const { formatPrice } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    priceRange: [0, 2000],
    rating: 0,
    duration: [0, 30],
    difficulty: [],
    groupSize: [],
    languages: [],
    certifications: [],
    sortBy: 'relevance'
  });

  const filteredAdventures = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    let results = ADVENTURES.filter(adventure => {
      const matchesSearch = adventure.title.toLowerCase().includes(query) || 
                           adventure.location.toLowerCase().includes(query) ||
                           adventure.description.toLowerCase().includes(query);
      
      const matchesPrice = adventure.price >= advancedFilters.priceRange[0] && adventure.price <= advancedFilters.priceRange[1];
      const matchesDifficulty = advancedFilters.difficulty.length === 0 || advancedFilters.difficulty.includes(adventure.difficulty);
      
      // Parse duration string to number of days
      const durationDays = parseInt(adventure.duration.split(' ')[0]) || 0;
      const matchesDuration = durationDays >= advancedFilters.duration[0] && durationDays <= advancedFilters.duration[1];

      return matchesSearch && matchesPrice && matchesDifficulty && matchesDuration;
    });

    if (advancedFilters.sortBy !== 'relevance') {
      results = [...results].sort((a, b) => {
        switch (advancedFilters.sortBy) {
          case 'price_asc': return a.price - b.price;
          case 'price_desc': return b.price - a.price;
          case 'popularity': return b.popularity - a.popularity;
          default: return 0;
        }
      });
    }

    return results;
  }, [searchQuery, advancedFilters]);

  const clearFilters = () => {
    setSearchQuery('');
    setAdvancedFilters({
      priceRange: [0, 2000],
      rating: 0,
      duration: [0, 30],
      difficulty: [],
      groupSize: [],
      languages: [],
      certifications: [],
      sortBy: 'relevance'
    });
  };

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Unforgettable Journeys</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
            CURATED<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">ADVENTURES</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            Explore our hand-picked list of the most iconic and hidden gems in Pakistan.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-16 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search adventures by name, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="px-8 py-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] text-slate-900 dark:text-white font-bold flex items-center justify-center gap-3 hover:border-sky-500 transition-all shadow-xl shadow-slate-100 dark:shadow-none"
            >
              <SlidersHorizontal size={20} className="text-sky-500" />
              Filters
              {Object.values(advancedFilters).some(v => Array.isArray(v) ? v.length > 0 : v !== 0 && v !== 'relevance') && (
                <span className="w-2 h-2 bg-sky-500 rounded-full" />
              )}
            </button>
          </div>

          {searchQuery && (
            <div className="flex items-center justify-between px-4">
              <p className="text-sm font-bold text-slate-500">
                Found <span className="text-slate-900 dark:text-white">{filteredAdventures.length}</span> adventures for "{searchQuery}"
              </p>
              <button 
                onClick={clearFilters}
                className="text-xs font-black uppercase tracking-widest text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-2"
              >
                <X size={14} /> Clear Search
              </button>
            </div>
          )}
        </div>

        <AdvancedFilters 
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={advancedFilters}
          onChange={setAdvancedFilters}
          type="adventures"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredAdventures.map((adventure) => (
              <motion.div
                key={adventure.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={adventure.image} 
                    alt={adventure.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                  <DifficultyBadge 
                    difficulty={adventure.difficulty} 
                    className="absolute top-4 right-4"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 text-sky-500 text-xs font-bold uppercase tracking-widest mb-2">
                    <MapPin size={12} />
                    {adventure.location}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-sky-500 transition-colors">
                    {adventure.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {adventure.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-bold">
                        <Clock size={14} />
                        {adventure.duration}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-slate-900 dark:text-white">{formatPrice(adventure.price)}</span>
                      <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-widest">PER PERSON</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredAdventures.length === 0 && (
          <div className="py-24 text-center bg-slate-50 dark:bg-slate-900/30 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Compass size={32} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No adventures found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Try adjusting your filters or search query to find what you're looking for.</p>
            <button 
              onClick={clearFilters}
              className="px-8 py-3 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
