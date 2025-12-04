import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const EventEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [data, setData] = useState({
        eventName: "",
        eventDescription: "",
        eventCategory: "",
        startDate: "",
        endDate: "",
        venueName: "",
        venueAddress: "",
        organizerName: "",
        organizerContact: "",
        ticketPrice: "",
        ticketType: "",
        maxAttendees: ""
    });

    const api_url = `http://localhost:7120/event/getEvent/${params.eventName}`;

    useEffect(() => {
        fetch(api_url, { method: "GET" })
            .then((res) => res.json())
            .then((res) => {
                // Format dates for datetime-local input
                const formattedData = {
                    ...res,
                    startDate: res.startDate ? new Date(res.startDate).toISOString().slice(0, 16) : "",
                    endDate: res.endDate ? new Date(res.endDate).toISOString().slice(0, 16) : ""
                };
                setData(formattedData);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching event data:", err);
                setIsLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load event details',
                    background: '#1f2937',
                    color: '#fff'
                });
            });
    }, [params.eventName]);

    const handleSaveChanges = (e) => {
        e.preventDefault();
        const update_url = `http://localhost:7120/event/updateEvent/${params.eventName}`;
        
        fetch(update_url, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Event Updated',
                    text: 'Your event has been updated successfully!',
                    background: '#1f2937',
                    color: '#fff',
                    confirmButtonColor: '#4f46e5',
                    timer: 2000,
                    timerProgressBar: true
                }).then(() => {
                    navigate('/eventCard');
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while updating the event!',
                    background: '#1f2937',
                    color: '#fff',
                    confirmButtonColor: '#ef4444',
                });
                console.error('Error:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[100px]"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-8 flex items-center justify-between">
                    <Link 
                        to='/eventCard'
                        className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                        <span className="mr-2">←</span> Back to Events
                    </Link>
                </div>

                <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-8 sm:p-12">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
                                Edit Event
                            </h1>
                            <p className="text-gray-400">
                                Update the details for <span className="text-white font-semibold">{data.eventName}</span>
                            </p>
                        </div>

                        <form onSubmit={handleSaveChanges} className="space-y-8">
                            {/* Basic Info Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-indigo-400 border-b border-gray-700 pb-2">Event Details</h3>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Event Name</label>
                                        <input
                                            type="text"
                                            name="eventName"
                                            value={data.eventName}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Enter event name"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                        <textarea
                                            name="eventDescription"
                                            value={data.eventDescription}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Describe your event..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                        <select
                                            name="eventCategory"
                                            value={data.eventCategory}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Conference">Conference</option>
                                            <option value="Workshop">Workshop</option>
                                            <option value="Concert">Concert</option>
                                            <option value="Meetup">Meetup</option>
                                            <option value="Exhibition">Exhibition</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Max Attendees</label>
                                        <input
                                            type="number"
                                            name="maxAttendees"
                                            value={data.maxAttendees}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Date & Location Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-indigo-400 border-b border-gray-700 pb-2">Date & Location</h3>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                                        <input
                                            type="datetime-local"
                                            name="startDate"
                                            value={data.startDate}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                                        <input
                                            type="datetime-local"
                                            name="endDate"
                                            value={data.endDate}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Venue Name</label>
                                        <input
                                            type="text"
                                            name="venueName"
                                            value={data.venueName}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="e.g. Grand Hall"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Venue Address</label>
                                        <input
                                            type="text"
                                            name="venueAddress"
                                            value={data.venueAddress}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Full address"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Organizer & Ticket Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-indigo-400 border-b border-gray-700 pb-2">Organizer & Tickets</h3>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Organizer Name</label>
                                        <input
                                            type="text"
                                            name="organizerName"
                                            value={data.organizerName}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Contact Info</label>
                                        <input
                                            type="text"
                                            name="organizerContact"
                                            value={data.organizerContact}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Email or Phone"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Ticket Price ($)</label>
                                        <input
                                            type="number"
                                            name="ticketPrice"
                                            value={data.ticketPrice}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Ticket Type</label>
                                        <select
                                            name="ticketType"
                                            value={data.ticketType}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        >
                                            <option value="Free">Free</option>
                                            <option value="Paid">Paid</option>
                                            <option value="VIP">VIP</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/eventCard')}
                                    className="flex-1 bg-gray-800 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventEdit;
