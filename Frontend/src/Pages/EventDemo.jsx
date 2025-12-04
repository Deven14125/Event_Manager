import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const EventDemo = () => {
    const sampleEvent = {
        id: "demo-123",
        eventName: "Grand Tech Gala 2025",
        eventCategory: "Technology & Innovation",
        eventDescription: "Experience the future of technology at our annual Grand Tech Gala. Join industry leaders, innovators, and enthusiasts for a night of networking, keynotes, and exclusive product reveals. Don't miss this opportunity to be part of the next big thing.",
        startDate: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 days from now
        endDate: new Date(Date.now() + 86400000 * 10 + 14400000).toISOString(), // +4 hours
        venueName: "Silicon Valley Convention Center",
        venueAddress: "500 Innovation Way, San Jose, CA",
        organizerName: "TechWorld Inc.",
        ticketPrice: "299",
        ticketType: "VIP Access"
    };

    const handleDemoAction = (action) => {
        Swal.fire({
            title: 'Demo Feature',
            text: `This is how the "${action}" feature works!`,
            icon: 'info',
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: '#6366f1'
        });
    };

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 flex flex-col items-center justify-center relative z-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
                    Event Card Demo
                </h1>
                <p className="text-xl text-gray-300">
                    A preview of our premium event card design.
                </p>
            </div>

            <div className="w-full max-w-md">
                {/* Card Structure Copied from EventCard.jsx */}
                <div className="group relative bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 flex flex-col h-full">
                    {/* Card Header */}
                    <div className="h-48 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 relative overflow-hidden group-hover:from-indigo-600/30 group-hover:to-purple-600/30 transition-colors">
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                            {sampleEvent.eventCategory}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 to-transparent">
                            <h2 className="text-2xl font-bold text-white leading-tight">{sampleEvent.eventName}</h2>
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-grow space-y-4">
                        <p className="text-gray-300 text-sm line-clamp-3">
                            {sampleEvent.eventDescription}
                        </p>

                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex items-center">
                                <span className="w-5 text-center mr-2">📅</span>
                                <span>
                                    {new Date(sampleEvent.startDate).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-5 text-center mr-2">📍</span>
                                <span className="truncate">{sampleEvent.venueName}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-5 text-center mr-2">🎟️</span>
                                <span className="text-indigo-400 font-semibold">
                                    ${sampleEvent.ticketPrice}
                                </span>
                                <span className="mx-2">•</span>
                                <span>{sampleEvent.ticketType}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-5 text-center mr-2">👤</span>
                                <span className="truncate">By {sampleEvent.organizerName}</span>
                            </div>
                        </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-6 pt-0 mt-auto space-y-3">
                        <button
                            onClick={() => handleDemoAction('Book Ticket')}
                            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-base font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5"
                        >
                            <span className="mr-2">🎟️</span> Book Ticket
                        </button>

                        <div className="grid grid-cols-4 gap-2">
                            <button
                                onClick={() => handleDemoAction('Share')}
                                title="Share Event"
                                className="flex items-center justify-center px-2 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors border border-gray-600"
                            >
                                🔗
                            </button>
                            <button
                                onClick={() => handleDemoAction('Download PNG')}
                                title="Download as PNG"
                                className="flex items-center justify-center px-2 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors border border-gray-600"
                            >
                                🖼️
                            </button>
                            <button
                                onClick={() => handleDemoAction('Download PDF')}
                                title="Download as PDF"
                                className="flex items-center justify-center px-2 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors border border-gray-600"
                            >
                                📄
                            </button>
                            <button
                                onClick={() => handleDemoAction('Edit')}
                                title="Edit Event"
                                className="flex items-center justify-center px-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-lg hover:shadow-indigo-500/30"
                            >
                                ✏️
                            </button>
                        </div>

                        <button
                            onClick={() => handleDemoAction('Delete')}
                            className="w-full flex items-center justify-center px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-sm font-medium rounded-lg transition-colors border border-red-500/30"
                        >
                            <span className="mr-2">🗑️</span> Delete Event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDemo;
