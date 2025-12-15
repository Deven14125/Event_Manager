import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Home,
  Calendar,
  PlusCircle,
  Ticket,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  ChevronDown,
  Bell,
  User,
} from "lucide-react";
import Footer from "./Footer";

const Navbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* ---------------- CHECK LOGIN ---------------- */
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("authToken"));
    };

    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  /* -------- CLOSE DROPDOWN ON OUTSIDE CLICK -------- */
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        window.dispatchEvent(new Event("auth-change"));
        navigate("/login");
      }
    });
  };

  /* ---------------- NAV LINKS ---------------- */
  const navLinks = [
    { to: "/home", label: "Home", icon: <Home size={18} />, auth: true },
    { to: "/eventCard", label: "Events", icon: <Calendar size={18} />, auth: true },
    { to: "/eventForm", label: "Create", icon: <PlusCircle size={18} />, auth: true },
    { to: "/myBookings", label: "Bookings", icon: <Ticket size={18} />, auth: true },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ---------------- NAVBAR ---------------- */}
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 supports-[backdrop-filter]:bg-gray-900/60">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold">
            EventHub
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-6">
            {isLoggedIn && navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-1 rounded-md transition-colors ${
                    isActive ? "text-blue-400 bg-blue-500/10" : "hover:text-blue-400"
                  }`
                }
              >
                {l.icon}
                {l.label}
              </NavLink>
            ))}

            {!isLoggedIn ? (
              <div className="flex gap-3">
                <button onClick={() => navigate("/login")} className="flex items-center gap-1">
                  <LogIn size={18} /> Login
                </button>
                <button onClick={() => navigate("/signUp")} className="flex items-center gap-1">
                  <UserPlus size={18} /> Sign Up
                </button>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    className="w-8 h-8 rounded-full"
                    alt="user"
                  />
                  <ChevronDown size={16} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-gray-800 rounded-xl shadow-lg">
                    <Link to="/profile" className="dropdown-item flex items-center gap-2 px-4 py-3">
                      <User size={16} /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700"
                    >
                      <LogOut size={16} className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* ---------------- MOBILE MENU ---------------- */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 px-4 pb-4 space-y-2">
            {isLoggedIn &&
              navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 rounded-md px-2 ${isActive ? "text-blue-400 bg-blue-500/10" : "hover:text-blue-400"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}

            {!isLoggedIn ? (
              <>
                <button onClick={() => navigate("/login")} className="block w-full py-2">
                  Login
                </button>
                <button onClick={() => navigate("/signUp")} className="block w-full py-2">
                  Sign Up
                </button>
              </>
            ) : (
              <button onClick={handleLogout} className="block w-full py-2 text-red-400">
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* ---------------- PAGE CONTENT ---------------- */}
      <Outlet />

      <Footer />
    </div>
  );
};

export default Navbar;
