import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  Building2,
  ExternalLink
} from 'lucide-react';
import { saveContactInquiry } from '../services/storageService';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Easily configurable placeholders
  const CONTACT_INFO = {
    phone: "+91 98765 43210",
    phoneHref: "tel:+919876543210",
    email: "support@fixmate.in",
    emailHref: "mailto:support@fixmate.in",
    whatsappNumber: "919876543210",
    whatsappMessage: encodeURIComponent("Hello FixMate Kadapa team, I need information regarding home repair services."),
    address: "Shop #14, Apsara Circle Complex, Trunk Road, Kadapa, Andhra Pradesh 516001",
    hours: "Mon - Sun: 7:00 AM – 9:00 PM"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    setLoading(true);
    try {
      await saveContactInquiry(formData);
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Question', message: '' });
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full border border-orange-200">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-fixnavy-900 tracking-tight">
            We’re Here to Help in Kadapa
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Have questions about service coverage, pricing, or want to partner with us as a professional? Reach out through any channel below.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Quick Contact Cards & WhatsApp Direct */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp CTA Card */}
            <div className="bg-emerald-600 text-white rounded-3xl p-6 shadow-lg shadow-emerald-600/20 relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider">
                  Instant Support
                </span>
                <h3 className="text-xl font-bold">Chat With Us on WhatsApp</h3>
                <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
                  Send photos of your leakage, wiring issue, or repair need directly to our Kadapa dispatch team for immediate assessment.
                </p>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${CONTACT_INFO.whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl text-xs font-bold shadow-md transition-all mt-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Start WhatsApp Chat</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>

            {/* Configurable Contact Details Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-5 shadow-xs">
              <h4 className="font-bold text-fixnavy-900 text-sm uppercase tracking-wider text-slate-400">
                Kadapa Service Desk
              </h4>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Phone Support</p>
                  <a href={CONTACT_INFO.phoneHref} className="text-sm font-semibold text-fixnavy-900 hover:text-orange-600 transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                  <p className="text-[11px] text-slate-400">Toll-free customer hotline</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Email Inquiries</p>
                  <a href={CONTACT_INFO.emailHref} className="text-sm font-semibold text-fixnavy-900 hover:text-orange-600 transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                  <p className="text-[11px] text-slate-400">Response within 2 business hours</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Headquarters Placeholder</p>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Operating Hours</p>
                  <p className="text-xs text-slate-600 font-medium">
                    {CONTACT_INFO.hours}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-fixnavy-900 mb-1">
              Send Us a Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out this form and our local representative will call you back shortly.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50/50 rounded-2xl border border-emerald-200">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900">Message Received!</h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you for contacting FixMate Kadapa. Your inquiry has been safely saved in the demo state.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S. Harish"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                    >
                      <option value="General Question">General Inquiry</option>
                      <option value="Join as a Pro">Join FixMate as a Professional</option>
                      <option value="Bulk/Commercial Repair">Commercial / Apartment Maintenance</option>
                      <option value="Partnership">Investor / Partner Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you need help with..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-2.5 bg-fixnavy-900 hover:bg-orange-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Submitting...' : 'Send Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
