import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  FileText, 
  Clock, 
  AlertCircle, 
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { SERVICES, KADAPA_LOCALITIES } from '../data/mockData';
import { saveBooking } from '../services/storageService';

export default function BookingModal({ isOpen, onClose, initialData = {}, onBookingComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    locality: '',
    serviceId: '',
    date: '',
    timeSlot: '10:00 AM - 12:00 PM',
    description: '',
    preferredPro: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  // Sync initialData when modal opens
  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        name: '',
        phone: '',
        locality: initialData.locality || KADAPA_LOCALITIES[0],
        serviceId: initialData.serviceId || 'plumbing',
        date: today,
        timeSlot: '10:00 AM - 12:00 PM',
        description: '',
        preferredPro: initialData.preferredPro || ''
      });
      setErrors({});
      setConfirmation(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      errs.name = 'Please enter a valid full name';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phone = 'Mobile number is required';
    } else if (cleanPhone.length !== 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.locality) {
      errs.locality = 'Select your Kadapa locality';
    }

    if (!formData.serviceId) {
      errs.serviceId = 'Please select a service category';
    }

    if (!formData.date) {
      errs.date = 'Select preferred service date';
    }

    if (!formData.description.trim()) {
      errs.description = 'Please describe the problem or repair needed';
    } else if (formData.description.trim().length < 8) {
      errs.description = 'Please provide a little more detail (min 8 characters)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const selectedServiceObj = SERVICES.find(s => s.id === formData.serviceId);
      const res = await saveBooking({
        ...formData,
        serviceTitle: selectedServiceObj ? selectedServiceObj.title : formData.serviceId,
        estimatedFee: selectedServiceObj ? `₹${selectedServiceObj.startingPrice}` : '₹199'
      });

      setIsSubmitting(false);

      if (res.success) {
        setConfirmation(res.booking);
        if (onBookingComplete) onBookingComplete(res.booking);
      } else {
        setErrors({ form: 'Could not store booking. Please try again.' });
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrors({ form: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Modal Header */}
        <div className="bg-fixnavy-900 text-white px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                FixMate Booking Desk
              </span>
            </div>
            <h3 id="booking-modal-title" className="text-xl font-bold text-white mt-0.5">
              {confirmation ? 'Booking Confirmed!' : 'Schedule a Verified Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {confirmation ? (
            /* Confirmation View */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 font-mono text-xs font-bold rounded-lg mb-2">
                  Booking ID: {confirmation.id}
                </span>
                <h4 className="text-2xl font-black text-fixnavy-900">
                  Appointment Scheduled!
                </h4>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Thank you, <strong>{confirmation.name}</strong>. A service technician for <strong>{confirmation.serviceTitle}</strong> will contact you at <strong>+91 {confirmation.phone}</strong>.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-800">{confirmation.serviceTitle}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-bold text-slate-800">{confirmation.locality}, Kadapa</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Slot:</span>
                  <span className="font-bold text-slate-800">{confirmation.date} ({confirmation.timeSlot})</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Estimated Inspection:</span>
                  <span className="font-bold text-emerald-600">{confirmation.estimatedFee}</span>
                </div>
              </div>

              {/* Demo Notice */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Prototype Demo Mode:</strong> This booking has been saved in your browser storage. It is not currently dispatched to a real technician.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-fixnavy-900 hover:bg-fixnavy-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  Done
                </button>
                <button
                  onClick={() => setConfirmation(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Book Another Service
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Demo Banner */}
              <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
                <span>
                  <strong>Kadapa Service Area:</strong> Standard inspection fee waived if repair work is accepted.
                </span>
              </div>

              {formData.preferredPro && (
                <div className="p-2 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-800 font-medium">
                  Requested Specialist: <strong>{formData.preferredPro}</strong>
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Varma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-slate-200'} rounded-xl pl-9 pr-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white`}
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Phone (10 digits) *
                  </label>
                  <div className="relative">
                    <span className="text-xs font-bold text-slate-400 absolute left-3 top-2.5">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full bg-slate-50 border ${errors.phone ? 'border-red-500' : 'border-slate-200'} rounded-xl pl-12 pr-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Service & Locality */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Service Required *
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} (from ₹{s.startingPrice})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kadapa Locality *
                  </label>
                  <select
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  >
                    {KADAPA_LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Date & Time slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                  {errors.date && <p className="text-[11px] text-red-500 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  >
                    <option value="09:00 AM - 11:00 AM">Morning (09:00 AM - 11:00 AM)</option>
                    <option value="11:00 AM - 01:00 PM">Midday (11:00 AM - 01:00 PM)</option>
                    <option value="02:00 PM - 04:00 PM">Afternoon (02:00 PM - 04:00 PM)</option>
                    <option value="04:00 PM - 07:00 PM">Evening (04:00 PM - 07:00 PM)</option>
                    <option value="Emergency (Within 45 Mins)">⚡ Urgent Dispatch (&lt; 45 Mins)</option>
                  </select>
                </div>
              </div>

              {/* Description of Issue */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Describe the Issue or Requirement *
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Kitchen sink pipe is leaking beneath the counter, or ceiling fan making loud noise."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full bg-slate-50 border ${errors.description ? 'border-red-500' : 'border-slate-200'} rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white`}
                ></textarea>
                {errors.description && <p className="text-[11px] text-red-500 mt-1">{errors.description}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Confirming Demo Slot...
                    </span>
                  ) : (
                    <span>Confirm & Book Appointment</span>
                  )}
                </button>
              </div>

              {/* Safety & Demo disclosure */}
              <p className="text-[11px] text-center text-slate-400">
                🔒 In Demo Mode, your booking is saved securely in your browser state.
              </p>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
