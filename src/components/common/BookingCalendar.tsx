import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isBefore, 
  startOfToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface BookingCalendarProps {
  availability: string[]; // e.g., ['Monday', 'Wednesday']
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ 
  availability = [], 
  onDateSelect, 
  selectedDate 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfToday();

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            disabled={isBefore(startOfMonth(currentMonth), today)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} className="text-slate-600 dark:text-slate-400" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ChevronRight size={20} className="text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        
        const dayName = format(day, 'EEEE');
        const dayNameShort = format(day, 'EEE');
        const isAvailable = availability.includes(dayName) || availability.includes(dayNameShort);
        const isPast = isBefore(day, today);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = selectedDate && isSameDay(day, selectedDate);

        days.push(
          <div key={day.toString()} className="relative group">
            <button
              disabled={!isAvailable || isPast || !isCurrentMonth}
              onClick={() => onDateSelect(cloneDay)}
              className={cn(
                "relative w-full h-12 flex flex-col items-center justify-center rounded-xl transition-all text-sm font-bold",
                !isCurrentMonth && "text-transparent pointer-events-none",
                isAvailable && !isPast && isCurrentMonth && "hover:bg-sky-50 dark:hover:bg-sky-900/30 text-slate-700 dark:text-slate-300",
                !isAvailable && isCurrentMonth && "text-slate-300 dark:text-slate-700 bg-slate-50/50 dark:bg-slate-800/20 cursor-not-allowed",
                isPast && isCurrentMonth && "text-slate-200 dark:text-slate-800 cursor-not-allowed",
                isSelected && "bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-100 dark:shadow-none z-10"
              )}
            >
              <span>{formattedDate}</span>
              {isAvailable && !isPast && isCurrentMonth && !isSelected && (
                <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-sky-400" />
              )}
            </button>

            {/* Tooltip */}
            {isCurrentMonth && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl">
                {isPast ? 'Past Date' : isAvailable ? 'Available' : 'Unavailable'}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-visible">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
          <CalendarIcon size={18} />
          <span className="text-xs font-black uppercase tracking-widest">Select Date</span>
        </div>
        <div className="group relative">
          <Info size={14} className="text-slate-300 hover:text-slate-500 cursor-help transition-colors" />
          <div className="absolute right-0 bottom-full mb-2 w-48 p-3 bg-slate-900 text-white text-[10px] font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-2xl">
            Available days are based on the guide's weekly schedule.
            <div className="absolute top-full right-2 border-4 border-transparent border-t-slate-900" />
          </div>
        </div>
      </div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="mt-6 flex items-center gap-4 text-[10px] text-slate-400 font-black uppercase tracking-widest">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-sky-400" />
          Available
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800" />
          Unavailable
        </div>
      </div>
    </div>
  );
};
