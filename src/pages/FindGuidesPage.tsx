import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, MapPin, Star, ShieldCheck, X, ChevronDown, Map as MapIcon, SlidersHorizontal } from 'lucide-react';
import { GuideCard } from '../components/common/GuideCard';
import { GUIDES, type Guide } from '../data/sampleData';
import { AdvancedFilters, FilterState } from '../components/search/AdvancedFilters';
import { MapSearch } from '../components/search/MapSearch';

export const FindGuidesPage: React.FC<{ onSelectGuide: (guide: Guide) => void }> = ({ onSelectGuide }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState('All');
  const [selectedDay, setSelectedDay] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    priceRange: [0, 200],
    rating: 0,
    duration: [0, 30],
    difficulty: [],
    groupSize: [],
    languages: [],
    certifications: [],
    sortBy: 'relevance'
  });

  const locations = useMemo(() => ['All', ...Array.from(new Set(GUIDES.map(g => g.location)))], []);
  const activities = useMemo(() => ['All', ...Array.from(new Set(GUIDES.flatMap(g => g.specialties)))], []);
  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredGuides = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    // 1. Filter by basic and advanced criteria
    let results = GUIDES.filter(guide => {
      const matchesLocation = selectedLocation === 'All' || guide.location === selectedLocation;
      const matchesActivity = selectedActivity === 'All' || guide.specialties.includes(selectedActivity);
      const matchesDay = selectedDay === 'All' || guide.availability.includes(selectedDay);
      const matchesRating = guide.rating >= advancedFilters.rating;
      const matchesPrice = guide.pricePerDay >= advancedFilters.priceRange[0] && guide.pricePerDay <= advancedFilters.priceRange[1];
      const matchesLanguages = advancedFilters.languages.length === 0 || advancedFilters.languages.some(l => guide.languages.includes(l));
      const matchesCerts = advancedFilters.certifications.length === 0 || advancedFilters.certifications.some(c => guide.certifications.includes(c));

      return matchesLocation && matchesActivity && matchesDay && matchesRating && matchesPrice && matchesLanguages && matchesCerts;
    });

    // 2. Apply Sorting (if not relevance)
    if (advancedFilters.sortBy !== 'relevance') {
      results = [...results].sort((a, b) => {
        switch (advancedFilters.sortBy) {
          case 'price_asc': return a.pricePerDay - b.pricePerDay;
          case 'price_desc': return b.pricePerDay - a.pricePerDay;
          case 'rating_desc': return b.rating - a.rating;
          case 'popularity': return b.popularity - a.popularity;
          default: return 0;
        }
      });
    }

    // 3. If there's a search query, filter and sort by relevance
    if (query) {
      const queryTokens = query.split(/\s+/).filter(token => token.length > 0);
      
      results = results
        .map(guide => {
          let score = 0;
          const name = guide.name.toLowerCase();
          const location = guide.location.toLowerCase();
          const specialties = guide.specialties.map(s => s.toLowerCase());

          // 1. Exact Full Query Matches (Highest Priority)
          if (name === query) score += 10000;
          if (location === query) score += 8000;
          if (specialties.some(s => s === query)) score += 6000;

          // 2. Word Boundary / Starts With Matches for Full Query
          if (name.startsWith(query)) score += 4000;
          else if (name.includes(` ${query}`)) score += 3500;
          if (location.startsWith(query)) score += 3000;
          if (specialties.some(s => s.startsWith(query))) score += 2500;
          else if (specialties.some(s => s.includes(` ${query}`))) score += 2000;

          // 3. Partial Matches for Full Query
          if (name.includes(query)) score += 1000;
          if (location.includes(query)) score += 800;
          if (specialties.some(s => s.includes(query))) score += 600;

          // 4. Token-based matching
          queryTokens.forEach(token => {
            if (token.length < 2) return;
            if (name === token) score += 500;
            else if (name.startsWith(token)) score += 250;
            else if (name.includes(token)) score += 100;
            if (location === token) score += 400;
            else if (location.startsWith(token)) score += 200;
            else if (location.includes(token)) score += 80;
            specialties.forEach(s => {
              if (s === token) score += 300;
              else if (s.startsWith(token)) score += 150;
              else if (s.includes(token)) score += 60;
            });
          });

          // 5. Bonus for matching multiple tokens
          if (queryTokens.length > 1) {
            const nameMatchCount = queryTokens.filter(t => name.includes(t)).length;
            const locationMatchCount = queryTokens.filter(t => location.includes(t)).length;
            const specialtyMatchCount = queryTokens.filter(t => specialties.some(s => s.includes(t))).length;
            score += nameMatchCount * 200;
            score += locationMatchCount * 150;
            score += specialtyMatchCount * 100;
            if (nameMatchCount === queryTokens.length) score += 1000;
            if (locationMatchCount === queryTokens.length) score += 800;
          }

          return { guide, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.guide);
    }

    return results;
  }, [searchQuery, selectedLocation, selectedActivity, selectedDay, advancedFilters]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All');
    setSelectedActivity('All');
    setSelectedDay('All');
    setAdvancedFilters({
      priceRange: [0, 200],
      rating: 0,
      duration: [0, 30],
      difficulty: [],
      groupSize: [],
      languages: [],
      certifications: [],
      sortBy: 'relevance'
    });
  };

  const activeFilterCount = [
    selectedLocation !== 'All',
    selectedActivity !== 'All',
    selectedDay !== 'All',
    advancedFilters.rating > 0,
    advancedFilters.priceRange[0] > 0 || advancedFilters.priceRange[1] < 200,
    advancedFilters.languages.length > 0,
    advancedFilters.certifications.length > 0,
    advancedFilters.difficulty.length > 0,
    advancedFilters.groupSize.length > 0
  ].filter(Boolean).length;

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Verified Experts</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
              FIND YOUR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">LOCAL GUIDE</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-xl">
              Connect with certified local experts who know the hidden gems of Pakistan. 
              Filter by destination, activity, availability, or rating.
            </p>
          </div>
          
            <div className="w-full flex flex-col gap-6">
              {/* Enhanced Search & Filter Bar */}
              <div className="bg-white dark:bg-slate-900 rounded-[32px] p-2 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-stretch md:items-center gap-2">
                {/* Search Input */}
                <div className="flex-1 flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 group">
                  <Search className="text-slate-400 mr-3 group-focus-within:text-sky-500 transition-colors" size={20} />
                  <div className="flex-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Who</label>
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name or skill..." 
                      className="w-full bg-transparent outline-none text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-300"
                    />
                  </div>
                </div>

                {/* Destination Filter */}
                <div className="flex-1 flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 group relative">
                  <MapPin className="text-slate-400 mr-3 group-hover:text-sky-500 transition-colors" size={20} />
                  <div className="flex-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Where</label>
                    <select 
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm font-bold text-slate-900 dark:text-white appearance-none cursor-pointer"
                    >
                      {locations.map(loc => <option key={loc} value={loc} className="dark:bg-slate-900">{loc === 'All' ? 'All Destinations' : loc}</option>)}
                    </select>
                  </div>
                  <ChevronDown size={14} className="text-slate-300 ml-2" />
                </div>

                {/* Activity Filter */}
                <div className="flex-1 flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 group relative">
                  <Filter className="text-slate-400 mr-3 group-hover:text-sky-500 transition-colors" size={20} />
                  <div className="flex-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Activity</label>
                    <select 
                      value={selectedActivity}
                      onChange={(e) => setSelectedActivity(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm font-bold text-slate-900 dark:text-white appearance-none cursor-pointer"
                    >
                      {activities.map(spec => <option key={spec} value={spec} className="dark:bg-slate-900">{spec === 'All' ? 'All Activities' : spec}</option>)}
                    </select>
                  </div>
                  <ChevronDown size={14} className="text-slate-300 ml-2" />
                </div>

                {/* Availability Filter */}
                <div className="flex-1 flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 group relative">
                  <ShieldCheck className="text-slate-400 mr-3 group-hover:text-sky-500 transition-colors" size={20} />
                  <div className="flex-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">When</label>
                    <select 
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm font-bold text-slate-900 dark:text-white appearance-none cursor-pointer"
                    >
                      {days.map(day => <option key={day} value={day} className="dark:bg-slate-900">{day === 'All' ? 'Any Day' : day}</option>)}
                    </select>
                  </div>
                  <ChevronDown size={14} className="text-slate-300 ml-2" />
                </div>

                {/* Rating Filter (Replaced with Advanced Filter Trigger) */}
                <div className="flex-1 flex items-center px-6 py-3 group relative">
                  <SlidersHorizontal className="text-slate-400 mr-3 group-hover:text-sky-500 transition-colors" size={20} />
                  <div className="flex-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">More</label>
                    <button 
                      onClick={() => setIsFilterOpen(true)}
                      className="w-full text-left text-sm font-bold text-slate-900 dark:text-white"
                    >
                      Advanced Filters
                    </button>
                  </div>
                  <ChevronDown size={14} className="text-slate-300 ml-2" />
                </div>

                {/* Map Toggle Button */}
                <button 
                  onClick={() => setIsMapOpen(true)}
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 p-5 md:rounded-2xl flex items-center justify-center transition-all"
                >
                  <MapIcon size={24} />
                </button>

                {/* Search Button */}
                <button 
                  className="bg-sky-500 hover:bg-sky-600 text-white p-5 md:rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-sky-200 dark:shadow-none"
                >
                  <Search size={24} />
                </button>
              </div>

              {/* Advanced Filters Modal */}
              <AdvancedFilters 
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={advancedFilters}
                onChange={setAdvancedFilters}
                type="guides"
              />

              {/* Map Search Modal */}
              <MapSearch 
                isOpen={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                items={filteredGuides.map(g => ({
                  id: g.id,
                  name: g.name,
                  location: g.location,
                  coordinates: g.coordinates!,
                  price: g.pricePerDay,
                  rating: g.rating,
                  image: g.image
                }))}
                onSelectItem={(id) => {
                  const guide = GUIDES.find(g => g.id === id);
                  if (guide) onSelectGuide(guide);
                }}
              />

              {/* Active Filters & Reset */}
              <div className="flex items-center justify-between px-4">
                <div className="flex flex-wrap gap-2">
                  {activeFilterCount > 0 && (
                    <button 
                      onClick={clearFilters}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 transition-all flex items-center gap-2"
                    >
                      <X size={12} /> Reset Filters ({activeFilterCount})
                    </button>
                  )}
                  {['Trekking', 'Climbing', 'Cultural Tours', 'Photography'].map((activity) => (
                    <button
                      key={activity}
                      onClick={() => setSelectedActivity(selectedActivity === activity ? 'All' : activity)}
                      className={cn(
                        "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
                        selectedActivity === activity
                          ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-100"
                          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-sky-200 hover:text-sky-500"
                      )}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
        </div>
        {/* Results */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-sm font-bold text-slate-500">
              Showing <span className="text-slate-900 dark:text-white">{filteredGuides.length}</span> verified guides
            </p>
            {advancedFilters.sortBy === 'relevance' && searchQuery && filteredGuides.length > 0 && (
              <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                Sorted by Relevance
              </span>
            )}
            {advancedFilters.sortBy !== 'relevance' && (
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                Sorted by {advancedFilters.sortBy.replace('_', ' ')}
              </span>
            )}
          </div>
        </div>

        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredGuides.map((guide) => (
                <motion.div
                  key={guide.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <GuideCard 
                    guide={guide} 
                    onSelect={() => onSelectGuide(guide)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-24 text-center bg-slate-50 dark:bg-slate-900/30 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No guides found</h3>
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

// Helper for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
