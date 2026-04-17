import React from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export const GigaBytePage: React.FC = () => {
  const { formatPrice } = useCurrency();

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-black uppercase tracking-widest mb-8">
            <Zap size={16} className="fill-sky-400" />
            GigaByte Concierge
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
            WE PLAN,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">YOU EXPLORE</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            Don't have time to research? Our GigaByte Concierge service creates a complete, personalized itinerary including guides, transport, and stays.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {[
            { 
              title: 'Basic Plan', 
              price: '49', 
              desc: 'Perfect for solo travelers who need a quick itinerary.',
              features: ['Custom Itinerary', 'Guide Recommendations', 'Transport Map', '24/7 Support']
            },
            { 
              title: 'Pro Plan', 
              price: '99', 
              desc: 'Our most popular plan for families and small groups.',
              features: ['Everything in Basic', 'Verified Stays', 'Private Transport Booking', 'Local SIM Card', 'Emergency Evacuation Plan'],
              popular: true
            },
            { 
              title: 'Elite Plan', 
              price: '199', 
              desc: 'The ultimate luxury experience for large groups.',
              features: ['Everything in Pro', 'Dedicated Concierge', 'Photography Service', 'Cultural Workshops', 'VIP Airport Transfer']
            },
          ].map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`
                p-10 rounded-[48px] border transition-all duration-500 relative
                ${plan.popular 
                  ? 'bg-slate-900 dark:bg-slate-900 border-sky-500 shadow-2xl shadow-sky-500/20' 
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800'}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className={`text-2xl font-black mb-2 ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{plan.title}</h3>
              <p className={`text-sm font-medium mb-8 ${plan.popular ? 'text-white/60' : 'text-slate-500 dark:text-slate-400'}`}>{plan.desc}</p>
              <div className="mb-10">
                <span className={`text-5xl font-black ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{formatPrice(Number(plan.price))}</span>
                <span className={`text-sm font-bold ml-1 ${plan.popular ? 'text-white/40' : 'text-slate-400'}`}>/ TRIP</span>
              </div>
              <ul className="space-y-4 mb-12">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className={plan.popular ? 'text-sky-400' : 'text-emerald-500'} />
                    <span className={`text-sm font-bold ${plan.popular ? 'text-white/80' : 'text-slate-600 dark:text-slate-300'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`
                w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all
                ${plan.popular 
                  ? 'bg-sky-500 hover:bg-sky-600 text-white shadow-xl shadow-sky-500/20' 
                  : 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white'}
              `}>
                Choose {plan.title}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
