import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Calendar, 
  MessageCircle, 
  Share2, 
  Heart, 
  Clock, 
  Languages, 
  Award,
  CheckCircle2,
  Image as ImageIcon,
  User as UserIcon,
  Users,
  ArrowRight
} from 'lucide-react';
import { Guide } from '../lib/utils';
import { BookingCalendar } from '../components/common/BookingCalendar';
import { WeeklyAvailability } from '../components/common/WeeklyAvailability';
import { format } from 'date-fns';

interface GuideDetailPageProps {
  guide: Guide;
  onBack: () => void;
  onBook: (guide: Guide, date: string, tripName?: string) => void;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ guide, onBack, onBook }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'photos' | 'availability'>('about');
  const [isLiked, setIsLiked] = useState(false);

  const handleBook = () => {
    if (selectedDate) {
      onBook(guide, format(selectedDate, 'yyyy-MM-dd'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-bold group"
        >
          <div className="p-2 rounded-full bg-white dark:bg-slate-900 shadow-sm group-hover:shadow-md transition-all">
            <ChevronLeft size={20} />
          </div>
          Back to Guides
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Profile Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
              <div className="relative h-96 lg:h-[450px]">
                <img 
                  src={guide.image} 
                  alt={guide.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {guide.isVerified && (
                        <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                          <ShieldCheck size={12} /> Verified Expert
                        </span>
                      )}
                      {guide.badge && (
                        <span className="px-3 py-1 rounded-full bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest">
                          {guide.badge}
                        </span>
                      )}
                    </div>
                    <h1 className="text-5xl font-black text-white font-display tracking-tight mb-2">{guide.name}</h1>
                    <div className="flex items-center gap-4 text-white/80">
                      <span className="flex items-center gap-1.5 text-sm font-medium">
                        <MapPin size={18} className="text-sky-400" /> {guide.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-medium">
                        <Clock size={18} className="text-sky-400" /> {guide.experienceYears} Years Experience
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-4 rounded-2xl backdrop-blur-md border transition-all ${
                        isLiked 
                          ? "bg-rose-500 border-rose-500 text-white" 
                          : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      }`}
                    >
                      <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                    <button className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all">
                      <Share2 size={24} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-100 dark:border-slate-800 px-8 overflow-x-auto no-scrollbar">
                {(['about', 'reviews', 'photos', 'availability'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-6 text-sm font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                      activeTab === tab 
                        ? "text-sky-500" 
                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded-t-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-8 lg:p-12">
                <AnimatePresence mode="wait">
                   {activeTab === 'about' && (
                    <motion.div
                      key="about"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-10"
                    >
                      {/* Video Intro */}
                      {guide.videoIntro && (
                        <div className="rounded-[32px] overflow-hidden bg-slate-900 aspect-video relative group">
                          <video 
                            src={guide.videoIntro} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            controls
                          />
                          <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                            Guide Introduction
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-3xl bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-900/20 text-center">
                          <p className="text-2xl font-black text-sky-600 dark:text-sky-400">{guide.stats?.completedTours || 0}+</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tours Completed</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 text-center">
                          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{guide.stats?.successRate || 100}%</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success Rate</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 text-center">
                          <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{guide.stats?.responseTime || '2h'}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Response Time</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Biography</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed italic font-medium">
                          "{guide.bio}"
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400">
                              <Languages size={20} />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Languages</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {guide.languages.map(lang => (
                              <span key={lang} className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-100 dark:border-slate-800">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                              <Award size={20} />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Certifications</h4>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {guide.certifications.map(cert => (
                              <div key={cert} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                <CheckCircle2 size={14} className="text-emerald-500" />
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Why Choose {guide.name.split(' ')[0]}?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            "Certified Local Expert",
                            "Safety-First Approach",
                            "Deep Cultural Knowledge",
                            "Flexible Itineraries"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                              <CheckCircle2 size={20} className="text-emerald-500" />
                              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'availability' && (
                    <motion.div
                      key="availability"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-10"
                    >
                      <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Weekly Availability</h3>
                        <div className="p-8 rounded-[32px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                          <WeeklyAvailability availability={guide.availability} />
                          <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                            <Clock size={14} className="text-sky-500" />
                            This guide is generally available on the highlighted days.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Upcoming Group Tours</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          {guide.upcomingTours?.map((tour) => (
                            <div 
                              key={tour.id} 
                              className="group bg-slate-50 dark:bg-slate-800/50 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row hover:shadow-lg transition-all"
                            >
                              <div className="md:w-48 h-48 md:h-auto relative overflow-hidden">
                                <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest">
                                  {tour.difficulty}
                                </div>
                              </div>
                              <div className="flex-1 p-6 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">{tour.title}</h4>
                                  <div className="text-right">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">${tour.price}</span>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">per person</p>
                                  </div>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{tour.description}</p>
                                
                                <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                  <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-sky-500" />
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{format(new Date(tour.date), 'MMM d, yyyy')}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-sky-500" />
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{tour.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users size={14} className="text-sky-500" />
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{tour.availableSlots} slots left</span>
                                  </div>
                                  <button 
                                    onClick={() => onBook(guide, tour.date, tour.title)}
                                    className="flex items-center justify-center gap-2 text-sky-500 font-black text-xs uppercase tracking-widest hover:gap-3 transition-all"
                                  >
                                    Join Tour <ArrowRight size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-1">{guide.rating}</h3>
                          <div className="flex items-center gap-1 text-amber-500 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} fill={i < Math.floor(guide.rating) ? "currentColor" : "none"} />
                            ))}
                          </div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Based on {guide.reviews} reviews</p>
                        </div>
                        <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:scale-105 transition-all">
                          Write a Review
                        </button>
                      </div>

                      <div className="space-y-8">
                        {guide.reviewsList?.map((review) => (
                          <div key={review.id} className="p-8 rounded-[32px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white font-bold text-lg">
                                  {review.userAvatar ? <img src={review.userAvatar} className="w-full h-full object-cover rounded-2xl" /> : review.userName[0]}
                                </div>
                                <div>
                                  <h4 className="text-base font-black text-slate-900 dark:text-white">{review.userName}</h4>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-amber-500">
                                <Star size={16} fill="currentColor" />
                                <span className="text-lg font-black">{review.rating}</span>
                              </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium mb-6">
                              "{review.comment}"
                            </p>
                            
                            {review.images && review.images.length > 0 && (
                              <div className="flex flex-wrap gap-3">
                                {review.images.map((img, idx) => (
                                  <div key={idx} className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                                    <img src={img} className="w-full h-full object-cover" alt="Review" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'photos' && (
                    <motion.div
                      key="photos"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {guide.gallery?.map((img, i) => (
                          <motion.div 
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="aspect-square rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm"
                          >
                            <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                          </motion.div>
                        ))}
                        {(!guide.gallery || guide.gallery.length === 0) && (
                          <div className="col-span-full py-20 text-center bg-slate-50 dark:bg-slate-900/30 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800">
                            <ImageIcon size={48} className="text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500 font-medium">No photos available yet.</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Booking & Availability */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[40px] p-8 shadow-xl border border-slate-100 dark:border-slate-800 sticky top-32">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-4xl font-black text-slate-900 dark:text-white">${guide.pricePerDay}</span>
                  <span className="text-slate-400 text-xs font-bold ml-1 uppercase tracking-widest">/ Day</span>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-amber-500 font-black">
                    <Star size={16} fill="currentColor" />
                    <span>{guide.rating}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{guide.reviews} Reviews</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Availability</label>
                  <BookingCalendar 
                    availability={guide.availability}
                    onDateSelect={(date) => setSelectedDate(date)}
                    selectedDate={selectedDate}
                  />
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Clock size={18} />
                    <span className="text-xs font-bold">Responds within 2 hours</span>
                  </div>
                </div>

                <button 
                  onClick={handleBook}
                  disabled={!selectedDate}
                  className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${
                    selectedDate 
                      ? "bg-sky-500 hover:bg-sky-600 text-white shadow-sky-200 dark:shadow-none hover:-translate-y-1 active:scale-95" 
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Calendar size={20} />
                  Book Now
                </button>

                <button className="w-full py-5 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                  <MessageCircle size={20} />
                  Message {guide.name.split(' ')[0]}
                </button>
              </div>

              <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                No charge until you confirm
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-emerald-500 rounded-[40px] p-8 text-white shadow-xl shadow-emerald-200 dark:shadow-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-black text-lg leading-none mb-1">Ghoomer Safe</h4>
                  <p className="text-white/80 text-xs font-medium">Verified & Insured</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Identity Verified",
                  "Background Checked",
                  "Local Resident",
                  "First Aid Certified"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
