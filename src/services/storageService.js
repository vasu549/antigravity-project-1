/**
 * Unified Backend Storage Service for FixMate
 * Supports Supabase with automatic fallback to LocalStorage if Supabase
 * credentials have not yet been provided in .env.
 */

import { supabase, isSupabaseConfigured } from './supabase';

const LOCAL_BOOKINGS_KEY = 'fixmate_demo_bookings';
const LOCAL_CONTACTS_KEY = 'fixmate_demo_inquiries';

// Helper for local storage read
const getLocalBookings = () => {
  try {
    const raw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Could not read local bookings', e);
    return [];
  }
};

const getLocalInquiries = () => {
  try {
    const raw = localStorage.getItem(LOCAL_CONTACTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Could not read local inquiries', e);
    return [];
  }
};

// Fetch bookings (from Supabase or local storage fallback)
export const getStoredBookings = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch error, falling back to local storage:', error.message);
        return getLocalBookings();
      }

      // Map Supabase snake_case columns back to frontend camelCase
      return data.map((b) => ({
        id: b.id,
        name: b.name,
        phone: b.phone,
        locality: b.locality,
        serviceId: b.service_id,
        serviceTitle: b.service_title,
        date: b.preferred_date,
        timeSlot: b.time_slot,
        description: b.description,
        preferredPro: b.preferred_pro,
        estimatedFee: b.estimated_fee,
        status: b.status,
        createdAt: b.created_at,
        isLiveSupabase: true
      }));
    } catch (err) {
      console.warn('Supabase network issue, using local storage:', err);
      return getLocalBookings();
    }
  }

  return getLocalBookings();
};

// Save a new booking
export const saveBooking = async (bookingData) => {
  const generatedId = 'FXM-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date().toISOString();

  // Try saving to Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            id: generatedId,
            name: bookingData.name,
            phone: bookingData.phone,
            locality: bookingData.locality,
            service_id: bookingData.serviceId,
            service_title: bookingData.serviceTitle,
            preferred_date: bookingData.date,
            time_slot: bookingData.timeSlot,
            description: bookingData.description,
            preferred_pro: bookingData.preferredPro || null,
            estimated_fee: bookingData.estimatedFee,
            status: 'Confirmed'
          }
        ])
        .select()
        .single();

      if (!error && data) {
        // Also keep local storage in sync
        const currentLocal = getLocalBookings();
        const formatted = {
          id: data.id,
          createdAt: data.created_at,
          status: data.status,
          isLiveSupabase: true,
          ...bookingData
        };
        localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify([formatted, ...currentLocal]));
        return { success: true, booking: formatted, isLiveSupabase: true };
      }

      console.warn('Supabase insert failed, saving locally:', error?.message);
    } catch (e) {
      console.warn('Supabase save error, fallback to local storage:', e);
    }
  }

  // Fallback to local storage
  try {
    const current = getLocalBookings();
    const newBooking = {
      id: generatedId,
      createdAt: now,
      status: 'Confirmed (Local / Demo)',
      isLiveSupabase: false,
      ...bookingData
    };
    const updated = [newBooking, ...current];
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(updated));
    return { success: true, booking: newBooking, isLiveSupabase: false };
  } catch (e) {
    return { success: false, error: e.message };
  }
};

// Update booking status (Admin function)
export const updateBookingStatus = async (id, newStatus) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        console.warn('Supabase update status failed:', error.message);
      }
    } catch (e) {
      console.warn('Supabase status update error:', e);
    }
  }

  try {
    const current = getLocalBookings();
    const updated = current.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    return false;
  }
};

// Delete a booking
export const deleteBooking = async (id) => {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('bookings').delete().eq('id', id);
    } catch (e) {
      console.warn('Failed to delete in Supabase:', e);
    }
  }

  try {
    const current = getLocalBookings();
    const filtered = current.filter((b) => b.id !== id);
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    return false;
  }
};

// Fetch inquiries (Admin function)
export const getStoredInquiries = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch inquiries error:', error.message);
        return getLocalInquiries();
      }

      return data.map((item) => ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        email: item.email,
        subject: item.subject,
        message: item.message,
        createdAt: item.created_at,
        isLiveSupabase: true
      }));
    } catch (err) {
      console.warn('Supabase inquiries fetch failed:', err);
      return getLocalInquiries();
    }
  }

  return getLocalInquiries();
};

// Save a contact inquiry
export const saveContactInquiry = async (inquiry) => {
  const generatedId = 'INQ-' + Date.now();

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('inquiries').insert([
        {
          id: generatedId,
          name: inquiry.name,
          phone: inquiry.phone,
          email: inquiry.email || null,
          subject: inquiry.subject,
          message: inquiry.message
        }
      ]);

      if (!error) {
        return { success: true, isLiveSupabase: true };
      }
    } catch (e) {
      console.warn('Supabase inquiry save failed:', e);
    }
  }

  // Local storage fallback
  try {
    const raw = localStorage.getItem(LOCAL_CONTACTS_KEY) || '[]';
    const list = JSON.parse(raw);
    const item = {
      id: generatedId,
      createdAt: new Date().toISOString(),
      isLiveSupabase: false,
      ...inquiry
    };
    localStorage.setItem(LOCAL_CONTACTS_KEY, JSON.stringify([item, ...list]));
    return { success: true, isLiveSupabase: false };
  } catch (e) {
    return { success: false, error: e.message };
  }
};

// Delete inquiry (Admin function)
export const deleteInquiry = async (id) => {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('inquiries').delete().eq('id', id);
    } catch (e) {
      console.warn('Failed to delete inquiry in Supabase:', e);
    }
  }

  try {
    const current = getLocalInquiries();
    const filtered = current.filter((item) => item.id !== id);
    localStorage.setItem(LOCAL_CONTACTS_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    return false;
  }
};
