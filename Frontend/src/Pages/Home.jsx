import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const HomePage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, isLoading } = useUser();
    
    // Get the user's name to display
    const userName = isAuthenticated && user 
        ? (user.name || user.firstName || user.email?.split('@')[0] || "User")
        : "Guest";

    return (
        <div className="flex flex-col min-h-screen text-white">
            {/* Main Content */}
            <main className="flex-grow p-6 max-w-7xl mx-auto w-full">
                <div className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-2xl mb-8">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Welcome, {userName}!
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl mb-6">
                        Discover amazing events tailored just for you. Join us to learn, network, and have fun!
                    </p>
                    <button className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg'>
                        <Link to={isAuthenticated ? '/eventCard' : '/login'}>
                            {isAuthenticated ? 'Browse Events' : 'Get Started'}
                        </Link>
                    </button>
                </div>

                {/* Event Information */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
                        <h3 className="text-2xl font-semibold text-blue-400 mb-2">Upcoming Events</h3>
                        <p className="text-gray-400">
                            Check out our upcoming events that you can register for. Don't miss out on the opportunity to connect with like-minded individuals.
                        </p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors">
                        <h3 className="text-2xl font-semibold text-purple-400 mb-2">Create Your Own</h3>
                        <p className="text-gray-400">
                            Have an idea for an event? Host it with us! We provide all the tools you need to manage registrations and ticketing.
                        </p>
                    </div>
                </section>

                {/* Popular Categories */}
                <section className="mt-16">
                    <h3 className="text-3xl font-bold text-white mb-8 text-center">Explore Categories</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: "🎵", name: "Music", color: "from-pink-500 to-rose-500" },
                            { icon: "💻", name: "Tech", color: "from-cyan-500 to-blue-500" },
                            { icon: "🎨", name: "Arts", color: "from-purple-500 to-indigo-500" },
                            { icon: "⚽", name: "Sports", color: "from-emerald-500 to-green-500" }
                        ].map((cat, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className={`h-32 rounded-2xl bg-gradient-to-br ${cat.color} p-1 opacity-80 group-hover:opacity-100 transition-all transform group-hover:-translate-y-2`}>
                                    <div className="h-full w-full bg-gray-900/90 rounded-xl flex flex-col items-center justify-center backdrop-blur-sm">
                                        <span className="text-4xl mb-2">{cat.icon}</span>
                                        <span className="font-bold text-white">{cat.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="mt-20 py-12 border-t border-gray-800">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                            Why Choose EventManager?
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
                            <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-3xl">
                                🚀
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Fast Booking</h4>
                            <p className="text-gray-400">Book your tickets in seconds with our streamlined checkout process.</p>
                        </div>
                        <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
                            <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-3xl">
                                🛡️
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Secure Platform</h4>
                            <p className="text-gray-400">Your data and payments are protected with enterprise-grade security.</p>
                        </div>
                        <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
                            <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-3xl">
                                👥
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Community First</h4>
                            <p className="text-gray-400">Join a vibrant community of event organizers and attendees.</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="mt-20 mb-12">
                    <h3 className="text-3xl font-bold text-white mb-10 text-center">What People Say</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 relative">
                            <span className="absolute top-4 right-6 text-6xl text-gray-700 font-serif">"</span>
                            <p className="text-gray-300 italic mb-6 relative z-10">
                                "The best platform for finding local tech meetups. The booking process is incredibly smooth!"
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white mr-3">
                                    JD
                                </div>
                                <div>
                                    <p className="font-bold text-white">John Doe</p>
                                    <p className="text-xs text-gray-500">Software Engineer</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 relative">
                            <span className="absolute top-4 right-6 text-6xl text-gray-700 font-serif">"</span>
                            <p className="text-gray-300 italic mb-6 relative z-10">
                                "I organized my first art exhibition here. The tools provided made managing attendees a breeze."
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold text-white mr-3">
                                    AS
                                </div>
                                <div>
                                    <p className="font-bold text-white">Alice Smith</p>
                                    <p className="text-xs text-gray-500">Art Curator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer Removed from here */}
        </div>
    );
};

export default HomePage;
