import React, { useState, useEffect } from 'react';
import { Mountain, Trees, Menu, X, Bolt, Search, MapPin, Calendar, Users, ShieldCheck, Star, ArrowRight, Facebook, Instagram, Twitter, Youtube, Linkedin, CheckCircle2, MessageSquare, Share2, Heart, CreditCard, Clock, ChevronLeft, ChevronRight, Car, Quote, Mail, Phone, Info, LayoutDashboard, Lock, Headphones, Map, LogOut, User as UserIcon, Video, Bike, Wrench, Navigation, Fuel, Backpack, GraduationCap, Leaf, TreePine, Trash2, Check, Globe } from 'lucide-react';
import { User } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { cn, FEATURED_GUIDES, DESTINATIONS, CARS, TESTIMONIALS, type Guide, type Destination, type Booking, type Car as CarType, type Testimonial } from './lib/utils';
import { GUIDES } from './data/sampleData';

import { ExperiencesPage } from './pages/ExperiencesPage';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { FindGuidesPage } from './pages/FindGuidesPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { LOCAL_EXPERIENCES, getFeaturedExperiences, LocalExperience } from './data/experiences';
import { ExperienceCard } from './components/common/ExperienceCard';
import { SeasonalInspiration } from './components/home/SeasonalInspiration';
import { AdventureVisualizer } from './components/home/AdventureVisualizer';
import { ShandurVisualizer } from './components/home/ShandurVisualizer';
import { PoloVisualizer } from './components/home/PoloVisualizer';
import { HarvestVisualizer } from './components/home/HarvestVisualizer';
import { CulinaryVisualizer } from './components/home/CulinaryVisualizer';
import { BorithVisualizer } from './components/home/BorithVisualizer';
import { DeosaiVisualizer } from './components/home/DeosaiVisualizer';
import { HussainiVisualizer } from './components/home/HussainiVisualizer';
import { PetroglyphVisualizer } from './components/home/PetroglyphVisualizer';
import { AstrophotographyVisualizer } from './components/home/AstrophotographyVisualizer';
import { StarTrailsVisualizer } from './components/home/StarTrailsVisualizer';
import { K2BaseCampVisualizer } from './components/home/K2BaseCampVisualizer';
import { HunzaBlossomVisualizer } from './components/home/HunzaBlossomVisualizer';
import { PassuConesVisualizer } from './components/home/PassuConesVisualizer';
import { TestimonialCarousel } from './components/home/TestimonialCarousel';
import { BookingCalendar } from './components/common/BookingCalendar';
import { VideoGenerator } from './components/profile/VideoGenerator';
import { format } from 'date-fns';

interface Bike {
  id: number;
  name: string;
  type: string;
  price_per_day: number;
  image: string;
  shop_name: string;
  location: string;
  insurance_included: boolean;
}

interface Mechanic {
  id: number;
  name: string;
  location: string;
  lat: number;
  lng: number;
  phone: string;
  rating: number;
  specialty: string;
}

interface Route {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  distance: string;
  duration: string;
  start_point: string;
  end_point: string;
  waypoints: string[];
  fuel_stops: string[];
  accommodations: string[];
  image: string;
}

interface Gear {
  id: number;
  name: string;
  type: string;
  price_per_day: number;
  image: string;
}

// --- Components ---

const SkeletonCard = () => (
  <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm h-full flex flex-col">
    <div className="h-64 bg-slate-100 animate-pulse relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
    <div className="p-8 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="h-4 bg-slate-100 rounded-full w-24 animate-pulse" />
        <div className="h-4 bg-slate-100 rounded-full w-12 animate-pulse" />
      </div>
      <div className="h-8 bg-slate-100 rounded-xl w-3/4 mb-4 animate-pulse" />
      <div className="space-y-2 mb-8">
        <div className="h-3 bg-slate-100 rounded-full w-full animate-pulse" />
        <div className="h-3 bg-slate-100 rounded-full w-5/6 animate-pulse" />
      </div>
      <div className="mt-auto flex justify-between items-center pt-6 border-t border-slate-50">
        <div className="space-y-2">
          <div className="h-3 bg-slate-100 rounded-full w-16 animate-pulse" />
          <div className="h-6 bg-slate-100 rounded-full w-20 animate-pulse" />
        </div>
        <div className="h-12 bg-slate-100 rounded-2xl w-28 animate-pulse" />
      </div>
    </div>
  </div>
);

