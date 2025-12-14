import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  Users, 
  Clock, 
  Download,
  Shield,
  CheckCircle,
  XCircle,
  ArrowRight,
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        // Simulate API loading
        setTimeout(() => {
            const storedBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
            setBookings(storedBookings);
            setLoading(false);
        }, 500);
    }, []);

    const handleCancelBooking = async (bookingId) => {
        Swal.fire({
            title: 'Cancel Booking?',
            text: "Are you sure you want to cancel this ticket?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#3b82f6',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'Keep Ticket',
            background: '#1f2937',
            color: '#fff',
            backdrop: 'rgba(0, 0, 0, 0.7)',
            customClass: {
                popup: 'rounded-2xl border border-gray-700/50',
                confirmButton: 'rounded-lg',
                cancelButton: 'rounded-lg'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updatedBookings = bookings.filter(booking => booking.bookingId !== bookingId);
                localStorage.setItem('myBookings', JSON.stringify(updatedBookings));
                setBookings(updatedBookings);
                
                Swal.fire({
                    title: 'Cancelled Successfully!',
                    text: 'Your booking has been cancelled and refund initiated.',
                    icon: 'success',
                    background: '#1f2937',
                    color: '#fff',
                    confirmButtonColor: '#10b981',
                    customClass: {
                        popup: 'rounded-2xl border border-emerald-500/20'
                    }
                });
            }
        });
    };

    const handleDownloadTicket = () => {
        Swal.fire({
            title: 'Download Ticket',
            text: 'Your ticket will be downloaded as a PDF',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Download',
            background: '#1f2937',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                // In real app, this would generate/download PDF
                Swal.fire({
                    title: 'Download Started!',
                    text: 'Your ticket is being downloaded.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    background: '#1f2937',
                    color: '#fff'
                });
            }
        });
    };

    const filters = [
        { id: 'all', label: 'All Bookings', count: bookings.length },
        { id: 'upcoming', label: 'Upcoming', count: bookings.filter(b => new Date(b.startDate) > new Date()).length },
        { id: 'past', label: 'Past Events', count: bookings.filter(b => new Date(b.startDate) <= new Date()).length },
    ];

    const filteredBookings = bookings.filter(booking => {
        if (activeFilter === 'upcoming') return new Date(booking.startDate) > new Date();
        if (activeFilter === 'past') return new Date(booking.startDate) <= new Date();
        return true;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
                            <Sparkles size={16} className="text-yellow-400" />
                            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                Your Events Journey
                            </span>
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                            <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                                My Bookings
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
                            Manage your tickets, download passes, and stay updated with event details
                        </p>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { 
                                label: 'Total Bookings', 
                                value: bookings.length, 
                                icon: <Ticket className="text-blue-400" size={24} />,
                                color: 'from-blue-500/20 to-blue-600/20'
                            },
                            { 
                                label: 'Upcoming Events', 
                                value: bookings.filter(b => new Date(b.startDate) > new Date()).length,
                                icon: <Calendar className="text-green-400" size={24} />,
                                color: 'from-green-500/20 to-green-600/20'
                            },
                            { 
                                label: 'Total Spent', 
                                value: `$${bookings.reduce((sum, b) => sum + (b.ticketPrice || 0), 0)}`,
                                icon: <Shield className="text-yellow-400" size={24} />,
                                color: 'from-yellow-500/20 to-yellow-600/20'
                            },
                        ].map((stat, idx) => (
                            <div 
                                key={idx} 
                                className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                                    </div>
                                    <div className="p-3 bg-gray-800/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-3 mb-8 bg-gray-800/30 backdrop-blur-sm p-2 rounded-2xl border border-gray-700/50 w-fit mx-auto">
                        {filters.map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                    activeFilter === filter.id
                                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    {filter.label}
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        activeFilter === filter.id 
                                            ? 'bg-white/20' 
                                            : 'bg-gray-700/50'
                                    }`}>
                                        {filter.count}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Bookings Grid */}
                    {loading ? (
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 animate-pulse">
                                    <div className="h-48 bg-gray-700/50 rounded-xl mb-4"></div>
                                    <div className="space-y-3">
                                        <div className="h-4 bg-gray-700/50 rounded"></div>
                                        <div className="h-4 bg-gray-700/50 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="text-center py-20 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl rounded-3xl border border-gray-700/50">
                            <div className="inline-flex p-4 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-2xl mb-6">
                                <Ticket size={48} className="text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No Bookings Found</h3>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                {activeFilter === 'all' 
                                    ? "You haven't booked any events yet. Start exploring amazing events!"
                                    : activeFilter === 'upcoming'
                                    ? "You don't have any upcoming events. Check out what's happening soon!"
                                    : "You haven't attended any events yet. Your journey begins now!"}
                            </p>
                            <Link 
                                to="/eventCard" 
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                <span>Browse Events</span>
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                            {filteredBookings.map((booking, index) => {
                                const isUpcoming = new Date(booking.startDate) > new Date();
                                
                                return (
                                    <div 
                                        key={booking.bookingId || index} 
                                        className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
                                    >
                                        {/* Event Header */}
                                        <div className="relative h-48 bg-gradient-to-br from-blue-600/20 via-green-600/20 to-transparent overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10"></div>
                                            <div className="absolute top-4 right-4 z-20">
                                                <span className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-sm border ${
                                                    isUpcoming
                                                        ? 'bg-green-500/20 text-green-300 border-green-500/30'
                                                        : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                                                }`}>
                                                    {isUpcoming ? 'UPCOMING' : 'PAST EVENT'}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                                <h2 className="text-2xl font-bold text-white mb-2 line-clamp-1">{booking.eventName}</h2>
                                                <div className="flex items-center gap-4 text-sm text-gray-300">
                                                    <span className="flex items-center gap-2">
                                                        <Users size={16} />
                                                        {booking.attendees || '0'} attendees
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <MapPin size={16} />
                                                        {booking.city || 'Online'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Booking Details */}
                                        <div className="p-6">
                                            <div className="grid grid-cols-2 gap-6 mb-6">
                                                <div className="space-y-2">
                                                    <p className="text-sm text-gray-400">Date & Time</p>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={18} className="text-blue-400" />
                                                        <span className="font-semibold text-white">
                                                            {new Date(booking.startDate).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock size={18} className="text-green-400" />
                                                        <span className="text-gray-300">
                                                            {new Date(booking.startDate).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <p className="text-sm text-gray-400">Ticket Details</p>
                                                    <div className="flex items-center gap-2">
                                                        <Ticket size={18} className="text-yellow-400" />
                                                        <span className="font-semibold text-white">{booking.ticketType}</span>
                                                    </div>
                                                    <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                                        {booking.ticketPrice ? `$${booking.ticketPrice}` : 'FREE'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Booking ID & Status */}
                                            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl mb-6">
                                                <div>
                                                    <p className="text-xs text-gray-400 mb-1">Booking ID</p>
                                                    <p className="font-mono text-sm text-emerald-300">{booking.bookingId}</p>
                                                </div>
                                                <CheckCircle size={20} className="text-green-400" />
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3">
                                                {isUpcoming ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleDownloadTicket(booking)}
                                                            className="flex-1 group/btn flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600/20 to-blue-600/10 text-blue-400 hover:text-blue-300 text-sm font-medium rounded-xl transition-all duration-300 hover:from-blue-600/30 hover:to-blue-600/20 border border-blue-500/30"
                                                        >
                                                            <Download size={18} />
                                                            <span>Download Ticket</span>
                                                            <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                                        </button>
                                                        
                                                        <button
                                                            onClick={() => handleCancelBooking(booking.bookingId)}
                                                            className="flex-1 group/btn flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500/20 to-red-500/10 text-red-400 hover:text-red-300 text-sm font-medium rounded-xl transition-all duration-300 hover:from-red-500/30 hover:to-red-500/20 border border-red-500/30"
                                                        >
                                                            <XCircle size={18} />
                                                            <span>Cancel</span>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => Swal.fire({
                                                            title: 'Event Completed',
                                                            text: 'This event has already taken place.',
                                                            icon: 'info',
                                                            background: '#1f2937',
                                                            color: '#fff',
                                                            confirmButtonColor: '#3b82f6'
                                                        })}
                                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700/50 text-gray-400 text-sm font-medium rounded-xl"
                                                    >
                                                        <AlertCircle size={18} />
                                                        <span>Event Completed</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Bottom CTA */}
                    {filteredBookings.length > 0 && (
                        <div className="mt-12 text-center">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 px-4 py-2 rounded-full mb-4">
                                <Shield size={16} className="text-yellow-400" />
                                <span className="text-sm font-medium text-yellow-400">
                                    Your tickets are secure and backed by our guarantee
                                </span>
                            </div>
                            <p className="text-gray-400">
                                Need help? <Link to="/support" className="text-blue-400 hover:text-blue-300 transition-colors">Contact Support</Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookings;