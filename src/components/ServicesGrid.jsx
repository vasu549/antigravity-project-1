import React, { useState } from 'react';
import { 
  Wrench, 
  Zap, 
  Hammer, 
  Paintbrush, 
  Snowflake, 
  Tv, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { SERVICES } from '../data/mockData';

// Icon mapping helper
const iconMap = {
  Wrench: Wrench,
  Zap: Zap,
  Hammer: Hammer,
  Paintbrush: Paintbrush,
  Snowflake: Snowflake,
  Tv: Tv,
  Sparkles: Sparkles,
};

export default function ServicesGrid({ onBookService }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredServices = SERVICES.filter((service) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'emergency') return ['plumbing', 'electrical', 'ac-repair'].includes(service.id);
    if (activeFilter === 'home-care') return ['carpentry', 'painting', 'cleaning', 'appliances'].includes(service.id);
    return true;
  });

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Our Expertise in Kadapa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-fixnavy-900 tracking-tight">
            Comprehensive Home Services You Can Count On
          </h2>
          <p className="text-base text-slate-600">
            From emergency leaks and spark troubleshooting to seasonal AC servicing and deep cleaning, all jobs are handled by skilled local specialists.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All 7 Services' },
              { id: 'emergency', label: '⚡ Emergency & Quick Fixes' },
              { id: 'home-care', label: '🏡 Home Care & Maintenance' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeFilter === tab.id
                    ? 'bg-fixnavy-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.iconName] || Wrench;

            return (
              <div
                key={service.id}
                className="group flex flex-col bg-slate-50/70 hover:bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-orange-300 shadow-xs hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 relative overflow-hidden"
              >
                {/* Visual Image Header */}
                <div className="relative h-44 rounded-2xl overflow-hidden mb-6 bg-slate-200">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold text-fixnavy-900 rounded-lg shadow-xs">
                    {service.badge}
                  </span>

                  {/* Icon badge */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Title & Subtitle */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold text-fixnavy-900 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">
                    {service.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed pt-1">
                    {service.description}
                  </p>

                  {/* Popular Issues Covered */}
                  <div className="pt-3">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Common Services:
                    </p>
                    <ul className="space-y-1">
                      {service.popularIssues.slice(0, 3).map((issue, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom / Price & CTA */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] text-slate-400 font-medium">Starting from</span>
                    <span className="text-lg font-extrabold text-fixnavy-900">
                      ₹{service.startingPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookService(service.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-sm shadow-orange-500/20 active:scale-95 transition-all"
                  >
                    <span>Book Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-fixnavy-900 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h4 className="font-bold text-base">Facing an emergency breakdown in Kadapa?</h4>
              <p className="text-xs text-slate-300">
                Plumbing overflows, electrical sparks, and power trippings get priority dispatch.
              </p>
            </div>
          </div>
          <button
            onClick={() => onBookService('electrical')}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition-colors shrink-0"
          >
            Emergency Dispatch (Fast Arrival)
          </button>
        </div>

      </div>
    </section>
  );
}