const GlobalLoader = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center"
  >
    <div className="relative w-24 h-24 mb-8">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="absolute inset-0 border-4 border-slate-100 rounded-full"
      />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Mountain className="text-sky-500" size={32} />
      </div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-center"
    >
      <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Ghoomer</h2>
      <p className="text-slate-400 font-medium text-sm animate-pulse">Preparing your adventure...</p>
    </motion.div>
  </motion.div>
);

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg whitespace-nowrap z-50 shadow-xl"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DestinationModal: React.FC<{ 
  destination: Destination | null; 
  onClose: () => void; 
  onBook: (dest: Destination, date: string) => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
}> = ({ destination, onClose, onBook, selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeImage, setActiveImage] = useState(0);

  if (!destination) return null;

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  const isSelected = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return selectedDate === dateStr;
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateChange(dateStr);
  };

  const relatedGuides = GUIDES.filter(guide => 
    guide.location.toLowerCase().includes(destination.name.toLowerCase()) ||
    guide.specialties.includes(destination.activityType)
  ).slice(0, 3);

  const galleryImages = destination.gallery || [destination.image];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-all z-20"
          >
            <X size={24} />
          </button>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Left Column: Images & Gallery */}
              <div className="bg-slate-50">
                <div className="h-96 lg:h-[500px] overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImage}
                      src={galleryImages[activeImage]} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full object-cover" 
                      alt={destination.name} 
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-2 text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                      <MapPin size={14} />
                      {destination.region}
                    </div>
                    <h2 className="text-4xl font-bold text-white font-display tracking-tight">{destination.name}</h2>
                  </div>
                </div>

                {/* Gallery Thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="p-6 flex gap-3 overflow-x-auto no-scrollbar">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={cn(
                          "flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all",
                          activeImage === idx ? "border-sky-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                        )}
                      >
                        <img src={img} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                      </button>
                    ))}
                  </div>
                )}

                {/* Highlights & Activities */}
                <div className="p-8 space-y-8">
                  {destination.highlights && (
                    <div>
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Highlights</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {destination.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100">
                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                            <span className="text-sm text-slate-700 font-medium">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {destination.popularActivities && (
                    <div>
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Popular Activities</h3>
                      <div className="flex flex-wrap gap-2">
                        {destination.popularActivities.map((a, i) => (
                          <span key={i} className="px-4 py-2 bg-sky-50 text-sky-600 rounded-full text-xs font-bold border border-sky-100">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Details & Booking */}
              <div className="p-8 lg:p-12 bg-white">
                <div className="mb-10">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">About Destination</h3>
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    {destination.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        destination.difficulty === 'Easy' ? "bg-emerald-500" :
                        destination.difficulty === 'Moderate' ? "bg-sky-500" :
                        destination.difficulty === 'Challenging' ? "bg-amber-500" : "bg-rose-500"
                      )} />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Difficulty</span>
                    </div>
                    <div className="text-slate-900 font-bold">{destination.difficulty}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={14} className="text-sky-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Best Season</span>
                    </div>
                    <div className="text-slate-900 font-bold">{destination.bestSeason}</div>
                  </div>
                </div>

                {/* Related Guides */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Top Rated Guides</h3>
                    <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">{destination.guideCount} Available</span>
                  </div>
                  <div className="space-y-3">
                    {relatedGuides.map(guide => (
                      <div key={guide.id} className="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 hover:border-sky-100 transition-all group cursor-pointer">
                        <img src={guide.image} className="w-12 h-12 rounded-xl object-cover" alt={guide.name} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900">{guide.name}</h4>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star size={12} fill="currentColor" />
                              <span className="text-xs font-bold">{guide.rating}</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium">{guide.specialties.slice(0, 2).join(' • ')}</p>
                        </div>
                        <ArrowRight size={16} className="text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Calendar */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Start Date</h3>
                    <div className="flex gap-1">
                      <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="p-1 hover:bg-slate-100 rounded-lg transition-colors"><ChevronLeft size={16} /></button>
                      <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="p-1 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <div className="text-center font-bold text-slate-900 mb-4 text-sm">{monthNames[month]} {year}</div>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                        <div key={d} className="text-[10px] font-bold text-slate-400 uppercase">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {blanks.map(i => <div key={`blank-${i}`} />)}
                      {days.map(day => (
                        <button
                          key={day}
                          onClick={() => handleDateClick(day)}
                          className={cn(
                            "aspect-square flex items-center justify-center text-xs rounded-lg transition-all",
                            isSelected(day) 
                              ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-100" 
                              : isToday(day)
                                ? "bg-sky-50 text-sky-600 font-bold"
                                : "hover:bg-white text-slate-600"
                          )}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-white pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Package</div>
                    <div className="text-3xl font-black text-slate-900">${destination.price}</div>
                  </div>
                  <button 
                    onClick={() => onBook(destination, selectedDate)}
                    className="px-10 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black shadow-xl shadow-sky-100 transition-all hover:-translate-y-1 active:scale-95"
                  >
                    Book This Adventure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CertificationBadges = ({ certifications }: { certifications: any[] }) => {
  if (!certifications || certifications.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-3">
      {certifications.map((cert, i) => (
        <div key={i} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl group hover:bg-emerald-100 transition-all">
          <ShieldCheck size={16} className="text-emerald-600" />
          <div className="flex flex-col">
            <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{cert.name}</span>
            <span className="text-[10px] text-slate-500 font-bold">{cert.issuing_authority} • {new Date(cert.issue_date).getFullYear()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const AvailabilityCalendar = ({ guideId }: { guideId: string }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setIsLoading(true);
        // In a real app, fetch from /api/guides/:id/availability
        // Mocking some data for now
        const mockAvailability: Record<string, boolean> = {};
        const today = new Date();
        for (let i = 0; i < 30; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dateStr = date.toISOString().split('T')[0];
          mockAvailability[dateStr] = Math.random() > 0.3;
        }
        setAvailability(mockAvailability);
      } catch (error) {
        console.error("Failed to fetch availability", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAvailability();
  }, [guideId]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Availability</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Real-time Schedule</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200"><ChevronLeft size={20} /></button>
          <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="text-center font-black text-slate-900 mb-6 text-xl tracking-tight">{monthNames[month]} {year}</div>
      
      <div className="grid grid-cols-7 gap-2 text-center mb-4">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {blanks.map(i => <div key={`blank-${i}`} />)}
        {days.map(day => {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isAvailable = availability[dateStr];
          const isPast = new Date(dateStr) < new Date(new Date().setHours(0,0,0,0));

          return (
            <div
              key={day}
              className={cn(
                "aspect-square flex flex-col items-center justify-center text-sm rounded-2xl transition-all relative group",
                isPast ? "opacity-30 cursor-not-allowed" : 
                isAvailable ? "bg-white text-slate-900 font-bold shadow-sm border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50" : 
                "bg-slate-100 text-slate-400 cursor-not-allowed"
              )}
            >
              <span className="relative z-10">{day}</span>
              {!isPast && isAvailable && (
                <div className="absolute bottom-2 w-1 h-1 rounded-full bg-emerald-500" />
              )}
              {!isPast && !isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-slate-300 rotate-45 opacity-50" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-6 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white border border-slate-200 shadow-sm" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-100" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Booked / Unavailable</span>
        </div>
      </div>
    </div>
  );
};

const GuideProfileFull = ({ 
  guide, 
  onClose, 
  onBook, 
  onContact 
}: { 
  guide: Guide; 
  onClose: () => void; 
  onBook: (guide: Guide) => void; 
  onContact: (guide: Guide) => void;
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'availability' | 'certifications'>('about');
  const [certs, setCerts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const response = await fetch(`/api/guides/${guide.id}/certifications`);
        if (response.ok) {
          const data = await response.json();
          setCerts(data);
        }
      } catch (error) {
        console.error("Failed to fetch certifications", error);
      }
    };
    fetchCerts();
  }, [guide.id]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-6xl h-[90vh] rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-2xl transition-all z-20"
          >
            <X size={24} />
          </button>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
              {/* Sidebar Info */}
              <div className="lg:col-span-4 bg-slate-50 p-10 border-r border-slate-100">
                <div className="text-center mb-10">
                  <div className="relative inline-block mb-6">
                    <img src={guide.image} className="w-40 h-40 rounded-[40px] object-cover border-4 border-white shadow-xl" alt={guide.name} />
                    {guide.isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl shadow-lg">
                        <ShieldCheck size={20} />
                      </div>
                    )}
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{guide.name}</h2>
                  <div className="flex items-center justify-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">
                    <MapPin size={14} className="text-sky-500" />
                    {guide.location}
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <Star size={16} className="text-amber-500" fill="currentColor" />
                    <span className="text-sm font-black text-slate-900">{guide.rating}</span>
                    <span className="text-slate-400 font-bold text-xs">({guide.reviews} reviews)</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {guide.specialties.map((s, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white text-slate-700 rounded-xl text-[10px] font-bold border border-slate-100 shadow-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {guide.languages?.map((l, i) => (
                        <span key={i} className="px-3 py-1.5 bg-sky-50 text-sky-600 rounded-xl text-[10px] font-bold border border-sky-100">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Starting from</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">${guide.pricePerDay}</span>
                      <span className="text-slate-400 font-bold text-xs">/ day</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3 mt-6">
                      <button 
                        onClick={() => onBook(guide)}
                        className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black shadow-lg shadow-sky-100 transition-all"
                      >
                        Book Now
                      </button>
                      <button 
                        onClick={() => onContact(guide)}
                        className="w-full py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl font-black transition-all"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-8 p-10 lg:p-16">
                <div className="flex gap-8 border-b border-slate-100 mb-12">
                  {[
                    { id: 'about', label: 'About' },
                    { id: 'certifications', label: 'Certifications' },
                    { id: 'availability', label: 'Availability' },
                    { id: 'reviews', label: 'Reviews' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={cn(
                        "pb-6 text-sm font-black uppercase tracking-widest transition-all relative",
                        activeTab === tab.id ? "text-sky-500" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="min-h-[400px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'about' && (
                      <motion.div
                        key="about"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                        <div>
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Biography</h3>
                          <p className="text-slate-600 text-lg leading-relaxed font-medium">
                            {guide.bio || "No biography available."}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
                                <Clock size={18} />
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience</span>
                            </div>
                            <div className="text-xl font-black text-slate-900">{guide.experienceYears} Years</div>
                          </div>
                          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <CheckCircle2 size={18} />
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trips Led</span>
                            </div>
                            <div className="text-xl font-black text-slate-900">450+</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'certifications' && (
                      <motion.div
                        key="certifications"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Professional Credentials</h3>
                        <CertificationBadges certifications={certs} />
                        {certs.length === 0 && (
                          <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                            <ShieldCheck size={48} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-500 font-bold">No certifications listed yet.</p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab === 'availability' && (
                      <motion.div
                        key="availability"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <AvailabilityCalendar guideId={guide.id} />
                      </motion.div>
                    )}

                    {activeTab === 'reviews' && (
                      <motion.div
                        key="reviews"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Client Testimonials</h3>
                        {[1, 2, 3].map(i => (
                          <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-200" />
                                <div>
                                  <h4 className="text-sm font-black text-slate-900">Adventure Seeker {i}</h4>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">October 2025</p>
                                </div>
                              </div>
                              <div className="flex gap-1 text-amber-500">
                                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                              </div>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                              "An absolutely incredible experience. {guide.name} was knowledgeable, patient, and made us feel safe throughout the entire journey. Highly recommended!"
                            </p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const PaymentModal = ({ 
  booking, 
  onClose, 
  onSuccess 
}: { 
  booking: Booking; 
  onClose: () => void; 
  onSuccess: () => void;
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'jazzcash'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const endpoint = paymentMethod === 'stripe' 
        ? `/api/bookings/${booking.id}/pay/stripe` 
        : `/api/payments/jazzcash`;
      
      const body = paymentMethod === 'stripe' 
        ? {} 
        : { amount: booking.totalPrice, bookingId: booking.id, phoneNumber };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        onSuccess();
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative p-8"
          onClick={e => e.stopPropagation()}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Complete Payment</h2>
            <p className="text-slate-500 text-sm font-bold">Secure checkout for your adventure</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 mb-8 border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Adventure</span>
              <span className="text-sm font-black text-slate-900">{booking.tripName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Amount</span>
              <span className="text-lg font-black text-sky-600">${booking.totalPrice}</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Payment Method</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('stripe')}
                className={cn(
                  "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                  paymentMethod === 'stripe' ? "border-sky-500 bg-sky-50" : "border-slate-100 hover:border-slate-200"
                )}
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <CreditCard size={18} className="text-sky-500" />
                </div>
                <span className="text-xs font-black text-slate-900">Stripe</span>
              </button>
              <button
                onClick={() => setPaymentMethod('jazzcash')}
                className={cn(
                  "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                  paymentMethod === 'jazzcash' ? "border-amber-500 bg-amber-50" : "border-slate-100 hover:border-slate-200"
                )}
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Phone size={18} className="text-amber-500" />
                </div>
                <span className="text-xs font-black text-slate-900">JazzCash</span>
              </button>
            </div>
          </div>

          {paymentMethod === 'jazzcash' && (
            <div className="mb-8">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">JazzCash Phone Number</label>
              <input
                type="text"
                placeholder="03xx xxxxxxx"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={isProcessing || (paymentMethod === 'jazzcash' && !phoneNumber)}
            className={cn(
              "w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all flex items-center justify-center gap-2",
              paymentMethod === 'stripe' ? "bg-sky-500 hover:bg-sky-600 shadow-sky-100" : "bg-amber-500 hover:bg-amber-600 shadow-amber-100",
              isProcessing && "opacity-70 cursor-not-allowed"
            )}
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck size={20} />
                Pay ${booking.totalPrice}
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-slate-400 font-bold mt-6 uppercase tracking-widest">
            Your payment is encrypted and secure
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CancellationModal = ({ 
  booking, 
  onClose, 
  onConfirm 
}: { 
  booking: Booking; 
  onClose: () => void; 
  onConfirm: () => void;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative p-8"
          onClick={e => e.stopPropagation()}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Info size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Cancel Booking?</h2>
            <p className="text-slate-500 text-sm font-bold">Please review the cancellation policy</p>
          </div>

          <div className="bg-rose-50 rounded-2xl p-6 mb-8 border border-rose-100">
            <h3 className="text-rose-900 font-black text-sm mb-2">Cancellation Policy: {booking.cancellationPolicy || '24h'}</h3>
            <p className="text-rose-700 text-xs font-medium leading-relaxed">
              {booking.cancellationPolicy === '24h' ? "Free cancellation up to 24 hours before the trip starts. After that, a 50% fee applies." :
               booking.cancellationPolicy === '7d' ? "Free cancellation up to 7 days before the trip starts. After that, a 70% fee applies." :
               "This booking is non-refundable. Cancellations will not receive a refund."}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onConfirm}
              className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black shadow-xl shadow-rose-100 transition-all"
            >
              Confirm Cancellation
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-2xl font-black transition-all"
            >
              Keep Booking
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const FilterSidebar = ({ 
  onFilterChange, 
  activeFilters 
}: { 
  onFilterChange: (type: string, value: string) => void;
  activeFilters: any;
}) => {
  return (
    <div className="w-full lg:w-80 space-y-8">
      <div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Region</h3>
        <div className="space-y-2">
          {['All', 'Gilgit-Baltistan', 'Khyber Pakhtunkhwa', 'Azad Kashmir', 'Balochistan'].map(region => (
            <button
              key={region}
              onClick={() => onFilterChange('region', region)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                activeFilters.region === region ? "bg-sky-500 text-white shadow-lg shadow-sky-100" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
              )}
            >
              {region}
              {activeFilters.region === region && <CheckCircle2 size={16} />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Price Range</h3>
        <div className="space-y-2">
          {['All', 'Under $50', '$50 - $100', '$100 - $200', 'Over $200'].map(range => (
            <button
              key={range}
              onClick={() => onFilterChange('priceRange', range)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                activeFilters.priceRange === range ? "bg-sky-500 text-white shadow-lg shadow-sky-100" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
              )}
            >
              {range}
              {activeFilters.priceRange === range && <CheckCircle2 size={16} />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Activity Type</h3>
        <div className="flex flex-wrap gap-2">
          {['All', 'Trekking', 'Cultural', 'Mountaineering', 'Photography', 'Sightseeing'].map(activity => (
            <button
              key={activity}
              onClick={() => onFilterChange('activity', activity)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                activeFilters.activity === activity ? "bg-sky-500 text-white border-sky-500 shadow-md" : "bg-white text-slate-600 border-slate-100 hover:border-slate-200"
              )}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const MapView = ({ 
  items, 
  onItemClick 
}: { 
  items: any[]; 
  onItemClick: (item: any) => void;
}) => {
  return (
    <div className="w-full h-[600px] bg-slate-100 rounded-[40px] relative overflow-hidden border border-slate-200 shadow-inner">
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/74.0,35.0,6,0/1200x600?access_token=mock_token')] bg-cover bg-center opacity-60" />
      
      {/* Mock Markers */}
      {items.map((item, i) => (
        <motion.button
          key={item.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onItemClick(item)}
          className="absolute group"
          style={{ 
            left: `${30 + (Math.random() * 40)}%`, 
            top: `${20 + (Math.random() * 50)}%` 
          }}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-white rounded-2xl shadow-xl border-2 border-sky-500 flex items-center justify-center group-hover:scale-110 transition-all overflow-hidden">
              <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
              {item.name}
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-sky-500 rounded-full border-2 border-white" />
          </div>
        </motion.button>
      ))}

      <div className="absolute bottom-8 left-8 right-8 flex justify-center">
        <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-sky-500" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Guide Locations</span>
          </div>
          <div className="w-[1px] h-4 bg-slate-300" />
          <span className="text-[10px] font-bold text-slate-500">{items.length} results found in this area</span>
        </div>
      </div>
    </div>
  );
};

const SortDropdown = ({ 
  onSort, 
  currentSort 
}: { 
  onSort: (value: string) => void; 
  currentSort: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: 'rating', label: 'Top Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'experience', label: 'Most Experienced' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 hover:border-slate-200 transition-all shadow-sm"
      >
        <Bolt size={18} className="text-sky-500" />
        Sort by: {options.find(o => o.value === currentSort)?.label}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 p-2"
          >
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onSort(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                  currentSort === option.value ? "bg-sky-50 text-sky-600" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {option.label}
                {currentSort === option.value && <CheckCircle2 size={16} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StudentGuideApplication = ({ 
  onClose, 
  onSubmit 
}: { 
  onClose: () => void; 
  onSubmit: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    university: '',
    studentIdUrl: '',
    motivation: ''
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden"
      >
        <div className="p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Student Guide Program</h2>
              <p className="text-slate-500 font-medium">Earn while you study and share your local knowledge.</p>
            </div>
            <button onClick={onClose} className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
              <X size={24} className="text-slate-400" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">University Name</label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  placeholder="e.g. Karakoram International University"
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-sky-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Student ID (URL)</label>
                <input
                  type="text"
                  value={formData.studentIdUrl}
                  onChange={(e) => setFormData({ ...formData, studentIdUrl: e.target.value })}
                  placeholder="Link to your ID photo"
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-sky-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Why do you want to be a guide?</label>
              <textarea
                rows={4}
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                placeholder="Tell us about your local knowledge and passion..."
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-sky-500 transition-all resize-none"
              />
            </div>

            <div className="bg-sky-50 p-6 rounded-3xl flex gap-4">
              <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center shrink-0">
                <GraduationCap size={24} className="text-white" />
              </div>
              <div>
                <h4 className="text-sky-900 font-black text-sm mb-1">Student Benefits</h4>
                <p className="text-sky-700 text-xs font-medium leading-relaxed">
                  Verified students get 0% platform fees for their first 10 bookings and access to exclusive training workshops.
                </p>
              </div>
            </div>

            <button
              onClick={() => onSubmit(formData)}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all mt-4"
            >
              Submit Application
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const MotoTrekMap = ({ 
  mechanics, 
  routes 
}: { 
  mechanics: Mechanic[]; 
  routes: Route[];
}) => {
  return (
    <div className="w-full h-[700px] bg-slate-900 rounded-[50px] relative overflow-hidden border-8 border-slate-800 shadow-2xl">
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/74.0,35.0,7,0/1200x700?access_token=mock_token')] bg-cover bg-center opacity-40" />
      
      {/* Routes visualization */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <path d="M 200 300 Q 400 100 600 400 T 1000 200" stroke="#0ea5e9" strokeWidth="4" fill="none" strokeDasharray="8 8" />
        <path d="M 100 500 Q 300 600 500 400 T 900 500" stroke="#f59e0b" strokeWidth="4" fill="none" strokeDasharray="8 8" />
      </svg>

      {/* Mechanics Markers */}
      {mechanics.map((mech, i) => (
        <div
          key={mech.id}
          className="absolute group cursor-pointer"
          style={{ left: `${20 + (i * 15)}%`, top: `${30 + (i * 10)}%` }}
        >
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 border-2 border-white group-hover:scale-110 transition-all">
            <Wrench size={20} className="text-white" />
          </div>
          <div className="absolute top-0 left-14 bg-white p-3 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-10">
            <p className="text-xs font-black text-slate-900">{mech.name}</p>
            <p className="text-[10px] font-bold text-slate-500">{mech.specialty}</p>
          </div>
        </div>
      ))}

      <div className="absolute top-10 left-10 space-y-4">
        <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-[32px] border border-slate-700 w-80 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
              <Navigation size={20} className="text-white" />
            </div>
            <h3 className="text-white font-black tracking-tight">MotoTrek Explorer</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-slate-300">Mechanics</span>
              </div>
              <span className="text-xs font-black text-white">{mechanics.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-sky-500" />
                <span className="text-xs font-bold text-slate-300">Active Routes</span>
              </div>
              <span className="text-xs font-black text-white">{routes.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImpactDashboard = ({ 
  tokens, 
  projects 
}: { 
  tokens: number; 
  projects: any[];
}) => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-100/50">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Impact Dashboard</h2>
              <p className="text-slate-500 font-medium">Your contribution to local communities in Northern Pakistan.</p>
            </div>
            <div className="flex items-center gap-4 bg-emerald-50 px-6 py-4 rounded-3xl border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Leaf size={24} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Ghoomer Tokens</p>
                <p className="text-2xl font-black text-slate-900">{tokens.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Trees Planted', value: '124', icon: TreePine, color: 'emerald' },
              { label: 'Local Jobs', value: '42', icon: Users, color: 'sky' },
              { label: 'Waste Collected', value: '850kg', icon: Trash2, color: 'amber' }
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <stat.icon size={24} className={`text-${stat.color}-500 mb-4`} />
                <p className="text-2xl font-black text-slate-900 mb-1">{stat.value}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
          <h3 className="text-xl font-black mb-6 relative">Active Projects</h3>
          <div className="space-y-6 relative">
            {projects.map((project, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-sm font-bold text-slate-300">{project.name}</p>
                  <p className="text-xs font-black text-sky-400">{project.progress}%</p>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    className="h-full bg-sky-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-sm transition-all mt-10 border border-white/10">
            Redeem Tokens
          </button>
        </div>
      </div>
    </div>
  );
};

const GuidePassPricing = ({ 
  onSubscribe 
}: { 
  onSubscribe: (plan: string) => void;
}) => {
  const plans = [
    {
      name: 'Monthly',
      price: '$19',
      period: '/mo',
      features: ['Unlimited Bookings', 'Priority Support', 'Exclusive Routes', '100 Impact Tokens'],
      color: 'slate',
      popular: false
    },
    {
      name: 'Yearly',
      price: '$149',
      period: '/yr',
      features: ['All Monthly Features', '2 Months Free', 'Gear Discounts', '500 Impact Tokens', 'VIP Meetups'],
      color: 'sky',
      popular: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {plans.map((plan, i) => (
        <div
          key={i}
          className={cn(
            "relative p-10 rounded-[40px] border-2 transition-all hover:scale-[1.02]",
            plan.popular ? "bg-white border-sky-500 shadow-2xl shadow-sky-100" : "bg-white border-slate-100 shadow-xl"
          )}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
              Best Value
            </div>
          )}
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-900 mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900">{plan.price}</span>
              <span className="text-slate-400 font-bold">{plan.period}</span>
            </div>
          </div>
          <div className="space-y-4 mb-10">
            {plan.features.map((feature, j) => (
              <div key={j} className="flex items-center gap-3">
                <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", plan.popular ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-400")}>
                  <Check size={12} />
                </div>
                <span className="text-sm font-bold text-slate-600">{feature}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onSubscribe(plan.name)}
            className={cn(
              "w-full py-5 rounded-2xl font-black text-lg transition-all shadow-lg",
              plan.popular ? "bg-sky-500 text-white shadow-sky-200 hover:bg-sky-600" : "bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800"
            )}
          >
            Get GuidePass
          </button>
        </div>
      ))}
    </div>
  );
};

const BookingConfirmation = ({ 
  booking, 
  onClose 
}: { 
  booking: any; 
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden text-center"
      >
        <div className="p-10">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-emerald-500" />
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Booking Confirmed!</h2>
          <p className="text-slate-500 font-medium mb-8">
            Your adventure with <span className="text-slate-900 font-bold">{booking.guideName}</span> is all set. 
            A confirmation email and SMS have been sent to you.
          </p>

          <div className="bg-slate-50 rounded-3xl p-6 mb-8 text-left space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Booking ID</span>
              <span className="text-sm font-bold text-slate-900">#GMR-{booking.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Date</span>
              <span className="text-sm font-bold text-slate-900">{format(new Date(booking.date), 'MMMM dd, yyyy')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Amount Paid</span>
              <span className="text-sm font-bold text-emerald-600">${booking.amount}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onClose}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all"
            >
              Go to Dashboard
            </button>
            <button className="w-full py-4 text-slate-500 font-bold text-sm hover:text-slate-900 transition-all">
              Download Receipt
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = ({ 
  user, 
  onDashboardClick, 
  onBecomeGuide, 
  onLogout, 
  onLogoClick,
  onDestinationSelect,
  onLoginClick,
  onProfileClick,
  onFindGuidesClick,
  onExperiencesClick,
  onMotoTrekClick,
  onMicroTrekClick,
  destinations,
  isLoading,
  onNavClick
}: { 
  user: User | null; 
  onDashboardClick: () => void; 
  onBecomeGuide: () => void; 
  onLogout: () => void; 
  onLogoClick: () => void;
  onDestinationSelect: (dest: Destination) => void;
  onLoginClick: () => void;
  onProfileClick: () => void;
  onFindGuidesClick: () => void;
  onExperiencesClick: () => void;
  onMotoTrekClick: () => void;
  onMicroTrekClick: () => void;
  destinations: Destination[];
  isLoading?: boolean;
  onNavClick: (view: string) => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredResults = searchQuery.trim() === '' 
    ? [] 
    : destinations.filter(dest => 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.region.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
      isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-6"
    )}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0 group">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12",
            isScrolled ? "bg-emerald-600 text-white shadow-lg" : "bg-white/20 backdrop-blur-md text-white border border-white/30"
          )}>
            <Mountain size={22} className="relative z-10" />
            <Trees size={14} className="absolute -bottom-1 -right-1 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "text-xl font-black tracking-tighter font-display leading-none",
              isScrolled ? "text-slate-900" : "text-white"
            )}>GHOOMER</span>
            <span className={cn(
              "text-[10px] font-bold tracking-[0.2em] uppercase leading-none mt-1",
              isScrolled ? "text-emerald-600" : "text-emerald-400"
            )}>.PK</span>
          </div>
        </a>

        {/* Search Bar - Center */}
        <div className="hidden lg:flex items-center bg-white rounded-full shadow-sm border border-slate-200 overflow-hidden max-w-xl flex-1">
          <div className="flex items-center px-4 py-2 flex-1 border-r border-slate-100">
            <Search size={18} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Search Gilgit Baltistan..."
              className="w-full text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 bg-transparent"
            />
          </div>
          <div className="flex items-center px-4 py-2 w-40 cursor-pointer hover:bg-slate-50 transition-colors">
            <Calendar size={18} className="text-slate-400 mr-2" />
            <span className="text-sm font-medium text-slate-500">Select dates</span>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 m-1 rounded-full transition-all shrink-0">
            <Search size={18} />
          </button>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {isSearchFocused && searchQuery.trim() !== '' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-1/2 -translate-x-1/2 w-full max-w-xl mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50"
              >
                {isLoading ? (
                  <div className="p-4 space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-4 animate-pulse">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-slate-100 rounded-full w-1/3" />
                          <div className="h-2 bg-slate-100 rounded-full w-1/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredResults.length > 0 ? (
                  <div className="py-2">
                    {filteredResults.map(dest => (
                      <button
                        key={dest.id}
                        onClick={() => {
                          onDestinationSelect(dest);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{dest.name}</div>
                          <div className="text-xs text-slate-500">{dest.region}</div>
                        </div>
                        <ArrowRight size={14} className="ml-auto text-slate-300 group-hover:text-blue-500 transition-all" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm text-slate-500 font-medium">No results found</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="#explore" isScrolled={isScrolled} onClick={() => onNavClick?.('#explore')}>Explore</NavLink>
            <NavLink href="#services" isScrolled={isScrolled} onClick={() => onNavClick?.('#services')}>Services</NavLink>
            <NavLink href="#guides" isScrolled={isScrolled} onClick={onFindGuidesClick}>Find a Guide</NavLink>
            <NavLink href="#treks" isScrolled={isScrolled} onClick={() => onNavClick?.('#treks')}>Mountain Routes</NavLink>
            <NavLink href="#experiences" isScrolled={isScrolled} onClick={onExperiencesClick}>Local Experiences</NavLink>
            <NavLink href="#moto-trek" isScrolled={isScrolled} onClick={onMotoTrekClick}>
              <div className="flex items-center gap-1.5">
                <Bike size={14} className="text-sky-500" />
                <span>Moto Trek</span>
              </div>
            </NavLink>
            <NavLink href="#micro-trek" isScrolled={isScrolled} onClick={onMicroTrekClick}>
              <div className="flex items-center gap-1.5">
                <Trees size={14} className="text-emerald-500" />
                <span>Micro Trek</span>
              </div>
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <button 
                onClick={onProfileClick}
                className={cn(
                  "flex items-center gap-2 p-1 pr-3 rounded-full transition-all",
                  isScrolled ? "bg-slate-100 hover:bg-slate-200" : "bg-white/10 hover:bg-white/20 backdrop-blur-md"
                )}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                  {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name[0]}
                </div>
                <span className={cn("text-xs font-bold", isScrolled ? "text-slate-900" : "text-white")}>
                  {user.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button 
                onClick={onLoginClick}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-bold transition-all",
                  isScrolled ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-white text-slate-900 hover:bg-white/90"
                )}
              >
                Log in
              </button>
            )}

            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isScrolled ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
                )}
              >
                <Menu size={28} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 py-4 z-50 overflow-hidden"
                    >
                      {user && (
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 mb-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Logged in as</p>
                          <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                        </div>
                      )}
                      <div className="px-6 py-2">
                        <p className="text-emerald-600 font-bold text-sm mb-2">Traveller</p>
                        <button 
                          onClick={() => {
                            onFindGuidesClick();
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left py-2 text-slate-700 hover:text-blue-600 transition-colors font-bold"
                        >
                          Find a Guide
                        </button>
                        {user ? (
                          <>
                            <button onClick={() => { onProfileClick(); setIsMenuOpen(false); }} className="w-full text-left py-2 text-slate-700 hover:text-blue-600 transition-colors">My Profile</button>
                            <button onClick={() => { onDashboardClick(); setIsMenuOpen(false); }} className="w-full text-left py-2 text-slate-700 hover:text-blue-600 transition-colors">My Bookings</button>
                            <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full text-left py-2 text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-2">
                              <LogOut size={16} />
                              Log out
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="w-full text-left py-2 text-slate-700 hover:text-blue-600 transition-colors">Log in</button>
                            <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="w-full text-left py-2 text-slate-700 hover:text-blue-600 transition-colors">Sign up</button>
                          </>
                        )}
                      </div>
                      <div className="h-px bg-slate-100 my-2" />
                      <div className="px-6 py-2">
                        <p className="text-emerald-600 font-bold text-sm mb-2">Partner</p>
                        <button onClick={() => { onBecomeGuide(); setIsMenuOpen(false); }} className="w-full text-left py-2 text-slate-700 hover:text-blue-600 transition-colors">Become a guide</button>
                        <button className="w-full text-left py-2 text-slate-700 hover:text-blue-600 transition-colors">Become an agency</button>
                      </div>
                      <div className="h-px bg-slate-100 my-2" />
                      <div className="px-6 py-2">
                        <button className="w-full text-left py-2 text-slate-700 hover:text-blue-600 transition-colors">Help</button>
                        <button className="w-full flex items-center justify-between py-2 text-slate-700 hover:text-blue-600 transition-colors">
                          <span>Currency: USD</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MobileNavLink = ({ href, icon, label, isSpecial }: { href: string, icon: React.ReactNode, label: string, isSpecial?: boolean }) => (
  <a 
    href={href} 
    className={cn(
      "flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-50 transition-all active:scale-95",
      isSpecial ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-white text-slate-600"
    )}
  >
    <div className={cn(
      "w-10 h-10 rounded-xl flex items-center justify-center",
      isSpecial ? "bg-white text-emerald-500 shadow-sm" : "bg-slate-50 text-slate-400"
    )}>
      {icon}
    </div>
    <span className="text-xs font-bold">{label}</span>
  </a>
);

const NavLink = ({ href, children, active, className, isScrolled, onClick }: { href: string, children: React.ReactNode, active?: boolean, className?: string, isScrolled?: boolean, onClick?: () => void }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (onClick) {
        onClick();
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={cn(
        "text-sm font-medium transition-colors hover:text-sky-500",
        active ? "text-sky-600" : (isScrolled ? "text-slate-600" : "text-white/90"),
        className
      )}
    >
      {children}
    </a>
  );
};

const Hero = ({ onBecomeGuide, onDestinationSelect, onNavClick, onBookNow }: { onBecomeGuide: () => void, onDestinationSelect: (dest: Destination) => void, onNavClick?: (id: string) => void, onBookNow?: () => void }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    {
      url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1920&q=90",
      alt: "Majestic mountains of Pakistan"
    },
    {
      url: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1920&q=90",
      alt: "Lush valleys in Gilgit Baltistan"
    },
    {
      url: "https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=1920&q=90",
      alt: "Serene lakes of Skardu"
    },
    {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=90",
      alt: "Snow-capped peaks of the Karakoram"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage].url}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            alt={images[currentImage].alt}
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full py-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              Welcome to the Unexplored
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white font-display mb-8 leading-[0.9] tracking-tighter drop-shadow-2xl">
              Your Journey Begins<br />
              <span className="text-emerald-400">Where the Maps End</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mb-10 leading-relaxed">
              Experience the raw, untouched beauty of Gilgit Baltistan and Chitral with local experts who know the land like no one else.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onBookNow}
                className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-sky-500/20 flex items-center gap-3 group"
              >
                <Calendar size={24} />
                Book Your Trip
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => {
                  if (onNavClick) onNavClick('#guides');
                  else {
                    const element = document.querySelector('#guides');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-emerald-500/10 backdrop-blur-md hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl font-bold text-lg transition-all flex items-center gap-3"
              >
                <Users size={24} />
                Find a Guide
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-12 right-12 z-30 flex items-center gap-4">
        <div className="flex gap-2 mr-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                currentImage === i ? "w-8 bg-emerald-400" : "w-2 bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={prevImage}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextImage}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

const TrustBar = () => (
  <div className="bg-slate-50 border-b border-slate-100 py-12 relative z-30">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: "Expert local guides",
            desc: "Hand-picked experts from Gilgit Baltistan and beyond",
            icon: <Users className="text-blue-600" />
          },
          {
            title: "Private mountain tours",
            desc: "Customized treks and cultural journeys for your group",
            icon: <Bolt className="text-blue-600" />
          },
          {
            title: "Flexible booking",
            desc: "Easy cancellation and date changes for your peace of mind",
            icon: <Calendar className="text-blue-600" />
          },
          {
            title: "Local support",
            desc: "Our team is on the ground to assist you 24/7",
            icon: <Headphones className="text-blue-600" />
          }
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="shrink-0 mt-1">
              {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HowItWorks = () => (
  <section className="py-24 bg-slate-50 relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
      <img 
        src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1920&q=10" 
        className="w-full h-full object-cover" 
        alt="" 
      />
    </div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-sky-600 font-bold text-sm uppercase tracking-widest mb-4 block">Simple Process</span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-display mb-6 tracking-tight">How Ghoomer Works</h2>
        <p className="text-slate-500 text-lg font-medium">Your journey to the heart of Gilgit Baltistan and Chitral in three easy steps.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Connector Line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
        
        {[
          {
            step: "01",
            title: "Find Your Perfect Guide",
            desc: "Browse our verified local experts or search for a specific valley you want to explore.",
            icon: <Users className="text-white" />
          },
          {
            step: "02",
            title: "Connect with Your Guide",
            desc: "Message your local expert to customize your itinerary and ask any questions.",
            icon: <MessageSquare className="text-white" />
          },
          {
            step: "03",
            title: "Book with Confidence",
            desc: "Securely book your tour and get ready for an unforgettable local experience.",
            icon: <CheckCircle2 className="text-white" />
          }
        ].map((item, i) => (
          <div key={i} className="relative z-10 text-center group">
            <div className="w-20 h-20 bg-sky-500 rounded-[28px] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-sky-500/20 group-hover:rotate-6 transition-transform duration-300">
              {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
            </div>
            <div className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-xs font-black mb-4">STEP {item.step}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TravelStyleSection = () => (
  <section id="explore" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-4">
          <Bolt size={14} className="fill-indigo-500" />
          Travel Styles
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-display mb-4 tracking-tight">Find Your Perfect Private Tour in the Valleys</h2>
        <p className="text-slate-500 leading-relaxed font-medium">
          Whether you're looking for a challenging trek in the Karakoram or a relaxing cultural escape in Chitral, our local experts will craft a 100% private experience just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Sightseeing", icon: <MapPin />, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80", count: 24 },
          { title: "Hiking & Trekking", icon: <Mountain />, image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=400&q=80", count: 18 },
          { title: "Culture & Festivals", icon: <Users />, image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=400&q=80", count: 12 },
          { title: "Honeymoon", icon: <Heart />, image: "https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=400&q=80", count: 8 },
          { title: "Active Adventures", icon: <Bolt />, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80", count: 15 },
          { title: "Photography", icon: <Bolt />, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80", count: 10 },
          { title: "Cycling", icon: <Bolt />, image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80", count: 6 },
          { title: "Pilgrimage", icon: <Bolt />, image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=400&q=80", count: 5 },
        ].map((style, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer"
          >
            <img src={style.image} alt={style.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-3">
                {style.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-1">{style.title}</h4>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{style.count} Tours</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button 
          onClick={() => {
            const element = document.querySelector('#guides');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all group"
        >
          <Users size={20} />
          Find a Local Expert for Your Style
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </section>
);

const MeetOurGuides = ({ onSelect, guides, isLoading, onNavClick }: { onSelect: (guide: Guide) => void, guides: Guide[], isLoading: boolean, onNavClick?: (id: string) => void }) => (
  <section id="experiences" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
        <div className="max-w-2xl">
          <span className="text-sky-600 font-bold text-sm uppercase tracking-widest mb-4 block">Personalized Experiences</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-display mb-6 tracking-tight">Meet Our Local Experts</h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Our guides are more than just experts—they are passionate locals who love sharing their culture and hidden gems with you.
          </p>
        </div>
        <button 
          onClick={() => {
            if (onNavClick) onNavClick('#guides');
            else {
              const element = document.querySelector('#guides');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl"
        >
          View All Guides
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`skeleton-meet-${i}`} />)
        ) : (
          guides.slice(0, 3).map((guide, i) => (
            <motion.div 
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelect(guide)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden mb-6 shadow-2xl">
                <img src={guide.image} alt={guide.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest mb-2">
                    <MapPin size={14} className="text-sky-400" />
                    {guide.location}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{guide.name}</h3>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star size={14} className="fill-current" />
                    <span className="text-sm font-bold text-white">{guide.rating} Rating</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-500 text-sm italic line-clamp-2 px-4">"{guide.bio}"</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  </section>
);

const MotoTrekHomeSection = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <section id="moto-trek" className="py-24 bg-slate-900 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-sky-500/5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6">
              <Bike size={14} className="text-emerald-500" />
              New Feature: Moto Trek
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-display leading-tight tracking-tight">
              Adventure on <br />
              <span className="text-emerald-500">Two Wheels.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
              Explore the Karakoram and Himalayan ranges like never before. From bike rentals to curated routes and emergency mechanic support, we've got your back on every mile.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { icon: <Bike className="text-emerald-500" />, title: "Bike Rentals", desc: "70cc to 250cc off-road" },
                { icon: <Wrench className="text-sky-500" />, title: "SOS Mechanics", desc: "24/7 emergency support" },
                { icon: <Navigation className="text-amber-500" />, title: "Curated Routes", desc: "Pre-planned waypoints" },
                { icon: <Backpack className="text-rose-500" />, title: "Rental Gear", desc: "Helmets, jackets & more" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-2">
                    {item.icon}
                  </div>
                  <div className="text-white font-bold text-sm">{item.title}</div>
                  <div className="text-slate-500 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={onExplore}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 group"
            >
              Explore Moto Trek
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1000" 
                alt="Motorcycle Adventure" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <Navigation size={24} />
                  </div>
                  <div>
                    <div className="text-white font-bold">Karakoram Highway</div>
                    <div className="text-emerald-400 text-xs font-medium">Most Popular Route • 450km</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 p-6 bg-white rounded-3xl shadow-2xl border border-slate-100 hidden md:block"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Wrench size={16} className="text-emerald-500" />
                </div>
                <div className="text-slate-900 font-bold text-sm">SOS Support</div>
              </div>
              <div className="text-slate-500 text-xs font-medium">12 Mechanics nearby</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MicroTrekHomeSection = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-black uppercase tracking-widest mb-6">
              <Trees size={14} /> Local: Micro Treks
            </div>
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Walk with the <span className="text-emerald-500">Village Elders</span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              Short, impactful hikes led by the people who know these mountains best. Discover hidden heritage, ancient stories, and local secrets.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              {[
                { label: 'Village Guides', value: '30+', icon: Users },
                { label: 'Short Routes', value: '20+', icon: Navigation },
                { label: 'Fixed Pricing', value: '$15 - $25', icon: CreditCard },
                { label: 'Cultural Add-ons', value: 'Tea & Stories', icon: MessageSquare }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold">{stat.value}</p>
                    <p className="text-slate-500 text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={onExplore}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2"
            >
              EXPLORE MICRO TREKS <ArrowRight size={20} />
            </button>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-[48px] overflow-hidden border-8 border-slate-100 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/micro-trek-hero/800/1000" 
                alt="Hiking with local guide" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-white/20 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <Quote size={24} />
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold">Local Wisdom</p>
                    <p className="text-slate-500 text-xs">Authentic Village Guides</p>
                  </div>
                </div>
                <p className="text-slate-700 text-sm italic">"These trails have been our life for generations. Let us show you the soul of our village."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LocalExperiencesSection = ({ onViewAll, onSelect }: { onViewAll: () => void, onSelect: (exp: LocalExperience) => void }) => {
  const featured = getFeaturedExperiences(3);
  
  return (
    <section id="local-experiences" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          <div className="max-w-2xl">
            <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-4 block">Authentic Moments</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-display mb-6 tracking-tight">Local Experiences</h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Book unique micro-activities hosted by local students. Experience the real Pakistan through the eyes of its people.
            </p>
          </div>
          <button 
            onClick={onViewAll}
            className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20"
          >
            Explore All Experiences
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => (
  <section id="why-us" className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 text-[10px] font-bold uppercase tracking-widest mb-4">
          <ShieldCheck size={14} className="text-sky-500" />
          The Ghoomer Advantage
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-display mb-4 tracking-tight">Why Choose Us?</h2>
        <p className="text-slate-500 leading-relaxed font-medium">
          We're redefining adventure in Pakistan by connecting you with the most passionate local experts for safe, authentic, and unforgettable journeys.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: "Verified Guides",
            desc: "Every guide on our platform undergoes a rigorous multi-step verification process, including background checks and skill assessments.",
            icon: <ShieldCheck className="text-emerald-500" />,
            bg: "bg-emerald-50"
          },
          {
            title: "Local Expertise",
            desc: "Our guides are true locals who know the hidden gems, secret trails, and authentic stories that you won't find in any guidebook.",
            icon: <MapPin className="text-sky-500" />,
            bg: "bg-sky-50"
          },
          {
            title: "Flexible Booking",
            desc: "Travel with peace of mind. We offer easy rescheduling and flexible cancellation policies to accommodate your changing plans.",
            icon: <Clock className="text-amber-500" />,
            bg: "bg-amber-50"
          },
          {
            title: "Safety First",
            desc: "Your safety is our priority. We provide 24/7 support, emergency SOS features, and vetted equipment for all expeditions.",
            icon: <ShieldCheck className="text-rose-500" />,
            bg: "bg-rose-50"
          }
        ].map((benefit, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[32px] border border-slate-200/50 shadow-sm hover:shadow-md transition-all group"
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", benefit.bg)}>
              {benefit.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">{benefit.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {benefit.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 text-[10px] font-bold uppercase tracking-widest mb-6">
              <MessageSquare size={14} className="text-sky-500" />
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display leading-tight">
              Have Questions? <br />
              <span className="text-sky-500">We're Here to Help.</span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-xl">
              Whether you're planning a custom expedition or need help with a booking, our team of adventure experts is ready to assist you.
            </p>

            <div className="space-y-6">
              {[
                { icon: <Mail className="text-sky-500" />, title: "Email Us", detail: "support@ghoomer.pk", bg: "bg-sky-50" },
                { icon: <Phone className="text-emerald-500" />, title: "Call Us", detail: "+92 300 1234567", bg: "bg-emerald-50" },
                { icon: <MapPin className="text-amber-500" />, title: "Our Office", detail: "Hunza Valley, Gilgit-Baltistan, Pakistan", bg: "bg-amber-50" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", item.bg)}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.title}</div>
                    <div className="text-slate-900 font-bold">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/10 to-emerald-500/10 rounded-[40px] blur-2xl -z-10" />
            <div className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-200/60 shadow-2xl relative">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-sky-600 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Message</label>
                    <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all resize-none" placeholder="Write your message here..."></textarea>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold shadow-lg shadow-sky-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <Clock size={20} />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CarCard: React.FC<{ car: CarType }> = ({ car }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group"
  >
    <div className="h-48 overflow-hidden relative">
      <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wider shadow-sm">
        {car.type}
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{car.name}</h3>
          <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
            <Users size={12} />
            <span>Up to {car.capacity} passengers</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sky-500 font-bold text-lg">${car.pricePerDay}</div>
          <div className="text-[10px] text-slate-400 uppercase font-bold">per day</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {car.features.map(feature => (
          <span key={feature} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-100">
            {feature}
          </span>
        ))}
      </div>
      <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
        <Car size={16} />
        Rent Now
      </button>
    </div>
  </motion.div>
);

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center rotate-3">
              <Mountain className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tighter font-display">Ghoomer.pk</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Your premier gateway to the hidden gems of Pakistan. We provide curated experiences, professional guides, and seamless logistics for your next adventure.
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com/ghoomer" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sky-500 transition-colors">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com/ghoomer" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sky-500 transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://twitter.com/ghoomer" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sky-500 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="https://youtube.com/ghoomer" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sky-500 transition-colors">
              <Youtube size={18} />
            </a>
            <a href="https://linkedin.com/company/ghoomer" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sky-500 transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><button className="hover:text-sky-400 transition-colors">About Us</button></li>
            <li><button className="hover:text-sky-400 transition-colors">Popular Tours</button></li>
            <li><button className="hover:text-sky-400 transition-colors">Our Guides</button></li>
            <li><button className="hover:text-sky-400 transition-colors">Car Rentals</button></li>
            <li><button className="hover:text-sky-400 transition-colors">Contact Us</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Contact Info</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-sky-500 shrink-0" />
              <span>123 Adventure Way, Islamabad, Pakistan</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-sky-500 shrink-0" />
              <span>+92 300 1234567</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-sky-500 shrink-0" />
              <span>hello@ghoomer.pk</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
          <p className="text-slate-400 text-sm mb-6">Subscribe to get special offers and travel inspiration.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-sky-500 transition-colors"
            />
            <button className="absolute right-2 top-2 bottom-2 px-4 bg-sky-500 rounded-lg text-xs font-bold hover:bg-sky-600 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
        <p>© 2026 Ghoomer.pk. All rights reserved.</p>
        <div className="flex gap-8">
          <button className="hover:text-white transition-colors">Privacy Policy</button>
          <button className="hover:text-white transition-colors">Terms of Service</button>
        </div>
      </div>
    </div>
  </footer>
);

const DestinationCard: React.FC<{ dest: Destination; onClick: () => void; onBook: () => void }> = ({ dest, onClick, onBook }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="relative h-[450px] rounded-[40px] overflow-hidden group shadow-2xl border border-white/10 cursor-pointer"
  >
    <div onClick={onClick} className="absolute inset-0">
      <img 
        src={dest.image} 
        alt={dest.name} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />
    </div>
    
    <div className="absolute top-8 left-8 flex flex-col gap-2 pointer-events-none">
      <span className="w-fit px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
        {dest.region}
      </span>
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
      <div onClick={onClick} className="cursor-pointer">
        <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3">
          <Users size={14} />
          100% Private Tour
        </div>
        <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors font-display">{dest.name}</h3>
        <p className="text-slate-300 text-sm mb-8 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed font-medium">
          {dest.description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col" onClick={onClick}>
          <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Starting from</span>
          <span className="text-2xl font-black text-white">${dest.price}</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onBook();
          }}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 flex items-center gap-2"
        >
          Book Now
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  </motion.div>
);

const StarRating: React.FC<{ rating: number; size?: number }> = ({ rating, size = 14 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={size} className="fill-amber-500 text-amber-500" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star size={size} className="text-slate-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star size={size} className="fill-amber-500 text-amber-500" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="text-slate-300" />
      ))}
    </div>
  );
};

const GuideCard: React.FC<{ 
  guide: Guide; 
  onSelect: (guide: Guide) => void; 
  onContact: (guide: Guide) => void;
  onBook: (guide: Guide) => void;
  isSaved?: boolean;
  onToggleSave?: (guideId: string) => void;
}> = ({ guide, onSelect, onContact, onBook, isSaved, onToggleSave }) => {
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: `${guide.name} - Verified Guide on Ghoomer.pk`,
      text: `Check out ${guide.name}, a verified local guide in ${guide.location}!`,
      url: window.location.origin + `?guide=${guide.id}`,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
    }
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave?.(guide.id);
  };

  return (
    <motion.div 
      whileHover={{ y: -12, scale: 1.02 }}
      onClick={() => onSelect(guide)}
      className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-slate-100 group cursor-pointer transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)]"
    >
      <div className="relative h-72 overflow-hidden">
        <img 
          src={guide.image} 
          alt={guide.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        <div className="absolute top-6 left-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-slate-100">
              <img 
                src={guide.image} 
                alt={guide.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {guide.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-sky-600 text-white rounded-full p-1.5 border-2 border-white shadow-lg">
                <CheckCircle2 size={12} />
              </div>
            )}
          </div>
        </div>

        <div className="absolute top-6 right-6 flex flex-col gap-2">
          <div className="px-4 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-2 backdrop-blur-md border border-white/20">
            <Users size={12} /> Private Tours
          </div>
          {guide.badge && (
            <div className="px-4 py-1.5 rounded-full bg-sky-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-xl backdrop-blur-md border border-white/20">
              {guide.badge}
            </div>
          )}
        </div>

        <div className="absolute bottom-6 right-6 flex gap-2 transition-all duration-300">
          <button 
            onClick={handleShare}
            className="w-10 h-10 bg-white/90 backdrop-blur-md hover:bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl transition-all"
          >
            <Share2 size={18} />
          </button>
          <button 
            onClick={handleToggleSave}
            className={cn(
              "w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl transition-all",
              isSaved ? "bg-rose-500 text-white" : "bg-white/90 text-slate-900"
            )}
          >
            <Heart size={18} className={cn(isSaved && "fill-current")} />
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{guide.name}</h3>
            <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
              <MapPin size={14} className="text-sky-500" />
              {guide.location}
            </div>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            <StarRating rating={guide.rating} size={14} />
            <span className="text-amber-700 font-black text-sm">{guide.rating}</span>
          </div>
        </div>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 font-medium italic">
          "{guide.bio}"
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Per Day</span>
            <span className="text-xl font-black text-slate-900">${guide.pricePerDay}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onContact(guide); }}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <MessageSquare size={14} />
              Contact
            </button>
            <div className="relative group/tooltip">
              <button 
                onClick={(e) => { e.stopPropagation(); onBook(guide); }}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-sky-600/20"
              >
                Book Now
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl">
                Book this guide for your next adventure
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GuideModal: React.FC<{ guide: Guide | null; onClose: () => void; onBook: (guide: Guide) => void; onContact: (guide: Guide) => void }> = ({ guide, onClose, onBook, onContact }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'trips' | 'reviews'>('about');

  if (!guide) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-all z-10"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 h-80 lg:h-auto relative">
              <img 
                src={guide.image} 
                alt={guide.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent lg:hidden" />
              <div className="absolute bottom-6 left-6 text-white lg:hidden">
                <h2 className="text-3xl font-bold font-display">{guide.name}</h2>
                <p className="opacity-80 flex items-center gap-1"><MapPin size={16} /> {guide.location}</p>
              </div>
            </div>

            <div className="lg:col-span-7 p-8 lg:p-10">
              <div className="hidden lg:block mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-4xl font-bold text-slate-900 font-display">{guide.name}</h2>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={20} className="fill-amber-500" />
                    {guide.rating}
                  </div>
                </div>
                <p className="text-slate-500 flex items-center gap-1.5"><MapPin size={18} /> {guide.location}</p>
              </div>

              <div className="flex border-b border-slate-100 mb-8">
                {(['about', 'trips', 'reviews'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-6 py-3 text-sm font-bold capitalize transition-all relative",
                      activeTab === tab ? "text-sky-600" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600" />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[300px]">
                {activeTab === 'about' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Biography</h4>
                      <p className="text-slate-600 leading-relaxed italic">"{guide.bio}"</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Experience</h4>
                        <p className="text-slate-900 font-bold text-lg">{guide.experienceYears} Years</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Languages</h4>
                        <p className="text-slate-900 font-bold text-sm">{guide.languages.join(', ')}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekly Availability</h4>
                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                          <CheckCircle2 size={10} />
                          Next: {guide.availability[0]}
                        </span>
                      </div>
                      <div className="grid grid-cols-7 gap-1.5">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                          const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                          const isAvailable = guide.availability.includes(fullDays[i]);
                          return (
                            <Tooltip key={day} text={isAvailable ? "Available for booking" : "Fully booked"}>
                              <div 
                                className={cn(
                                  "flex flex-col items-center justify-center py-3 rounded-xl border text-[10px] font-bold transition-all",
                                  isAvailable 
                                    ? "bg-emerald-50 border-emerald-100 text-emerald-700 shadow-sm" 
                                    : "bg-slate-50 border-slate-100 text-slate-300"
                                )}
                              >
                                {day}
                                <div className={cn(
                                  "w-1 h-1 rounded-full mt-1",
                                  isAvailable ? "bg-emerald-400" : "bg-slate-200"
                                )} />
                              </div>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'trips' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {DESTINATIONS.slice(0, 2).map(dest => (
                      <div key={dest.id} className="border border-slate-100 rounded-2xl overflow-hidden group">
                        <div className="h-32 overflow-hidden">
                          <img src={dest.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                        </div>
                        <div className="p-4">
                          <h5 className="font-bold text-slate-900 text-sm mb-1">{dest.name}</h5>
                          <p className="text-xs text-slate-500 mb-2">{dest.activityType}</p>
                          <div className="text-sky-600 font-bold text-sm">From ${dest.price}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {[1, 2].map(i => (
                      <div key={i} className="border-b border-slate-50 pb-6 last:border-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold">U</div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">Verified Traveler</div>
                            <div className="flex text-amber-400"><Star size={12} className="fill-amber-400" /> <Star size={12} className="fill-amber-400" /> <Star size={12} className="fill-amber-400" /> <Star size={12} className="fill-amber-400" /> <Star size={12} className="fill-amber-400" /></div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed italic">"An incredible experience! {guide.name} was professional, knowledgeable, and made us feel safe throughout the entire trek."</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="pt-8 border-t border-slate-100 flex items-center gap-4 mt-8">
                <div className="flex-1">
                  <div className="text-slate-400 text-xs mb-1 uppercase font-bold tracking-widest">Price per day</div>
                  <div className="text-2xl font-bold text-slate-900 font-display">${guide.pricePerDay}</div>
                </div>
                <button 
                  onClick={() => onContact(guide)}
                  className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-bold transition-all flex items-center gap-2"
                >
                  <MessageSquare size={20} />
                  <span className="hidden sm:inline">Contact</span>
                </button>
                <button 
                  onClick={() => onBook(guide)}
                  className="flex-1 px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold shadow-lg shadow-sky-100 transition-all hover:-translate-y-1"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const BookingModal: React.FC<{ 
  isOpen: boolean;
  guide: Guide | null; 
  onClose: () => void; 
  onBookingComplete: (booking: Booking) => void;
  onViewDashboard: () => void;
  initialStartDate?: string;
  initialTripName?: string;
  initialDays?: number;
  initialTravelers?: number;
  user: User | null;
  onLoginClick: () => void;
  guides: Guide[];
}> = ({ isOpen, guide: initialGuide, onClose, onBookingComplete, onViewDashboard, initialStartDate, initialTripName, initialDays, initialTravelers, user, onLoginClick, guides }) => {
  const [step, setStep] = useState<'guide' | 'dates' | 'policy' | 'success'>(initialGuide ? 'dates' : 'guide');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');
  const [error, setError] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(initialGuide);
  const [formData, setFormData] = useState({
    tripName: initialTripName || '',
    startDate: initialStartDate || '',
    days: initialDays || 3,
    travelers: initialTravelers || 1,
    cancellationPolicy: '24h' as '24h' | '7d' | 'Non-refundable'
  });

  const steps = [
    { id: 'guide', label: 'Guide' },
    { id: 'dates', label: 'Details' },
    { id: 'policy', label: 'Policy' },
    { id: 'success', label: 'Done' }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  useEffect(() => {
    if (initialGuide) {
      setSelectedGuide(initialGuide);
    }
  }, [initialGuide]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      tripName: initialTripName || prev.tripName,
      startDate: initialStartDate || prev.startDate,
      days: initialDays || prev.days,
      travelers: initialTravelers || prev.travelers
    }));
  }, [initialStartDate, initialTripName, initialDays, initialTravelers]);

  if (!isOpen) return null;

  const activeGuide = selectedGuide || (guides.length > 0 ? guides[0] : null);
  if (!activeGuide) return null;

  const guideToUse = activeGuide;
  const totalPrice = (guideToUse.pricePerDay + (formData.travelers > 1 ? (formData.travelers - 1) * 20 : 0)) * formData.days;

  const handleGuideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGuide) {
      setError('Please select a guide');
      return;
    }
    setError('');
    setStep('dates');
  };

  const handleDatesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onLoginClick();
      return;
    }
    if (!formData.startDate) {
      setError('Please select a start date');
      return;
    }
    setError('');
    setStep('policy');
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const endDate = new Date(new Date(formData.startDate).getTime() + formData.days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guideId: guideToUse.id,
          guideName: guideToUse.name,
          tripName: formData.tripName || "Custom Expedition",
          startDate: formData.startDate,
          endDate,
          days: formData.days,
          travelers: formData.travelers,
          totalPrice,
          cancellationPolicy: formData.cancellationPolicy
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Booking request failed');

      onBookingComplete(data.booking);
      setConfirmedBookingId(data.booking.id);
      setStep('success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-all z-10"
          >
            <X size={20} />
          </button>

          {step !== 'success' && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.slice(0, 3).map((s, i) => (
                  <div key={s.id} className="flex items-center flex-1 last:flex-none">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                      currentStepIndex >= i 
                        ? "bg-sky-500 text-white shadow-lg shadow-sky-100" 
                        : "bg-slate-100 text-slate-400"
                    )}>
                      {i + 1}
                    </div>
                    {i < 2 && (
                      <div className={cn(
                        "h-0.5 flex-1 mx-2 transition-all",
                        currentStepIndex > i ? "bg-sky-500" : "bg-slate-100"
                      )} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between px-1">
                {steps.slice(0, 3).map((s, i) => (
                  <span key={s.id} className={cn(
                    "text-[10px] font-black uppercase tracking-widest transition-all",
                    currentStepIndex === i ? "text-sky-600" : "text-slate-400"
                  )}>
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {step === 'success' ? (
            <div className="text-center py-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Clock size={40} />
              </motion.div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h2>
              <p className="text-slate-500 mb-6">Your booking request has been sent to {guideToUse.name}. You'll be notified once they approve the trip.</p>
              
              <div className="p-4 bg-slate-50 rounded-2xl text-left space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Request ID:</span>
                  <span className="font-mono font-bold text-sky-600">{confirmedBookingId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Trip:</span>
                  <span className="font-bold text-slate-900">{formData.tripName || "Custom Expedition"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Status:</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest">Pending Approval</span>
                </div>
              </div>

              <button 
                onClick={onViewDashboard}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                View My Bookings
              </button>
            </div>
          ) : step === 'guide' ? (
            <form onSubmit={handleGuideSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Select Your Guide</h2>
              <p className="text-slate-500 text-sm mb-6">Choose the expert who will lead your adventure.</p>
              
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {guides.map(g => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedGuide(g)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group",
                      selectedGuide?.id === g.id 
                        ? "border-sky-500 bg-sky-50 ring-2 ring-sky-500/20" 
                        : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <img src={g.image} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900">{g.name}</h4>
                      <p className="text-xs text-slate-500">{g.location} • ${g.pricePerDay}/day</p>
                    </div>
                    {selectedGuide?.id === g.id && <CheckCircle2 size={20} className="text-sky-500" />}
                  </button>
                ))}
              </div>

              {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}

              <button 
                type="submit"
                className="w-full py-4 bg-sky-500 text-white rounded-2xl font-bold hover:bg-sky-600 transition-all flex items-center justify-center gap-2"
              >
                Next Step <ArrowRight size={18} />
              </button>
            </form>
          ) : step === 'dates' ? (
            <form onSubmit={handleDatesSubmit} className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={guideToUse.image} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{guideToUse.name}</h2>
                  <p className="text-xs text-slate-500">{guideToUse.location}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Trip Name</label>
                  <input 
                    type="text"
                    placeholder="e.g. Hunza Valley Expedition"
                    value={formData.tripName}
                    onChange={e => setFormData({...formData, tripName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Start Date</label>
                    <input 
                      type="date"
                      value={formData.startDate}
                      onChange={e => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Duration (Days)</label>
                    <input 
                      type="number"
                      min="1"
                      max="30"
                      value={formData.days}
                      onChange={e => setFormData({...formData, days: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Number of Travelers</label>
                  <input 
                    type="number"
                    min="1"
                    max="10"
                    value={formData.travelers}
                    onChange={e => setFormData({...formData, travelers: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}

              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setStep('guide')}
                  className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 bg-sky-500 text-white rounded-2xl font-bold hover:bg-sky-600 transition-all"
                >
                  Next Step
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRequestSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Cancellation Policy</h2>
              <p className="text-slate-500 text-sm mb-6">Select a cancellation policy for this booking.</p>

              <div className="space-y-3">
                {[
                  { id: '24h', label: 'Flexible (24h)', desc: 'Full refund if cancelled 24h before start.' },
                  { id: '7d', label: 'Moderate (7d)', desc: 'Full refund if cancelled 7 days before start.' },
                  { id: 'Non-refundable', label: 'Strict', desc: 'No refunds once confirmed and paid.' }
                ].map((policy) => (
                  <button
                    key={policy.id}
                    type="button"
                    onClick={() => setFormData({...formData, cancellationPolicy: policy.id as any})}
                    className={cn(
                      "w-full p-4 rounded-2xl border transition-all text-left",
                      formData.cancellationPolicy === policy.id 
                        ? "border-sky-500 bg-sky-50 ring-2 ring-sky-500/20" 
                        : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-900">{policy.label}</span>
                      {formData.cancellationPolicy === policy.id && <CheckCircle2 size={18} className="text-sky-500" />}
                    </div>
                    <p className="text-xs text-slate-500">{policy.desc}</p>
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Estimated Total:</span>
                  <span className="font-bold text-slate-900">${totalPrice}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Payment will be required only after the guide approves your request.</p>
              </div>

              {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}

              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setStep('dates')}
                  className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send Request'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ContactModal: React.FC<{ guide: Guide | null; onClose: () => void; user: User | null }> = ({ guide, onClose, user }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!guide) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      guideId: guide.id,
      guideName: guide.name,
      userName: formData.get('userName'),
      adventure: formData.get('adventure'),
      message: formData.get('message'),
    };
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={20} />
          </button>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h2>
              <p className="text-slate-500">{guide.name} will get back to you soon.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600">
                  <MessageSquare size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Contact {guide.name}</h3>
                  <p className="text-slate-500 text-sm">Send a direct message</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-medium">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Name</label>
                  <input 
                    name="userName" 
                    required 
                    type="text" 
                    defaultValue={user?.name || ''}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Adventure of Interest</label>
                  <select name="adventure" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all">
                    {DESTINATIONS.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                    <option value="Custom Expedition">Custom Expedition</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    name="message"
                    required 
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all resize-none" 
                    placeholder={`Hi ${guide.name}, I'm interested in...`}
                  ></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold shadow-lg shadow-sky-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const GigaByteSection = () => (
  <section id="gigabyte" className="py-24 bg-slate-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
      <img src="https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=1600&q=70" className="w-full h-full object-cover" alt="" />
    </div>
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6">
          <Bolt size={16} className="fill-amber-500" />
          GigaByte Concierge
        </div>
        <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
          Plan Your Expedition <span className="text-amber-500">From Anywhere</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Work directly with certified Pakistani mountain guides to create bespoke itineraries, process permits, and coordinate every logistical detail — all before you pack your bags.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
        {[
          { icon: <CheckCircle2 />, title: "Choose Package", desc: "Select the level of planning support you need." },
          { icon: <Search />, title: "Submit Brief", desc: "Tell us your trek, dates, and group size." },
          { icon: <Users />, title: "Meet Expert", desc: "We assign a certified local guide with direct experience." },
          { icon: <ArrowRight />, title: "Receive Plan", desc: "Get custom deliverables within 48–72 hours." },
        ].map((step, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group">
            <div className="text-amber-500 mb-6 group-hover:scale-110 transition-transform">{step.icon}</div>
            <h4 className="text-xl font-bold mb-2 font-display">{step.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[
          {
            tier: "Starter",
            name: "Itinerary Essentials",
            price: 199,
            features: ["Custom 7-14 day itinerary", "Weather window recommendations", "Permit requirements summary", "Accommodation options", "1 revision round"],
          },
          {
            tier: "Comprehensive",
            name: "Expedition Package",
            price: 499,
            featured: true,
            features: ["Everything in Starter", "Permit application assistance", "Local transport coordination", "Gear rental arrangements", "3 video consultation calls", "Unlimited revisions"],
          },
          {
            tier: "Enterprise",
            name: "Premium Partnership",
            price: 799,
            features: ["Everything in Expedition", "Dedicated account manager", "Real-time condition updates", "Staff training", "Priority emergency support"],
          },
        ].map((pkg, i) => (
          <div key={i} className={cn(
            "p-10 rounded-3xl border flex flex-col",
            pkg.featured ? "bg-white text-slate-900 border-white shadow-2xl scale-105 z-10" : "bg-slate-800/50 border-slate-700 text-white"
          )}>
            <div className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">{pkg.tier}</div>
            <h3 className="text-2xl font-bold mb-6 font-display">{pkg.name}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold font-display">${pkg.price}</span>
              <span className="text-sm opacity-60">/project</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {pkg.features.map((f, j) => (
                <li key={j} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 size={16} className={pkg.featured ? "text-emerald-500" : "text-amber-500"} />
                  <span className="opacity-80">{f}</span>
                </li>
              ))}
            </ul>
            <button className={cn(
              "w-full py-4 rounded-xl font-bold transition-all",
              pkg.featured ? "bg-sky-500 text-white hover:bg-sky-600" : "bg-white/10 text-white hover:bg-white/20"
            )}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CarRentalSection = () => (
  <section id="cars" className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Car size={14} />
            Premium Fleet
          </div>
          <h2 className="text-4xl font-bold text-slate-900 font-display mb-4">Car Rentals for Every Terrain</h2>
          <p className="text-slate-500 leading-relaxed">
            From luxury sedans for city tours to rugged 4x4s for the Karakoram Highway, we provide the best vehicles with professional drivers to ensure your safety and comfort.
          </p>
        </div>
        <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all flex items-center gap-2 text-sm shadow-sm">
          View All Vehicles
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {CARS.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  </section>
);

// --- Services Section ---

const TrustSection = () => (
  <section className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {[
          { icon: <ShieldCheck className="text-sky-500" />, title: "Verified Guides", desc: "ID verified, background checked, and certified" },
          { icon: <CheckCircle2 className="text-emerald-500" />, title: "Secure Payments", desc: "Funds held in escrow until you're satisfied" },
          { icon: <Users className="text-indigo-500" />, title: "24/7 Support", desc: "Emergency assistance in Pakistan" },
          { icon: <Star className="text-amber-500" />, title: "5-Star Rated", desc: "Trusted by 500+ adventurers" },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-2xl">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProfileView = ({ 
  user, 
  onUpdate, 
  bookings, 
  savedGuides, 
  onBack,
  onLeaveReview,
  onSelectGuide,
  onContactGuide,
  onBookGuide,
  onToggleSave,
  onCheckIn,
  onCheckOut,
  onDownloadItinerary,
  onPay,
  onCancel
}: { 
  user: User | null; 
  onUpdate: (user: User) => void; 
  bookings: Booking[]; 
  savedGuides: Guide[];
  onBack: () => void;
  onLeaveReview: (booking: Booking) => void;
  onSelectGuide: (guide: Guide) => void;
  onContactGuide: (guide: Guide) => void;
  onBookGuide: (guide: Guide) => void;
  onToggleSave: (id: string) => void;
  onCheckIn: (bookingId: string) => Promise<void>;
  onCheckOut: (bookingId: string) => Promise<void>;
  onDownloadItinerary: (bookingId: string) => Promise<void>;
  onPay: (booking: any) => void;
  onCancel: (booking: any) => void
}) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'saved' | 'video'>('profile');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, avatar, email })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Update failed');

      onUpdate(data.user);
      alert('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={onBack} className="p-2 hover:bg-white rounded-full transition-colors">
            <ChevronLeft size={24} className="text-slate-600" />
          </button>
          <h1 className="text-3xl font-bold text-slate-900 font-display">User Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-6 text-center">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg">
                {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <UserIcon size={48} className="text-emerald-500" />}
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-display">{user.name}</h2>
              <p className="text-slate-500 text-sm mb-6">{user.email}</p>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3",
                    activeTab === 'profile' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <UserIcon size={18} /> Edit Profile
                </button>
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3",
                    activeTab === 'bookings' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Calendar size={18} /> Booking History
                </button>
                <button 
                  onClick={() => setActiveTab('saved')}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3",
                    activeTab === 'saved' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Heart size={18} /> Saved Guides
                </button>
                <button 
                  onClick={() => setActiveTab('video')}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3",
                    activeTab === 'video' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Video size={18} /> Promo Video
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-900 font-display mb-6">Edit Information</h3>
                <form onSubmit={handleSubmit} className="max-w-md space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Display Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Avatar URL</label>
                    <input
                      type="text"
                      value={avatar}
                      onChange={e => setAvatar(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-emerald-500 transition-colors text-sm"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 font-display">Booking History</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trip</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guide</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-5 font-mono text-[11px] font-bold text-sky-600">{booking.id}</td>
                          <td className="px-8 py-5 font-bold text-slate-900 text-sm">{booking.tripName}</td>
                          <td className="px-8 py-5 text-slate-600 text-sm">{booking.guideName}</td>
                          <td className="px-8 py-5 text-slate-500 text-sm">{booking.startDate}</td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              {booking.status === 'Paid' && (
                                <button 
                                  onClick={() => onCheckIn(booking.id)}
                                  className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100 hover:bg-emerald-100 transition-colors"
                                >
                                  Check In
                                </button>
                              )}
                              {booking.status === 'In Progress' && (
                                <button 
                                  onClick={() => onCheckOut(booking.id)}
                                  className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100 hover:bg-amber-100 transition-colors"
                                >
                                  Check Out
                                </button>
                              )}
                              {(booking.status === 'Paid' || booking.status === 'In Progress' || booking.status === 'Completed') && (
                                <button 
                                  onClick={() => onDownloadItinerary(booking.id)}
                                  className="p-2 text-slate-400 hover:text-sky-600 transition-colors"
                                  title="Download Itinerary"
                                >
                                  <Mail size={16} />
                                </button>
                              )}
                              {booking.status === 'Completed' && (
                                <button 
                                  onClick={() => onLeaveReview(booking)}
                                  className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-sky-100 hover:bg-sky-100 transition-colors"
                                >
                                  Review
                                </button>
                              )}
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border",
                                booking.status === 'Confirmed' ? "bg-emerald-100/50 text-emerald-700 border-emerald-200" :
                                booking.status === 'Paid' ? "bg-emerald-100/50 text-emerald-700 border-emerald-200" :
                                booking.status === 'In Progress' ? "bg-amber-100/50 text-amber-700 border-amber-200" :
                                booking.status === 'Completed' ? "bg-sky-100/50 text-sky-700 border-sky-200" :
                                booking.status === 'Pending' ? "bg-amber-100/50 text-amber-700 border-amber-200" :
                                "bg-rose-100/50 text-rose-700 border-rose-200"
                              )}>
                                {booking.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {bookings.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-medium">
                            No bookings found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedGuides.map((guide) => (
                  <GuideCard 
                    key={guide.id} 
                    guide={guide} 
                    onSelect={onSelectGuide}
                    onContact={onContactGuide}
                    onBook={onBookGuide}
                    isSaved={true}
                    onToggleSave={onToggleSave}
                  />
                ))}
                {savedGuides.length === 0 && (
                  <div className="col-span-full bg-white rounded-3xl border border-slate-200/50 shadow-sm p-20 text-center">
                    <Heart className="text-slate-200 mx-auto mb-4" size={48} />
                    <p className="text-slate-400 font-medium">You haven't saved any guides yet.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'video' && (
              <VideoGenerator />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardView = ({ onBack, bookings, user, onLeaveReview, isLoading, isFavoritesLoading, savedGuides, onSelectGuide, onContactGuide, onBookGuide, onToggleSave, onCheckIn, onCheckOut, onDownloadItinerary, onPay, onCancel }: { 
  onBack: () => void, 
  bookings: Booking[], 
  user: User | null, 
  onLeaveReview: (booking: Booking) => void,
  isLoading: boolean,
  isFavoritesLoading: boolean,
  savedGuides: Guide[],
  onSelectGuide: (g: Guide) => void,
  onContactGuide: (g: Guide) => void,
  onBookGuide: (g: Guide) => void,
  onToggleSave: (id: string) => void,
  onCheckIn: (bookingId: string) => Promise<void>,
  onCheckOut: (bookingId: string) => Promise<void>,
  onDownloadItinerary: (bookingId: string) => Promise<void>,
  onPay: (booking: any) => void,
  onCancel: (booking: any) => void
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'bookings' | 'saved' | 'impact'>('bookings');

  const filteredBookings = bookings.filter(b => 
    statusFilter === 'All' || b.status === statusFilter
  );

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Confirmed': return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case 'Paid': return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case 'In Progress': return "bg-amber-50 text-amber-700 border-amber-200";
      case 'Completed': return "bg-slate-100 text-slate-700 border-slate-200";
      case 'Pending': return "bg-blue-50 text-blue-700 border-blue-200";
      case 'Cancelled': return "bg-red-50 text-red-700 border-red-200";
      case 'Rejected': return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Confirmed': return "bg-emerald-500";
      case 'Paid': return "bg-emerald-500";
      case 'In Progress': return "bg-amber-500";
      case 'Completed': return "bg-slate-500";
      case 'Pending': return "bg-blue-500";
      case 'Cancelled': return "bg-red-500";
      case 'Rejected': return "bg-red-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-slate-500 text-sm mb-1">Good morning ☀️</p>
            <h1 className="text-3xl font-bold text-slate-900 font-display">Welcome back, {user?.name.split(' ')[0] || 'Traveller'}</h1>
          </div>
          <button onClick={onBack} className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
            Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Trips Taken", val: bookings.filter(b => b.status === 'Completed').length.toString(), change: "Lifetime total", icon: <Mountain className="text-sky-500" /> },
            { label: "Upcoming", val: bookings.filter(b => b.status === 'Confirmed' || b.status === 'Paid' || b.status === 'In Progress').length.toString(), change: bookings.length > 0 ? `Next: ${bookings[0].startDate}` : "No trips", icon: <Calendar className="text-emerald-500" /> },
            { label: "Impact Tokens", val: "1,240", change: "View Dashboard", icon: <Globe className="text-emerald-500" />, onClick: () => setActiveTab('impact') },
            { label: "Total Spent", val: `$${bookings.reduce((acc, b) => acc + b.totalPrice, 0)}`, change: "Verified bookings", icon: <CreditCard className="text-indigo-500" /> },
          ].map((stat, i) => (
            <div 
              key={i} 
              onClick={stat.onClick}
              className={cn(
                "bg-white p-6 rounded-3xl border border-slate-200/50 shadow-sm transition-all",
                stat.onClick && "cursor-pointer hover:border-emerald-200 hover:shadow-emerald-100/20"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">{stat.icon}</div>
              </div>
              {isLoading ? (
                <div className="h-9 bg-slate-100 rounded-lg w-20 animate-pulse mb-1" />
              ) : (
                <div className="text-3xl font-bold text-slate-900 font-display mb-1">{stat.val}</div>
              )}
              <div className="text-xs text-emerald-600 font-bold">{stat.change}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'bookings', label: 'My Bookings', icon: <Calendar size={18} /> },
            { id: 'saved', label: 'Saved Guides', icon: <Heart size={18} /> },
            { id: 'impact', label: 'Impact Dashboard', icon: <Globe size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                  : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'impact' ? (
          <ImpactDashboard tokens={1240} projects={[]} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {activeTab === 'bookings' ? (
                <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-100/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="font-bold text-slate-900 font-display">Your Bookings</h3>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Filter Status:</span>
                      <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 outline-none focus:border-sky-500 transition-all cursor-pointer"
                      >
                        <option value="All">All Bookings</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Paid">Paid</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-0">
                    {filteredBookings.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                          <thead>
                            <tr className="border-b border-slate-100/50 bg-slate-50/30">
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Booking ID</th>
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trip Name</th>
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guide</th>
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</th>
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</th>
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100/50">
                            {filteredBookings.map((booking) => (
                              <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-5 font-mono text-[11px] font-bold text-sky-600">{booking.id}</td>
                                <td className="px-8 py-5 font-bold text-slate-900 text-sm">{booking.tripName}</td>
                                <td className="px-8 py-5 text-slate-600 text-sm">{booking.guideName}</td>
                                <td className="px-8 py-5 text-slate-500 text-sm">{booking.startDate}</td>
                                <td className="px-8 py-5 text-slate-500 text-sm">{booking.days} {booking.days === 1 ? 'day' : 'days'}</td>
                                <td className="px-8 py-5 font-bold text-slate-900 text-sm">${booking.totalPrice}</td>
                                <td className="px-8 py-5 text-right">
                                  <div className="flex items-center justify-end gap-3">
                                    {booking.status === 'Pending' && (
                                      <button 
                                        onClick={() => onPay(booking)}
                                        className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-100"
                                      >
                                        Pay Now
                                      </button>
                                    )}
                                    {booking.status === 'Paid' && (
                                      <button 
                                        onClick={() => onCheckIn(booking.id)}
                                        className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100 hover:bg-emerald-100 transition-colors"
                                      >
                                        Check In
                                      </button>
                                    )}
                                    {booking.status === 'In Progress' && (
                                      <button 
                                        onClick={() => onCheckOut(booking.id)}
                                        className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100 hover:bg-amber-100 transition-colors"
                                      >
                                        Check Out
                                      </button>
                                    )}
                                    {(booking.status === 'Pending' || booking.status === 'Confirmed' || booking.status === 'Approved') && (
                                      <button 
                                        onClick={() => onCancel(booking)}
                                        className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-rose-100 hover:bg-rose-100 transition-colors"
                                      >
                                        Cancel
                                      </button>
                                    )}
                                    {(booking.status === 'Paid' || booking.status === 'In Progress' || booking.status === 'Completed') && (
                                      <button 
                                        onClick={() => onDownloadItinerary(booking.id)}
                                        className="p-2 text-slate-400 hover:text-sky-600 transition-colors"
                                        title="Download Itinerary"
                                      >
                                        <Mail size={16} />
                                      </button>
                                    )}
                                    {booking.status === 'Completed' && (
                                      <button 
                                        onClick={() => onLeaveReview(booking)}
                                        className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-sky-100 hover:bg-sky-100 transition-colors"
                                      >
                                        Review
                                      </button>
                                    )}
                                    <span className={cn(
                                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border",
                                      getStatusStyles(booking.status)
                                    )}>
                                      <span className={cn("w-1.5 h-1.5 rounded-full", getStatusDot(booking.status))} />
                                      {booking.status}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-20 px-8">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mountain className="text-slate-200" size={32} />
                        </div>
                        <p className="text-slate-400 font-medium">
                          {statusFilter === 'All' 
                            ? "No bookings yet. Start your adventure today!" 
                            : `No ${statusFilter.toLowerCase()} bookings found.`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-slate-900 font-display">Saved Guides</h3>
                    <button className="text-sky-600 text-sm font-bold hover:underline">View All</button>
                  </div>
                  {savedGuides.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {savedGuides.map((guide) => (
                        <div key={guide.id} className="p-4 rounded-2xl border border-slate-100 hover:border-sky-100 hover:bg-sky-50/30 transition-all group">
                          <div className="flex items-center gap-4 mb-4">
                            <img src={guide.image} alt={guide.name} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                            <div>
                              <h4 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{guide.name}</h4>
                              <div className="flex items-center gap-1 text-amber-500">
                                <Star size={12} fill="currentColor" />
                                <span className="text-xs font-bold">{guide.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400">{guide.location}</span>
                            <button 
                              onClick={() => onSelectGuide(guide)}
                              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-900 hover:text-white transition-all"
                            >
                              View Profile
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="text-slate-200 mx-auto mb-4" size={32} />
                      <p className="text-slate-400 text-sm">No saved guides yet.</p>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2 font-display">Need Help?</h3>
                  <p className="text-slate-400 mb-6">Our 24/7 support team is here to assist you with your expeditions.</p>
                  <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm">Contact Support</button>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-sky-500/20 to-transparent" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-8">
                <h3 className="font-bold text-slate-900 font-display mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { label: "Find a Guide", icon: <Search size={18} />, color: "sky" },
                    { label: "GigaByte Planning", icon: <Bolt size={18} />, color: "amber" },
                    { label: "Safety Center", icon: <ShieldCheck size={18} />, color: "rose" },
                  ].map((action, i) => (
                    <button key={i} className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:border-sky-100 hover:bg-sky-50/30 transition-all text-left group">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", `bg-${action.color}-50 text-${action.color}-500`)}>{action.icon}</div>
                      <span className="font-bold text-slate-700 group-hover:text-sky-600 transition-colors">{action.label}</span>
                      <ArrowRight size={16} className="ml-auto text-slate-300 group-hover:text-sky-500 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500 rounded-3xl p-8 text-white shadow-lg shadow-rose-200 cursor-pointer hover:scale-[1.02] transition-all">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 font-display">Emergency SOS</h3>
                <p className="text-rose-100 text-sm leading-relaxed">Tap to alert emergency services and your emergency contacts immediately.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ReviewModal: React.FC<{ 
  booking: Booking | null; 
  onClose: () => void; 
  onSubmit: (review: { rating: number; comment: string; bookingId: string; guideId: string }) => Promise<void>;
}> = ({ booking, onClose, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!booking) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        rating,
        comment,
        bookingId: booking.id,
        guideId: booking.guideId
      });
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={20} />
          </button>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 font-display">Rate Your Experience</h2>
            <p className="text-slate-500 text-sm">How was your trip with {booking.guideName} to {booking.tripName}?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Your Rating</label>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-all hover:scale-110"
                  >
                    <Star 
                      size={32} 
                      className={cn(
                        "transition-colors",
                        star <= rating ? "text-amber-400 fill-current" : "text-slate-200"
                      )} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Review</label>
              <textarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all resize-none text-sm"
                placeholder="Share your thoughts about the guide and the adventure..."
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const GuideRegistrationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-all"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <ShieldCheck size={48} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Received!</h2>
                <p className="text-slate-500 max-w-md mx-auto">
                  Thank you for applying to become a Ghoomer guide. Our team will review your profile and contact you for a verification interview within 3-5 business days.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Become a Verified Guide</h2>
                  <p className="text-slate-500">Join Pakistan's premier adventure network and start earning.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" placeholder="Ali Raza" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" placeholder="ali@ghoomer.pk" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Location</label>
                      <select required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all">
                        <option value="">Select Location</option>
                        <option value="Hunza">Hunza Valley</option>
                        <option value="Skardu">Skardu</option>
                        <option value="Gilgit">Gilgit</option>
                        <option value="Chitral">Chitral</option>
                        <option value="Swat">Swat Valley</option>
                        <option value="Neelum">Neelum Valley</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Experience (Years)</label>
                      <input required type="number" min="1" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" placeholder="5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Specialties</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {["Trekking", "Mountaineering", "Photography", "Cultural Tours", "Winter Sports", "Food Tours"].map(spec => (
                        <label key={spec} className="flex items-center gap-2 p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:bg-white hover:border-sky-200 transition-all">
                          <input type="checkbox" className="rounded text-sky-500 focus:ring-sky-500" />
                          <span className="text-sm text-slate-600">{spec}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Short Bio</label>
                    <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all resize-none" placeholder="Tell us about your experience and why you love guiding..."></textarea>
                  </div>

                  <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 flex items-start gap-3">
                    <ShieldCheck className="text-sky-600 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-xs text-sky-800 leading-relaxed">
                      By submitting this application, you agree to our Guide Code of Conduct and undergo a verification process including ID check and certification review.
                    </p>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold shadow-lg shadow-sky-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Private Guided Tours",
      description: "Experience Pakistan through the eyes of a local expert. Our private tours are 100% customizable and tailored to your interests.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
      icon: <Users size={24} className="text-sky-500" />
    },
    {
      title: "Adventure Expeditions",
      description: "From K2 Base Camp to the high passes of the Karakoram, we provide the logistics and expertise for your next big adventure.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      icon: <Mountain size={24} className="text-emerald-500" />
    },
    {
      title: "Cultural Immersion",
      description: "Connect with the rich heritage of the Kalash, Balti, and Hunzakut people. Authentic stays and local festivals.",
      image: "https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=800&q=80",
      icon: <Trees size={24} className="text-amber-500" />
    },
    {
      title: "Photography Workshops",
      description: "Join professional photographers to capture the stunning landscapes and vibrant cultures of the northern areas.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      icon: <Star size={24} className="text-indigo-500" />
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-600 font-bold text-sm uppercase tracking-widest mb-4 block">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display">What We Offer</h2>
          <p className="text-slate-500 text-lg">
            We provide a range of services to ensure your journey through Pakistan is authentic, safe, and unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <button className="flex items-center gap-2 text-sky-600 font-bold hover:gap-3 transition-all">
                    Learn More <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StorySection = () => (
  <section className="py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sky-600 font-bold text-sm uppercase tracking-widest mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            Connecting the World to the <span className="gradient-text">Heart of Pakistan</span>
          </h2>
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              Ghoomer.pk was born in the high valleys of Gilgit-Baltistan, founded by a group of local guides and travelers who shared a common vision: to make Pakistan's breathtaking landscapes accessible while empowering the communities that call them home.
            </p>
            <p>
              Our mission is to provide a bridge between global adventurers and verified local experts. We believe that the best way to experience a place is through the eyes of those who live there. By connecting you directly with local guides, we ensure authentic experiences while keeping the economic benefits within the local community.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-sky-500 rounded-full" />
                  Authenticity
                </h4>
                <p className="text-sm">Real experiences, real people, real Pakistan.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  Sustainability
                </h4>
                <p className="text-sm">Empowering local economies through tourism.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1000&q=80" 
              alt="Local guide in Pakistan" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hidden md:block max-w-xs">
            <p className="text-slate-900 font-bold italic mb-4">
              "We don't just show you the mountains; we show you the soul of our people."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold">
                QA
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Qadir Ali</div>
                <div className="text-xs text-slate-500">CEO & Co-founder</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: { isOpen: boolean, onClose: () => void, onAuthSuccess: (user: User) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Authentication failed');

      onAuthSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative p-8"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-slate-500 text-sm mt-2">
              {isLogin ? 'Log in to manage your bookings and profile' : 'Join Ghoomer.pk to start your adventure'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-emerald-500 transition-colors text-sm"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-emerald-500 transition-colors text-sm"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-emerald-500 transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-emerald-600 font-bold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const MicroTrekView = ({ onBack }: { onBack: () => void }) => {
  const [treks, setTreks] = useState<any[]>([]);
  const [selectedTrek, setSelectedTrek] = useState<any | null>(null);
  const [guides, setGuides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [includeAddon, setIncludeAddon] = useState(false);

  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const res = await fetch('/api/micro-treks');
        if (res.ok) setTreks(await res.json());
      } catch (err) {
        console.error("Failed to fetch micro treks", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTreks();
  }, []);

  const fetchGuides = async (village: string) => {
    try {
      const res = await fetch(`/api/micro-treks/${village}/guides`);
      if (res.ok) setGuides(await res.json());
    } catch (err) {
      console.error("Failed to fetch guides", err);
    }
  };

  const handleBook = async (guideId: number) => {
    setIsBooking(true);
    try {
      const res = await fetch('/api/micro-treks/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trekId: selectedTrek.id,
          guideId,
          date: format(new Date(), 'yyyy-MM-dd'),
          includeAddon
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setSelectedTrek(null);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Booking failed", err);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="flex items-center text-slate-500 hover:text-emerald-500 transition-colors mb-4 group"
          >
            <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Micro Treks</h1>
          <p className="text-slate-500 mt-2">Short, impactful hikes led by local village experts.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treks.map(trek => (
              <motion.div 
                key={trek.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={trek.image} alt={trek.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-600">
                    {trek.village}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                      <Clock size={12} className="mr-1" /> {trek.duration}
                    </span>
                    <span className="flex items-center text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                      <Navigation size={12} className="mr-1" /> {trek.elevation_gain}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{trek.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">{trek.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div>
                      <span className="text-2xl font-black text-slate-900">PKR {trek.price}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedTrek(trek);
                        fetchGuides(trek.village);
                      }}
                      className="bg-emerald-500 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedTrek && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedTrek(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl relative"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedTrek(null)}
                  className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
                >
                  <X size={20} className="text-slate-600" />
                </button>

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-64 md:h-auto relative">
                    <img src={selectedTrek.image} alt={selectedTrek.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                      <h2 className="text-2xl font-black text-white mb-2">{selectedTrek.name}</h2>
                      <p className="text-white/80 text-sm">{selectedTrek.village} Village</p>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Select Local Guide</h3>
                    <div className="space-y-4 mb-6">
                      {guides.map(guide => (
                        <div 
                          key={guide.id}
                          className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-emerald-500 transition-all group cursor-pointer"
                          onClick={() => handleBook(guide.id)}
                        >
                          <div className="flex items-center gap-3">
                            <img src={guide.avatar} alt={guide.name} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{guide.name}</p>
                              <div className="flex items-center text-amber-500 text-[10px] font-bold">
                                <Star size={10} className="fill-current mr-1" /> {guide.rating} • {guide.experience}
                              </div>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                            <ArrowRight size={14} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={includeAddon}
                          onChange={e => setIncludeAddon(e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500"
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900">Cultural Tea Add-on</p>
                          <p className="text-xs text-slate-500">Tea with a local family (+PKR {selectedTrek.cultural_addon_price})</p>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Price</p>
                        <p className="text-2xl font-black text-slate-900">PKR {selectedTrek.price + (includeAddon ? selectedTrek.cultural_addon_price : 0)}</p>
                      </div>
                      {isBooking && <div className="text-emerald-500 font-bold text-sm">Booking...</div>}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MotoTrekView = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'rentals' | 'mechanics' | 'routes' | 'tours'>('rentals');
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [gear, setGear] = useState<Gear[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [bikesRes, mechanicsRes, routesRes, gearRes] = await Promise.all([
          fetch('/api/moto/bikes'),
          fetch('/api/moto/mechanics'),
          fetch('/api/moto/routes'),
          fetch('/api/moto/gear')
        ]);
        
        if (bikesRes.ok) setBikes(await bikesRes.json());
        if (mechanicsRes.ok) setMechanics(await mechanicsRes.json());
        if (routesRes.ok) setRoutes(await routesRes.json());
        if (gearRes.ok) setGear(await gearRes.json());
      } catch (err) {
        console.error("Failed to fetch Moto Trek data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSOS = async (mechanicId: number) => {
    try {
      const res = await fetch('/api/moto/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mechanicId, location: "Current GPS Location" })
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error("SOS failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center text-slate-500 hover:text-sky-500 transition-colors mb-4 group"
            >
              <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Moto Trek Adventure</h1>
            <p className="text-slate-500 mt-2">Everything you need for your motorcycle journey in the mountains.</p>
          </div>
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
            {[
              { id: 'rentals', label: 'Rentals', icon: Bike },
              { id: 'mechanics', label: 'Mechanics', icon: Wrench },
              { id: 'routes', label: 'Routes', icon: Navigation },
              { id: 'tours', label: 'Tours', icon: Backpack }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center px-4 py-2 rounded-xl text-sm font-bold transition-all",
                  activeTab === tab.id 
                    ? "bg-sky-500 text-white shadow-md shadow-sky-200" 
                    : "text-slate-500 hover:bg-slate-50"
                )}
              >
                <tab.icon size={18} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'rentals' && (
              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <Bike className="mr-2 text-sky-500" /> Available Bikes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bikes.map(bike => (
                      <div key={bike.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                        <div className="h-48 relative overflow-hidden">
                          <img src={bike.image} alt={bike.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-sky-600">
                            {bike.type}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{bike.name}</h3>
                          <p className="text-slate-500 text-sm mb-4 flex items-center">
                            <MapPin size={14} className="mr-1" /> {bike.shop_name}, {bike.location}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div>
                              <span className="text-2xl font-black text-slate-900">PKR {bike.price_per_day}</span>
                              <span className="text-slate-400 text-xs font-medium ml-1">/ day</span>
                            </div>
                            <button className="bg-sky-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-sky-600 transition-colors">
                              Rent Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <Backpack className="mr-2 text-sky-500" /> Riding Gear
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {gear.map(item => (
                      <div key={item.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm p-4 flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                        <div>
                          <h3 className="font-bold text-slate-900">{item.name}</h3>
                          <p className="text-slate-500 text-xs">{item.type}</p>
                          <p className="text-sky-600 font-bold mt-1">PKR {item.price_per_day}/day</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'mechanics' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 h-[600px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                    <div className="text-center">
                      <Map size={48} className="text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 font-medium">Interactive Mechanic Map</p>
                      <p className="text-slate-400 text-sm">Showing {mechanics.length} mechanics nearby</p>
                    </div>
                  </div>
                  {/* In a real app, this would be a Google Map with markers */}
                  {mechanics.map(m => (
                    <div 
                      key={m.id} 
                      className="absolute p-2 bg-white rounded-full shadow-lg border-2 border-sky-500 animate-bounce"
                      style={{ top: `${(m.lat - 35) * 100}%`, left: `${(m.lng - 74) * 50}%` }}
                    >
                      <Wrench size={16} className="text-sky-500" />
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-100 rounded-[32px] p-6 mb-6">
                    <h3 className="text-red-900 font-bold flex items-center mb-2">
                      <Bolt className="mr-2 animate-pulse" /> Emergency SOS
                    </h3>
                    <p className="text-red-700 text-sm mb-4">Stuck on the road? Call the nearest mechanic immediately.</p>
                    <button 
                      onClick={() => handleSOS(mechanics[0]?.id)}
                      className="w-full bg-red-600 text-white py-3 rounded-2xl font-black hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone size={20} /> SOS MECHANIC
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Top Rated Mechanics</h3>
                  {mechanics.map(m => (
                    <div key={m.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900">{m.name}</h4>
                        <div className="flex items-center text-amber-500 text-sm font-bold">
                          <Star size={14} className="fill-current mr-1" /> {m.rating}
                        </div>
                      </div>
                      <p className="text-slate-500 text-xs mb-3 flex items-center">
                        <MapPin size={12} className="mr-1" /> {m.location}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sky-600 text-xs font-bold bg-sky-50 px-2 py-1 rounded-lg">{m.specialty}</span>
                        <a href={`tel:${m.phone}`} className="text-slate-400 hover:text-sky-500 transition-colors">
                          <Phone size={18} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'routes' && (
              <div className="grid grid-cols-1 gap-8">
                {routes.map(route => (
                  <div key={route.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 h-64 lg:h-auto relative">
                      <img src={route.image} alt={route.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-black text-slate-900 shadow-sm">
                        {route.difficulty}
                      </div>
                    </div>
                    <div className="p-8 lg:w-2/3">
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600">
                          <Clock size={14} className="mr-1.5" /> {route.duration}
                        </div>
                        <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600">
                          <Navigation size={14} className="mr-1.5" /> {route.distance}
                        </div>
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{route.name}</h3>
                      <p className="text-slate-500 mb-8 leading-relaxed">{route.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Waypoints</h4>
                          <ul className="space-y-2">
                            {route.waypoints.map((wp, i) => (
                              <li key={i} className="text-sm font-bold text-slate-700 flex items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mr-2" /> {wp}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Fuel Stops</h4>
                          <ul className="space-y-2">
                            {route.fuel_stops.map((fs, i) => (
                              <li key={i} className="text-sm font-bold text-slate-700 flex items-center">
                                <Fuel size={14} className="mr-2 text-amber-500" /> {fs}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Stays</h4>
                          <ul className="space-y-2">
                            {route.accommodations.map((acc, i) => (
                              <li key={i} className="text-sm font-bold text-slate-700 flex items-center">
                                <Trees size={14} className="mr-2 text-emerald-500" /> {acc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <button className="bg-sky-500 text-white px-8 py-3 rounded-2xl font-black hover:bg-sky-600 transition-all shadow-lg shadow-sky-100 flex items-center gap-2">
                          <Map size={20} /> DOWNLOAD OFFLINE MAP
                        </button>
                        <button className="bg-slate-100 text-slate-900 px-8 py-3 rounded-2xl font-black hover:bg-slate-200 transition-all">
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tours' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-[40px] p-10 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-4">Group Ride: Karakoram Pass</h3>
                    <p className="text-sky-100 mb-8 max-w-md">Join a community of riders for a 7-day expedition through the highest paved road in the world.</p>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                          <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-4 border-sky-500 object-cover" />
                        ))}
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xs font-bold">+12</div>
                      </div>
                      <span className="text-sm font-bold">16 riders joined</span>
                    </div>
                    <button className="bg-white text-sky-600 px-8 py-4 rounded-2xl font-black hover:bg-sky-600 transition-all shadow-xl">
                      BOOK GROUP TOUR
                    </button>
                  </div>
                  <Bike size={200} className="absolute -bottom-10 -right-10 text-white/10 rotate-12" />
                </div>
                
                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10 flex flex-col justify-between">
                  <div>
                    <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                      <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">Support Vehicle Option</h3>
                    <p className="text-slate-500 mb-6">Don't worry about luggage or breakdowns. Our 4x4 support vehicle follows the group with tools, spare parts, and your bags.</p>
                    <ul className="space-y-3 mb-8">
                      {['Luggage transport', 'Mechanical support', 'Emergency medical kit', 'Refreshments & snacks'].map((item, i) => (
                        <li key={i} className="flex items-center text-sm font-bold text-slate-700">
                          <CheckCircle2 size={16} className="mr-2 text-emerald-500" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="w-full border-2 border-slate-100 text-slate-900 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all">
                    ADD SUPPORT VEHICLE (PKR 5,000/day)
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'dashboard' | 'guide' | 'destination' | 'profile' | 'find-guides' | 'experiences' | 'experience-detail' | 'moto-trek' | 'micro-trek'>('home');
  const [selectedExperience, setSelectedExperience] = useState<LocalExperience | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isGuidesLoading, setIsGuidesLoading] = useState(true);
  const [isDestinationsLoading, setIsDestinationsLoading] = useState(true);
  const [isBookingsLoading, setIsBookingsLoading] = useState(false);
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>(() => localStorage.getItem('ghoomer_region') || 'All');
  const [selectedActivity, setSelectedActivity] = useState<string>(() => localStorage.getItem('ghoomer_activity') || 'All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>(() => localStorage.getItem('ghoomer_priceRange') || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(() => localStorage.getItem('ghoomer_difficulty') || 'All');
  const [selectedSeason, setSelectedSeason] = useState<string>(() => localStorage.getItem('ghoomer_season') || 'All');
  const [selectedGroupSize, setSelectedGroupSize] = useState<string>(() => localStorage.getItem('ghoomer_groupSize') || 'All');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingGuide, setBookingGuide] = useState<Guide | null>(null);
  const [contactGuide, setContactGuide] = useState<Guide | null>(null);
  const [guideSearchQuery, setGuideSearchQuery] = useState('');
  const [destinationSearchQuery, setDestinationSearchQuery] = useState('');
  const [savedGuideIds, setSavedGuideIds] = useState<string[]>([]);
  const [isRegisteringGuide, setIsRegisteringGuide] = useState(false);
  const [selectedGuideLocation, setSelectedGuideLocation] = useState<string>('All');
  const [selectedGuideSpecialty, setSelectedGuideSpecialty] = useState<string>('All');
  const [selectedGuideRating, setSelectedGuideRating] = useState<string>('All');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentBooking, setPaymentBooking] = useState<any>(null);
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);
  const [cancellationBooking, setCancellationBooking] = useState<any>(null);
  const [isStudentApplicationOpen, setIsStudentApplicationOpen] = useState(false);
  const [isBookingConfirmationOpen, setIsBookingConfirmationOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [isGuidePassOpen, setIsGuidePassOpen] = useState(false);
  const savedGuides = guides.filter(g => savedGuideIds.includes(g.id));
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'BK-7821',
      guideId: '1',
      guideName: 'Ali Raza',
      tripName: 'K2 Base Camp Expedition',
      startDate: '2026-06-15',
      endDate: '2026-07-05',
      days: 21,
      travelers: 2,
      totalPrice: 2400,
      status: 'Confirmed',
      paymentStatus: 'Paid',
      createdAt: '2026-01-10T10:00:00Z'
    },
    {
      id: 'BK-9012',
      guideId: '2',
      guideName: 'Sarah Khan',
      tripName: 'Hunza Cultural Tour',
      startDate: '2026-04-10',
      endDate: '2026-04-15',
      days: 5,
      travelers: 4,
      totalPrice: 1800,
      status: 'Pending',
      paymentStatus: 'Unpaid',
      createdAt: '2026-02-15T14:30:00Z'
    },
    {
      id: 'BK-5544',
      guideId: '1',
      guideName: 'Ali Raza',
      tripName: 'Skardu Photography Tour',
      startDate: '2025-10-10',
      endDate: '2025-10-15',
      days: 5,
      travelers: 1,
      totalPrice: 375,
      status: 'Completed',
      paymentStatus: 'Paid',
      createdAt: '2025-09-15T11:00:00Z'
    },
    {
      id: 'BK-5543',
      guideId: '3',
      guideName: 'Ahmed Hassan',
      tripName: 'Fairy Meadows Winter Trek',
      startDate: '2025-12-20',
      endDate: '2025-12-25',
      days: 5,
      travelers: 1,
      totalPrice: 350,
      status: 'Completed',
      paymentStatus: 'Paid',
      createdAt: '2025-11-05T09:15:00Z'
    },
    {
      id: 'BK-1234',
      guideId: '4',
      guideName: 'Zara Malik',
      tripName: 'Kalash Valley Festival',
      startDate: '2026-05-12',
      endDate: '2026-05-18',
      days: 6,
      travelers: 2,
      totalPrice: 840,
      status: 'Cancelled',
      paymentStatus: 'Unpaid',
      createdAt: '2026-01-20T16:45:00Z'
    }
  ]);
  const [bookingStartDate, setBookingStartDate] = useState<string>('');
  const [bookingTripName, setBookingTripName] = useState<string>('');
  const [bookingDays, setBookingDays] = useState<number>(3);
  const [bookingTravelers, setBookingTravelers] = useState<number>(1);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setIsGuidesLoading(true);
        const response = await fetch('/api/guides');
        if (response.ok) {
          const data = await response.json();
          setGuides(data.guides);
        } else {
          // Fallback to static data if API fails
          setGuides(FEATURED_GUIDES);
        }
      } catch (err) {
        console.error("Failed to fetch guides", err);
        setGuides(FEATURED_GUIDES);
      } finally {
        setIsGuidesLoading(false);
      }
    };

    const fetchDestinations = async () => {
      try {
        setIsDestinationsLoading(true);
        const response = await fetch('/api/destinations');
        if (response.ok) {
          const data = await response.json();
          setDestinations(data.destinations);
        } else {
          setDestinations(DESTINATIONS);
        }
      } catch (err) {
        console.error("Failed to fetch destinations", err);
        setDestinations(DESTINATIONS);
      } finally {
        setIsDestinationsLoading(false);
      }
    };

    fetchGuides();
    fetchDestinations();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setIsAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

  const fetchBookings = async () => {
    if (!user) {
      setBookings([]);
      return;
    }
    try {
      setIsBookingsLoading(true);
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setIsBookingsLoading(false);
    }
  };

  const fetchFavorites = async () => {
    if (!user) {
      setSavedGuideIds([]);
      return;
    }
    try {
      setIsFavoritesLoading(true);
      const response = await fetch('/api/favorites');
      if (response.ok) {
        const data = await response.json();
        setSavedGuideIds(data.favorites);
      }
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    } finally {
      setIsFavoritesLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchFavorites();
  }, [user]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setView('home');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const submitReview = async (review: { rating: number; comment: string; bookingId: string; guideId: string }) => {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to submit review");
    }
    
    alert("Review submitted successfully!");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    localStorage.setItem('ghoomer_region', selectedRegion);
    localStorage.setItem('ghoomer_activity', selectedActivity);
    localStorage.setItem('ghoomer_priceRange', selectedPriceRange);
    localStorage.setItem('ghoomer_difficulty', selectedDifficulty);
    localStorage.setItem('ghoomer_season', selectedSeason);
    localStorage.setItem('ghoomer_groupSize', selectedGroupSize);
  }, [selectedRegion, selectedActivity, selectedPriceRange, selectedDifficulty, selectedSeason, selectedGroupSize]);

  const toggleSaveGuide = async (guideId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    // Optimistic update
    setSavedGuideIds(prev => 
      prev.includes(guideId) 
        ? prev.filter(id => id !== guideId) 
        : [...prev, guideId]
    );

    try {
      const response = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guideId })
      });

      if (!response.ok) {
        // Revert on error
        const data = await response.json();
        console.error("Failed to toggle favorite:", data.message);
        setSavedGuideIds(prev => 
          prev.includes(guideId) 
            ? prev.filter(id => id !== guideId) 
            : [...prev, guideId]
        );
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      // Revert on error
      setSavedGuideIds(prev => 
        prev.includes(guideId) 
          ? prev.filter(id => id !== guideId) 
          : [...prev, guideId]
      );
    }
  };

  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  const filteredDestinations = destinations.filter(dest => {
    const query = destinationSearchQuery.toLowerCase();
    const searchMatch = dest.name.toLowerCase().includes(query) || 
                       dest.description.toLowerCase().includes(query) ||
                       dest.region.toLowerCase().includes(query);
    
    const regionMatch = selectedRegion === 'All' || dest.region === selectedRegion;
    const activityMatch = selectedActivity === 'All' || dest.activityType === selectedActivity;
    const difficultyMatch = selectedDifficulty === 'All' || dest.difficulty === selectedDifficulty;
    const seasonMatch = selectedSeason === 'All' || dest.bestSeason === selectedSeason;
    const groupSizeMatch = selectedGroupSize === 'All' || dest.groupSize === selectedGroupSize;
    
    let priceMatch = true;
    if (selectedPriceRange === '< $400') priceMatch = dest.price < 400;
    else if (selectedPriceRange === '$400 - $800') priceMatch = dest.price >= 400 && dest.price <= 800;
    else if (selectedPriceRange === '> $800') priceMatch = dest.price > 800;

    return searchMatch && regionMatch && activityMatch && priceMatch && difficultyMatch && seasonMatch && groupSizeMatch;
  });

  const filteredGuides = guides
    .filter(guide => {
      const query = guideSearchQuery.toLowerCase();
      const searchMatch = query === '' || 
                         guide.name.toLowerCase().includes(query) || 
                         guide.location.toLowerCase().includes(query) ||
                         guide.specialties.some(s => s.toLowerCase().includes(query));
      
      const locationMatch = selectedGuideLocation === 'All' || guide.location.includes(selectedGuideLocation);
      const specialtyMatch = selectedGuideSpecialty === 'All' || guide.specialties.includes(selectedGuideSpecialty);
      
      let ratingMatch = true;
      if (selectedGuideRating === '4.5+') ratingMatch = guide.rating >= 4.5;
      else if (selectedGuideRating === '4.0+') ratingMatch = guide.rating >= 4.0;
      else if (selectedGuideRating === '3.5+') ratingMatch = guide.rating >= 3.5;

      return searchMatch && locationMatch && specialtyMatch && ratingMatch;
    })
    .sort((a, b) => {
      const query = guideSearchQuery.toLowerCase();
      if (!query) return 0;

      const getScore = (guide: Guide) => {
        let score = 0;
        const name = guide.name.toLowerCase();
        const location = guide.location.toLowerCase();
        
        // Name matches - Highest priority
        if (name === query) score += 100;
        else if (name.startsWith(query)) score += 60;
        else if (name.includes(query)) score += 20;

        // Location matches
        if (location === query) score += 80;
        else if (location.startsWith(query)) score += 40;
        else if (location.includes(query)) score += 15;

        // Specialty matches
        guide.specialties.forEach(s => {
          const specialty = s.toLowerCase();
          if (specialty === query) score += 70;
          else if (specialty.startsWith(query)) score += 35;
          else if (specialty.includes(query)) score += 10;
        });

        return score;
      };

      return getScore(b) - getScore(a);
    });

  const regions = ['All', ...Array.from(new Set(destinations.map(d => d.region)))];
  const activities = ['All', ...Array.from(new Set(destinations.map(d => d.activityType)))];
  const priceRanges = ['All', '< $400', '$400 - $800', '> $800'];
  const difficulties = ['All', ...Array.from(new Set(destinations.map(d => d.difficulty)))];
  const seasons = ['All', ...Array.from(new Set(destinations.map(d => d.bestSeason)))];
  const groupSizes = ['All', ...Array.from(new Set(destinations.map(d => d.groupSize)))];

  const guideLocations = ['All', ...Array.from(new Set(guides.map(g => g.location)))];
  const guideSpecialties = ['All', ...Array.from(new Set(guides.flatMap(g => g.specialties)))];
  const guideRatings = ['All', '4.5+', '4.0+', '3.5+'];

  const scrollToSection = (id: string) => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const element = document.querySelector(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <Navbar 
        onDashboardClick={() => setView('dashboard')} 
        onBecomeGuide={() => setIsRegisteringGuide(true)} 
        onLogoClick={() => setView('home')}
        onNavClick={(v) => setView(v as any)}
        onDestinationSelect={(dest) => {
          setSelectedDestination(dest);
        }}
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onProfileClick={() => setView('profile')}
        onFindGuidesClick={() => setView('find-guides')}
        onExperiencesClick={() => setView('experiences')}
        onMotoTrekClick={() => setView('moto-trek')}
        onMicroTrekClick={() => setView('micro-trek')}
        destinations={destinations}
        isLoading={isDestinationsLoading}
      />
      
      <AnimatePresence mode="wait">
        {view === 'micro-trek' ? (
          <motion.div
            key="micro-trek"
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen"
          >
            <MicroTrekView onBack={() => setView('home')} />
          </motion.div>
        ) : view === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen"
          >
            <DashboardView 
              onBack={() => setView('home')} 
              bookings={bookings} 
              user={user} 
              onLeaveReview={(booking) => setReviewBooking(booking)}
              isLoading={isBookingsLoading}
              isFavoritesLoading={isFavoritesLoading}
              savedGuides={savedGuides}
              onSelectGuide={(g) => {
                setSelectedGuide(g);
                setView('guide-profile');
              }}
              onContactGuide={(g) => {
                setContactGuide(g);
              }}
              onBookGuide={(g) => {
                setBookingGuide(g);
                setIsBookingModalOpen(true);
              }}
              onToggleSave={toggleSaveGuide}
              onCheckIn={async (id) => {
                try {
                  const res = await fetch(`/api/bookings/${id}/check-in`, { method: 'POST' });
                  if (!res.ok) throw new Error('Check-in failed');
                  fetchBookings();
                } catch (err) {
                  console.error(err);
                }
              }}
              onCheckOut={async (id) => {
                try {
                  const res = await fetch(`/api/bookings/${id}/check-out`, { method: 'POST' });
                  if (!res.ok) throw new Error('Check-out failed');
                  fetchBookings();
                } catch (err) {
                  console.error(err);
                }
              }}
              onDownloadItinerary={async (id) => {
                try {
                  const res = await fetch(`/api/bookings/${id}/itinerary`);
                  if (!res.ok) throw new Error('Failed to download itinerary');
                  const blob = await res.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Itinerary_${id}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                } catch (err) {
                  console.error(err);
                }
              }}
              onPay={(booking) => {
                setPaymentBooking(booking);
                setIsPaymentModalOpen(true);
              }}
              onCancel={(booking) => {
                setCancellationBooking(booking);
                setIsCancellationModalOpen(true);
              }}
            />
          </motion.div>
        ) : view === 'profile' ? (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen"
          >
            <ProfileView 
              user={user}
              onUpdate={(u) => setUser(u)}
              bookings={bookings}
              savedGuides={guides.filter(g => savedGuideIds.includes(g.id))}
              onBack={() => setView('home')}
              onLeaveReview={(booking) => setReviewBooking(booking)}
              onSelectGuide={(g) => { setSelectedGuide(g); setView('guide'); }}
              onContactGuide={(g) => setContactGuide(g)}
              onBookGuide={(g) => {
                setBookingGuide(g);
                setIsBookingModalOpen(true);
              }}
              onToggleSave={toggleSaveGuide}
              onCheckIn={async (id) => {
                try {
                  const res = await fetch(`/api/bookings/${id}/check-in`, { method: 'POST' });
                  if (!res.ok) throw new Error('Check-in failed');
                  fetchBookings();
                } catch (err) {
                  console.error(err);
                }
              }}
              onCheckOut={async (id) => {
                try {
                  const res = await fetch(`/api/bookings/${id}/check-out`, { method: 'POST' });
                  if (!res.ok) throw new Error('Check-out failed');
                  fetchBookings();
                } catch (err) {
                  console.error(err);
                }
              }}
              onDownloadItinerary={async (id) => {
                try {
                  const res = await fetch(`/api/bookings/${id}/itinerary`);
                  if (!res.ok) throw new Error('Failed to download itinerary');
                  const blob = await res.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Itinerary_${id}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                } catch (err) {
                  console.error(err);
                }
              }}
              onPay={(booking) => {
                setPaymentBooking(booking);
                setIsPaymentModalOpen(true);
              }}
              onCancel={(booking) => {
                setCancellationBooking(booking);
                setIsCancellationModalOpen(true);
              }}
            />
          </motion.div>
        ) : view === 'moto-trek' ? (
          <motion.div
            key="moto-trek"
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen"
          >
            <MotoTrekView onBack={() => setView('home')} />
          </motion.div>
        ) : view === 'find-guides' ? (
          <motion.div
            key="find-guides"
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen"
          >
            <div className="max-w-7xl mx-auto px-6 pt-24">
              <button 
                onClick={() => setView('home')}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold"
              >
                <ChevronLeft size={20} /> Back to Home
              </button>
            </div>
            <FindGuidesPage onSelectGuide={(g) => { setSelectedGuide(g); setView('guide'); }} />
          </motion.div>
        ) : view === 'experiences' ? (
          <motion.div
            key="experiences"
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen"
          >
            <div className="max-w-7xl mx-auto px-6 pt-24">
              <button 
                onClick={() => setView('home')}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold"
              >
                <ChevronLeft size={20} /> Back to Home
              </button>
            </div>
            <ExperiencesPage onSelect={(exp) => { setSelectedExperience(exp); setView('experience-detail'); }} />
          </motion.div>
        ) : view === 'experience-detail' && selectedExperience ? (
          <ExperienceDetailPage 
            experience={selectedExperience}
            onBack={() => setView('experiences')}
            onBook={(exp) => {
              setBookingTripName(exp.title);
              setIsBookingModalOpen(true);
            }}
          />
        ) : view === 'guide' && selectedGuide ? (
          <GuideProfileFull 
            guide={selectedGuide}
            onClose={() => setView('home')}
            onBook={(guide) => {
              setBookingGuide(guide);
              setIsBookingModalOpen(true);
            }}
            onContact={(guide) => setContactGuide(guide)}
          />
        ) : (
          <motion.main
            key="home"
            initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Hero 
              onBecomeGuide={() => setIsRegisteringGuide(true)} 
              onDestinationSelect={(dest) => setSelectedDestination(dest)}
              onNavClick={scrollToSection}
              onBookNow={() => setIsBookingModalOpen(true)}
            />
            <TrustBar />
            
            <TravelStyleSection />
            <HowItWorks />
            <MeetOurGuides 
              onSelect={(g) => {
                setSelectedGuide(g);
                setView('guide');
              }} 
              guides={guides} 
              isLoading={isGuidesLoading} 
              onNavClick={scrollToSection} 
            />
            <LocalExperiencesSection 
              onViewAll={() => setView('experiences')} 
              onSelect={(exp) => {
                setSelectedExperience(exp);
                setView('experience-detail');
              }}
            />
            <MotoTrekHomeSection onExplore={() => setView('moto-trek')} />
            <MicroTrekHomeSection onExplore={() => setView('micro-trek')} />
            <SeasonalInspiration />
            <AdventureVisualizer />
            <ShandurVisualizer />
            <PoloVisualizer />
            <HarvestVisualizer />
            <CulinaryVisualizer />
            <BorithVisualizer />
            <DeosaiVisualizer />
            <HussainiVisualizer />
            <PetroglyphVisualizer />
            <AstrophotographyVisualizer />
            <StarTrailsVisualizer />
            <K2BaseCampVisualizer />
            <HunzaBlossomVisualizer />
            <PassuConesVisualizer />
            <WhyChooseUs />
            <ContactSection />

        {/* Featured Guides */}
        <section id="guides" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
              <div>
                <span className="text-sky-600 font-bold text-sm uppercase tracking-widest mb-2 block">Hand-picked Experts</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 lg:mb-0 tracking-tight">Verified Local Guides</h2>
                <p className="text-slate-500 mt-4 max-w-xl font-medium">Connect with professionals who offer 100% private and customizable experiences tailored to you.</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                <div className="flex-1 md:w-64 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text"
                    placeholder="Search guides..."
                    value={guideSearchQuery}
                    onChange={(e) => setGuideSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <select 
                    value={selectedGuideLocation}
                    onChange={(e) => setSelectedGuideLocation(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-xs font-bold text-slate-600"
                  >
                    {guideLocations.map(loc => <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>)}
                  </select>
                  <select 
                    value={selectedGuideSpecialty}
                    onChange={(e) => setSelectedGuideSpecialty(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-xs font-bold text-slate-600"
                  >
                    {guideSpecialties.map(spec => <option key={spec} value={spec}>{spec === 'All' ? 'All Specialties' : spec}</option>)}
                  </select>
                  <select 
                    value={selectedGuideRating}
                    onChange={(e) => setSelectedGuideRating(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-xs font-bold text-slate-600"
                  >
                    {guideRatings.map(rate => <option key={rate} value={rate}>{rate === 'All' ? 'All Ratings' : rate}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {isGuidesLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <motion.div key={`skeleton-guide-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <SkeletonCard />
                    </motion.div>
                  ))
                ) : (
                  filteredGuides.map(guide => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={guide.id}
                    >
                      <GuideCard 
                        guide={guide} 
                        onSelect={(g) => {
                          setSelectedGuide(g);
                          setView('guide');
                        }} 
                        onContact={setContactGuide}
                        onBook={(g) => {
                          setBookingGuide(g);
                          setIsBookingModalOpen(true);
                        }}
                        isSaved={savedGuideIds.includes(guide.id)}
                        onToggleSave={toggleSaveGuide}
                      />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>

            {filteredGuides.length === 0 && (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Users size={32} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No guides found</h3>
                <p className="text-slate-500">Try searching for something else or browse all guides.</p>
                <button 
                  onClick={() => setGuideSearchQuery('')}
                  className="mt-6 px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-sky-600 hover:border-sky-500 transition-all"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Destinations */}
        <section id="treks" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl text-center lg:text-left">
                <span className="text-sky-600 font-bold text-sm uppercase tracking-widest mb-4 block">Private Tour Experiences</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-display tracking-tight">Popular Private Adventures</h2>
                <p className="text-slate-500 text-lg font-medium">
                  Discover breathtaking spots in Pakistan with a private guide. No groups, no fixed schedules—just you and the destination.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text"
                    placeholder="Search adventures..."
                    value={destinationSearchQuery}
                    onChange={(e) => setDestinationSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:border-sky-500 outline-none transition-all shadow-sm"
                  />
                </div>
                <button 
                  onClick={() => {
                    setSelectedRegion('All');
                    setSelectedActivity('All');
                    setSelectedPriceRange('All');
                    setSelectedDifficulty('All');
                    setSelectedSeason('All');
                    setSelectedGroupSize('All');
                    setDestinationSearchQuery('');
                  }}
                  className="px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <X size={18} /> Reset
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Region</label>
                  <div className="flex flex-wrap gap-2">
                    {regions.map(region => (
                      <button
                        key={region}
                        onClick={() => setSelectedRegion(region)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                          selectedRegion === region 
                            ? "bg-sky-500 border-sky-500 text-white shadow-md shadow-sky-100" 
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:border-sky-500 hover:text-sky-500"
                        )}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:border-l border-slate-100 lg:pl-8">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Activity Type</label>
                  <div className="flex flex-wrap gap-2">
                    {activities.map(activity => (
                      <button
                        key={activity}
                        onClick={() => setSelectedActivity(activity)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                          selectedActivity === activity 
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-100" 
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:border-emerald-500 hover:text-emerald-500"
                        )}
                      >
                        {activity}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:border-l border-slate-100 lg:pl-8">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Price Range</label>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map(range => (
                      <button
                        key={range}
                        onClick={() => setSelectedPriceRange(range)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                          selectedPriceRange === range 
                            ? "bg-indigo-500 border-indigo-500 text-white shadow-md shadow-indigo-100" 
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:border-indigo-500 hover:text-indigo-500"
                        )}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Difficulty</label>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map(diff => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                          selectedDifficulty === diff 
                            ? "bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-100" 
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:border-rose-500 hover:text-rose-500"
                        )}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 lg:border-l lg:pl-8">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Best Season</label>
                  <div className="flex flex-wrap gap-2">
                    {seasons.map(season => (
                      <button
                        key={season}
                        onClick={() => setSelectedSeason(season)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                          selectedSeason === season 
                            ? "bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-100" 
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:border-amber-500 hover:text-amber-500"
                        )}
                      >
                        {season}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 lg:border-l lg:pl-8">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Group Size</label>
                  <div className="flex flex-wrap gap-2">
                    {groupSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedGroupSize(size)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                          selectedGroupSize === size 
                            ? "bg-violet-500 border-violet-500 text-white shadow-md shadow-violet-100" 
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:border-violet-500 hover:text-violet-500"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            <AnimatePresence>
              {(selectedDifficulty !== 'All' || selectedSeason !== 'All' || selectedGroupSize !== 'All') && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-wrap gap-3 mb-8"
                >
                  {selectedDifficulty !== 'All' && (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-xs font-bold border border-rose-100"
                    >
                      <span>Difficulty: {selectedDifficulty}</span>
                      <button onClick={() => setSelectedDifficulty('All')} className="hover:text-rose-800 transition-colors">
                        <X size={14} />
                      </button>
                    </motion.div>
                  )}
                  {selectedSeason !== 'All' && (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-xs font-bold border border-amber-100"
                    >
                      <span>Season: {selectedSeason}</span>
                      <button onClick={() => setSelectedSeason('All')} className="hover:text-amber-800 transition-colors">
                        <X size={14} />
                      </button>
                    </motion.div>
                  )}
                  {selectedGroupSize !== 'All' && (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-600 rounded-full text-xs font-bold border border-violet-100"
                    >
                      <span>Group Size: {selectedGroupSize}</span>
                      <button onClick={() => setSelectedGroupSize('All')} className="hover:text-violet-800 transition-colors">
                        <X size={14} />
                      </button>
                    </motion.div>
                  )}
                  <motion.button 
                    layout
                    onClick={() => {
                      setSelectedDifficulty('All');
                      setSelectedSeason('All');
                      setSelectedGroupSize('All');
                    }}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors px-2"
                  >
                    Clear all
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {isDestinationsLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <motion.div key={`skeleton-dest-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <SkeletonCard />
                    </motion.div>
                  ))
                ) : (
                  filteredDestinations.map(dest => (
                    <DestinationCard 
                      key={dest.id} 
                      dest={dest} 
                      onClick={() => {
                        setSelectedDestination(dest);
                      }} 
                      onBook={() => {
                        const guide = guides.find(g => g.location.includes(dest.name)) || guides[0];
                        setBookingGuide(guide);
                        setBookingTripName(dest.name);
                        setIsBookingModalOpen(true);
                      }}
                    />
                  ))
                )}
              </AnimatePresence>
            </motion.div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-20">
                <div className="text-slate-300 mb-4">
                  <Search size={48} className="mx-auto opacity-20" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No adventures found</h3>
                <p className="text-slate-500">Try adjusting your filters to find more experiences.</p>
                <button 
                  onClick={() => { 
                    setSelectedRegion('All'); 
                    setSelectedActivity('All'); 
                    setSelectedPriceRange('All'); 
                    setSelectedDifficulty('All');
                    setSelectedSeason('All');
                    setSelectedGroupSize('All');
                    setDestinationSearchQuery('');
                  }}
                  className="mt-6 text-sky-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        <ServicesSection />

        <StorySection />

        <CarRentalSection />

        <TestimonialCarousel />

        <TrustSection />

        <GigaByteSection />
      </motion.main>
    )}
  </AnimatePresence>

  <Footer />

      <DestinationModal 
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onBook={(dest, date) => {
          const guide = guides.find(g => g.location.includes(dest.name)) || guides[0];
          setBookingGuide(guide);
          setBookingTripName(dest.name);
          setBookingStartDate(date);
          setSelectedDestination(null);
          setIsBookingModalOpen(true);
        }}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <BookingModal 
        isOpen={isBookingModalOpen}
        guide={bookingGuide}
        onClose={() => {
          setIsBookingModalOpen(false);
          setBookingGuide(null);
          setBookingStartDate('');
          setBookingTripName('');
        }}
        onViewDashboard={() => {
          setIsBookingModalOpen(false);
          setBookingGuide(null);
          setBookingStartDate('');
          setBookingTripName('');
          setView('dashboard');
        }}
        onBookingComplete={addBooking}
        initialStartDate={bookingStartDate}
        initialTripName={bookingTripName}
        initialDays={bookingDays}
        initialTravelers={bookingTravelers}
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        guides={guides}
      />

      <ContactModal 
        guide={contactGuide}
        onClose={() => setContactGuide(null)}
        user={user}
      />

      <GuideRegistrationModal 
        isOpen={isRegisteringGuide}
        onClose={() => setIsRegisteringGuide(false)}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />

      <ReviewModal 
        booking={reviewBooking}
        onClose={() => setReviewBooking(null)}
        onSubmit={submitReview}
      />

      {isPaymentModalOpen && paymentBooking && (
        <PaymentModal 
          booking={paymentBooking}
          onClose={() => setIsPaymentModalOpen(false)}
          onSuccess={() => {
            setIsPaymentModalOpen(false);
            fetchBookings();
          }}
        />
      )}

      {isCancellationModalOpen && cancellationBooking && (
        <CancellationModal 
          booking={cancellationBooking}
          onClose={() => setIsCancellationModalOpen(false)}
          onConfirm={async () => {
            try {
              const res = await fetch(`/api/bookings/${cancellationBooking.id}/cancel`, { method: 'POST' });
              if (!res.ok) throw new Error('Cancellation failed');
              setIsCancellationModalOpen(false);
              fetchBookings();
            } catch (err) {
              console.error(err);
            }
          }}
        />
      )}

      {isStudentApplicationOpen && (
        <StudentGuideApplication 
          onClose={() => setIsStudentApplicationOpen(false)}
          onSubmit={async (data) => {
            try {
              const res = await fetch('/api/student/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              if (!res.ok) throw new Error('Application failed');
              alert("Application submitted successfully!");
              setIsStudentApplicationOpen(false);
            } catch (err) {
              console.error(err);
            }
          }}
        />
      )}

      {isBookingConfirmationOpen && confirmedBooking && (
        <BookingConfirmation 
          booking={confirmedBooking}
          onClose={() => setIsBookingConfirmationOpen(false)}
        />
      )}

      {isGuidePassOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden p-10"
          >
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">GuidePass Subscriptions</h2>
                <p className="text-slate-500 font-medium">Unlock exclusive benefits and support local guides.</p>
              </div>
              <button onClick={() => setIsGuidePassOpen(false)} className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                <X size={24} className="text-slate-400" />
              </button>
            </div>
            <GuidePassPricing onSubscribe={async (plan) => {
              try {
                const res = await fetch('/api/guidepass/subscribe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ plan })
                });
                if (!res.ok) throw new Error('Subscription failed');
                alert(`Subscribed to ${plan} plan!`);
                setIsGuidePassOpen(false);
              } catch (err) {
                console.error(err);
              }
            }} />
          </motion.div>
        </div>
      )}
    </div>
  );
}
