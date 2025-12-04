import { useState, useEffect } from "react";
import { toPng } from 'html-to-image';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";

const EventCard = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch events from LocalStorage (simulating "All Users" public feed)
        const loadEvents = () => {
            try {
                const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
                
                // Filter for "Currently Going" or Upcoming events
                // Shows events that haven't ended yet (or started today/future if no end date)
                const now = new Date();
                now.setHours(0, 0, 0, 0); // Compare dates without time for broader inclusion

                const activeEvents = storedEvents.filter(event => {
                    if (!event.startDate) return false;
                    const eventEnd = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
                    return eventEnd >= now;
                });

                setData(activeEvents);
            } catch (error) {
                console.error("Error loading events:", error);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadEvents();
        
        // Listen for storage changes (in case added from another tab)
        window.addEventListener('storage', loadEvents);
        return () => window.removeEventListener('storage', loadEvents);
    }, []);

    const handleDeleteEvent = (eventName) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            background: '#1f2937',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
                    const updatedEvents = storedEvents.filter(event => event.eventName !== eventName);
                    localStorage.setItem('events', JSON.stringify(updatedEvents));
                    
                    setData(data.filter(event => event.eventName !== eventName));
                    
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your event has been deleted.',
                        icon: 'success',
                        background: '#1f2937',
                        color: '#fff'
                    });
                } catch (err) {
                    console.error("Error deleting event:", err);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete event.',
                        icon: 'error',
                        background: '#1f2937',
                        color: '#fff'
                    });
                }
            }
        });
    };

    const handleDownloadImage = (eventId) => {
        const element = document.getElementById(`download-card-${eventId}`);
        if (!element) return;
        
        toPng(element, { cacheBust: true, backgroundColor: 'transparent' })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `event-ticket-${eventId}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error('Oops, something went wrong!', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to generate image.',
                    icon: 'error',
                    background: '#1f2937',
                    color: '#fff'
                });
            });
    };

    const handleDownloadPDF = (event) => {
        const doc = new jsPDF();
        const width = doc.internal.pageSize.getWidth();
        const height = doc.internal.pageSize.getHeight();

        // 1. Background - Cream Color
        doc.setFillColor(255, 253, 208); // Cream
        doc.rect(0, 0, width, height, 'F');

        // 2. Border - Deep Maroon
        doc.setDrawColor(128, 0, 0); // Maroon
        doc.setLineWidth(3);
        doc.rect(5, 5, width - 10, height - 10);
        
        // Inner Gold Border
        doc.setDrawColor(218, 165, 32); // Goldenrod
        doc.setLineWidth(1);
        doc.rect(8, 8, width - 16, height - 16);

        // 3. Decorative Corners (Simple triangles)
        doc.setFillColor(128, 0, 0);
        // Top Left
        doc.triangle(5, 5, 25, 5, 5, 25, 'F');
        // Top Right
        doc.triangle(width-5, 5, width-25, 5, width-5, 25, 'F');
        // Bottom Left
        doc.triangle(5, height-5, 25, height-5, 5, height-25, 'F');
        // Bottom Right
        doc.triangle(width-5, height-5, width-25, height-5, width-5, height-25, 'F');

        // 4. Header - Om / Shree Ganeshay Namah
        doc.setTextColor(128, 0, 0); // Maroon
        doc.setFont("times", "bold");
        doc.setFontSize(16);
        doc.text("|| Shree Ganeshay Namah ||", width / 2, 25, { align: 'center' });

        // 5. Event Name (Main Title)
        doc.setFontSize(30);
        doc.setTextColor(255, 69, 0); // Red-Orange
        doc.text(event.eventName || "Event Name", width / 2, 45, { align: 'center' });

        // 6. Invitation Text
        doc.setFont("times", "italic");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("We cordially invite you to grace the occasion of", width / 2, 60, { align: 'center' });
        
        doc.setFont("times", "bold");
        doc.setFontSize(18);
        doc.setTextColor(128, 0, 0);
        doc.text(event.eventCategory || "Celebration", width / 2, 70, { align: 'center' });

        // Decorative Line
        doc.setDrawColor(218, 165, 32);
        doc.line(40, 75, width - 40, 75);

        // 7. Details Section
        let yPos = 90;
        
        const addDetail = (label, value) => {
            doc.setFont("times", "bold");
            doc.setFontSize(14);
            doc.setTextColor(128, 0, 0);
            doc.text(label, width / 2, yPos, { align: 'center' });
            
            yPos += 8;
            doc.setFont("times", "normal");
            doc.setFontSize(16);
            doc.setTextColor(0, 0, 0);
            doc.text(value, width / 2, yPos, { align: 'center' });
            yPos += 15;
        };

        // Date & Time
        const startDate = event.startDate ? new Date(event.startDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Date TBA";
        const startTime = event.startDate ? new Date(event.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "";
        
        addDetail("Shubh Muhurat (Date & Time)", `${startDate} | ${startTime}`);

        // Venue
        addDetail("Sthal (Venue)", event.venueName || "Venue TBA");
        
        // Address
        if (event.venueAddress) {
             doc.setFontSize(12);
             doc.text(event.venueAddress, width / 2, yPos - 10, { align: 'center' });
             yPos += 5;
        }

        // Organizer
        addDetail("Nimantrak (Organizer)", event.organizerName || "Organizer");

        // Description (if fits)
        if (event.eventDescription) {
            yPos += 5;
            doc.setDrawColor(218, 165, 32);
            doc.line(60, yPos, width - 60, yPos);
            yPos += 10;
            
            doc.setFont("times", "italic");
            doc.setFontSize(12);
            doc.setTextColor(60, 60, 60);
            const splitDesc = doc.splitTextToSize(event.eventDescription, 150);
            doc.text(splitDesc, width / 2, yPos, { align: 'center' });
        }

        // Footer
        doc.setFontSize(12);
        doc.setTextColor(128, 0, 0);
        doc.text("|| Awaiting your presence ||", width / 2, height - 20, { align: 'center' });

        doc.save(`${event.eventName || "kankotri"}.pdf`);
    };

    const handleShare = async (event) => {
        const shareData = {
            title: event.eventName,
            text: `Check out this event: ${event.eventName} at ${event.venueName}`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
                .then(() => {
                    Swal.fire({
                        title: 'Copied!',
                        text: 'Event details copied to clipboard.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false,
                        background: '#1f2937',
                        color: '#fff'
                    });
                })
                .catch(() => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to copy to clipboard',
                        icon: 'error',
                        background: '#1f2937',
                        color: '#fff'
                    });
                });
        }
    };

    const handleBookEvent = (event) => {
        const existingBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
        const isBooked = existingBookings.some(booking => booking.eventName === event.eventName);
        
        if (isBooked) {
            Swal.fire({
                title: 'Already Booked!',
                text: 'You have already booked tickets for this event.',
                icon: 'info',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#6366f1'
            });
            return;
        }

        const newBooking = {
            ...event,
            bookingDate: new Date().toISOString(),
            bookingId: Math.random().toString(36).substr(2, 9).toUpperCase()
        };
        
        localStorage.setItem('myBookings', JSON.stringify([...existingBookings, newBooking]));

        Swal.fire({
            title: 'Booking Confirmed!',
            text: `See you at ${event.eventName}!`,
            icon: 'success',
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: '#10b981',
            showConfirmButton: false,
            timer: 2000
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
                        Discover Events
                    </h1>
                    <p className="text-xl text-gray-300">
                        Explore upcoming events and find your next experience.
                    </p>
                </div>

                {data.length === 0 ? (
                    <div className="text-center py-20 bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-700/50">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Events Found</h3>
                        <p className="text-gray-400 mb-8">Be the first to create an event!</p>
                        <Link to="/eventForm" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/30">
                            Create Event
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {data.map((event, index) => (
                            <div
                                key={event.id || index}
                                className="relative"
                            >
                                {/* Hidden Downloadable Card - High Quality Floral Design */}
                                <div className="fixed left-[-9999px] top-0 pointer-events-none">
                                    <div id={`download-card-${event.id || index}`} className="w-[800px] h-[400px] bg-slate-900 text-white relative overflow-hidden rounded-xl flex shadow-2xl border border-white/10">
                                        
                                        {/* Realistic Floral Background Image (CSS Pattern) */}
                                        <div className="absolute inset-0 opacity-30" style={{
                                            backgroundImage: `radial-gradient(circle at 10% 20%, rgba(255, 192, 203, 0.1) 0%, transparent 20%), 
                                                            radial-gradient(circle at 90% 80%, rgba(221, 160, 221, 0.1) 0%, transparent 20%)`,
                                            backgroundSize: '100% 100%'
                                        }}></div>

                                        {/* Elegant Floral SVG Overlay - Top Left */}
                                        <div className="absolute top-0 left-0 w-64 h-64 text-pink-300/20 pointer-events-none">
                                             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                                <path fill="currentColor" d="M45.7,-76.3C58.9,-69.3,69.1,-55.6,76.3,-41.2C83.5,-26.8,87.7,-11.7,85.6,2.4C83.5,16.5,75.1,29.6,65.3,40.8C55.5,52,44.3,61.3,31.8,68.1C19.3,74.9,5.5,79.2,-7.1,77.4C-19.7,75.6,-31.1,67.7,-42.1,59.1C-53.1,50.5,-63.7,41.2,-71.2,29.6C-78.7,18,-83.1,4.1,-80.8,-8.8C-78.5,-21.7,-69.5,-33.6,-58.9,-42.7C-48.3,-51.8,-36.1,-58.1,-23.9,-65.7C-11.7,-73.3,0.5,-82.2,14.5,-84.8C28.5,-87.4,44.3,-83.7,45.7,-76.3Z" transform="translate(100 100) scale(1.1)" />
                                            </svg>
                                        </div>

                                        {/* Elegant Floral SVG Overlay - Bottom Right */}
                                        <div className="absolute bottom-0 right-0 w-64 h-64 text-purple-300/20 pointer-events-none transform rotate-180">
                                             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                                <path fill="currentColor" d="M42.7,-72.8C54.6,-67.3,63.1,-53.3,70.4,-39.6C77.7,-25.9,83.8,-12.5,81.6,-0.1C79.4,12.3,68.9,23.7,59.3,34.6C49.7,45.5,41,55.9,30.3,63.3C19.6,70.7,6.9,75.1,-5.1,73.8C-17.1,72.5,-28.4,65.5,-39.9,58.6C-51.4,51.7,-63.1,44.9,-70.6,34.8C-78.1,24.7,-81.4,11.3,-79.6,-1.3C-77.8,-13.9,-70.9,-25.7,-62.1,-35.8C-53.3,-45.9,-42.6,-54.3,-31.3,-60.2C-20,-66.1,-8.1,-69.5,5.1,-77.6C18.3,-85.7,30.8,-78.3,42.7,-72.8Z" transform="translate(100 100) scale(1.1)" />
                                            </svg>
                                        </div>

                                        {/* Left Side - Ticket Stub Style */}
                                        <div className="w-[30%] bg-white/5 backdrop-blur-xl border-r border-white/10 p-8 flex flex-col justify-center items-center text-center relative z-10">
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                                                <span className="text-4xl">✨</span>
                                            </div>
                                            <h2 className="text-xl font-serif font-bold text-pink-100 tracking-widest uppercase">{event.eventCategory}</h2>
                                            <div className="mt-8 w-full border-t border-white/10 pt-6">
                                                <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-2">Admit One</p>
                                                <p className="text-3xl font-bold text-white drop-shadow-md">{event.ticketPrice ? `$${event.ticketPrice}` : "Free"}</p>
                                            </div>
                                            {/* Semi-circles for ticket effect */}
                                            <div className="absolute -right-3 top-[-12px] w-6 h-6 bg-slate-900 rounded-full"></div>
                                            <div className="absolute -right-3 bottom-[-12px] w-6 h-6 bg-slate-900 rounded-full"></div>
                                        </div>

                                        {/* Right Side - Main Content */}
                                        <div className="w-[70%] p-10 flex flex-col justify-between relative z-10 bg-gradient-to-r from-transparent to-black/20">
                                            <div className="border-b border-white/10 pb-6">
                                                <h1 className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 mb-3 leading-tight drop-shadow-sm">
                                                    {event.eventName}
                                                </h1>
                                                <div className="flex items-center text-gray-300 font-light italic">
                                                    <span className="mr-2 text-pink-300">Hosted by</span>
                                                    <span className="font-medium text-white tracking-wide">{event.organizerName}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-8 py-6">
                                                <div>
                                                    <p className="text-[10px] text-pink-300 uppercase tracking-[0.2em] mb-2 font-bold">Date & Time</p>
                                                    <p className="text-xl font-medium text-white">
                                                        {event.startDate ? new Date(event.startDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : "TBA"}
                                                    </p>
                                                    <p className="text-sm text-gray-400 mt-1 font-light">
                                                        {event.startDate ? new Date(event.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ""}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-pink-300 uppercase tracking-[0.2em] mb-2 font-bold">Location</p>
                                                    <p className="text-xl font-medium text-white">{event.venueName}</p>
                                                    <p className="text-sm text-gray-400 truncate mt-1 font-light">{event.venueAddress || "Address details upon booking"}</p>
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-4 flex justify-between items-end">
                                                <div className="text-[10px] text-gray-500 font-mono tracking-widest">
                                                    <p>ID: {Math.random().toString(36).substr(2, 12).toUpperCase()}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-px w-12 bg-white/20"></div>
                                                    <span className="text-xs text-white/40 uppercase tracking-widest">Event Ticket</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Visible Card */}
                                <div
                                    id={`event-card-${event.id || index}`}
                                    className="group relative bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 flex flex-col h-full"
                                >
                                {/* Card Header / Image Placeholder */}
                                <div className="h-48 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 relative overflow-hidden group-hover:from-indigo-600/30 group-hover:to-purple-600/30 transition-colors">
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                                        {event.eventCategory || "Event"}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 to-transparent">
                                        <h2 className="text-2xl font-bold text-white leading-tight">{event.eventName}</h2>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6 flex-grow space-y-4">
                                    <p className="text-gray-300 text-sm line-clamp-3">
                                        {event.eventDescription || "No description provided."}
                                    </p>

                                    <div className="space-y-2 text-sm text-gray-400">
                                        <div className="flex items-center">
                                            <span className="w-5 text-center mr-2">📅</span>
                                            <span>
                                                {event.startDate ? new Date(event.startDate).toLocaleDateString() : "TBA"}
                                                {event.startDate && event.endDate ? ` - ${new Date(event.endDate).toLocaleDateString()}` : ""}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-5 text-center mr-2">📍</span>
                                            <span className="truncate">{event.venueName || "Venue TBA"}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-5 text-center mr-2">🎟️</span>
                                            <span className="text-indigo-400 font-semibold">
                                                {event.ticketPrice ? `$${event.ticketPrice}` : "Free"}
                                            </span>
                                            <span className="mx-2">•</span>
                                            <span>{event.ticketType || "General"}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-5 text-center mr-2">👤</span>
                                            <span className="truncate">By {event.organizerName || "Organizer"}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Actions */}
                                <div className="p-6 pt-0 mt-auto space-y-3">
                                    <button
                                        onClick={() => handleBookEvent(event)}
                                        className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-base font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5"
                                    >
                                        <span className="mr-2">🎟️</span> Book Ticket
                                    </button>

                                    <div className="grid grid-cols-4 gap-2">
                                        <button
                                            onClick={() => handleShare(event)}
                                            title="Share Event"
                                            className="flex items-center justify-center px-2 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors border border-gray-600"
                                        >
                                            🔗
                                        </button>
                                        <button
                                            onClick={() => handleDownloadImage(event.id || index)}
                                            title="Download as PNG"
                                            className="flex items-center justify-center px-2 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors border border-gray-600"
                                        >
                                            🖼️
                                        </button>
                                        <button
                                            onClick={() => handleDownloadPDF(event)}
                                            title="Download as PDF"
                                            className="flex items-center justify-center px-2 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors border border-gray-600"
                                        >
                                            📄
                                        </button>
                                        <Link
                                            to={`/eventEdit/${event.eventName}`}
                                            title="Edit Event"
                                            className="flex items-center justify-center px-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-lg hover:shadow-indigo-500/30"
                                        >
                                            ✏️
                                        </Link>
                                    </div>

                                    <button
                                        onClick={() => handleDeleteEvent(event.eventName)}
                                        className="w-full flex items-center justify-center px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-sm font-medium rounded-lg transition-colors border border-red-500/30"
                                    >
                                        <span className="mr-2">🗑️</span> Delete Event
                                    </button>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};export default EventCard;
