import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, ShieldCheck, MessageCircle, ArrowUpRight, Award, TrendingUp } from 'lucide-react';
import { Guide } from '../../data/sampleData';
import { useCurrency } from '../../context/CurrencyContext';

interface GuideCardProps {
  guide: Guide;
  onSelect?: (guide: Guide) => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide, onSelect }) => {
  const { formatPrice } = useCurrency();

  return (
    <motion.div
      whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-sky-500/0 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={guide.image} 
          alt={guide.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
        
        {/* Badge */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest"
        >
          {guide.badge}
        </motion.div>

        {/* Verified Badge */}
        {guide.isVerified && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500 text-white text-[10px] font-bold shadow-lg">
              <ShieldCheck size={12} />
              VERIFIED
            </div>
            {guide.popularity > 100 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-sky-500 text-white text-[10px] font-bold shadow-lg">
                <TrendingUp size={12} />
                POPULAR
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-sky-500 transition-colors">
              {guide.name}
            </h3>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm font-medium">
              <MapPin size={14} className="text-sky-500" />
              {guide.location}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-amber-500 font-black text-lg">
              <Star size={18} className="fill-amber-500" />
              {guide.rating}
            </div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {guide.reviews} REVIEWS
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {guide.specialties.map((spec, i) => (
            <motion.span 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold border border-slate-100 dark:border-slate-700"
            >
              {spec}
            </motion.span>
          ))}
        </div>

        {/* Certifications */}
        {guide.certifications && guide.certifications.length > 0 && (
          <div className="flex items-center gap-2 mb-6 overflow-hidden">
            <Award size={14} className="text-emerald-500 shrink-0" />
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {guide.certifications.map((cert, i) => (
                <span key={i} className="whitespace-nowrap text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-800">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">{formatPrice(guide.pricePerDay)}</span>
            <span className="text-slate-400 text-xs font-bold ml-1">/ DAY</span>
          </div>
          <div className="flex gap-2">
            <button className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-sky-500 hover:text-white transition-all duration-300">
              <MessageCircle size={20} />
            </button>
            <button 
              onClick={() => onSelect?.(guide)}
              className="px-5 py-3 rounded-xl bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-500/20 hover:bg-sky-600 transition-all flex items-center gap-2 group/btn"
            >
              View Profile
              <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
