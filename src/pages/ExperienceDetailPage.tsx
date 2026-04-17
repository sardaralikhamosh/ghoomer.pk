import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, Clock, Users, Star, ArrowLeft, Shield, 
  CheckCircle2, Info, Calendar, Share2, Heart,
  Utensils, Camera, Mountain, Music, BookOpen,
  Coffee, Sparkles, Languages
} from 'lucide-react';
import { LocalExperience } from '../data/experiences';
import { cn } from '../lib/utils';
import { useCurrency } from '../context/CurrencyContext';

interface ExperienceDetailPageProps {
  experience: LocalExperience;
  onBack: () => void;
  onBook: (experience: LocalExperience) => void;
}

export const ExperienceDetailPage: React.FC<ExperienceDetailPageProps> = ({ 
  experience, 
  onBack,
  onBook
}) => {
  const { formatPrice } = useCurrency();

  return (
    <div className="pt-24 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Experiences</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Images & Content */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[16/10] rounded-[40px] overflow-hidden shadow-2xl"
            >
              <img 
                src={experience.image} 
                alt={experience.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 flex gap-3">
                <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-black uppercase tracking-widest">
                  {experience.category}
                </span>
                <span className="px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest">
                  {experience.difficulty}
                </span>
              </div>
            </motion.div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-black uppercase tracking-widest mb-4">
                  <MapPin size={16} />
                  {experience.district}, Pakistan
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
                  {experience.title}
                </h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 font-medium italic">
                  "{experience.subtitle}"
                </p>
              </div>

              <div className="flex flex-wrap gap-8 py-8 border-y border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{experience.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Group Size</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Up to {experience.maxGroupSize} people</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                    <Star size={24} className="text-amber-400 fill-amber-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{experience.rating} ({experience.reviewCount} reviews)</p>
                  </div>
                </div>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">About this experience</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                  {experience.description}
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">What you'll do</h3>
                <div className="grid grid-cols-1 gap-4">
                  {experience.whatYoullDo.map((step, i) => (
                    <div key={i} className="flex gap-4 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {experience.localLanguagePhrase && (
                <div className="p-8 rounded-[32px] bg-sky-500/5 border border-sky-500/10 space-y-4">
                  <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-black uppercase tracking-widest">
                    <Languages size={16} />
                    Learn the Lingo ({experience.localLanguage})
                  </div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white italic">
                    {experience.localLanguagePhrase}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Your host will teach you how to say this like a local!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Booking Card & Host Info */}
          <div className="space-y-8">
            <div className="sticky top-32 space-y-8">
              {/* Booking Card */}
              <div className="p-8 rounded-[40px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-black/5">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price per person</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">
                      {formatPrice(experience.pricePerPersonPKR)}
                    </p>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest">
                    Best Value
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-slate-400" />
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Select Date</span>
                    </div>
                    <ArrowLeft size={16} className="text-slate-300 rotate-180" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <Users size={18} className="text-slate-400" />
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">1 Guest</span>
                    </div>
                    <ArrowLeft size={16} className="text-slate-300 rotate-180" />
                  </div>
                </div>

                <button 
                  onClick={() => onBook(experience)}
                  className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 transition-all mb-4"
                >
                  Book this Experience
                </button>

                <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  No payment required yet
                </p>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <span className="text-sm font-medium">Free cancellation up to 24h before</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Shield size={18} className="text-emerald-500" />
                    <span className="text-sm font-medium">Ghoomer Verified Student Host</span>
                  </div>
                </div>
              </div>

              {/* Host Info */}
              <div className="p-8 rounded-[40px] bg-slate-900 text-white shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
                      alt="Host"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center border-2 border-slate-900">
                      <Shield size={12} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Your Host</p>
                    <h4 className="text-xl font-black">Ali Raza</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Student at Karakoram Int. University</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                  "I'm a final year tourism student. I love showing travelers the real Hunza beyond the main roads. Join me for a local perspective!"
                </p>
                <div className="flex gap-4">
                  <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                    Message Host
                  </button>
                  <button className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Insider Tip */}
              <div className="p-8 rounded-[40px] bg-amber-500 text-white shadow-2xl relative overflow-hidden">
                <Sparkles className="absolute -top-4 -right-4 w-24 h-24 text-white/10 rotate-12" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-amber-100 text-[10px] font-black uppercase tracking-widest mb-4">
                    <Info size={16} />
                    Insider Tip
                  </div>
                  <p className="text-lg font-black leading-tight italic">
                    "{experience.insiderTip}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
