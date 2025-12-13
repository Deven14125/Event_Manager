import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// -------------------------------
// Simple Card Component (Reusable)
// -------------------------------
const SmallEventCard = ({ event }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="h-48 overflow-hidden">
        <img
          src={event.imageUrl || "https://via.placeholder.com/400x200"}
          alt={event.eventName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {event.eventName}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {event.description || "No description available."}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-blue-600 dark:text-blue-400 font-bold">
            ${event.price ?? "Free"}
          </span>

          <Link
            to={`/event/${event._id || event.id}`}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

// -------------------------------
// MAIN EVENT CARD PAGE
// -------------------------------
const EventCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Helper: event id accessor
  const getEventId = (event) => event.id || event._id || event._uuid || event.eventId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7120/event/getEvent");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        setData(result || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load events. Please try again later.",
          background: "#1f2937",
          color: "#fff",
          confirmButtonColor: "#ef4444",
        });
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // -------------------- DELETE EVENT --------------------
  const handleDeleteEvent = async (eventName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#1f2937",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:7120/event/deleteEvent/${encodeURIComponent(eventName)}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete event");

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your event has been deleted.",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#4f46e5",
      });

      // refresh data
      const updatedResponse = await fetch("http://localhost:7120/event/getEvent");
      if (updatedResponse.ok) {
        const updatedResult = await updatedResponse.json();
        setData(updatedResult || []);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete event. Please try again later.",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // -------------------- BOOK EVENT --------------------
  const handleBookEvent = async (event) => {
    const result = await Swal.fire({
      title: "Book Event",
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Event:</strong> ${event.eventName}</p>
          <p class="mb-2"><strong>Date:</strong> ${new Date(event.startDate).toLocaleString()}</p>
          <p class="mb-2"><strong>Venue:</strong> ${event.venueName}</p>
          <p class="mb-2"><strong>Price:</strong> $${event.ticketPrice ?? 0}</p>
          <p class="mb-4"><strong>Type:</strong> ${event.ticketType ?? "General"}</p>
          <input type="text" id="attendee-name" class="swal2-input" placeholder="Your Name" required>
          <input type="email" id="attendee-email" class="swal2-input" placeholder="Your Email" required>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirm Booking",
      confirmButtonColor: "#4f46e5",
      background: "#1f2937",
      color: "#fff",
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#attendee-name").value;
        const email = Swal.getPopup().querySelector("#attendee-email").value;
        if (!name || !email) Swal.showValidationMessage("Please enter both name and email");
        return { name, email };
      },
    });

    if (result.isConfirmed) {
      await Swal.fire({
        icon: "success",
        title: "Booking Confirmed!",
        html: `
          <p class="mb-2">Thank you, ${result.value.name}!</p>
          <p>Your booking for <strong>${event.eventName}</strong> is confirmed.</p>
          <p class="mt-2">A confirmation email has been sent to ${result.value.email}</p>
        `,
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#4f46e5",
      });
      // If you want to persist booking by calling API, do so here.
    }
  };

  // -------------------- SHARE EVENT --------------------
  const handleCopyToClipboard = async (event) => {
    try {
      await navigator.clipboard.writeText(`${event.eventName}: ${event.eventDescription || ""} - ${window.location.href}`);
      await Swal.fire({
        icon: "success",
        title: "Copied!",
        text: "Event link copied to clipboard",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#4f46e5",
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to copy link. Please try again.",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleShare = async (event) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.eventName,
          text: `Check out this event: ${event.eventDescription || ""}`,
          url: window.location.href,
        });
        return;
      } catch (error) {
        console.log("Native share failed:", error);
      }
    }
    await handleCopyToClipboard(event);
  };

  // -------------------- DOWNLOAD IMAGE --------------------
  const handleDownloadImage = async (eventId) => {
    const element = document.getElementById(`download-card-${eventId}`);
    if (!element) {
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Could not find event card for download",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    try {
      const canvas = await html2canvas(element, { backgroundColor: null, scale: 2 });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `event-${eventId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating image:", error);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to download image. Please try again later.",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // -------------------- DOWNLOAD PDF --------------------
  const handleDownloadPDF = async (event) => {
    const element = document.getElementById(`download-card-${getEventId(event)}`);
    if (!element) {
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Could not find event card for download",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    try {
      const canvas = await html2canvas(element, { backgroundColor: "#0f172a", scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`event-${(event.eventName || "ticket").replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to download PDF. Please try again later.",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-indigo-500 rounded-full"></div>
      </div>
    );
  }

  // -------------------- MAIN UI --------------------
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-bold text-indigo-300 mb-10">Discover Events</h1>

        {data.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-700/50">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Events Found</h3>
            <p className="text-gray-400 mb-8">Be the first to create an event!</p>
            <Link
              to="/eventForm"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Create Event
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.map((event, index) => {
              const id = getEventId(event) ?? index;
              return (
                <div key={id} className="relative" role="article" aria-labelledby={`event-title-${id}`}>
                  {/* Hidden high-quality downloadable card for image/pdf */}
                  <div className="fixed left-[-9999px] top-0 pointer-events-none">
                    <div
                      id={`download-card-${id}`}
                      className="w-[800px] h-[400px] bg-slate-900 text-white relative overflow-hidden rounded-xl flex shadow-2xl border border-white/10"
                    >
                      {/* Background & Overlays */}
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(255, 192, 203, 0.1) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(221, 160, 221, 0.1) 0%, transparent 20%)`,
                          backgroundSize: "100% 100%",
                        }}
                      />
                      <div className="absolute top-0 left-0 w-64 h-64 text-pink-300/20 pointer-events-none">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <path
                            fill="currentColor"
                            d="M45.7,-76.3C58.9,-69.3,69.1,-55.6,76.3,-41.2C83.5,-26.8,87.7,-11.7,85.6,2.4C83.5,16.5,75.1,29.6,65.3,40.8C55.5,52,44.3,61.3,31.8,68.1C19.3,74.9,5.5,79.2,-7.1,77.4C-19.7,75.6,-31.1,67.7,-42.1,59.1C-53.1,50.5,-63.7,41.2,-71.2,29.6C-78.7,18,-83.1,4.1,-80.8,-8.8C-78.5,-21.7,-69.5,-33.6,-58.9,-42.7C-48.3,-51.8,-36.1,-58.1,-23.9,-65.7C-11.7,-73.3,0.5,-82.2,14.5,-84.8C28.5,-87.4,44.3,-83.7,45.7,-76.3Z"
                            transform="translate(100 100) scale(1.1)"
                          />
                        </svg>
                      </div>
                      <div className="absolute bottom-0 right-0 w-64 h-64 text-purple-300/20 pointer-events-none rotate-180">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <path
                            fill="currentColor"
                            d="M45.7,-76.3C58.9,-69.3,69.1,-55.6,76.3,-41.2C83.5,-26.8,87.7,-11.7,85.6,2.4C83.5,16.5,75.1,29.6,65.3,40.8C55.5,52,44.3,61.3,31.8,68.1C19.3,74.9,5.5,79.2,-7.1,77.4C-19.7,75.6,-31.1,67.7,-42.1,59.1C-53.1,50.5,-63.7,41.2,-71.2,29.6C-78.7,18,-83.1,4.1,-80.8,-8.8C-78.5,-21.7,-69.5,-33.6,-58.9,-42.7C-48.3,-51.8,-36.1,-58.1,-23.9,-65.7C-11.7,-73.3,0.5,-82.2,14.5,-84.8C28.5,-87.4,44.3,-83.7,45.7,-76.3Z"
                            transform="translate(100 100) scale(1.1)"
                          />
                        </svg>
                      </div>

                      <div className="relative z-10 p-12 flex flex-col justify-between w-full">
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <span className="inline-block px-3 py-1 text-xs font-semibold text-pink-300 bg-pink-900/30 rounded-full mb-2">
                                {event.eventCategory}
                              </span>
                              <h2 id={`event-title-${id}`} className="text-4xl font-bold text-white mb-2">
                                {event.eventName}
                              </h2>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                                ${event.ticketPrice ?? 0}
                              </div>
                              <div className="text-sm text-gray-300">{event.ticketType}</div>
                            </div>
                          </div>

                          <p className="text-gray-300 text-lg leading-relaxed mb-6">{event.eventDescription}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="text-sm text-gray-400 mb-1">📅 Date & Time</div>
                            <div className="text-white font-medium">
                              {event.startDate ? `${new Date(event.startDate).toLocaleDateString()} at ${new Date(event.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "TBA"}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400 mb-1">📍 Location</div>
                            <div className="text-white font-medium truncate">{event.venueName}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400 mb-1">👤 Organizer</div>
                            <div className="text-white font-medium">{event.organizerName}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400 mb-1">👥 Capacity</div>
                            <div className="text-white font-medium">{event.maxAttendees ?? "—"} people</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visible Card */}
                  <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
                    <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-300 bg-indigo-900/30 rounded-full mb-2">
                            {event.eventCategory}
                          </span>
                          <h3 id={`event-title-${id}`} className="text-xl font-bold text-white">
                            {event.eventName}
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            ${event.ticketPrice ?? 0}
                          </div>
                          <div className="text-xs text-gray-400">{event.ticketType}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex-grow">
                      <p className="text-gray-400 mb-6 line-clamp-3">{event.eventDescription}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span>
                            {event.startDate ? `${new Date(event.startDate).toLocaleDateString()} at ${new Date(event.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "TBA"}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span className="truncate">{event.venueName}</span>
                        </div>

                        <div className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <span>{event.organizerName}</span>
                        </div>

                        <div className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          <span>{event.maxAttendees ?? "—"} attendees max</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 mt-auto space-y-3">
                      <button
                        onClick={() => handleBookEvent(event)}
                        className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-base font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        aria-label={`Book ticket for ${event.eventName}`}
                      >
                        <span className="mr-2" aria-hidden="true">
                          🎟️
                        </span>
                        Book Ticket
                      </button>

                      <div className="grid grid-cols-4 gap-2">
                        <button
                          onClick={() => handleShare(event)}
                          title="Share Event"
                          className="flex items-center justify-center px-2 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                          <span aria-hidden="true">🔗</span>
                          <span className="sr-only">Share event</span>
                        </button>

                        <button
                          onClick={() => handleDownloadImage(id)}
                          title="Download as PNG"
                          className="flex items-center justify-center px-2 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                          <span aria-hidden="true">🖼️</span>
                          <span className="sr-only">Download as image</span>
                        </button>

                        <button
                          onClick={() => handleDownloadPDF(event)}
                          title="Download as PDF"
                          className="flex items-center justify-center px-2 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                          <span aria-hidden="true">📄</span>
                          <span className="sr-only">Download as PDF</span>
                        </button>

                        <Link
                          to={`/eventEdit/${encodeURIComponent(event.eventName)}`}
                          title="Edit Event"
                          className="flex items-center justify-center px-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-lg hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                          <span aria-hidden="true">✏️</span>
                          <span className="sr-only">Edit event</span>
                        </Link>
                      </div>

                      <button
                        onClick={() => handleDeleteEvent(event.eventName)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-sm font-medium rounded-lg transition-colors border border-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        aria-label={`Delete ${event.eventName}`}
                      >
                        <span className="mr-2" aria-hidden="true">
                          🗑️
                        </span>
                        Delete Event
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
