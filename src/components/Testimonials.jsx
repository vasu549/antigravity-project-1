import React from 'react';
import { Star, Quote, MapPin, AlertCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Customer Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-fixnavy-900 tracking-tight">
            Loved by Homeowners in Kadapa
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            See how prompt service and upfront pricing make a difference to real households.
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-[11px] text-slate-500 font-medium">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Illustrative sample reviews for prototype demonstration</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50 rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200/80">
                <p className="text-sm font-bold text-fixnavy-900">{t.name}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                  <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                  <span>{t.locality}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-orange-600 font-medium">{t.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
