import React from 'react';
import { motion } from 'motion/react';
import { Users, ShieldCheck, Zap, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

export const BecomeGuidePage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Partner with Us</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
              BECOME A<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">LOCAL GUIDE</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-12">
              Share your passion for Pakistan with the world. Join our community of verified local experts and grow your business.
            </p>
            
            <div className="space-y-8 mb-12">
              {[
                { title: 'Earn More', desc: 'Keep 90% of your earnings with our transparent pricing model.', icon: <Zap /> },
                { title: 'Get Verified', desc: 'Build trust with travelers through our verification and review system.', icon: <ShieldCheck /> },
                { title: 'Flexible Schedule', desc: 'You decide when and where you want to guide.', icon: <Heart /> },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-sky-500 shrink-0 shadow-xl shadow-black/5">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-black/5">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Apply to Join</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-sky-500 transition-all text-sm font-bold" placeholder="Ali Khan" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-sky-500 transition-all text-sm font-bold" placeholder="ali@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Location</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-sky-500 transition-all text-sm font-bold" placeholder="Hunza Valley" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Experience (Years)</label>
                <input type="number" className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-sky-500 transition-all text-sm font-bold" placeholder="5" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">About You</label>
                <textarea className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-sky-500 transition-all text-sm font-bold min-h-[120px]" placeholder="Tell us about your guiding experience..." />
              </div>
              <button className="w-full py-5 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-sky-500/20 flex items-center justify-center gap-2 group">
                Submit Application
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
