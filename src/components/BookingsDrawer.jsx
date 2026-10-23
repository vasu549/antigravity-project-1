import React from 'react';
import { X, Calendar, Clock, MapPin, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { deleteBooking } from '../services/storageService';

export default function BookingsDrawer({ isOpen, onClose, bookings = [], onUpdate }) {
  if (!isOpen) return null;

  const handleDelete = async (id) => {
    await deleteBooking(id);
    if (onUpdate) onUpdate();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-fixnavy-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-base">My Demo Bookings ({bookings.length})</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>These appointments are stored in your local browser state for testing the end-to-end customer journey.</span>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Calendar className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">No active bookings yet</p>
              <p className="text-xs">Click "Book a Service" to schedule a test appointment.</p>
            </div>
          ) : (
            bookings.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-xs relative"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded">
                      {item.id}
                    </span>
                    <h4 className="font-bold text-fixnavy-900 text-sm mt-1">
                      {item.serviceTitle}
                    </h4>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete demo booking"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.date} • {item.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.locality}, Kadapa</span>
                  </div>
                  {item.preferredPro && (
                    <div className="text-[11px] text-orange-600 font-medium">
                      Specialist: {item.preferredPro}
                    </div>
                  )}
                  <p className="text-slate-500 italic mt-1 bg-white p-2 rounded-lg border border-slate-200">
                    "{item.description}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {item.status}
                  </span>
                  <span className="font-bold text-slate-800">
                    Fee: {item.estimatedFee}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-fixnavy-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
          >
            Close My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}
