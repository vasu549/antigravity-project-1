import React from 'react';
import { ClipboardList, Users, CalendarCheck, ArrowRight, ShieldCheck, ThumbsUp } from 'lucide-react';

export default function HowItWorks({ onOpenBooking }) {
  const steps = [
    {
      step: '01',
      title: 'Choose the service you need',
      description: 'Select from our 7 core categories including plumbing, electrical, carpentry, AC repair, and home cleaning. Tell us your issue and Kadapa locality.',
      icon: ClipboardList,
      highlight: 'Takes < 30 seconds',
    },
    {
      step: '02',
      title: 'Browse pros & transparent pricing',
      description: 'Review upfront inspection fees in Indian Rupees, professional track records, customer ratings, and immediate arrival slots.',
      icon: Users,
      highlight: 'Zero surprise charges',
    },
    {
      step: '03',
      title: 'Book a convenient appointment',
      description: 'Pick your preferred date and time. A skilled technician arrives with necessary tools to inspect and resolve your repair with quality guarantee.',
      icon: CalendarCheck,
      highlight: '45-min arrival or scheduled',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full border border-orange-200">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-fixnavy-900 tracking-tight">
            How FixMate Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            No endless phone calls or negotiating rates on the street. Quick, reliable home repair right at your fingertips.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-200 group-hover:text-orange-200 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-fixnavy-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Highlight */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-orange-600">
                  <ThumbsUp className="w-4 h-4 text-orange-500" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action bar */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
          >
            <span>Book Your Service in 3 Steps</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
