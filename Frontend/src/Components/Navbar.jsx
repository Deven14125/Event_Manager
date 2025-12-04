import { useState, useEffect, useRef } from "react"; // React hooks for state and side effects
import { Link, useNavigate, Outlet } from "react-router-dom"; // React Router for navigation
import Swal from 'sweetalert2'; // SweetAlert for handling alert popups
import Background3D from './Background3D'; // Import the 3D Background
import Footer from './Footer'; // Import Footer

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state to toggle dropdown
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
    const dropdownRef = useRef(null); // Reference to dropdown menu
    const navigate = useNavigate();

    // Check if the user is logged in (via token in localStorage) when the component mounts
    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('authToken');
            setIsLoggedIn(!!token);
        };

        checkLoginStatus();

        // Listen for the custom auth-change event
        window.addEventListener('auth-change', checkLoginStatus);

        return () => {
            window.removeEventListener('auth-change', checkLoginStatus);
        };
    }, []);

    // Handle the logout action with a confirmation popup
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('authToken'); // Remove token on logout
                setIsLoggedIn(false); // Update login state
                window.dispatchEvent(new Event('auth-change')); // Notify other components
                navigate('/login'); // Redirect to login page
                Swal.fire('Logged out!', 'You have successfully logged out.', 'success');
            }
        });
    };

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false); // Close dropdown if clicked outside
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="min-h-screen relative">
            <Background3D />
            <nav className="w-full bg-gray-900/80 backdrop-blur-md text-white py-4 shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo and Title */}
                        <Link to="/" className="text-white text-2xl md:text-3xl font-extrabold">
                            EventBooking
                        </Link>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-white focus:outline-none"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                                </svg>
                            </button>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex space-x-6 items-center">
                            <Link to="/eventDemo" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Event Demo</Link>
                            {isLoggedIn ? (
                                <>
                                    <Link to="/home" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                    <Link to="/eventCard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">All Events</Link>
                                    <Link to="/eventForm" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Event</Link>
                                    <Link to="/myBookings" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My Bookings</Link>
                                </>
                            ) : null}
                            <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
                            <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                        </div>

                        {/* Desktop Profile/Login */}
                        <div className="hidden md:block">
                            {isLoggedIn ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center justify-center focus:outline-none"
                                    >
                                        <img 
                                            src="https://randomuser.me/api/portraits/men/32.jpg" 
                                            alt="User Profile" 
                                            className="h-10 w-10 rounded-full border-2 border-indigo-500 hover:border-indigo-400 transition-colors"
                                        />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                                onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                                            >
                                                My Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsDropdownOpen(false); // Close dropdown on logout
                                                }}
                                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex space-x-6">
                                    <button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg">
                                        Login
                                    </button>
                                    <button onClick={() => navigate('/signUp')} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg">
                                        SignUp
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-gray-900 px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">About</Link>
                        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Contact</Link>
                        <Link to="/eventDemo" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Event Demo</Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/home" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Home</Link>
                                <Link to="/eventCard" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">All Events</Link>
                                <Link to="/eventForm" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Create Event</Link>
                                <Link to="/myBookings" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">My Bookings</Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col space-y-2 mt-4">
                                <button onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base font-medium">
                                    Login
                                </button>
                                <button onClick={() => { navigate('/signUp'); setIsMobileMenuOpen(false); }} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-base font-medium">
                                    SignUp
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            {/* Outlet for rendering child routes */}
            <div className="relative z-10">
                <Outlet />
            </div>
            
            <Footer />
        </div>
    );
};

export default Navbar;

