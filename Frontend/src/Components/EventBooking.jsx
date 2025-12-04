import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventBooking = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        address: '',
        venueName: '',
        bookingStartDate: '',
        bookingTime: '', // Optional: User can choose a time
        fare: "", // Default fare for 2 days
        platformOwner: '',
        city: '',
        state: '',
        country: 'India',
        paymentOption: ''
    });

    const [cities, setCities] = useState([]);

    // States and corresponding cities of India
    const statesAndCities = {
        Maharashtra: [
            'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Kolhapur', 'Solapur', 'Akola', 'Jalgaon', 'Amravati',
            'Ratnagiri', 'Satara', 'Sindhudurg', 'Parbhani', 'Yavatmal', 'Jalna', 'Bhandara', 'Wardha', 'Gadchiroli', 'Chandrapur',
            'Hingoli', 'Latur', 'Osmanabad', 'Beed', 'Dhule', 'Nandurbar', 'Washim', 'Buldhana', 'Palghar', 'Ratnagiri', 'Bhiwandi',
            'Navi Mumbai', 'Ulhasnagar', 'Vasai-Virar', 'Ambarnath', 'Matheran', 'Kalyan-Dombivli', 'Thane', 'Chinchwad', 'Nandgaon'
        ],
        Delhi: [
            'New Delhi', 'Noida', 'Gurgaon', 'Faridabad', 'Ghaziabad', 'Delhi Cantonment', 'Shahdara', 'Dwarka', 'Karol Bagh',
            'Lajpat Nagar', 'Saket', 'Rohini', 'Vasant Vihar', 'Chanakyapuri', 'Mayur Vihar', 'Okhla', 'Chandni Chowk', 'Rajouri Garden',
            'Paschim Vihar', 'Pitampura', 'Janakpuri', 'Punjabi Bagh', 'Sarai Kale Khan', 'Narela', 'Sultanpur Majra', 'Kalkaji'
        ],
        TamilNadu: [
            'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore', 'Dindigul',
            'Thanjavur', 'Theni', 'Ramanathapuram', 'Cuddalore', 'Arakkonam', 'Kanchipuram', 'Karaikal', 'Chidambaram', 'Tiruvarur',
            'Kovilpatti', 'Virudhunagar', 'Tiruppur', 'Vikramshila', 'Kanchipuram', 'Vandalur', 'Tiruvallur', 'Perambalur', 'Pollachi'
        ],
        Karnataka: [
            'Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Dharwad', 'Bellary', 'Chitradurga', 'Udupi', 'Tumkur', 'Bagalkot',
            'Chikkamagaluru', 'Bijapur', 'Kolar', 'Hassan', 'Mandya', 'Raichur', 'Chamarajanagar', 'Gulbarga', 'Yadgir', 'Koppal',
            'Haveri', 'Shivamogga', 'Bagalkot', 'Udupi', 'Madikeri', 'Channarayapatna', 'Channarayapatna', 'Srinivaspura', 'Bidar',
            'Ramnagara', 'Channarayapatna', 'Byadgi'
        ],
        Gujarat: [
            'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Gandhinagar', 'Junagadh', 'Anand', 'Vapi', 'Nadiad', 'Mehsana',
            'Valsad', 'Morbi', 'Navsari', 'Veraval', 'Bharuch', 'Dahej', 'Godhra', 'Modasa', 'Patan', 'Panchmahal', 'Daman', 'Dahod',
            'Porbandar', 'Palitana', 'Jamnagar', 'Bhuj', 'Kutch', 'Gandhidham', 'Bhavnagar', 'Mandvi', 'Palanpur', 'Vapi', 'Nadiad'
        ],
        UttarPradesh: [
            'Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Ghaziabad', 'Meerut', 'Allahabad', 'Mathura', 'Noida', 'Aligarh', 'Bareilly',
            'Jhansi', 'Moradabad', 'Rampur', 'Firozabad', 'Shahjahanpur', 'Azamgarh', 'Bijnor', 'Saharanpur', 'Muzaffarnagar', 'Unnao',
            'Deoria', 'Ballia', 'Gorakhpur', 'Budaun', 'Sitapur', 'Bijnor', 'Etawah', 'Jalaun', 'Kannauj', 'Pratapgarh', 'Rae Bareli',
            'Banda', 'Mahoba', 'Etah', 'Shahjahanpur', 'Aligarh', 'Sultanpur'
        ],
        Rajasthan: [
            'Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Alwar', 'Sikar', 'Churu', 'Pali', 'Sawai Madhopur',
            'Jhunjhunu', 'Barmer', 'Nagaur', 'Bundi', 'Dholpur', 'Jhalawar', 'Tonk', 'Sirohi', 'Rajsamand', 'Bhilwara', 'Banswara',
            'Chittorgarh', 'Jaisalmer', 'Hanumangarh', 'Jalore', 'Sri Ganganagar', 'Dausa', 'Bharatpur', 'Churu', 'Nimbahera'
        ],
        Punjab: [
            'Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Rupnagar', 'Moga', 'Firozpur',
            'Hoshiarpur', 'Gurdaspur', 'Pathankot', 'Kapurthala', 'Fatehgarh Sahib', 'Sangrur', 'Barnala', 'Mansa', 'Abohar', 'Bikram',
            'Patiala', 'Samrala', 'Sultanpur Lodhi'
        ],
        WestBengal: [
            'Kolkata', 'Howrah', 'Siliguri', 'Durgapur', 'Asansol', 'Kolkata Suburbs', 'Murshidabad', 'Malda', 'Kolar', 'Jalpaiguri',
            'Burdwan', 'Kolar', 'Bongaigaon', 'Hooghly', 'Purulia', 'Bankura', 'Alambazar', 'Haldia', 'Kalyani', 'Nadia', 'Ranaghat',
            'Tamluk', 'Kolkata South', 'Kolkata North', 'Sodepur', 'Dumdum'
        ],
        AndhraPradesh: [
            'Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Rajahmundry', 'Kakinada', 'Nellore', 'Chittoor', 'Anantapur',
            'Kadapa', 'Eluru', 'Bhimavaram', 'Chirala', 'Machilipatnam', 'Nandyal', 'Kurnool', 'Ongole', 'Tadepalligudem', 'Srikakulam',
            'Tirumala', 'Peddapalli', 'Palamaner'
        ],
        Telangana: [
            'Hyderabad', 'Warangal', 'Khammam', 'Karimnagar', 'Nizamabad', 'Nellore', 'Mahabubnagar', 'Rangareddy', 'Suryapet',
            'Adilabad', 'Bhongir', 'Khammam', 'Medak', 'Vikarabad', 'Mahabubabad', 'Mancherial', 'Miryalaguda', 'Nalgonda', 'Sircilla'
        ],
        Kerala: [
            'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kottayam', 'Thrissur', 'Malappuram', 'Palakkad', 'Kannur', 'Alappuzha',
            'Pathanamthitta', 'Idukki', 'Wayanad', 'Ernakulam', 'Kollam', 'Varkala', 'Punalur', 'Attingal', 'Perumbavoor', 'Muvattupuzha',
            'Kottakkal', 'Kochi', 'Sreekariyam', 'Kochi South', 'Changanassery'
        ],
        MadhyaPradesh: [
            'Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Ratlam', 'Sagar', 'Rewa', 'Katni', 'Dewas', 'Vidisha', 'Shivpuri',
            'Satna', 'Chhindwara', 'Burhanpur', 'Betul', 'Shahdol', 'Sehore', 'Chhatarpur', 'Neemuch', 'Shahjapur', 'Hoshangabad', 'Biaora'
        ],
        Bihar: [
            'Patna', 'Gaya', 'Bhagalpur', 'Muzzafarpur', 'Purnia', 'Arrah', 'Buxar', 'Nalanda', 'Katihar', 'Darbhanga', 'Hajipur',
            'Samastipur', 'Motihari', 'Chhapra', 'Sitamarhi', 'Munger', 'Bhagalpur', 'Lakhisarai', 'Begusarai', 'Siwan', 'Jamui',
            'Khagaria'
        ]
    };


    // Fare calculation logic based on the number of days
    const calculateTotalFare = (startDate) => {
        const start = new Date(startDate);
        const today = new Date();
        const differenceInDays = Math.max(1, Math.ceil((start - today) / (1000 * 3600 * 24))); // Minimum of 1 day

        const totalFare = 1000 * differenceInDays; // 1000 per day
        return totalFare;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData({
            ...formData,
            [name]: value
        });

        // Update cities if state changes
        if (name === 'state') {
            setCities(statesAndCities[value] || []);
        }

        // Update fare when booking start date changes
        if (name === 'bookingStartDate') {
            const totalFare = calculateTotalFare(value);
            setFormData({
                ...formData,
                fare: totalFare
            });
        }
    };

    const handleSubmit = () => {
        // Navigate to payment page after form submission
        navigate('/payment', { state: formData });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex justify-center items-center py-8">
            <div className="max-w-2xl w-full bg-white shadow-xl rounded-lg p-6 md:p-8">
                <h2 className="text-3xl font-semibold text-center text-indigo-800 mb-6">Event Booking</h2>
                <div className="space-y-5">
                    {/* Venue Name */}
                    <div>
                        <label htmlFor="venueName" className="block text-sm font-medium text-gray-700">Venue Name</label>
                        <input
                            type="text"
                            id="venueName"
                            name="venueName"
                            value={formData.venueName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Booking Start Date */}
                    <div>
                        <label htmlFor="bookingStartDate" className="block text-sm font-medium text-gray-700">Booking Start Date</label>
                        <input
                            type="text"
                            id="bookingStartDate"
                            name="bookingStartDate"
                            value={formData.bookingStartDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            required
                            placeholder='DD/MM/YYYY'
                        />
                    </div>

                    {/* Booking Time (Optional) */}
                    <div>
                        <label htmlFor="bookingTime" className="block text-sm font-medium text-gray-700">Booking Time (Optional)</label>
                        <input
                            type="text"
                            id="bookingTime"
                            name="bookingTime"
                            value={formData.bookingTime}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            placeholder='hh:mm AM/PM'
                        />
                    </div>

                    {/* Fare */}
                    <div>
                        <label htmlFor="fare" className="block text-sm font-medium text-gray-700">Total Fare</label>
                        <input
                            type="number"
                            id="fare"
                            name="fare"
                            value={formData.fare}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Platform Owner */}
                    <div>
                        <label htmlFor="platformOwner" className="block text-sm font-medium text-gray-700">Venue Organizer</label>
                        <input
                            type="text"
                            id="platformOwner"
                            name="platformOwner"
                            value={formData.platformOwner}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* State Selection */}
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                        <select
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select State</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Delhi">Delhi</option>
                            <option value="TamilNadu">Tamil Nadu</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="UttarPradesh">Uttar Pradesh</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Punjab">Punjab</option>
                            <option value="WestBengal">West Bengal</option>
                            <option value="AndhraPradesh">Andhra Pradesh</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Kerala">Kerala</option>
                            <option value="MadhyaPradesh">Madhya Pradesh</option>
                            <option value="Bihar">Bihar</option>
                            {/* Add more states here if necessary */}
                        </select>
                    </div>

                    {/* City Selection */}
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <select
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            disabled={!formData.state} // Disable city if no state is selected
                        >
                            <option value="">Select City</option>
                            {cities.length > 0 ? (
                                cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))
                            ) : (
                                <option value="">No cities available</option>
                            )}
                        </select>
                    </div>

                    {/* Country Selection */}
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                        <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="India">India</option>
                        </select>
                    </div>

                    {/* Payment Option */}
                    <div>
                        <label htmlFor="paymentOption" className="block text-sm font-medium text-gray-700">Payment Option</label>
                        <select
                            id="paymentOption"
                            name="paymentOption"
                            value={formData.paymentOption}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Select Payment Option</option>
                            <option value="creditCard">Credit Card</option>
                            <option value="debitCard">Debit Card</option>
                            <option value="onlineBanking">Online Banking</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventBooking;
