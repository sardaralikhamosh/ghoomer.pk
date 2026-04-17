import React from 'react';
import { motion } from 'motion/react';
import { Search, Users, MessageSquare, CheckCircle2, ShieldCheck, Heart, Zap } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Simple Process</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
            HOW IT<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">WORKS</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            Your journey to the heart of Pakistan in three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mb-32">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0" />
          
          {[
            {
              step: "01",
              title: "Find Your Guide",
              desc: "Browse our verified local experts or search for a specific valley you want to explore.",
              icon: <Users className="text-white" />
            },
            {
              step: "02",
              title: "Connect & Customize",
              desc: "Message your local expert to customize your itinerary and ask any questions.",
              icon: <MessageSquare className="text-white" />
            },
            {
              step: "03",
              title: "Book & Explore",
              desc: "Securely book your tour and get ready for an unforgettable local experience.",
              icon: <CheckCircle2 className="text-white" />
            }
          ].map((item, i) => (
            <div key={i} className="relative z-10 text-center group">
              <div className="w-24 h-24 bg-sky-500 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-sky-500/20 group-hover:rotate-6 transition-transform duration-300">
                {React.cloneElement(item.icon as React.ReactElement, { size: 40 })}
              </div>
              <div className="inline-block px-4 py-1 rounded-full bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-black mb-4 uppercase tracking-widest">STEP {item.step}</div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Verified Experts', desc: 'Every guide on our platform is personally interviewed and verified.', icon: <ShieldCheck /> },
            { title: 'Safe Payments', desc: 'Your money is held securely until your trip is successfully completed.', icon: <Zap /> },
            { title: 'Local Impact', desc: '100% of your booking goes directly to supporting local communities.', icon: <Heart /> },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[32px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-sky-500 mb-6 shadow-xl shadow-black/5">
                {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{item.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
