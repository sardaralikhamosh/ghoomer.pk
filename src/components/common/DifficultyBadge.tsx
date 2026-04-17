import React from 'react';
import { cn } from '../../lib/utils';
import { Zap, Mountain, AlertTriangle, Skull } from 'lucide-react';

interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  className?: string;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, className }) => {
  const configs = {
    Easy: {
      color: 'bg-emerald-500',
      icon: <Zap size={10} />,
      label: 'Easy'
    },
    Moderate: {
      color: 'bg-sky-500',
      icon: <Mountain size={10} />,
      label: 'Moderate'
    },
    Challenging: {
      color: 'bg-amber-500',
      icon: <AlertTriangle size={10} />,
      label: 'Challenging'
    },
    Extreme: {
      color: 'bg-rose-500',
      icon: <Skull size={10} />,
      label: 'Extreme'
    }
  };

  const config = configs[difficulty];

  return (
    <div className={cn(
      "flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-lg",
      config.color,
      className
    )}>
      {config.icon}
      {config.label}
    </div>
  );
};
