import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MapPin } from 'lucide-react';
import { LOCAL_EXPERIENCES, EXPERIENCE_CATEGORIES, ExperienceCategory, LocalExperience } from '../data/experiences';
import { ExperienceCard } from '../components/common/ExperienceCard';

export const ExperiencesPage: React.FC<{ onSelect: (experience: LocalExperience) => void }> = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExperiences = LOCAL_EXPERIENCES.filter(exp => {
    const matchesCategory = selectedCategory === 'All' || exp.category === selectedCategory;
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         exp.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-black text-xs uppercase tracking-widest mb-4 block">Authentic Moments</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
            LOCAL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">EXPERIENCES</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            Book unique micro-activities hosted by local students. Experience the real Pakistan through the eyes of its people.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-12 space-y-8">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by activity, location, or keyword..."
              className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                selectedCategory === 'All'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All
            </button>
            {EXPERIENCE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((experience) => (
              <ExperienceCard 
                key={experience.id} 
                experience={experience} 
                onSelect={onSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
              <Filter size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No experiences found</h3>
            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};
