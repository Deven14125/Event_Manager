import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900/90 text-white p-8 mt-auto backdrop-blur-md relative z-10">
            <div className="container mx-auto text-center">
                <h4 className="text-xl font-bold mb-4 text-blue-400">Event Manager</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left max-w-6xl mx-auto">
                    <div>
                        <h5 className="font-semibold mb-2 text-purple-400">About Us</h5>
                        <p className="text-gray-400 text-sm">We are committed to bringing you the best events and experiences. Join our community today!</p>
                    </div>
                    
                    <div>
                        <h5 className="font-semibold mb-2 text-purple-400">Quick Links</h5>
                        <div className="flex flex-col space-y-1">
                            <Link to="/home" className="text-gray-400 hover:text-blue-400 text-sm">Home</Link>
                            <Link to="/eventCard" className="text-gray-400 hover:text-blue-400 text-sm">All Events</Link>
                            <Link to="/eventForm" className="text-gray-400 hover:text-blue-400 text-sm">Create Event</Link>
                            <Link to="/myBookings" className="text-gray-400 hover:text-blue-400 text-sm">My Bookings</Link>
                        </div>
                    </div>

                    <div>
                        <h5 className="font-semibold mb-2 text-purple-400">Support</h5>
                        <div className="flex flex-col space-y-1">
                            <Link to="/about" className="text-gray-400 hover:text-blue-400 text-sm">About Us</Link>
                            <Link to="/contact" className="text-gray-400 hover:text-blue-400 text-sm">Contact Us</Link>
                            <Link to="/eventDemo" className="text-gray-400 hover:text-blue-400 text-sm">Event Demo</Link>
                        </div>
                    </div>

                    <div>
                        <h5 className="font-semibold mb-2 text-purple-400">Contact</h5>
                        <p className="text-gray-400 text-sm">Email: <a href="mailto:deven81281256@gmail.com" className="text-blue-400 hover:underline">deven81281256@gmail.com</a></p>
                        <p className="text-gray-400 text-sm">Mobile: 1234567890</p>
                        <div className="flex space-x-4 mt-2">
                            <a href="https://www.linkedin.com/in/deven-machchhar-b13287286/" target='_blank' className="text-gray-400 hover:text-blue-400 text-sm">LinkedIn</a>
                            <a href="https://github.com/Deven14125" target='_blank' className="text-gray-400 hover:text-purple-400 text-sm">GitHub</a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Event Manager. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
