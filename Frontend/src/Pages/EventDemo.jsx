import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  Calendar, 
  Ticket, 
  Users, 
  Share2,
  Download,
  Edit,
  Trash2,
  Sparkles,
  Star,
  Building,
  User,
  ArrowRight,
  QrCode,
  Heart,
  Bookmark,
  Send,
  Eye
} from 'lucide-react';

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
        ticketType: "VIP Access",
        maxAttendees: 500,
        registeredAttendees: 387,
        rating: 4.8,
        reviews: 124,
        featured: true,
        tags: ["AI", "Innovation", "Networking", "Startups"]
    };

    const handleDemoAction = (action) => {
        Swal.fire({
            title: 'Demo Feature Activated',
            html: `
                <div class="text-center">
                    <div class="mb-4 text-5xl">🎯</div>
                    <p class="text-white mb-2">"${action}" feature preview</p>
                    <p class="text-gray-300 text-sm">This demonstrates how the action works in the real application.</p>
                </div>
            `,
            icon: 'info',
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: '#3b82f6',
            confirmButtonText: 'Got it!',
            customClass: {
                popup: 'rounded-2xl border border-blue-500/30',
                icon: 'border-0'
            }
        });
    };

    const handleQuickAction = (action, icon) => {
        Swal.fire({
            title: 'Quick Action',
            html: `
                <div class="flex flex-col items-center">
                    <div class="p-3 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-xl mb-4">
                        ${icon}
                    </div>
                    <p class="text-white font-semibold">${action}</p>
                </div>
            `,
            background: '#1f2937',
            color: '#fff',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'rounded-2xl border border-gray-700/50'
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
                            <Sparkles size={16} className="text-yellow-400" />
                            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                Interactive Demo
                            </span>
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                            <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                                Event Card Demo
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
                            Experience our premium event card design with interactive features
                        </p>
                    </div>

                    {/* Demo Card */}
                    <div className="relative group">
                        {/* Card Badges */}
                        <div className="absolute -top-4 left-4 right-4 z-20 flex justify-between">
                            <div className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm rounded-full border border-yellow-500/30">
                                <span className="text-sm font-bold text-yellow-300 flex items-center gap-2">
                                    <Star size={14} />
                                    FEATURED EVENT
                                </span>
                            </div>
                            <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-full border border-blue-500/30">
                                <span className="text-sm font-bold text-blue-300">
                                    {sampleEvent.registeredAttendees}/{sampleEvent.maxAttendees} spots
                                </span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden hover:shadow-blue-500/20 transition-all duration-300 hover:border-blue-500/50">
                            {/* Event Header */}
                            <div className="relative h-64 bg-gradient-to-br from-blue-600/30 via-green-600/20 to-transparent overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="px-3 py-1 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700/50">
                                            <span className="text-sm font-medium text-blue-400">{sampleEvent.eventCategory}</span>
                                        </div>
                                        <div className="flex items-center gap-1 px-2 py-1 bg-gray-900/80 backdrop-blur-sm rounded-lg">
                                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm font-medium text-white">{sampleEvent.rating}</span>
                                            <span className="text-xs text-gray-400">({sampleEvent.reviews})</span>
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-2">{sampleEvent.eventName}</h2>
                                    <p className="text-gray-300 line-clamp-2">{sampleEvent.eventDescription}</p>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="p-8">
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {sampleEvent.tags.map((tag, idx) => (
                                        <span 
                                            key={idx}
                                            className="px-3 py-1.5 bg-gray-800/50 backdrop-blur-sm text-gray-300 text-sm rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-colors cursor-pointer"
                                            onClick={() => handleQuickAction(`Filter by ${tag}`, '#️⃣')}
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl">
                                                <Calendar size={20} className="text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Date & Time</p>
                                                <p className="font-semibold text-white">
                                                    {new Date(sampleEvent.startDate).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                                <p className="text-sm text-gray-300">
                                                    {new Date(sampleEvent.startDate).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })} • {new Date(sampleEvent.endDate).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl">
                                                <Building size={20} className="text-green-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Venue</p>
                                                <p className="font-semibold text-white">{sampleEvent.venueName}</p>
                                                <p className="text-sm text-gray-300">{sampleEvent.venueAddress}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-xl">
                                                <Ticket size={20} className="text-yellow-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Ticket</p>
                                                <p className="font-semibold text-white">{sampleEvent.ticketType}</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                                    ${sampleEvent.ticketPrice}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-xl">
                                                <User size={20} className="text-cyan-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Organizer</p>
                                                <p className="font-semibold text-white">{sampleEvent.organizerName}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-300 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Users size={14} />
                                                        {sampleEvent.registeredAttendees} registered
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-4">
                                    {/* Primary Action */}
                                    <button
                                        onClick={() => handleDemoAction('Book Ticket')}
                                        className="group/btn w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-blue-500/30"
                                    >
                                        <Ticket size={24} />
                                        <span className="text-lg">Book VIP Ticket - ${sampleEvent.ticketPrice}</span>
                                        <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                                    </button>

                                    {/* Secondary Actions Grid */}
                                    <div className="grid grid-cols-4 gap-3">
                                        <button
                                            onClick={() => handleDemoAction('Share Event')}
                                            className="group/action flex flex-col items-center justify-center p-4 bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-white rounded-xl transition-all duration-300 hover:bg-gray-800/80 border border-gray-700/50 hover:border-blue-500/50"
                                            title="Share Event"
                                        >
                                            <Share2 size={20} className="mb-2 group-hover/action:scale-110 transition-transform" />
                                            <span className="text-xs font-medium">Share</span>
                                        </button>

                                        <button
                                            onClick={() => handleDemoAction('Download Ticket')}
                                            className="group/action flex flex-col items-center justify-center p-4 bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-white rounded-xl transition-all duration-300 hover:bg-gray-800/80 border border-gray-700/50 hover:border-green-500/50"
                                            title="Download Ticket"
                                        >
                                            <Download size={20} className="mb-2 group-hover/action:scale-110 transition-transform" />
                                            <span className="text-xs font-medium">Download</span>
                                        </button>

                                        <button
                                            onClick={() => handleDemoAction('Generate QR Code')}
                                            className="group/action flex flex-col items-center justify-center p-4 bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-white rounded-xl transition-all duration-300 hover:bg-gray-800/80 border border-gray-700/50 hover:border-yellow-500/50"
                                            title="QR Code"
                                        >
                                            <QrCode size={20} className="mb-2 group-hover/action:scale-110 transition-transform" />
                                            <span className="text-xs font-medium">QR Code</span>
                                        </button>

                                        <button
                                            onClick={() => handleDemoAction('Save to Bookmarks')}
                                            className="group/action flex flex-col items-center justify-center p-4 bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-white rounded-xl transition-all duration-300 hover:bg-gray-800/80 border border-gray-700/50 hover:border-purple-500/50"
                                            title="Bookmark"
                                        >
                                            <Bookmark size={20} className="mb-2 group-hover/action:scale-110 transition-transform" />
                                            <span className="text-xs font-medium">Save</span>
                                        </button>
                                    </div>

                                    {/* Admin Actions */}
                                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-700/50">
                                        <button
                                            onClick={() => handleDemoAction('Edit Event Details')}
                                            className="group/action flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600/20 to-blue-600/10 text-blue-400 hover:text-blue-300 rounded-xl transition-all duration-300 hover:from-blue-600/30 hover:to-blue-600/20 border border-blue-500/30"
                                        >
                                            <Edit size={18} />
                                            <span>Edit Event</span>
                                        </button>

                                        <button
                                            onClick={() => handleDemoAction('Delete Event')}
                                            className="group/action flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500/20 to-red-500/10 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 hover:from-red-500/30 hover:to-red-500/20 border border-red-500/30"
                                        >
                                            <Trash2 size={18} />
                                            <span>Delete Event</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Stats */}
                            <div className="px-8 py-6 bg-gray-900/60 backdrop-blur-sm border-t border-gray-700/50">
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <div className="flex items-center gap-6">
                                        <span className="flex items-center gap-2">
                                            <Eye size={16} />
                                            {Math.floor(Math.random() * 1000) + 500} views
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Heart size={16} className="text-red-400" />
                                            {Math.floor(Math.random() * 200) + 100} likes
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Send size={16} className="text-green-400" />
                                            {Math.floor(Math.random() * 50) + 20} shares
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        Event ID: {sampleEvent.id}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Demo Instructions */}
                    <div className="mt-12 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-xl">
                                <Sparkles size={24} className="text-yellow-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">How to Use This Demo</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { icon: '🎯', text: 'Click any button to see interactive features' },
                                { icon: '✨', text: 'Hover over elements for subtle animations' },
                                { icon: '🎨', text: 'Experience the blue-green-yellow color scheme' },
                                { icon: '📱', text: 'Try resizing the window for responsive design' },
                            ].map((tip, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                                    <span className="text-2xl">{tip.icon}</span>
                                    <span className="text-gray-300 text-sm">{tip.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-8 text-center">
                        <Link 
                            to="/eventCard" 
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            <span>View All Events</span>
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDemo;