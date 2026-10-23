import React, { useState } from 'react';
import { Wrench, Phone, Calendar, Menu, X, MapPin, ShieldCheck, ChevronRight, Lock } from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenMyBookings, onOpenAdmin, bookingCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pros', href: '#pros' },
    { name: 'Why Us', href: '#trust' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/80 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-fixnavy-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
              Live in Kadapa, AP
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline">Expanding soon to Tirupati & Kurnool</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a href="tel:+919876543210" className="hover:text-orange-400 transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-orange-400" />
              <span>Helpline: +91 98765 43210</span>
            </a>
            <span className="text-slate-600">|</span>
            {/* Top Bar Admin Quick Trigger */}
            <button
              onClick={onOpenAdmin}
              className="text-orange-400 hover:text-orange-300 font-semibold text-[11px] flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-xl bg-fixnavy-900 flex items-center justify-center shadow-md shadow-fixnavy-900/10 group-hover:scale-105 transition-transform border border-slate-700/30">
              <Wrench className="w-6 h-6 text-orange-500 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-fixnavy-900 leading-none">
                Fix<span className="text-orange-500">Mate</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase mt-1">
                Home Services Kadapa
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-orange-500 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Admin Panel Header Button */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-fixnavy-900 hover:text-orange-600 bg-slate-100 hover:bg-orange-50 rounded-lg transition-colors border border-slate-200"
              title="Access Owner Admin Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
              <span>Admin Panel</span>
            </button>

            {bookingCount > 0 && (
              <button
                onClick={onOpenMyBookings}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
                title="View your saved demo bookings"
              >
                <Calendar className="w-3.5 h-3.5 text-orange-500" />
                <span>My Bookings</span>
                <span className="px-1.5 py-0.5 text-[10px] bg-orange-500 text-white font-bold rounded-full">
                  {bookingCount}
                </span>
              </button>
            )}

            <button
              id="nav-book-btn"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 active:scale-95 transition-all"
            >
              <span>Book a Service</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1"
              title="Admin Login"
            >
              <Lock className="w-3.5 h-3.5 text-orange-500" />
              <span>Admin</span>
            </button>

            {bookingCount > 0 && (
              <button
                onClick={onOpenMyBookings}
                className="p-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-200 relative"
              >
                <Calendar className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {bookingCount}
                </span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top">
          <div className="flex items-center gap-2 py-2 px-3 mb-2 bg-slate-100 rounded-lg text-xs text-slate-700">
            <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
            <span>Serving all neighborhoods in <strong>Kadapa, AP</strong></span>
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:text-orange-600 hover:bg-orange-50/50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-fixnavy-900 bg-slate-100 hover:bg-slate-200 border border-slate-300"
            >
              <ShieldCheck className="w-4 h-4 text-orange-500" />
              <span>Owner Admin Panel (vasu549)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20"
            >
              <span>Book a Service Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            {bookingCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
              >
                View Saved Bookings ({bookingCount})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
