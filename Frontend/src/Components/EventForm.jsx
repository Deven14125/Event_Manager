import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sweet from 'sweetalert2';
import {
    Calendar,
    MapPin,
    Users,
    Ticket,
    FileText,
    Building,
    User,
    Mail,
    DollarSign,
    Sparkles,
    ArrowLeft,
    CheckCircle,
    AlertCircle,
    Tag,
    Award,
    Loader2,
    ArrowRight,
    Globe,
    Hash,
    Zap
} from 'lucide-react';

const EventForm = () => {
    const [data, setData] = useState({
        eventName: "",
        eventCategory: "",
        eventDescription: "",
        startDate: "",
        endDate: "",
        venueName: "",
        venueAddress: "",
        city: "",
        country: "",
        organizerName: "",
        organizerContact: "",
        ticketPrice: "",
        ticketType: "General",
        maxAttendees: "",
        tags: "",
        eventImage: ""
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const categories = [
        { value: "Conference", label: "Conference", icon: "👥", color: "from-blue-500 to-cyan-500" },
        { value: "Workshop", label: "Workshop", icon: "🔧", color: "from-green-500 to-emerald-500" },
        { value: "Concert", label: "Concert", icon: "🎵", color: "from-purple-500 to-pink-500" },
        { value: "Meetup", label: "Meetup", icon: "🤝", color: "from-yellow-500 to-amber-500" },
        { value: "Exhibition", label: "Exhibition", icon: "🎨", color: "from-indigo-500 to-blue-500" },
        { value: "Webinar", label: "Webinar", icon: "💻", color: "from-gray-500 to-gray-600" },
        { value: "Networking", label: "Networking", icon: "🌐", color: "from-teal-500 to-cyan-500" },
        { value: "Festival", label: "Festival", icon: "🎉", color: "from-orange-500 to-red-500" }
    ];

    const ticketTypes = [
        { value: "General", label: "General Admission" },
        { value: "VIP", label: "VIP Access" },
        { value: "EarlyBird", label: "Early Bird" },
        { value: "Student", label: "Student" },
        { value: "Group", label: "Group Ticket" },
        { value: "Free", label: "Free Registration" }
    ];

    const steps = [
        { number: 1, label: "Basic Info", icon: <FileText size={18} /> },
        { number: 2, label: "Date & Location", icon: <MapPin size={18} /> },
        { number: 3, label: "Ticket Details", icon: <Ticket size={18} /> },
        { number: 4, label: "Review & Publish", icon: <Award size={18} /> }
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!data.eventName.trim()) newErrors.eventName = "Event name is required";
        else if (data.eventName.length < 3) newErrors.eventName = "Event name must be at least 3 characters";

        if (!data.eventCategory) newErrors.eventCategory = "Please select a category";

        if (!data.eventDescription.trim()) newErrors.eventDescription = "Description is required";
        else if (data.eventDescription.length < 20) newErrors.eventDescription = "Description must be at least 20 characters";

        if (!data.startDate) newErrors.startDate = "Start date is required";
        if (!data.endDate) newErrors.endDate = "End date is required";

        if (data.startDate && data.endDate) {
            const start = new Date(data.startDate);
            const end = new Date(data.endDate);
            if (start >= end) newErrors.endDate = "End date must be after start date";
        }

        if (!data.venueName.trim()) newErrors.venueName = "Venue name is required";
        if (!data.venueAddress.trim()) newErrors.venueAddress = "Venue address is required";
        if (!data.city.trim()) newErrors.city = "City is required";
        if (!data.country.trim()) newErrors.country = "Country is required";

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

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            Sweet.fire({
                title: 'Validation Error',
                html: `
                    <div class="text-left">
                        <p class="text-white mb-2">Please correct the following errors:</p>
                        <ul class="list-disc pl-4 text-gray-300 space-y-1">
                            ${Object.values(errors).map(error => `<li>${error}</li>`).join('')}
                        </ul>
                    </div>
                `,
                icon: 'error',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444',
                customClass: {
                    popup: 'rounded-2xl border border-red-500/30'
                }
            });
            return;
        }

        setIsLoading(true);

        try {
            const requestData = {
                ...data,
                ticketPrice: typeof data.ticketPrice === 'string' ? parseFloat(data.ticketPrice) : data.ticketPrice,
                maxAttendees: typeof data.maxAttendees === 'string' ? parseInt(data.maxAttendees) : data.maxAttendees,
                tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
            };

            const api_url = "http://localhost:7120/event/addEvent";
            const response = await fetch(api_url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                await response.json();

                Sweet.fire({
                    title: 'Event Published Successfully!',
                    html: `
                        <div class="text-center">
                            <div class="mb-4 text-5xl">🎉</div>
                            <p class="text-white mb-2">Your event is now live!</p>
                            <p class="text-gray-300">It will appear on the public feed shortly.</p>
                        </div>
                    `,
                    icon: 'success',
                    background: '#1f2937',
                    color: '#fff',
                    confirmButtonColor: '#10b981',
                    timer: 3000,
                    timerProgressBar: true,
                    customClass: {
                        popup: 'rounded-2xl border border-emerald-500/30'
                    }
                }).then(() => {
                    navigate('/eventCard');
                });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create event');
            }

        } catch (error) {
            console.error(error);
            Sweet.fire({
                title: 'Creation Failed',
                text: error.message || 'Something went wrong. Please try again later.',
                icon: 'error',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444',
                customClass: {
                    popup: 'rounded-2xl border border-red-500/30'
                }
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let finalValue = value;
        if (name === 'ticketPrice' || name === 'maxAttendees') {
            finalValue = value;
        }

        setData(prev => ({ ...prev, [name]: finalValue }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const inputClasses = "w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300";
    const errorInputClasses = "w-full bg-gray-800/50 backdrop-blur-sm border border-red-500/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300";
    const labelClasses = "block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2";
    const errorMessageClasses = "text-red-400 text-sm mt-2 flex items-center gap-2";

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
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
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
                                <Sparkles size={16} className="text-yellow-400" />
                                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                    Create New Event
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                                <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                                    Create Event
                                </span>
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Share your amazing event with the world in just a few steps
                            </p>
                        </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-4">
                            {steps.map((step) => (
                                <div key={step.number} className="flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${step.number === currentStep
                                            ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                                            : step.number < currentStep
                                                ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400'
                                                : 'bg-gray-800/50 text-gray-400'
                                        }`}>
                                        {step.icon}
                                    </div>
                                    <span className={`text-xs mt-2 ${step.number === currentStep ? 'text-white font-bold' : 'text-gray-400'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="relative h-2 bg-gray-800/50 rounded-full">
                            <div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-green-600 rounded-full transition-all duration-500"
                                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
                        <form onSubmit={handleCreate} className="p-6 sm:p-8">
                            {/* Step 1: Basic Info */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl">
                                            <FileText size={24} className="text-blue-400" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">Basic Information</h2>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>
                                            <Tag size={16} />
                                            Event Name
                                        </label>
                                        <input
                                            type="text"
                                            name="eventName"
                                            value={data.eventName}
                                            onChange={handleChange}
                                            className={errors.eventName ? errorInputClasses : inputClasses}
                                            placeholder="Enter a catchy event name"
                                        />
                                        {errors.eventName && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.eventName}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClasses}>
                                            <Tag size={16} />
                                            Event Category
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {categories.map(cat => (
                                                <button
                                                    key={cat.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setData(prev => ({ ...prev, eventCategory: cat.value }));
                                                        if (errors.eventCategory) setErrors(prev => ({ ...prev, eventCategory: undefined }));
                                                    }}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${data.eventCategory === cat.value
                                                            ? 'bg-gradient-to-br from-blue-500/20 to-green-500/20 border-2 border-blue-500/50'
                                                            : 'bg-gray-800/30 border border-gray-700/50 hover:border-blue-500/30'
                                                        }`}
                                                >
                                                    <span className="text-2xl mb-2">{cat.icon}</span>
                                                    <span className="text-xs font-medium text-center">{cat.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {errors.eventCategory && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.eventCategory}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClasses}>
                                            <FileText size={16} />
                                            Description
                                        </label>
                                        <textarea
                                            name="eventDescription"
                                            value={data.eventDescription}
                                            onChange={handleChange}
                                            rows="4"
                                            className={`${errors.eventDescription ? errorInputClasses : inputClasses} resize-none`}
                                            placeholder="Describe your event in detail. What makes it special?"
                                        />
                                        <div className="flex justify-between mt-2">
                                            {errors.eventDescription && (
                                                <p className={errorMessageClasses}>
                                                    <AlertCircle size={14} />
                                                    {errors.eventDescription}
                                                </p>
                                            )}
                                            <span className="text-xs text-gray-500 ml-auto">
                                                {data.eventDescription.length}/500 characters
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>
                                            <Hash size={16} />
                                            Tags (comma separated)
                                        </label>
                                        <input
                                            type="text"
                                            name="tags"
                                            value={data.tags}
                                            onChange={handleChange}
                                            className={inputClasses}
                                            placeholder="e.g., networking, tech, workshop, startup"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Date & Location */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl">
                                            <MapPin size={24} className="text-green-400" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">Date & Location</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelClasses}>
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
                                            <label className={labelClasses}>
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

                                    <div>
                                        <label className={labelClasses}>
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

                                    <div>
                                        <label className={labelClasses}>
                                            <MapPin size={16} />
                                            Full Address
                                        </label>
                                        <input
                                            type="text"
                                            name="venueAddress"
                                            value={data.venueAddress}
                                            onChange={handleChange}
                                            className={errors.venueAddress ? errorInputClasses : inputClasses}
                                            placeholder="Street address, building, floor"
                                        />
                                        {errors.venueAddress && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.venueAddress}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelClasses}>
                                                <MapPin size={16} />
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={data.city}
                                                onChange={handleChange}
                                                className={errors.city ? errorInputClasses : inputClasses}
                                                placeholder="City"
                                            />
                                            {errors.city && (
                                                <p className={errorMessageClasses}>
                                                    <AlertCircle size={14} />
                                                    {errors.city}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className={labelClasses}>
                                                <Globe size={16} />
                                                Country
                                            </label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={data.country}
                                                onChange={handleChange}
                                                className={errors.country ? errorInputClasses : inputClasses}
                                                placeholder="Country"
                                            />
                                            {errors.country && (
                                                <p className={errorMessageClasses}>
                                                    <AlertCircle size={14} />
                                                    {errors.country}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Ticket Details */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-xl">
                                            <Ticket size={24} className="text-yellow-400" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">Ticket & Organizer Details</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelClasses}>
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
                                            <label className={labelClasses}>
                                                <Ticket size={16} />
                                                Ticket Type
                                            </label>
                                            <select
                                                name="ticketType"
                                                value={data.ticketType}
                                                onChange={handleChange}
                                                className={errors.ticketType ? errorInputClasses : inputClasses}
                                            >
                                                {ticketTypes.map(type => (
                                                    <option key={type.value} value={type.value}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.ticketType && (
                                                <p className={errorMessageClasses}>
                                                    <AlertCircle size={14} />
                                                    {errors.ticketType}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>
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

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelClasses}>
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
                                            <label className={labelClasses}>
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
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Review & Publish */}
                            {currentStep === 4 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl">
                                            <Award size={24} className="text-purple-400" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">Review & Publish</h2>
                                    </div>

                                    <div className="bg-gray-800/30 rounded-xl p-6 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-400">Event Name</p>
                                                <p className="text-white font-semibold">{data.eventName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Category</p>
                                                <p className="text-white font-semibold">{data.eventCategory}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Date & Time</p>
                                                <p className="text-white font-semibold">
                                                    {data.startDate ? new Date(data.startDate).toLocaleString() : 'Not set'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Venue</p>
                                                <p className="text-white font-semibold">{data.venueName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Ticket Price</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                                    ${data.ticketPrice || '0'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Max Attendees</p>
                                                <p className="text-white font-semibold">{data.maxAttendees}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-400 mb-2">Description</p>
                                            <p className="text-gray-300">{data.eventDescription}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl border border-blue-500/30">
                                        <div className="flex items-center gap-3">
                                            <Zap size={20} className="text-yellow-400" />
                                            <div>
                                                <p className="font-semibold text-white">Ready to Publish?</p>
                                                <p className="text-sm text-gray-300">Your event will be visible to all users once published.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="pt-8 border-t border-gray-700/50">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {currentStep > 1 && (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:text-white rounded-xl text-lg font-semibold hover:bg-gray-800/80 transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
                                        >
                                            <ArrowLeft size={20} />
                                            Previous
                                        </button>
                                    )}

                                    {currentStep < steps.length ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl text-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
                                        >
                                            Continue
                                            <ArrowRight size={20} />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 text-white rounded-xl text-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" />
                                                    Publishing...
                                                </>
                                            ) : (
                                                <>
                                                    <Award size={20} />
                                                    Publish Event
                                                    <CheckCircle size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </>
                                            )}
                                        </button>
                                    )}
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

export default EventForm;