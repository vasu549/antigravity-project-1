import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  RefreshCw, 
  Search, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Lock, 
  LogOut, 
  Check, 
  AlertCircle,
  Database,
  Filter,
  Eye
} from 'lucide-react';
import { 
  getStoredBookings, 
  updateBookingStatus, 
  deleteBooking, 
  getStoredInquiries, 
  deleteInquiry 
} from '../services/storageService';
import { isSupabaseConfigured } from '../services/supabase';

export default function AdminModal({ isOpen, onClose }) {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('fixmate_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard states
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'inquiries'
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [successToast, setSuccessToast] = useState('');

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedBookings, fetchedInquiries] = await Promise.all([
        getStoredBookings(),
        getStoredInquiries()
      ]);
      setBookings(fetchedBookings || []);
      setInquiries(fetchedInquiries || []);
    } catch (e) {
      console.error('Error loading admin data', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (username.trim() === 'vasu549' && password === 'fixmate') {
      setIsAuthenticated(true);
      sessionStorage.setItem('fixmate_admin_auth', 'true');
      setUsername('');
      setPassword('');
      loadData();
    } else {
      setLoginError('Invalid username or password. Please verify credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('fixmate_admin_auth');
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateBookingStatus(id, newStatus);
    showToast(`Booking ${id} updated to ${newStatus}`);
    await loadData();
  };

  const handleDeleteBooking = async (id) => {
    if (window.confirm(`Are you sure you want to delete booking ${id}?`)) {
      await deleteBooking(id);
      showToast(`Booking ${id} deleted`);
      await loadData();
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Delete this customer inquiry?')) {
      await deleteInquiry(id);
      showToast('Inquiry removed');
      await loadData();
    }
  };

  if (!isOpen) return null;

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      (b.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.phone || '').includes(searchQuery) ||
      (b.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.locality || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.serviceTitle || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || (b.status || '').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    return (
      (inq.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.phone || '').includes(searchQuery) ||
      (inq.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.message || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-white w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Toast Alert */}
        {successToast && (
          <div className="absolute top-4 right-16 z-50 bg-emerald-600 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top">
            <CheckCircle className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="bg-fixnavy-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white leading-tight">
                  FixMate Owner Admin Panel
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Kadapa Hub
                </span>
                {isSupabaseConfigured && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Database className="w-3 h-3" />
                    Supabase Live
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Direct realtime access to bookings, customer queries & technician dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                title="Log out of admin panel"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-14 flex items-center justify-center bg-slate-50 flex-1">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto border border-orange-100 shadow-xs">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-extrabold text-fixnavy-900">
                  Admin Sign In
                </h4>
                <p className="text-xs text-slate-500">
                  Restricted portal for FixMate platform management.
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter admin username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authenticate & Enter Dashboard</span>
                </button>
              </form>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-slate-400">
                  Authorized Admin: <strong>vasu549</strong>
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex flex-col flex-1 overflow-hidden bg-slate-50">
            
            {/* Top Toolbar: Tabs, Search, Metrics */}
            <div className="p-4 sm:p-6 bg-white border-b border-slate-200 shrink-0 space-y-4">
              
              {/* Quick Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Bookings</p>
                  <p className="text-2xl font-extrabold text-fixnavy-900 mt-0.5">{bookings.length}</p>
                </div>
                <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200">
                  <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Confirmed / Active</p>
                  <p className="text-2xl font-extrabold text-emerald-800 mt-0.5">
                    {bookings.filter(b => (b.status || '').toLowerCase().includes('confirm')).length}
                  </p>
                </div>
                <div className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-200">
                  <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Completed</p>
                  <p className="text-2xl font-extrabold text-blue-800 mt-0.5">
                    {bookings.filter(b => (b.status || '').toLowerCase() === 'completed').length}
                  </p>
                </div>
                <div className="bg-orange-50/60 p-3.5 rounded-2xl border border-orange-200">
                  <p className="text-[11px] font-bold text-orange-700 uppercase tracking-wider">Customer Inquiries</p>
                  <p className="text-2xl font-extrabold text-orange-800 mt-0.5">{inquiries.length}</p>
                </div>
              </div>

              {/* Navigation Tabs & Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                
                {/* Tabs */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeTab === 'bookings'
                        ? 'bg-fixnavy-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Customer Bookings ({bookings.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeTab === 'inquiries'
                        ? 'bg-fixnavy-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Contact Messages ({inquiries.length})</span>
                  </button>
                </div>

                {/* Search & Refresh */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search by name, phone, locality..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                    />
                  </div>

                  {activeTab === 'bookings' && (
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="all">All Statuses</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  )}

                  <button
                    onClick={loadData}
                    disabled={loading}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Refresh data from Supabase"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>

              </div>

            </div>

            {/* Tab Contents: Bookings View */}
            {activeTab === 'bookings' && (
              <div className="flex-1 overflow-auto p-4 sm:p-6">
                {filteredBookings.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-2">
                    <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                    <h5 className="font-bold text-slate-700 text-sm">No Bookings Found</h5>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      {searchQuery ? 'No bookings match your current search query.' : 'Bookings submitted on the landing page will appear here immediately.'}
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100/80 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                            <th className="py-3 px-4">Booking ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Contact</th>
                            <th className="py-3 px-4">Service & Locality</th>
                            <th className="py-3 px-4">Slot</th>
                            <th className="py-3 px-4">Issue Note</th>
                            <th className="py-3 px-4">Status & Dispatch</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredBookings.map((b) => (
                            <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3 px-4 font-mono font-bold text-orange-600 whitespace-nowrap">
                                {b.id}
                                {b.isLiveSupabase && (
                                  <span className="block text-[9px] font-sans font-normal text-emerald-600">
                                    ● Supabase
                                  </span>
                                )}
                              </td>

                              <td className="py-3 px-4 whitespace-nowrap">
                                <span className="font-bold text-slate-800 text-sm block">{b.name}</span>
                                {b.preferredPro && (
                                  <span className="text-[10px] text-orange-600 font-medium">
                                    Specialist: {b.preferredPro}
                                  </span>
                                )}
                              </td>

                              <td className="py-3 px-4 whitespace-nowrap">
                                <a 
                                  href={`tel:${b.phone}`} 
                                  className="text-fixnavy-900 font-semibold hover:text-orange-600 flex items-center gap-1"
                                >
                                  <Phone className="w-3 h-3 text-slate-400" />
                                  <span>+91 {b.phone}</span>
                                </a>
                              </td>

                              <td className="py-3 px-4">
                                <span className="font-semibold text-slate-800 block whitespace-nowrap">{b.serviceTitle}</span>
                                <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                                  <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                                  <span>{b.locality}, Kadapa</span>
                                </span>
                              </td>

                              <td className="py-3 px-4 whitespace-nowrap text-slate-700">
                                <span className="font-medium block">{b.date}</span>
                                <span className="text-slate-400 text-[11px]">{b.timeSlot}</span>
                              </td>

                              <td className="py-3 px-4 max-w-xs text-slate-600">
                                <p className="truncate" title={b.description}>
                                  {b.description}
                                </p>
                              </td>

                              <td className="py-3 px-4 whitespace-nowrap">
                                <select
                                  value={b.status || 'Confirmed'}
                                  onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none transition-colors cursor-pointer ${
                                    (b.status || '').toLowerCase() === 'completed'
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                      : (b.status || '').toLowerCase() === 'in progress'
                                      ? 'bg-blue-50 text-blue-700 border-blue-300'
                                      : (b.status || '').toLowerCase() === 'cancelled'
                                      ? 'bg-red-50 text-red-700 border-red-300'
                                      : 'bg-amber-50 text-amber-700 border-amber-300'
                                  }`}
                                >
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>

                              <td className="py-3 px-4 text-right whitespace-nowrap">
                                <button
                                  onClick={() => handleDeleteBooking(b.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete booking"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab Contents: Inquiries View */}
            {activeTab === 'inquiries' && (
              <div className="flex-1 overflow-auto p-4 sm:p-6">
                {filteredInquiries.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-2">
                    <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
                    <h5 className="font-bold text-slate-700 text-sm">No Inquiries Found</h5>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Customer messages submitted through the contact section will show up here.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 font-bold text-[10px]">
                                {inq.subject}
                              </span>
                              <h5 className="font-bold text-slate-800 text-sm mt-1">{inq.name}</h5>
                            </div>
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="text-slate-400 hover:text-red-500 p-1"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                            <a href={`tel:${inq.phone}`} className="hover:text-orange-600 flex items-center gap-1 font-semibold text-slate-700">
                              <Phone className="w-3 h-3 text-orange-500" />
                              <span>+91 {inq.phone}</span>
                            </a>
                            {inq.email && (
                              <a href={`mailto:${inq.email}`} className="hover:text-orange-600 flex items-center gap-1">
                                <Mail className="w-3 h-3 text-blue-500" />
                                <span>{inq.email}</span>
                              </a>
                            )}
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                            "{inq.message}"
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                          <span>Received: {new Date(inq.createdAt).toLocaleDateString()}</span>
                          <a
                            href={`https://wa.me/91${inq.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20regarding%20your%20inquiry%20on%20FixMate`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 font-bold hover:underline flex items-center gap-1"
                          >
                            <span>Reply via WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Modal Footer */}
        <div className="bg-white px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>FixMate Supabase Node: <strong>Active & Syncing</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
}
