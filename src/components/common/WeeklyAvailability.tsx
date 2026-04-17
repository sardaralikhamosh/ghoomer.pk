import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface WeeklyAvailabilityProps {
  availability: string[];
}

const DAYS = [
  { full: 'Monday', short: 'Mon' },
  { full: 'Tuesday', short: 'Tue' },
  { full: 'Wednesday', short: 'Wed' },
  { full: 'Thursday', short: 'Thu' },
  { full: 'Friday', short: 'Fri' },
  { full: 'Saturday', short: 'Sat' },
  { full: 'Sunday', short: 'Sun' },
];

export const WeeklyAvailability: React.FC<WeeklyAvailabilityProps> = ({ availability }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {DAYS.map((day) => {
        const isAvailable = availability.includes(day.full) || availability.includes(day.short);
        return (
          <div key={day.full} className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all border-2",
                isAvailable 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm shadow-emerald-100" 
                  : "bg-slate-50 border-slate-100 text-slate-300"
              )}
            >
              {day.short}
            </motion.div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl">
              {isAvailable ? 'Available' : 'Unavailable'}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
