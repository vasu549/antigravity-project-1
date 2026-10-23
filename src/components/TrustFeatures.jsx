import React from 'react';
import { 
  ShieldCheck, 
  IndianRupee, 
  Clock4, 
  UserCheck, 
  Headphones, 
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';

export default function TrustFeatures() {
  const benefits = [
    {
      title: '100% Upfront Pricing in ₹',
      description: 'Know inspection fees and standard labor costs before booking. No hidden markups or arbitrary on-the-spot quotes.',
      icon: IndianRupee,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      title: 'Rapid Response in Kadapa',
      description: 'Our hyper-local dispatch gets verified technicians to your door within 45 minutes for critical leaks and electrical trippings.',
      icon: Clock4,
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      title: 'Skilled & Documented Pros',
      description: 'Every professional undergoes identity checks, craft assessment, and background validation before handling your home.',
      icon: UserCheck,
      color: 'bg-purple-50 text-purple-600 border-purple-100'
    },
    {
      title: 'FixMate Service Guarantee',
      description: 'If you are dissatisfied with an initial inspection or repair quality, our dispute resolution team will review and resolve it promptly.',
      icon: ShieldCheck,
      color: 'bg-orange-50 text-orange-600 border-orange-100'
    },
    {
      title: 'Dedicated Customer Support',
      description: 'Reach our Kadapa team directly via phone, WhatsApp, or instant web ticket for scheduling adjustments or inquiries.',
      icon: Headphones,
      color: 'bg-amber-50 text-amber-600 border-amber-100'
    },
    {
      title: 'Hassle-Free Experience',
      description: 'Clean post-work protocol ensuring work areas are left neat. Rate and review your technician transparently.',
      icon: Sparkles,
      color: 'bg-rose-50 text-rose-600 border-rose-100'
    }
  ];

  return (
    <section id="trust" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full border border-orange-200">
            Why Choose FixMate
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-fixnavy-900 tracking-tight">
            Built on Reliability, Speed, and Trust
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            We are redefining home repair in Rayalaseema by bringing accountability, transparent pricing, and technology to your everyday needs.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-5 ${b.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-fixnavy-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Local Impact Banner */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="pt-4 md:pt-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-orange-500">12+</p>
            <p className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wider">Kadapa Localities Covered</p>
            <p className="text-xs text-slate-400 mt-0.5">From Chinna Chowk to Palempalli</p>
          </div>
          <div className="pt-4 md:pt-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-fixnavy-900">45 Mins</p>
            <p className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wider">Target Arrival Window</p>
            <p className="text-xs text-slate-400 mt-0.5">Rapid emergency team availability</p>
          </div>
          <div className="pt-4 md:pt-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">₹0</p>
            <p className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wider">Hidden Charges</p>
            <p className="text-xs text-slate-400 mt-0.5">Direct transparent estimation in rupees</p>
          </div>
        </div>

      </div>
    </section>
  );
}
