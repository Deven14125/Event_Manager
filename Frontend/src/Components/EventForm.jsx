import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sweet from 'sweetalert2';

const EventForm = () => {
    const [data, setData] = useState({
        eventId: "",
        eventName: "",
        eventCategory: "",
        eventDescription: "",
        startDate: "",
        endDate: "",
        venueName: "",
        venueAddress: "",
        organizerName: "",
        organizerContact: "",
        ticketPrice: "",
        ticketType: "",
        maxAttendees: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Local Storage Implementation for "All Users" simulation
            const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
            const newEvent = {
                ...data,
                id: Math.random().toString(36).substr(2, 9), // Generate unique ID
                createdAt: new Date().toISOString()
            };
            
            localStorage.setItem('events', JSON.stringify([...existingEvents, newEvent]));

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));

            Sweet.fire({
                icon: 'success',
                title: 'Event Created!',
                text: 'Your event has been successfully published to the public feed.',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#4f46e5'
            });
            navigate('/eventCard'); // Redirect to All Events page to see it
            
            /* 
            // Original API Code (Commented out for demo/local usage)
            const api_url = "http://localhost:7120/event/addEvent";
            const response = await fetch(api_url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            // ... rest of API handling
            */
        } catch (e) {
            console.error(e);
            Sweet.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const inputClasses = "w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-200";
    const labelClasses = "block text-sm font-medium text-gray-300 mb-2";
    const sectionTitleClasses = "text-xl font-bold text-white border-b border-gray-700 pb-2 mb-6 mt-8 first:mt-0";

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
                            Create Your Event
                        </h2>
                        <p className="text-gray-400">Fill in the details below to publish your event to the world.</p>
                    </div>

                    <form onSubmit={handleCreate} className="space-y-6">
                        {/* Event Details */}
                        <div>
                            <h3 className={sectionTitleClasses}>Event Details</h3>
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                                <div>
                                    <label className={labelClasses}>Event Name</label>
                                    <input
                                        type="text"
                                        name="eventName"
                                        className={inputClasses}
                                        placeholder="e.g. Tech Conference 2024"
                                        value={data.eventName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Category</label>
                                    <select
                                        name="eventCategory"
                                        className={inputClasses}
                                        value={data.eventCategory}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" className="bg-gray-800">Select Category</option>
                                        <option value="Webinar" className="bg-gray-800">Webinar</option>
                                        <option value="Workshop" className="bg-gray-800">Workshop</option>
                                        <option value="Conference" className="bg-gray-800">Conference</option>
                                        <option value="Social Event" className="bg-gray-800">Social Event</option>
                                        <option value="Concert" className="bg-gray-800">Concert</option>
                                    </select>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <label className={labelClasses}>Description</label>
                                    <textarea
                                        name="eventDescription"
                                        className={`${inputClasses} resize-none`}
                                        placeholder="Tell people what your event is about..."
                                        rows="4"
                                        value={data.eventDescription}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Date and Time */}
                        <div>
                            <h3 className={sectionTitleClasses}>Date & Time</h3>
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                                <div>
                                    <label className={labelClasses}>Start Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        name="startDate"
                                        className={inputClasses}
                                        value={data.startDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>End Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        name="endDate"
                                        className={inputClasses}
                                        value={data.endDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <h3 className={sectionTitleClasses}>Location</h3>
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                                <div>
                                    <label className={labelClasses}>Venue Name</label>
                                    <input
                                        type="text"
                                        name="venueName"
                                        className={inputClasses}
                                        placeholder="e.g. Grand Hall"
                                        value={data.venueName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Address</label>
                                    <input
                                        type="text"
                                        name="venueAddress"
                                        className={inputClasses}
                                        placeholder="e.g. 123 Main St, City"
                                        value={data.venueAddress}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Organizer Details */}
                        <div>
                            <h3 className={sectionTitleClasses}>Organizer</h3>
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                                <div>
                                    <label className={labelClasses}>Organizer Name</label>
                                    <input
                                        type="text"
                                        name="organizerName"
                                        className={inputClasses}
                                        placeholder="Your Name or Organization"
                                        value={data.organizerName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Contact Email/Phone</label>
                                    <input
                                        type="text"
                                        name="organizerContact"
                                        className={inputClasses}
                                        placeholder="contact@example.com"
                                        value={data.organizerContact}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Ticketing */}
                        <div>
                            <h3 className={sectionTitleClasses}>Ticketing</h3>
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                                <div>
                                    <label className={labelClasses}>Price ($)</label>
                                    <input
                                        type="number"
                                        name="ticketPrice"
                                        className={inputClasses}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        value={data.ticketPrice}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Ticket Type</label>
                                    <select
                                        name="ticketType"
                                        className={inputClasses}
                                        value={data.ticketType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" className="bg-gray-800">Select Type</option>
                                        <option value="Free" className="bg-gray-800">Free</option>
                                        <option value="Paid" className="bg-gray-800">Paid</option>
                                        <option value="Donation" className="bg-gray-800">Donation</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClasses}>Max Attendees</label>
                                    <input
                                        type="number"
                                        name="maxAttendees"
                                        className={inputClasses}
                                        placeholder="e.g. 100"
                                        min="1"
                                        value={data.maxAttendees}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-4 px-6 border border-transparent text-lg font-bold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 shadow-lg hover:shadow-indigo-500/30 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Event...
                                    </span>
                                ) : (
                                    'Publish Event'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventForm;
