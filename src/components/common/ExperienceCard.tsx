import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Users, Star, ArrowRight, Shield } from 'lucide-react';
import { LocalExperience } from '../../data/experiences';
import { useCurrency } from '../../context/CurrencyContext';

interface ExperienceCardProps {
  experience: LocalExperience;
  onSelect?: (experience: LocalExperience) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onSelect }) => {
  const { formatPrice } = useCurrency();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={() => onSelect?.(experience)}
      className="group bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest">
            {experience.category}
          </span>
          {experience.difficulty === 'Easy' && (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              Easy
            </span>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-1 text-white">
            <Star className="fill-amber-400 text-amber-400" size={14} />
            <span className="text-sm font-bold">{experience.rating}</span>
            <span className="text-white/60 text-xs">({experience.reviewCount})</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-sky-500 text-white text-xs font-black uppercase tracking-widest">
            {formatPrice(experience.pricePerPersonPKR)}
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest mb-3">
          <MapPin size={12} />
          {experience.district}
        </div>
        
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-sky-500 transition-colors">
          {experience.title}
        </h3>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6 line-clamp-2">
          {experience.subtitle}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock size={16} />
            <span className="text-xs font-bold">{experience.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Users size={16} />
            <span className="text-xs font-bold">Up to {experience.maxGroupSize}</span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <Shield size={16} />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Guide</span>
          </div>
          <button className="text-sky-500 font-black text-xs uppercase tracking-widest flex items-center gap-2 group/btn">
            Details
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
