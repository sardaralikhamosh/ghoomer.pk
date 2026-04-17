import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Search, MapPin, Calendar, Users, Star, ArrowRight, Zap, ShieldCheck, Heart, Mountain, Compass, Camera, Music, Utensils, Tent } from 'lucide-react';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { ParallaxSection } from '../components/common/ParallaxSection';
import { GuideCard } from '../components/common/GuideCard';
import { GUIDES, ADVENTURES, TESTIMONIALS } from '../data/sampleData';
import { LOCAL_EXPERIENCES, getFeaturedExperiences } from '../data/experiences';
import { ExperienceCard } from '../components/common/ExperienceCard';
import { useCurrency } from '../context/CurrencyContext';

export const HomePage: React.FC = () => {
  const { formatPrice } = useCurrency();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [searchQuery, setSearchQuery] = useState({
    location: '',
    date: '',
    guests: '1 Guest',
    activity: 'All Activities'
  });

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-900 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1920&q=90" 
            className="w-full h-full object-cover scale-110" 
            alt="Nature mountains" 
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: Math.random() * 1000, x: Math.random() * 1000, opacity: 0 }}
              animate={{ 
                y: [Math.random() * 1000, Math.random() * 1000],
                x: [Math.random() * 1000, Math.random() * 1000],
                opacity: [0.2, 0.5, 0.2],
                rotate: [0, 360]
              }}
              transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, ease: 'linear' }}
              className="absolute text-4xl"
            >
              🏔️
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ opacity }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest mb-8">
              Pakistan's Premier Adventure Platform
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white font-display mb-8 leading-[0.85] tracking-tighter drop-shadow-2xl">
              EXPLORE THE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-400">UNEXPLORED</span>
            </h1>
            <p className="text-white/80 text-lg md:text-2xl font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
              Connect with verified local experts and experience the raw, untouched beauty of the Karakoram and Himalayas.
            </p>

            {/* Search Box */}
            <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 p-2 rounded-[32px] shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <MapPin className="text-sky-400 group-hover:scale-110 transition-transform" size={20} />
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Location</p>
                    <input 
                      type="text" 
                      placeholder="Where to?" 
                      className="bg-transparent border-none outline-none text-white font-bold text-sm w-full placeholder:text-white/60"
                      value={searchQuery.location}
                      onChange={(e) => setSearchQuery({...searchQuery, location: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <Calendar className="text-emerald-400 group-hover:scale-110 transition-transform" size={20} />
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Date</p>
                    <input 
                      type="text" 
                      placeholder="Add dates" 
                      className="bg-transparent border-none outline-none text-white font-bold text-sm w-full placeholder:text-white/60"
                      value={searchQuery.date}
                      onChange={(e) => setSearchQuery({...searchQuery, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <Users className="text-amber-400 group-hover:scale-110 transition-transform" size={20} />
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Guests</p>
                    <p className="text-white font-bold text-sm">1 Guest</p>
                  </div>
                </div>
                <button className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 group">
                  <Search size={20} className="group-hover:scale-110 transition-transform" />
                  Search Guides
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white dark:bg-slate-950 relative z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Verified Guides', value: 450, suffix: '+', icon: <ShieldCheck /> },
              { label: 'Happy Travelers', value: 12, suffix: 'K+', icon: <Heart /> },
              { label: 'Adventures', value: 85, suffix: '+', icon: <Compass /> },
              { label: 'Avg Rating', value: 4.9, suffix: '/5', icon: <Star /> },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-sky-500 mx-auto mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-black/5">
                  {React.cloneElement(stat.icon as React.ReactElement, { size: 32 })}
                </div>
                <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 font-display">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Hand-picked Experts</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
                MEET OUR<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">VERIFIED GUIDES</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                Connect with professionals who offer 100% private and customizable experiences tailored to your dreams.
              </p>
            </div>
            <button className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2 group">
              View All Guides
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GUIDES.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* Local Experiences Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="text-emerald-600 font-black text-xs uppercase tracking-widest mb-4 block">Authentic Moments</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
                LOCAL<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">EXPERIENCES</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                Book unique micro-activities hosted by local students. From cooking traditional meals to hidden photography spots.
              </p>
            </div>
            <button className="px-8 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2 group">
              Explore All Experiences
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFeaturedExperiences(3).map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </section>

      {/* GigaByte Concierge Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 z-0" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 z-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="w-[800px] h-[800px] border-[40px] border-white/5 rounded-full flex items-center justify-center"
          >
            <div className="w-[600px] h-[600px] border-[20px] border-white/5 rounded-full" />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-black uppercase tracking-widest mb-8">
                <Zap size={16} className="fill-sky-400" />
                GigaByte Concierge
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                WE PLAN,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">YOU EXPLORE</span>
              </h2>
              <p className="text-white/70 text-xl font-medium mb-12 leading-relaxed">
                Don't have time to research? Our GigaByte Concierge service creates a complete, personalized itinerary including guides, transport, and stays.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  { title: 'Custom Itinerary', desc: 'Tailored to your pace and interests' },
                  { title: '24/7 Support', desc: 'On-ground assistance anytime' },
                  { title: 'Verified Stays', desc: 'Hand-picked local accommodations' },
                  { title: 'Private Transport', desc: 'Comfortable 4x4 vehicles' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
                      <ShieldCheck size={14} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="px-10 py-5 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-sky-500/40 transition-all flex items-center gap-3 group">
                Get Your Free Plan
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 bg-white/10 backdrop-blur-3xl border border-white/20 p-8 rounded-[48px] shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                    <Zap size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">GigaByte Pro</h3>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Premium Planning</p>
                  </div>
                </div>
                
                <div className="space-y-6 mb-10">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="h-12 bg-white/5 rounded-xl flex items-center px-4 gap-4">
                      <div className="w-2 h-2 rounded-full bg-sky-500" />
                      <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/60 text-sm font-bold">Estimated Cost</span>
                    <span className="text-2xl font-black text-white">{formatPrice(850)}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '75%' }}
                      className="h-full bg-gradient-to-r from-sky-500 to-emerald-500" 
                    />
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-500/20 blur-[100px] rounded-full" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Choose Your Vibe</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
              ADVENTURE FOR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">EVERYONE</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { label: 'Trekking', icon: <Mountain />, color: 'bg-sky-500' },
              { label: 'Photography', icon: <Camera />, color: 'bg-emerald-500' },
              { label: 'Cultural', icon: <Users />, color: 'bg-amber-500' },
              { label: 'Camping', icon: <Tent />, color: 'bg-rose-500' },
              { label: 'Food', icon: <Utensils />, color: 'bg-indigo-500' },
              { label: 'Music', icon: <Music />, color: 'bg-violet-500' },
            ].map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="bg-slate-50 dark:bg-slate-900 rounded-[32px] p-8 text-center border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5">
                  <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:rotate-12 transition-transform`}>
                    {React.cloneElement(cat.icon as React.ReactElement, { size: 32 })}
                  </div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">{cat.label}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=90" 
            className="w-full h-full object-cover" 
            alt="Mountain range" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <ParallaxSection offset={30}>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
              READY TO START<br />
              <span className="text-sky-400">YOUR ADVENTURE?</span>
            </h2>
            <p className="text-white/60 text-xl font-medium max-w-2xl mx-auto mb-12">
              Join thousands of travelers who have explored the hidden gems of Pakistan with Ghoomer.pk.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-10 py-5 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-sky-500/40 transition-all flex items-center gap-3 group">
                Find a Guide Now
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-2xl font-black text-lg transition-all">
                Become a Guide
              </button>
            </div>
          </ParallaxSection>
        </div>
      </section>
    </div>
  );
};
