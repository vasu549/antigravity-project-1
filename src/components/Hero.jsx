import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { SERVICES, KADAPA_LOCALITIES } from '../data/mockData';

export default function Hero({ onOpenBooking }) {
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    onOpenBooking({
      serviceId: selectedService || undefined,
      locality: selectedLocality || undefined
    });
  };

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-slate-100/70 via-white to-slate-50">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-orange-100/40 via-blue-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 text-xs font-bold tracking-wide shadow-xs">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Kadapa’s #1 On-Demand Home Maintenance Marketplace</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fixnavy-900 tracking-tight leading-[1.12]">
              Reliable Home Repairs,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500">
                Made Simple.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Find trusted local professionals for all your home repair and maintenance needs in <strong>Kadapa</strong>. Upfront transparent pricing, verified service quality, and lightning-fast arrival.
            </p>

            {/* Interactive Search / Booking Widget */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 max-w-2xl mx-auto lg:mx-0">
              <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Service Dropdown */}
                <div className="sm:col-span-5 relative">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 text-left px-1">
                    Select Service
                  </label>
                  <div className="relative">
                    <select
                      id="hero-service-select"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="">All Services (Plumbing, AC, etc.)</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Locality Dropdown */}
                <div className="sm:col-span-4 relative">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 text-left px-1">
                    Locality (Kadapa)
                  </label>
                  <div className="relative">
                    <select
                      id="hero-locality-select"
                      value={selectedLocality}
                      onChange={(e) => setSelectedLocality(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="">Any Locality</option>
                      {KADAPA_LOCALITIES.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Search / Action Button */}
                <div className="sm:col-span-3 flex items-end">
                  <button
                    type="submit"
                    id="hero-find-pro-btn"
                    className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-500/30 hover:shadow-orange-500/40 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-4 h-4" />
                    <span>Find Pro</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Hero Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#services"
                id="hero-explore-services-btn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-fixnavy-900 bg-white border border-slate-300/80 hover:border-slate-400 hover:bg-slate-50 shadow-xs transition-all"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-orange-500" />
              </a>

              <a
                href="#pros"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <span>Browse Local Professionals</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0">
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-fixnavy-900 font-extrabold text-base">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Upfront</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Transparent INR rates</p>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5 text-fixnavy-900 font-extrabold text-base">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>45 Mins</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Average arrival time</p>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5 text-fixnavy-900 font-extrabold text-base">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>4.85 / 5</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Customer satisfaction</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Graphic with Interactive Cards */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Main Visual Image Card */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                  alt="Skilled home technician inspecting equipment"
                  className="w-full h-80 sm:h-96 object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fixnavy-900 via-fixnavy-900/30 to-transparent"></div>
                
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                    Kadapa Express Service
                  </span>
                  <h2 className="text-xl font-bold leading-snug">
                    Fix any leak, spark, or appliance in just 1 click.
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Local technicians stationed near Apsara Circle, RTC, and Chinna Chowk.
                  </p>
                </div>
              </div>

              {/* Floating micro card 1: Technician verified */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float-subtle">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Verified Technicians</p>
                  <p className="text-[11px] text-slate-500">Background & skill checked</p>
                </div>
              </div>

              {/* Floating micro card 2: Quick Booking Pill */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white py-3 px-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Instant Help?</p>
                  <p className="text-[11px] text-orange-600 font-semibold">Kadapa: 08562-XXXXXX</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
