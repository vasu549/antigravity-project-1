import React from 'react';
import { Star, MapPin, CheckCircle, Clock, Shield, AlertCircle, ArrowUpRight } from 'lucide-react';
import { DEMO_PROFESSIONALS } from '../data/mockData';

export default function ProsDirectory({ onBookPro }) {
  return (
    <section id="pros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-fixnavy-900 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Local Talent Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-fixnavy-900 tracking-tight">
            Meet Sample Local Professionals
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            FixMate connects you directly with skilled technicians living in Kadapa with documented experience and upfront transparent rates.
          </p>

          {/* Explicit Demo Disclaimer Alert */}
          <div className="inline-flex items-center gap-2 p-3 bg-amber-50 text-amber-800 text-xs rounded-xl border border-amber-200 text-left">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Demonstration Notice:</strong> The profiles below represent illustrative sample service partners created for MVP evaluation. Live verification badges will activate upon official city launch.
            </span>
          </div>
        </div>

        {/* Pros Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_PROFESSIONALS.map((pro) => (
            <div
              key={pro.id}
              className="bg-slate-50/70 hover:bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-orange-300 shadow-xs hover:shadow-xl hover:shadow-orange-500/10 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Avatar & Availability */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={pro.avatar}
                      alt={pro.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>
                  <span className="px-2 py-1 bg-white text-[11px] font-bold text-slate-700 rounded-lg border border-slate-200 shadow-xs">
                    {pro.experience}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="font-bold text-base text-fixnavy-900">
                  {pro.name}
                </h3>
                <p className="text-xs font-semibold text-orange-600 mb-2">
                  {pro.role}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-1.5 text-xs text-slate-700 mb-3">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold ml-1">{pro.rating}</span>
                  </div>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-medium">{pro.reviewCount} reviews</span>
                </div>

                {/* Locality */}
                <div className="flex items-center gap-1 text-xs text-slate-600 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{pro.locality}</span>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pro.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing & Booking CTA */}
              <div className="pt-3 border-t border-slate-200/80">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-slate-400 font-medium">Indicative fee:</span>
                  <span className="font-bold text-fixnavy-900">{pro.pricing}</span>
                </div>

                <button
                  onClick={() => onBookPro(pro.category, pro.name)}
                  className="w-full py-2.5 px-3 bg-fixnavy-900 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 shadow-xs"
                >
                  <span>Book with {pro.name.split(' ')[0]}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
