import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
              <Map size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter">
              GHOOMER<span className="text-sky-500">.PK</span>
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Pakistan's premier adventure guide platform connecting travelers with verified local experts. Experience the raw beauty of the Karakoram and Himalayas.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-8">Quick Links</h4>
          <ul className="flex flex-col gap-4">
            {['Find Guides', 'Adventures', 'How It Works', 'GigaByte Concierge', 'Become a Guide'].map((link) => (
              <li key={link}>
                <Link to="#" className="text-slate-400 hover:text-sky-500 transition-colors text-sm font-medium">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-bold mb-8">Support</h4>
          <ul className="flex flex-col gap-4">
            {['Help Center', 'Safety Guidelines', 'Terms of Service', 'Privacy Policy', 'Cancellation Policy'].map((link) => (
              <li key={link}>
                <Link to="#" className="text-slate-400 hover:text-sky-500 transition-colors text-sm font-medium">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold mb-8">Contact Us</h4>
          <ul className="flex flex-col gap-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-500 shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Email</p>
                <p className="text-sm font-medium">hello@ghoomer.pk</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-500 shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Phone</p>
                <p className="text-sm font-medium">+92 300 1234567</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-500 shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Office</p>
                <p className="text-sm font-medium">Sector G-11, Islamabad, Pakistan</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-xs font-medium">
          © {new Date().getFullYear()} Ghoomer.pk. All rights reserved.
        </p>
        <div className="flex gap-8">
          <Link to="#" className="text-slate-500 hover:text-white transition-colors text-xs font-medium">Privacy Policy</Link>
          <Link to="#" className="text-slate-500 hover:text-white transition-colors text-xs font-medium">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
