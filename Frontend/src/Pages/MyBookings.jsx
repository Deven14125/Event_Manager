import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
        setBookings(storedBookings);
    }, []);

    const handleCancelBooking = (bookingId) => {
        Swal.fire({
            title: 'Cancel Booking?',
            text: "Are you sure you want to cancel this ticket?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!',
            background: '#1f2937',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedBookings = bookings.filter(booking => booking.bookingId !== bookingId);
                localStorage.setItem('myBookings', JSON.stringify(updatedBookings));
                setBookings(updatedBookings);
                
                Swal.fire({
                    title: 'Cancelled!',
                    text: 'Your booking has been cancelled.',
                    icon: 'success',
                    background: '#1f2937',
                    color: '#fff'
                });
            }
        });
    };

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
                        My Bookings
                    </h1>
                    <p className="text-xl text-gray-300">
                        Manage your upcoming events and tickets.
                    </p>
                </div>
                
                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-700/50">
                        <div className="text-6xl mb-4">🎫</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Current Bookings</h3>
                        <p className="text-gray-400 mb-8">You haven't booked any events yet.</p>
                        <Link to="/eventCard" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/30">
                            Browse Events
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {bookings.map((booking, index) => (
                            <div key={booking.bookingId || index} className="group relative bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 flex flex-col">
                                {/* Header */}
                                <div className="h-32 bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 relative overflow-hidden">
                                    <div className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-300 border border-emerald-500/30">
                                        Confirmed
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 to-transparent">
                                        <h2 className="text-xl font-bold text-white leading-tight truncate">{booking.eventName}</h2>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow space-y-4">
                                    <div className="space-y-3 text-sm text-gray-300">
                                        <div className="flex items-center">
                                            <span className="w-6 text-center mr-3 text-lg">📅</span>
                                            <div>
                                                <p className="font-semibold text-white">
                                                    {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : "TBA"}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {booking.startDate ? new Date(booking.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ""}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-6 text-center mr-3 text-lg">📍</span>
                                            <span className="truncate">{booking.venueName || "Venue TBA"}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-6 text-center mr-3 text-lg">🎟️</span>
                                            <span className="text-emerald-400 font-semibold">
                                                {booking.ticketPrice ? `$${booking.ticketPrice}` : "Free"}
                                            </span>
                                            <span className="mx-2 text-gray-600">•</span>
                                            <span>{booking.ticketType || "General"}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4 border-t border-gray-700/50">
                                        <p className="text-xs text-gray-500 mb-1">Booking ID</p>
                                        <p className="font-mono text-sm text-emerald-300 tracking-wider">{booking.bookingId}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-6 pt-0 mt-auto">
                                    <button 
                                        onClick={() => handleCancelBooking(booking.bookingId)}
                                        className="w-full flex items-center justify-center px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-sm font-medium rounded-lg transition-colors border border-red-500/30"
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
