import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Compass, Users, Map, HelpCircle, Zap, LogIn } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Find Guides', path: '/find-guides', icon: <Users size={18} /> },
    { name: 'Adventures', path: '/adventures', icon: <Compass size={18} /> },
    { name: 'How It Works', path: '/how-it-works', icon: <HelpCircle size={18} /> },
    { name: 'GigaByte', path: '/gigabyte', icon: <Zap size={18} /> },
  ];

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-[100] transition-all duration-500
      ${isScrolled 
        ? 'py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg' 
        : 'py-6 bg-transparent'}
    `}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20"
          >
            <Map size={24} />
          </motion.div>
          <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
            GHOOMER<span className="text-sky-500">.PK</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                relative text-sm font-bold transition-colors
                ${location.pathname === link.path 
                  ? 'text-sky-500' 
                  : (isScrolled ? 'text-slate-600 dark:text-slate-400 hover:text-sky-500' : 'text-white/80 hover:text-white')}
              `}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-500 rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`
              p-2.5 rounded-xl transition-all
              ${isScrolled 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' 
                : 'bg-white/10 text-white hover:bg-white/20'}
            `}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">
                  {user.name[0]}
                </Link>
                <button 
                  onClick={logout}
                  className={`text-sm font-bold ${isScrolled ? 'text-slate-600 dark:text-slate-400' : 'text-white/80'}`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`text-sm font-bold ${isScrolled ? 'text-slate-600 dark:text-slate-400' : 'text-white/80'}`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-sky-500/20 transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`
              lg:hidden p-2.5 rounded-xl
              ${isScrolled 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' 
                : 'bg-white/10 text-white'}
            `}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 text-lg font-bold text-slate-600 dark:text-slate-400"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sky-500">
                    {link.icon}
                  </div>
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
              {!user ? (
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 text-lg font-bold text-slate-600 dark:text-slate-400"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sky-500">
                      <LogIn size={20} />
                    </div>
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-4 bg-sky-500 text-white rounded-2xl text-center font-bold shadow-lg shadow-sky-500/20"
                  >
                    Create Account
                  </Link>
                </div>
              ) : (
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full py-4 bg-rose-500 text-white rounded-2xl text-center font-bold shadow-lg shadow-rose-500/20"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
