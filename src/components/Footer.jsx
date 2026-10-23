import React from 'react';
import { Wrench, Phone, Mail, MapPin, Heart, ArrowUp } from 'lucide-react';
import { SERVICES } from '../data/mockData';

export default function Footer({ onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-fixnavy-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md">
                <Wrench className="w-5 h-5 -rotate-45" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Fix<span className="text-orange-500">Mate</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              FixMate is a local on-demand marketplace connecting homeowners with verified, skilled professionals for plumbing, electrical, carpentry, AC repair, and home maintenance.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Launched first in <strong>Kadapa, Andhra Pradesh</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Customer Care: +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Contact: support@fixmate.in</span>
              </div>
            </div>
          </div>

          {/* Quick Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onOpenBooking({ serviceId: s.id })}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Services Directory</a></li>
              <li><a href="#how-it-works" className="hover:text-orange-400 transition-colors">How It Works</a></li>
              <li><a href="#pros" className="hover:text-orange-400 transition-colors">Local Professionals</a></li>
              <li><a href="#trust" className="hover:text-orange-400 transition-colors">FixMate Guarantee</a></li>
              <li><a href="#contact" className="hover:text-orange-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Legal / Prototype Disclaimer & Socials */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Demo Prototype
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
              Created for startup investor pitch and MVP customer feedback. Bookings and profiles are demonstrated safely without charging payments.
            </p>

            <div className="space-y-2">
              <span className="block text-[11px] font-bold text-slate-300">Connect with us:</span>
              <div className="flex items-center gap-2">
                {['Twitter / X', 'LinkedIn', 'Instagram', 'YouTube'].map((social, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md bg-slate-800 text-[10px] text-slate-400 hover:text-white cursor-pointer hover:bg-slate-700 transition-colors"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FixMate Technologies. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy (Demo)</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
