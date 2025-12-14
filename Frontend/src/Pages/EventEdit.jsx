import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  FileText, 
  DollarSign,
  Building,
  User,
  Mail,
  ArrowLeft,
  Save,
  X,
  Sparkles,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const EventEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const categories = [
        { value: "Conference", label: "Conference", icon: "👥", color: "from-blue-500 to-cyan-500" },
        { value: "Workshop", label: "Workshop", icon: "🔧", color: "from-green-500 to-emerald-500" },
        { value: "Concert", label: "Concert", icon: "🎵", color: "from-purple-500 to-pink-500" },
        { value: "Meetup", label: "Meetup", icon: "🤝", color: "from-yellow-500 to-amber-500" },
        { value: "Exhibition", label: "Exhibition", icon: "🎨", color: "from-indigo-500 to-blue-500" },
        { value: "Other", label: "Other", icon: "🌟", color: "from-gray-500 to-gray-600" }
    ];

    const api_url = `http://localhost:7120/event/getEvent/${params.eventName}`;

    useEffect(() => {
        fetch(api_url, { method: "GET" })
            .then((res) => res.json())
            .then((res) => {
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
                    color: '#fff',
                    confirmButtonColor: '#ef4444'
                });
            });
    }, [params.eventName]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!data.eventName.trim()) newErrors.eventName = "Event name is required";
        else if (data.eventName.length < 3) newErrors.eventName = "Event name must be at least 3 characters";
        
        if (!data.eventCategory) newErrors.eventCategory = "Please select a category";
        
        if (!data.eventDescription.trim()) newErrors.eventDescription = "Description is required";
        else if (data.eventDescription.length < 10) newErrors.eventDescription = "Description must be at least 10 characters";
        
        if (!data.startDate) newErrors.startDate = "Start date is required";
        if (!data.endDate) newErrors.endDate = "End date is required";
        
        if (data.startDate && data.endDate) {
            const start = new Date(data.startDate);
            const end = new Date(data.endDate);
            if (start > end) newErrors.endDate = "End date must be after start date";
        }
        
        if (!data.venueName.trim()) newErrors.venueName = "Venue name is required";
        if (!data.venueAddress.trim()) newErrors.venueAddress = "Venue address is required";
        if (!data.organizerName.trim()) newErrors.organizerName = "Organizer name is required";
        if (!data.organizerContact.trim()) newErrors.organizerContact = "Organizer contact is required";
        
        if (data.ticketPrice === "" || isNaN(data.ticketPrice)) newErrors.ticketPrice = "Valid ticket price is required";
        else if (parseFloat(data.ticketPrice) < 0) newErrors.ticketPrice = "Ticket price cannot be negative";
        
        if (!data.ticketType) newErrors.ticketType = "Please select a ticket type";
        
        if (data.maxAttendees === "" || isNaN(data.maxAttendees)) newErrors.maxAttendees = "Valid number of attendees is required";
        else if (parseInt(data.maxAttendees) <= 0) newErrors.maxAttendees = "Maximum attendees must be greater than 0";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                html: `
                    <div class="text-left">
                        <p class="text-white mb-2">Please correct the following errors:</p>
                        <ul class="list-disc pl-4 text-gray-300 space-y-1">
                            ${Object.values(errors).map(error => `<li>${error}</li>`).join('')}
                        </ul>
                    </div>
                `,
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444',
                confirmButtonText: 'Fix Errors',
                customClass: {
                    popup: 'rounded-2xl border border-red-500/30',
                    htmlContainer: 'text-left'
                }
            });
            return;
        }
        
        setIsSubmitting(true);
        
        const update_url = `http://localhost:7120/event/updateEvent/${params.eventName}`;
        
        try {
            const response = await fetch(update_url, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update event');
            }

            Swal.fire({
                title: 'Success!',
                text: 'Event updated successfully',
                icon: 'success',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#10b981',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    popup: 'rounded-2xl border border-emerald-500/30'
                }
            });

            setTimeout(() => navigate('/eventCard'), 2000);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.message || 'Something went wrong while updating the event!',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444',
                customClass: {
                    popup: 'rounded-2xl border border-red-500/30'
                }
            });
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const inputClasses = "w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300";
    const errorInputClasses = "w-full bg-gray-800/50 backdrop-blur-sm border border-red-500/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300";
    const labelClasses = "block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2";
    const errorLabelClasses = "block text-sm font-medium text-red-400 mb-2 flex items-center gap-2";
    const errorMessageClasses = "text-red-400 text-sm mt-1 flex items-center gap-2";

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black flex flex-col items-center justify-center">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <p className="mt-6 text-gray-400">Loading event details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <Link 
                            to='/eventCard'
                            className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Events</span>
                        </Link>
                        
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-4">
                                <Sparkles size={16} className="text-yellow-400" />
                                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                    Edit Event
                                </span>
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                                <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                                    Update Event
                                </span>
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Edit details for <span className="text-white font-semibold">{data.eventName}</span>
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
                        <form onSubmit={handleSaveChanges} className="p-6 sm:p-8">
                            {/* Event Basics */}
                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl">
                                        <FileText size={24} className="text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Event Details</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={errors.eventName ? errorLabelClasses : labelClasses}>
                                            <Tag size={16} />
                                            Event Name
                                        </label>
                                        <input
                                            type="text"
                                            name="eventName"
                                            value={data.eventName}
                                            onChange={handleChange}
                                            className={errors.eventName ? errorInputClasses : inputClasses}
                                            placeholder="Enter event name"
                                        />
                                        {errors.eventName && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.eventName}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={errors.eventCategory ? errorLabelClasses : labelClasses}>
                                            <Users size={16} />
                                            Category
                                        </label>
                                        <select
                                            name="eventCategory"
                                            value={data.eventCategory}
                                            onChange={handleChange}
                                            className={errors.eventCategory ? errorInputClasses : inputClasses}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(cat => (
                                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                                            ))}
                                        </select>
                                        {errors.eventCategory && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.eventCategory}
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className={errors.eventDescription ? errorLabelClasses : labelClasses}>
                                            <FileText size={16} />
                                            Description
                                        </label>
                                        <textarea
                                            name="eventDescription"
                                            value={data.eventDescription}
                                            onChange={handleChange}
                                            rows="4"
                                            className={`${errors.eventDescription ? errorInputClasses : inputClasses} resize-none`}
                                            placeholder="Describe your event in detail..."
                                        />
                                        {errors.eventDescription && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.eventDescription}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl">
                                        <Calendar size={24} className="text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Date & Time</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={errors.startDate ? errorLabelClasses : labelClasses}>
                                            <Calendar size={16} />
                                            Start Date & Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="startDate"
                                            value={data.startDate}
                                            onChange={handleChange}
                                            className={errors.startDate ? errorInputClasses : inputClasses}
                                        />
                                        {errors.startDate && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.startDate}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={errors.endDate ? errorLabelClasses : labelClasses}>
                                            <Calendar size={16} />
                                            End Date & Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="endDate"
                                            value={data.endDate}
                                            onChange={handleChange}
                                            className={errors.endDate ? errorInputClasses : inputClasses}
                                        />
                                        {errors.endDate && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.endDate}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-xl">
                                        <MapPin size={24} className="text-yellow-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Location</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className={errors.venueName ? errorLabelClasses : labelClasses}>
                                            <Building size={16} />
                                            Venue Name
                                        </label>
                                        <input
                                            type="text"
                                            name="venueName"
                                            value={data.venueName}
                                            onChange={handleChange}
                                            className={errors.venueName ? errorInputClasses : inputClasses}
                                            placeholder="e.g., Grand Convention Center"
                                        />
                                        {errors.venueName && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.venueName}
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className={errors.venueAddress ? errorLabelClasses : labelClasses}>
                                            <MapPin size={16} />
                                            Full Address
                                        </label>
                                        <input
                                            type="text"
                                            name="venueAddress"
                                            value={data.venueAddress}
                                            onChange={handleChange}
                                            className={errors.venueAddress ? errorInputClasses : inputClasses}
                                            placeholder="Street, City, State, ZIP Code"
                                        />
                                        {errors.venueAddress && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.venueAddress}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Organizer & Tickets */}
                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-xl">
                                        <User size={24} className="text-cyan-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Organizer & Tickets</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={errors.organizerName ? errorLabelClasses : labelClasses}>
                                            <User size={16} />
                                            Organizer Name
                                        </label>
                                        <input
                                            type="text"
                                            name="organizerName"
                                            value={data.organizerName}
                                            onChange={handleChange}
                                            className={errors.organizerName ? errorInputClasses : inputClasses}
                                            placeholder="Organizer or Company Name"
                                        />
                                        {errors.organizerName && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.organizerName}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={errors.organizerContact ? errorLabelClasses : labelClasses}>
                                            <Mail size={16} />
                                            Contact Information
                                        </label>
                                        <input
                                            type="text"
                                            name="organizerContact"
                                            value={data.organizerContact}
                                            onChange={handleChange}
                                            className={errors.organizerContact ? errorInputClasses : inputClasses}
                                            placeholder="email@example.com or +1234567890"
                                        />
                                        {errors.organizerContact && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.organizerContact}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={errors.ticketPrice ? errorLabelClasses : labelClasses}>
                                            <DollarSign size={16} />
                                            Ticket Price ($)
                                        </label>
                                        <input
                                            type="number"
                                            name="ticketPrice"
                                            value={data.ticketPrice}
                                            onChange={handleChange}
                                            className={errors.ticketPrice ? errorInputClasses : inputClasses}
                                            placeholder="0.00"
                                            step="0.01"
                                            min="0"
                                        />
                                        {errors.ticketPrice && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.ticketPrice}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={errors.ticketType ? errorLabelClasses : labelClasses}>
                                            <Tag size={16} />
                                            Ticket Type
                                        </label>
                                        <select
                                            name="ticketType"
                                            value={data.ticketType}
                                            onChange={handleChange}
                                            className={errors.ticketType ? errorInputClasses : inputClasses}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Free">Free</option>
                                            <option value="Paid">Paid</option>
                                            <option value="VIP">VIP</option>
                                            <option value="Early Bird">Early Bird</option>
                                        </select>
                                        {errors.ticketType && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.ticketType}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={errors.maxAttendees ? errorLabelClasses : labelClasses}>
                                            <Users size={16} />
                                            Maximum Attendees
                                        </label>
                                        <input
                                            type="number"
                                            name="maxAttendees"
                                            value={data.maxAttendees}
                                            onChange={handleChange}
                                            className={errors.maxAttendees ? errorInputClasses : inputClasses}
                                            placeholder="100"
                                            min="1"
                                        />
                                        {errors.maxAttendees && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.maxAttendees}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="pt-8 border-t border-gray-700/50">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/eventCard')}
                                        className="group flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:text-white rounded-xl text-lg font-semibold hover:bg-gray-800/80 transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
                                    >
                                        <X size={20} />
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 text-white rounded-xl text-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={20} />
                                                Save Changes
                                                <CheckCircle size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Validation Summary */}
                    {Object.keys(errors).length > 0 && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-red-600/10 backdrop-blur-sm rounded-xl border border-red-500/30">
                            <div className="flex items-center gap-3 mb-2">
                                <AlertCircle size={20} className="text-red-400" />
                                <h4 className="font-bold text-white">Please fix the following errors:</h4>
                            </div>
                            <ul className="text-sm text-gray-300 space-y-1 ml-8 list-disc">
                                {Object.values(errors).map((error, index) => (
                                    error && <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventEdit;