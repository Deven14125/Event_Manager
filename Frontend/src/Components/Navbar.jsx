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

    // --------------------------- LOGOUT -----------------------------
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to log out?",
            icon: "warning",
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

    // ------------------ CLOSE DROPDOWN ON OUTSIDE CLICK ------------------
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ESC key closes dropdown
    const handleDropdownKeyDown = (e) => {
        if (e.key === "Escape") setIsDropdownOpen(false);
    };

    return (
        <div className="min-h-screen relative">
            <Background3D />

            {/* ---------------- NAVBAR ---------------- */}
            <nav className="w-full bg-gray-900/80 backdrop-blur-md text-white py-4 shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">

                        {/* LOGO */}
                        <Link to="/" className="text-white text-2xl md:text-3xl font-extrabold">
                            EventBooking
                        </Link>

                        {/* MOBILE MENU BUTTON */}
                        <button
                            className="md:hidden text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor">
                                <path
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d={
                                        isMobileMenuOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>

                        {/* ---------------- DESKTOP LINKS ---------------- */}
                        <div className="hidden md:flex space-x-6 items-center">
                            <Link to="/eventDemo" className="nav-link">Event Demo</Link>

                            {isLoggedIn && (
                                <>
                                    <Link to="/home" className="nav-link">Home</Link>
                                    <Link to="/eventCard" className="nav-link">All Events</Link>
                                    <Link to="/eventForm" className="nav-link">Create Event</Link>
                                    <Link to="/myBookings" className="nav-link">My Bookings</Link>
                                </>
                            )}

                            <Link to="/about" className="nav-link">About</Link>
                            <Link to="/contact" className="nav-link">Contact</Link>

                            {/* THEME SWITCH BUTTON */}
                            <ThemeToggle />

                            {/* PROFILE / LOGIN BUTTONS */}
                            {isLoggedIn ? (
                                <div ref={dropdownRef} className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        onKeyDown={handleDropdownKeyDown}
                                        className="focus:outline-none"
                                    >
                                        <img
                                            src="https://randomuser.me/api/portraits/men/32.jpg"
                                            className="h-10 w-10 rounded-full border-2 border-indigo-500 hover:border-indigo-400"
                                            alt="user"
                                        />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="dropdown-menu">
                                            <Link
                                                to="/profile"
                                                className="dropdown-item"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                My Profile
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="dropdown-item w-full text-left"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex space-x-4">
                                    <button onClick={() => navigate("/login")} className="btn-primary">Login</button>
                                    <button onClick={() => navigate("/signUp")} className="btn-green">SignUp</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ---------------- MOBILE MENU ---------------- */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-gray-900 px-2 py-3 space-y-2">
                        <Link to="/about" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                        <Link to="/contact" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                        <Link to="/eventDemo" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Event Demo</Link>

                        {isLoggedIn ? (
                            <>
                                <Link to="/home" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                                <Link to="/eventCard" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>All Events</Link>
                                <Link to="/eventForm" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Create Event</Link>
                                <Link to="/myBookings" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>My Bookings</Link>

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="mobile-link text-left"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col space-y-2 mt-2">
                                <button onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }} className="btn-primary">
                                    Login
                                </button>
                                <button onClick={() => { navigate("/signUp"); setIsMobileMenuOpen(false); }} className="btn-green">
                                    SignUp
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            {/* RENDER CHILD ROUTES */}
            <div className="relative z-10">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default Navbar;
