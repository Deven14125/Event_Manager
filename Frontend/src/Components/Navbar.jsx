import { useState, useEffect, useRef } from "react"; // React hooks for state and side effects
import { Link, useNavigate, Outlet } from "react-router-dom"; // React Router for navigation
import Swal from 'sweetalert2'; // SweetAlert for handling alert popups
import Background3D from './Background3D'; // Import the 3D Background
import Footer from './Footer'; // Import Footer
import { useUser } from '../context/UserContext'; // Import UserContext

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state to toggle dropdown
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
    const dropdownRef = useRef(null); // Reference to dropdown menu
    const navigate = useNavigate();
    const { isAuthenticated, logout: logoutUser, user } = useUser(); // Use UserContext
    const isLoggedIn = isAuthenticated; // For backward compatibility

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
            cancelButtonText: 'Cancel',
            background: '#1f2937',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                logoutUser(); // Use logout function from UserContext
                navigate('/login'); // Redirect to login page
                Swal.fire({
                    title: 'Logged out!',
                    text: 'You have successfully logged out.',
                    icon: 'success',
                    background: '#1f2937',
                    color: '#fff',
                    confirmButtonColor: '#4f46e5'
                });
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

    // Handle keyboard navigation for dropdown
    const handleDropdownKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsDropdownOpen(false);
        }
    };

    return (
        <div className="min-h-screen relative">
            <Background3D />
            <nav className="w-full bg-gray-900/80 backdrop-blur-md text-white py-4 shadow-lg sticky top-0 z-50" role="navigation" aria-label="Main navigation">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo and Title */}
                        <Link to="/" className="text-white text-2xl md:text-3xl font-extrabold" aria-label="EventBooking Home">
                            EventBooking
                        </Link>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-white focus:outline-none focus:ring-2 focus:ring-white"
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                                </svg>
                            </button>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex space-x-6 items-center">
                            <Link to="/eventDemo" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">Event Demo</Link>
                            {isLoggedIn ? (
                                <>
                                    <Link to="/home" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">Home</Link>
                                    <Link to="/eventCard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">All Events</Link>
                                    <Link to="/eventForm" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">Create Event</Link>
                                    <Link to="/myBookings" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">My Bookings</Link>
                                </>
                            ) : null}
                            <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">About</Link>
                            <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">Contact</Link>
                        </div>

                        {/* Desktop Profile/Login */}
                        <div className="hidden md:block">
                            {isLoggedIn ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                                        aria-haspopup="true"
                                        aria-expanded={isDropdownOpen}
                                        onKeyDown={handleDropdownKeyDown}
                                        aria-label="User profile menu"
                                    >
                                        <img 
                                            src="https://randomuser.me/api/portraits/men/32.jpg" 
                                            alt="User Profile" 
                                            className="h-10 w-10 rounded-full border-2 border-indigo-500 hover:border-indigo-400 transition-colors"
                                        />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-indigo-500"
                                                onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                                                role="menuitem"
                                            >
                                                My Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsDropdownOpen(false); // Close dropdown on logout
                                                }}
                                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-indigo-500"
                                                role="menuitem"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex space-x-6">
                                    <button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
                                        Login
                                    </button>
                                    <button onClick={() => navigate('/signUp')} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
                                        SignUp
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div id="mobile-menu" className="md:hidden bg-gray-900 px-2 pt-2 pb-3 space-y-1 sm:px-3" role="menubar">
                        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white" role="menuitem">About</Link>
                        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white" role="menuitem">Contact</Link>
                        <Link to="/eventDemo" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white" role="menuitem">Event Demo</Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/home" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white" role="menuitem">Home</Link>
                                <Link to="/eventCard" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white" role="menuitem">All Events</Link>
                                <Link to="/eventForm" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white" role="menuitem">Create Event</Link>
                                <Link to="/myBookings" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white" role="menuitem">My Bookings</Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white"
                                    role="menuitem"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col space-y-2 mt-4">
                                <button onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
                                    Login
                                </button>
                                <button onClick={() => { navigate('/signUp'); setIsMobileMenuOpen(false); }} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
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