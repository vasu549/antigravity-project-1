import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import HowItWorks from './components/HowItWorks';
import ProsDirectory from './components/ProsDirectory';
import TrustFeatures from './components/TrustFeatures';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import BookingsDrawer from './components/BookingsDrawer';
import AdminModal from './components/AdminModal';
import { getStoredBookings } from './services/storageService';
import { isSupabaseConfigured } from './services/supabase';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState({});
  const [isBookingsDrawerOpen, setIsBookingsDrawerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [storedBookings, setStoredBookings] = useState([]);

  // Load saved bookings on mount
  useEffect(() => {
    refreshBookings();
  }, []);

  const refreshBookings = async () => {
    const list = await getStoredBookings();
    setStoredBookings(list || []);
  };

  const handleOpenBooking = (prefillData = {}) => {
    setBookingPrefill(prefillData);
    setIsBookingOpen(true);
  };

  const handleBookService = (serviceId) => {
    handleOpenBooking({ serviceId });
  };

  const handleBookPro = (category, proName) => {
    handleOpenBooking({ serviceId: category, preferredPro: proName });
  };

  const handleBookingCompleted = (newBooking) => {
    refreshBookings();
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-orange-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyBookings={() => setIsBookingsDrawerOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        bookingCount={storedBookings.length}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 7 Services Grid */}
        <ServicesGrid onBookService={handleBookService} />

        {/* How It Works (3 Steps) */}
        <HowItWorks onOpenBooking={() => handleOpenBooking()} />

        {/* Demo Professional Profiles */}
        <ProsDirectory onBookPro={handleBookPro} />

        {/* Trust & Guarantee */}
        <TrustFeatures />

        {/* Testimonials */}
        <Testimonials />

        {/* Contact & WhatsApp Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialData={bookingPrefill}
        onBookingComplete={handleBookingCompleted}
      />

      {/* Saved Bookings Drawer (For Customers) */}
      <BookingsDrawer
        isOpen={isBookingsDrawerOpen}
        onClose={() => setIsBookingsDrawerOpen(false)}
        bookings={storedBookings}
        onUpdate={refreshBookings}
      />

      {/* Owner Admin Panel (Protected by vasu549 / fixmate) */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          refreshBookings();
        }}
      />
    </div>
  );
}
