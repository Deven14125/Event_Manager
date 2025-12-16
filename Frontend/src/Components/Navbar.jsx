import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import Swal from 'sweetalert2';
import Footer from './Footer';
import {
    Calendar,
    Home,
    PlusCircle,
    Ticket,
    User,
    LogOut,
    LogIn,
    UserPlus,
    Menu,
    X,
    ChevronDown,
    Sparkles,
    Star,
    Bell,
    Settings,
    HelpCircle,
    Zap,
    Bookmark,
    Users,
    BarChart,
} from 'lucide-react';
import Swal from "sweetalert2";
import Background3D from "./Background3D";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const navLinks = [
        { path: "/home", label: "Home", icon: <Home size={18} />, loggedIn: true },
        { path: "/eventCard", label: "Browse Events", icon: <Calendar size={18} />, loggedIn: true },
        { path: "/eventForm", label: "Create Event", icon: <PlusCircle size={18} />, loggedIn: true },
        { path: "/myBookings", label: "My Bookings", icon: <Ticket size={18} />, loggedIn: true },
        { path: "/eventDemo", label: "Demo", icon: <Zap size={18} />, loggedIn: false },
        { path: "/about", label: "About", icon: <Users size={18} />, loggedIn: false },
        { path: "/contact", label: "Contact", icon: <HelpCircle size={18} />, loggedIn: false },
    ];

    const userMenuItems = [
        { label: "My Profile", icon: <User size={18} />, path: "/profile" },
        { label: "Saved Events", icon: <Bookmark size={18} />, path: "/saved" },
        { label: "Notifications", icon: <Bell size={18} />, path: "/notifications", badge: "3" },
        { label: "Analytics", icon: <BarChart size={18} />, path: "/analytics" },
        { label: "Settings", icon: <Settings size={18} />, path: "/settings" },
    ];

    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // ---------------------- CHECK LOGIN STATUS ----------------------
    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem("authToken");
            setIsLoggedIn(!!token);
        };

        checkLoginStatus();
        window.addEventListener('auth-change', checkLoginStatus);

        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('auth-change', checkLoginStatus);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: 'Ready to Leave?',
            html: `
                <div class="text-center">
                    <div class="mb-4 text-5xl">👋</div>
                    <p class="text-white mb-2">Are you sure you want to log out?</p>
                    <p class="text-gray-300 text-sm">You'll need to sign in again to access your events.</p>
                </div>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Log Out',
            cancelButtonText: 'Stay Logged In',
            background: '#1f2937',
            color: '#fff',
            customClass: {
                popup: 'rounded-2xl border border-red-500/30'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userProfile');
                setIsLoggedIn(false);
                window.dispatchEvent(new Event('auth-change'));
                navigate('/login');
                Swal.fire({
                    title: 'Logged Out',
                    text: 'You have successfully logged out.',
                    icon: 'success',
                    background: '#1f2937',
                    color: '#fff',
                    confirmButtonColor: '#10b981',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'rounded-2xl border border-emerald-500/30'
                    }
                });
            }
        });
    };

    const handleDropdownKeyDown = (e) => {
        if (e.key === 'Escape') setIsDropdownOpen(false);
        window.addEventListener("auth-change", checkLoginStatus);
        return () => window.removeEventListener("auth-change", checkLoginStatus);
    }, []);

    // --------------------------- LOGOUT -----------------------------
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("authToken");
                setIsLoggedIn(false);
                window.dispatchEvent(new Event("auth-change"));
                navigate("/login");

                Swal.fire("Logged out!", "You have been logged out.", "success");
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

    const navClassName = scrollPosition > 50
        ? "w-full bg-gray-900/95 backdrop-blur-xl text-white py-3 shadow-2xl sticky top-0 z-50 border-b border-gray-700/50 transition-all duration-300"
        : "w-full bg-gradient-to-b from-gray-900/90 to-transparent backdrop-blur-lg text-white py-4 sticky top-0 z-50 transition-all duration-300";

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
            {/* Navigation */}
            <nav className={navClassName} role="navigation" aria-label="Main navigation">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group" aria-label="EventHub Home">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative p-2 bg-gray-900 rounded-xl border border-gray-700/50 group-hover:border-blue-500/50 transition-colors">
                                    <Sparkles size={24} className="text-yellow-400" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                                    EventHub
                                </span>
                                <span className="text-xs text-gray-400 hidden sm:block">Where Events Come Alive</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navLinks.map((link) => {
                                if (link.loggedIn && !isLoggedIn) return null;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="group relative px-4 py-2 rounded-xl text-gray-300 hover:text-white transition-all duration-300 hover:bg-gray-800/30 flex items-center gap-2"
                                    >
                                        {link.icon}
                                        <span className="font-medium">{link.label}</span>
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 group-hover:w-4/5 transition-all duration-300"></div>
                                    </Link>
                                );
                            })}


                        </div>

                        {/* Right Side Actions */}
                        <div className="hidden lg:flex items-center gap-4">
                            {isLoggedIn ? (
                                <>
                                    {/* Notifications */}
                                    <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800/30 rounded-xl transition-colors group">
                                        <Bell size={20} />
                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-xs font-bold rounded-full flex items-center justify-center">
                                            3
                                        </span>
                                    </button>

                                    {/* User Menu */}
                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            onKeyDown={handleDropdownKeyDown}
                                            className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-800/30 backdrop-blur-sm hover:bg-gray-800/50 transition-colors border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            aria-haspopup="true"
                                            aria-expanded={isDropdownOpen}
                                        >
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
                                                <img
                                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                                    alt="User Profile"
                                                    className="relative w-8 h-8 rounded-full border-2 border-blue-500/50"
                                                />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-white">John Doe</p>
                                                <p className="text-xs text-gray-400">Premium Member</p>
                                            </div>
                                            <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl py-2 z-20 overflow-hidden">
                                                <div className="px-4 py-3 border-b border-gray-700/50">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-xl">
                                                            <Star size={16} className="text-yellow-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-white">Premium Account</p>
                                                            <p className="text-xs text-gray-400">15 events remaining</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {userMenuItems.map((item) => (
                                                    <Link
                                                        key={item.label}
                                                        to={item.path}
                                                        onClick={() => setIsDropdownOpen(false)}
                                                        className="flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors group"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="text-gray-400 group-hover:text-blue-400 transition-colors">
                                                                {item.icon}
                                                            </div>
                                                            <span className="font-medium">{item.label}</span>
                                                        </div>
                                                        {item.badge && (
                                                            <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 rounded-full">
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                    </Link>
                                                ))}

                                                <div className="px-4 py-3 border-t border-gray-700/50">
                                                    <button
                                                        onClick={() => {
                                                            handleLogout();
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-400 hover:text-red-300 rounded-xl border border-red-500/30 hover:border-red-500/50 transition-all group"
                                                    >
                                                        <LogOut size={18} />
                                                        <span className="font-medium">Sign Out</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-blue-500/30"
                                    >
                                        <LogIn size={18} />
                                        <span className="font-medium">Login</span>
                                    </button>
                                    <button
                                        onClick={() => navigate('/signUp')}
                                        className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-green-500/30"
                                    >
                                        <UserPlus size={18} />
                                        <span className="font-medium">Sign Up</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800/30 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-expanded={isMobileMenuOpen}
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-gradient-to-b from-gray-900/95 to-gray-900/80 backdrop-blur-xl border-t border-gray-700/50 px-4 py-6 absolute top-full left-0 right-0 z-40">
                        <div className="max-w-7xl mx-auto">
                            {/* Mobile Navigation Links */}
                            <div className="space-y-1 mb-8">
                                {navLinks.map((link) => {
                                    if (link.loggedIn && !isLoggedIn) return null;
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors group"
                                        >
                                            <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-gradient-to-r group-hover:from-blue-500/20 group-hover:to-green-500/20">
                                                {link.icon}
                                            </div>
                                            <span className="font-medium">{link.label}</span>
                                            <ChevronDown size={16} className="ml-auto text-gray-400 rotate-270" />
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Mobile Auth Buttons */}
                            {isLoggedIn ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl border border-blue-500/30">
                                        <img
                                            src="https://randomuser.me/api/portraits/men/32.jpg"
                                            alt="User Profile"
                                            className="w-12 h-12 rounded-full border-2 border-blue-500/50"
                                        />
                                        <div>
                                            <p className="font-bold text-white">John Doe</p>
                                            <p className="text-sm text-gray-400">Premium Member</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {userMenuItems.slice(0, 4).map((item) => (
                                            <Link
                                                key={item.label}
                                                to={item.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex flex-col items-center justify-center p-3 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-colors"
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
                                                {item.icon}
                                                <span className="text-xs font-medium mt-2">{item.label}</span>
                                            </Link>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-400 hover:text-red-300 rounded-xl border border-red-500/30 hover:border-red-500/50 transition-all"
                                    >
                                        <LogOut size={18} />
                                        <span className="font-medium">Sign Out</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => {
                                            navigate('/login');
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-600/20 to-blue-600/10 text-blue-400 rounded-xl border border-blue-500/30 hover:border-blue-500/50 transition-all"
                                    >
                                        <LogIn size={20} />
                                        <span className="font-medium">Login</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate('/signUp');
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-r from-green-600/20 to-green-600/10 text-green-400 rounded-xl border border-green-500/30 hover:border-green-500/50 transition-all"
                                    >
                                        <UserPlus size={20} />
                                        <span className="font-medium">Sign Up</span>
                                    </button>

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
                )}
            </nav>

            {/* Main Content */}
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
