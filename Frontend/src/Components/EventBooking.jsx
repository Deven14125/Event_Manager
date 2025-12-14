import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar,
    MapPin,
    Clock,
    DollarSign,
    Building,
    User,
    Globe,
    CreditCard,
    Sparkles,
    ArrowRight,
    Calculator,
    Shield,
    CheckCircle,
    AlertCircle,
    ChevronDown,
    Receipt,
    Wallet,
    Banknote,
    Smartphone
} from 'lucide-react';

const EventBooking = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        venueName: '',
        address: '',
        bookingStartDate: '',
        bookingTime: '',
        fare: "",
        platformOwner: '',
        city: '',
        state: '',
        country: 'India',
        paymentOption: ''
    });

    const [errors, setErrors] = useState({});
    const [cities, setCities] = useState([]);
    const [isCalculating, setIsCalculating] = useState(false);

    // States and corresponding cities of India
    const statesAndCities = {
        Maharashtra: [
            'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Kolhapur', 'Solapur', 'Akola', 'Jalgaon', 'Amravati',
            'Ratnagiri', 'Satara', 'Sindhudurg', 'Parbhani', 'Yavatmal', 'Jalna', 'Bhandara', 'Wardha', 'Gadchiroli', 'Chandrapur',
            'Hingoli', 'Latur', 'Osmanabad', 'Beed', 'Dhule', 'Nandurbar', 'Washim', 'Buldhana', 'Palghar', 'Bhiwandi',
            'Navi Mumbai', 'Ulhasnagar', 'Vasai-Virar', 'Ambarnath', 'Matheran', 'Kalyan-Dombivli', 'Chinchwad', 'Nandgaon'
        ],
        Delhi: [
            'New Delhi', 'Noida', 'Gurgaon', 'Faridabad', 'Ghaziabad', 'Delhi Cantonment', 'Shahdara', 'Dwarka', 'Karol Bagh',
            'Lajpat Nagar', 'Saket', 'Rohini', 'Vasant Vihar', 'Chanakyapuri', 'Mayur Vihar', 'Okhla', 'Chandni Chowk', 'Rajouri Garden',
            'Paschim Vihar', 'Pitampura', 'Janakpuri', 'Punjabi Bagh', 'Sarai Kale Khan', 'Narela', 'Sultanpur Majra', 'Kalkaji'
        ],
        TamilNadu: [
            'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore', 'Dindigul',
            'Thanjavur', 'Theni', 'Ramanathapuram', 'Cuddalore', 'Arakkonam', 'Kanchipuram', 'Karaikal', 'Chidambaram', 'Tiruvarur',
            'Kovilpatti', 'Virudhunagar', 'Tiruppur', 'Vikramshila', 'Vandalur', 'Tiruvallur', 'Perambalur', 'Pollachi'
        ],
        Karnataka: [
            'Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Dharwad', 'Bellary', 'Chitradurga', 'Udupi', 'Tumkur', 'Bagalkot',
            'Chikkamagaluru', 'Bijapur', 'Kolar', 'Hassan', 'Mandya', 'Raichur', 'Chamarajanagar', 'Gulbarga', 'Yadgir', 'Koppal',
            'Haveri', 'Shivamogga', 'Madikeri', 'Channarayapatna', 'Srinivaspura', 'Bidar', 'Ramnagara', 'Byadgi'
        ],
        Gujarat: [
            'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Gandhinagar', 'Junagadh', 'Anand', 'Vapi', 'Nadiad', 'Mehsana',
            'Valsad', 'Morbi', 'Navsari', 'Veraval', 'Bharuch', 'Dahej', 'Godhra', 'Modasa', 'Patan', 'Panchmahal', 'Daman', 'Dahod',
            'Porbandar', 'Palitana', 'Jamnagar', 'Bhuj', 'Kutch', 'Gandhidham', 'Mandvi', 'Palanpur'
        ],
        UttarPradesh: [
            'Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Ghaziabad', 'Meerut', 'Allahabad', 'Mathura', 'Noida', 'Aligarh', 'Bareilly',
            'Jhansi', 'Moradabad', 'Rampur', 'Firozabad', 'Shahjahanpur', 'Azamgarh', 'Bijnor', 'Saharanpur', 'Muzaffarnagar', 'Unnao',
            'Deoria', 'Ballia', 'Gorakhpur', 'Budaun', 'Sitapur', 'Etawah', 'Jalaun', 'Kannauj', 'Pratapgarh', 'Rae Bareli',
            'Banda', 'Mahoba', 'Etah', 'Aligarh', 'Sultanpur'
        ],
        Rajasthan: [
            'Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Alwar', 'Sikar', 'Churu', 'Pali', 'Sawai Madhopur',
            'Jhunjhunu', 'Barmer', 'Nagaur', 'Bundi', 'Dholpur', 'Jhalawar', 'Tonk', 'Sirohi', 'Rajsamand', 'Bhilwara', 'Banswara',
            'Chittorgarh', 'Jaisalmer', 'Hanumangarh', 'Jalore', 'Sri Ganganagar', 'Dausa', 'Bharatpur'
        ]
    };

    const paymentOptions = [
        { value: 'creditCard', label: 'Credit Card', icon: <CreditCard size={20} />, color: 'text-blue-400' },
        { value: 'debitCard', label: 'Debit Card', icon: <CreditCard size={20} />, color: 'text-green-400' },
        { value: 'onlineBanking', label: 'Online Banking', icon: <Banknote size={20} />, color: 'text-purple-400' },
        { value: 'upi', label: 'UPI Payment', icon: <Smartphone size={20} />, color: 'text-yellow-400' },
        { value: 'paypal', label: 'PayPal', icon: <Wallet size={20} />, color: 'text-cyan-400' },
    ];

    const calculateTotalFare = (startDate) => {
        if (!startDate) return 0;

        try {
            const [day, month, year] = startDate.split('/').map(Number);
            const start = new Date(year, month - 1, day);
            const today = new Date();

            if (isNaN(start.getTime())) return 0;

            const differenceInTime = start.getTime() - today.getTime();
            const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

            return Math.max(1, differenceInDays) * 1000;
        } catch (error) {
            console.log(error)
            return 0;
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.venueName.trim()) newErrors.venueName = "Venue name is required";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.bookingStartDate.trim()) newErrors.bookingStartDate = "Booking date is required";
        if (!formData.platformOwner.trim()) newErrors.platformOwner = "Venue organizer is required";
        if (!formData.state) newErrors.state = "Please select a state";
        if (!formData.city) newErrors.city = "Please select a city";
        if (!formData.paymentOption) newErrors.paymentOption = "Please select a payment option";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedData = { ...formData, [name]: value };
        setFormData(updatedData);

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }

        if (name === 'state') {
            setCities(statesAndCities[value] || []);
            setFormData(prev => ({ ...prev, city: '' }));
        }

        if (name === 'bookingStartDate') {
            setIsCalculating(true);
            setTimeout(() => {
                const totalFare = calculateTotalFare(value);
                setFormData(prev => ({ ...prev, fare: totalFare }));
                setIsCalculating(false);
            }, 500);
        }
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        navigate('/payment', { state: formData });
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
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
                            <Sparkles size={16} className="text-yellow-400" />
                            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                Book Your Venue
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                                Event Booking
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Fill in the details to book your perfect event venue
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
                        <div className="p-6 sm:p-8">
                            {/* Venue Details Section */}
                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl">
                                        <Building size={24} className="text-blue-400" />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">Venue Details</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClasses}>
                                            <Building size={16} />
                                            Venue Name
                                        </label>
                                        <input
                                            type="text"
                                            name="venueName"
                                            value={formData.venueName}
                                            onChange={handleChange}
                                            className={errors.venueName ? errorInputClasses : inputClasses}
                                            placeholder="Enter venue name"
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
                                            <User size={16} />
                                            Venue Organizer
                                        </label>
                                        <input
                                            type="text"
                                            name="platformOwner"
                                            value={formData.platformOwner}
                                            onChange={handleChange}
                                            className={errors.platformOwner ? errorInputClasses : inputClasses}
                                            placeholder="Organizer name or company"
                                        />
                                        {errors.platformOwner && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.platformOwner}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClasses}>
                                        <MapPin size={16} />
                                        Address
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="3"
                                        className={`${errors.address ? errorInputClasses : inputClasses} resize-none`}
                                        placeholder="Full address of the venue"
                                    />
                                    {errors.address && (
                                        <p className={errorMessageClasses}>
                                            <AlertCircle size={14} />
                                            {errors.address}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Booking Details Section */}
                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl">
                                        <Calendar size={24} className="text-green-400" />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">Booking Details</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClasses}>
                                            <Calendar size={16} />
                                            Booking Date
                                        </label>
                                        <input
                                            type="text"
                                            name="bookingStartDate"
                                            value={formData.bookingStartDate}
                                            onChange={handleChange}
                                            className={errors.bookingStartDate ? errorInputClasses : inputClasses}
                                            placeholder="DD/MM/YYYY"
                                        />
                                        {errors.bookingStartDate && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.bookingStartDate}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClasses}>
                                            <Clock size={16} />
                                            Booking Time (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="bookingTime"
                                            value={formData.bookingTime}
                                            onChange={handleChange}
                                            className={inputClasses}
                                            placeholder="hh:mm AM/PM"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Location Section */}
                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-xl">
                                        <Globe size={24} className="text-yellow-400" />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">Location</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className={labelClasses}>
                                            <MapPin size={16} />
                                            Country
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                className={`${inputClasses} appearance-none pr-10`}
                                            >
                                                <option value="India">India</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>
                                            <MapPin size={16} />
                                            State
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className={`${errors.state ? errorInputClasses : inputClasses} appearance-none pr-10`}
                                            >
                                                <option value="">Select State</option>
                                                {Object.keys(statesAndCities).map(state => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        </div>
                                        {errors.state && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.state}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClasses}>
                                            <MapPin size={16} />
                                            City
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className={`${errors.city ? errorInputClasses : inputClasses} appearance-none pr-10 ${!formData.state ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={!formData.state}
                                            >
                                                <option value="">Select City</option>
                                                {cities.map(city => (
                                                    <option key={city} value={city}>{city}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        </div>
                                        {errors.city && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.city}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Payment & Fare Section */}
                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl">
                                        <DollarSign size={24} className="text-purple-400" />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">Payment Details</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClasses}>
                                            <DollarSign size={16} />
                                            Total Fare
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="fare"
                                                value={formData.fare}
                                                readOnly
                                                className={`${inputClasses} pr-10 bg-gray-800/70`}
                                            />
                                            {isCalculating ? (
                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                    <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                                                </div>
                                            ) : (
                                                <Calculator className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Calculated as ₹1000 per day from today
                                        </p>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>
                                            <CreditCard size={16} />
                                            Payment Option
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {paymentOptions.map(option => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, paymentOption: option.value }));
                                                        if (errors.paymentOption) setErrors(prev => ({ ...prev, paymentOption: undefined }));
                                                    }}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${formData.paymentOption === option.value
                                                            ? 'bg-gradient-to-br from-blue-500/20 to-green-500/20 border-2 border-blue-500/50'
                                                            : 'bg-gray-800/30 border border-gray-700/50 hover:border-blue-500/30'
                                                        }`}
                                                >
                                                    <div className={`mb-2 ${option.color}`}>
                                                        {option.icon}
                                                    </div>
                                                    <span className="text-xs font-medium text-center">{option.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {errors.paymentOption && (
                                            <p className={errorMessageClasses}>
                                                <AlertCircle size={14} />
                                                {errors.paymentOption}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Security Info */}
                            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl border border-blue-500/30 mb-8">
                                <div className="flex items-start gap-3">
                                    <Shield size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-white">Secure Booking</p>
                                        <p className="text-sm text-gray-300">
                                            Your information is protected with SSL encryption. We never store your payment details.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 border-t border-gray-700/50">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
                                >
                                    <Receipt size={20} />
                                    <span>Proceed to Payment</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </button>

                                <p className="text-center text-gray-400 text-sm mt-4 flex items-center justify-center gap-2">
                                    <CheckCircle size={14} className="text-green-400" />
                                    Free cancellation up to 24 hours before booking
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventBooking;