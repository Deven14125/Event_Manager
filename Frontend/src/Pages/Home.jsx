import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    Calendar,
    Users,
    Shield,
    Zap,
    TrendingUp,
    Star,
    Music,
    Code,
    Palette,
    Trophy,
    ArrowRight,
    CheckCircle,
    Sparkles
} from 'lucide-react';

const HomePage = () => {
    const [userName, setUserName] = useState("Guest");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const userProfile = localStorage.getItem('userProfile');
        const token = localStorage.getItem('authToken');
        const userEmail = localStorage.getItem('userEmail');

        if (token) {
            setIsLoggedIn(true);
            let nameFound = false;

            if (userProfile) {
                try {
                    const user = JSON.parse(userProfile);
                    const name = user.firstName || user.name || user.username || user.email?.split('@')[0];

                    if (name) {
                        setUserName(name);
                        nameFound = true;
                    }
                } catch (e) {
                    console.error("Error parsing user profile", e);
                }
            }

            if (!nameFound && userEmail) {
                setUserName(userEmail.split('@')[0]);
            }
        }
    }, []);

    const categories = [
        { icon: <Music size={28} />, name: "Music", color: "from-blue-500 to-cyan-500", count: "120+" },
        { icon: <Code size={28} />, name: "Tech", color: "from-green-500 to-emerald-500", count: "85+" },
        { icon: <Palette size={28} />, name: "Arts", color: "from-yellow-500 to-amber-500", count: "65+" },
        { icon: <Trophy size={28} />, name: "Sports", color: "from-blue-600 to-indigo-600", count: "45+" },
        { icon: <TrendingUp size={28} />, name: "Business", color: "from-green-600 to-teal-600", count: "90+" },
        { icon: <Star size={28} />, name: "Lifestyle", color: "from-yellow-600 to-orange-500", count: "75+" },
    ];

    const features = [
        { icon: <Zap className="text-blue-400" size={24} />, title: "Lightning Fast", desc: "Book tickets in under 30 seconds", color: "border-l-4 border-blue-500" },
        { icon: <Shield className="text-green-400" size={24} />, title: "Secure & Safe", desc: "Bank-level security for all transactions", color: "border-l-4 border-green-500" },
        { icon: <Users className="text-yellow-400" size={24} />, title: "Community Driven", desc: "Join 50K+ active members", color: "border-l-4 border-yellow-500" },
        { icon: <Calendar className="text-cyan-400" size={24} />, title: "Smart Reminders", desc: "Never miss an event again", color: "border-l-4 border-cyan-500" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 p-4 sm:p-6 max-w-7xl mx-auto">
                {/* Hero Section */}
                <section className="mt-8 mb-16 sm:mt-12 sm:mb-24">
                    <div className="relative bg-gradient-to-br from-gray-800/40 via-gray-800/20 to-transparent backdrop-blur-xl rounded-3xl p-6 sm:p-10 lg:p-14 border border-gray-700/50 shadow-2xl overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full -translate-y-20 translate-x-20"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-500/5 rounded-full translate-y-20 -translate-x-20"></div>

                        <div className="relative z-10 max-w-3xl">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
                                <Sparkles size={16} className="text-yellow-400" />
                                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                    Welcome to EventHub
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
                                <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                                    Hello {userName}!
                                </span>
                                <span className="block text-3xl sm:text-4xl lg:text-5xl text-gray-300 mt-2">
                                    Ready for amazing events?
                                </span>
                            </h1>

                            <p className="text-gray-400 text-lg sm:text-xl mb-8 sm:mb-10 max-w-2xl leading-relaxed">
                                {`Discover, join, and create unforgettable experiences. From tech conferences to music festivals, we've got something for everyone.`}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <button
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <Link to={isLoggedIn ? '/eventCard' : '/login'} className="relative z-10 flex items-center gap-3">
                                        <span className="text-lg">{isLoggedIn ? 'Explore Events' : 'Get Started Free'}</span>
                                        <ArrowRight size={20} className={`transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
                                    </Link>
                                </button>

                                <button className="px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-300 font-medium rounded-2xl hover:bg-gray-800/80 hover:border-blue-500/50 transition-all duration-300">
                                    <Link to="/eventDemo" className="flex items-center gap-2">
                                        <PlayCircle size={20} />
                                        <span>Watch Demo</span>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trusted By Strip */}
                <section className="mb-12 sm:mb-16">
                    <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                        <div className="text-center mb-4">
                            <span className="text-xs uppercase tracking-widest text-gray-400">Trusted by teams worldwide</span>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 items-center justify-items-center opacity-80">
                            {['Acme', 'Globex', 'Umbrella', 'Initech', 'Hooli', 'Stark'].map((name, i) => (
                                <div key={i} className="h-8 sm:h-10 flex items-center">
                                    <div className="text-gray-500/80 hover:text-gray-300 transition-colors font-semibold tracking-wide select-none">
                                        {name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="mb-16 sm:mb-24">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            { value: "10K+", label: "Active Users", color: "text-blue-400" },
                            { value: "500+", label: "Events Monthly", color: "text-green-400" },
                            { value: "98%", label: "Satisfaction", color: "text-yellow-400" },
                            { value: "24/7", label: "Support", color: "text-cyan-400" },
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-700/50 hover:border-blue-500/50 transition-colors group">
                                <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                                <div className="text-gray-400 text-sm sm:text-base">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Categories Section */}
                <section className="mb-16 sm:mb-24">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Popular Categories</h2>
                            <p className="text-gray-400">Explore events by your interests</p>
                        </div>
                        <Link to="/eventCard" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm sm:text-base">
                            View all
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((cat, idx) => (
                            <div
                                key={idx}
                                className="group cursor-pointer"
                            >
                                <div className={`relative h-40 rounded-2xl bg-gradient-to-br ${cat.color} p-0.5 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="h-full w-full bg-gray-900/90 rounded-xl flex flex-col items-center justify-center p-4 backdrop-blur-sm">
                                        <div className={`mb-3 p-3 rounded-xl bg-gradient-to-br ${cat.color} bg-opacity-10`}>
                                            {cat.icon}
                                        </div>
                                        <span className="font-bold text-white text-center mb-1">{cat.name}</span>
                                        <span className="text-xs text-gray-400">{cat.count} events</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Events (Teaser) */}
                <section className="mb-16 sm:mb-24">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Featured Events</h2>
                            <p className="text-gray-400">A quick peek at what's trending</p>
                        </div>
                        <Link to="/eventCard" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm sm:text-base">
                            Browse all
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <Link to="/eventCard" key={i} className="group">
                                <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm p-6 h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30">
                                            <Calendar size={14} className="mr-1" /> Upcoming
                                        </span>
                                        <span className="text-sm text-gray-400">#{100 + i}</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">Inspiring Event Title</h4>
                                    <p className="text-gray-400 mb-4 line-clamp-2">A short and sweet description to tease the experience awaiting you.</p>
                                    <div className="flex items-center text-gray-300 gap-4 text-sm">
                                        <span className="inline-flex items-center gap-2"><Calendar size={16} /> Soon</span>
                                        <span className="inline-flex items-center gap-2"><Users size={16} /> 200+</span>
                                    </div>
                                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl" />
                                        <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-green-500/10 blur-2xl" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Features Section */}
                <section className="mb-16 sm:mb-24">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 px-4 py-2 rounded-full mb-4">
                            <Star size={16} className="text-yellow-400" />
                            <span className="text-sm font-medium text-blue-400">Why Choose Us</span>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Everything you need for
                            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent"> amazing events</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className={`bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 ${feature.color} hover:border-blue-500/50 transition-all duration-300 hover:translate-y-[-8px] group`}
                            >
                                <div className="mb-4 p-3 bg-gray-800/50 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials */}
                <section className="mb-16 sm:mb-24">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Loved by <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">thousands</span>
                        </h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">Join our community of happy event organizers and attendees</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[
                            {
                                quote: "EventHub transformed how we organize our tech conferences. The platform is intuitive and the support team is phenomenal!",
                                author: "Sarah Johnson",
                                role: "Tech Conference Organizer",
                                avatar: "SJ",
                                color: "from-blue-500/20 to-blue-600/20"
                            },
                            {
                                quote: "As a music festival organizer, I've tried many platforms. EventHub stands out with its seamless ticketing and attendee management.",
                                author: "Marcus Chen",
                                role: "Music Festival Director",
                                avatar: "MC",
                                color: "from-green-500/20 to-green-600/20"
                            }
                        ].map((testimonial, idx) => (
                            <div
                                key={idx}
                                className={`relative bg-gradient-to-br ${testimonial.color} backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300`}
                            >
                                <div className="absolute top-6 right-6 text-6xl text-gray-700/50 font-serif"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color.replace('/20', '/40')} flex items-center justify-center font-bold text-white text-xl`}>
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-lg">{testimonial.author}</p>
                                            <p className="text-sm text-gray-400">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-lg italic leading-relaxed">{testimonial.quote}</p>
                                    <div className="flex gap-1 mt-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="mb-12">
                    <div className="relative bg-gradient-to-br from-blue-600/20 via-green-600/20 to-yellow-500/20 backdrop-blur-xl rounded-3xl p-8 sm:p-12 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-green-500/5"></div>
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-green-500/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 text-center">
                            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Ready to create amazing experiences?
                            </h3>
                            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                                Join thousands of event organizers who trust EventHub to power their events.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg">
                                    <Link to={isLoggedIn ? '/eventForm' : '/signUp'} className="flex items-center justify-center gap-3">
                                        <Calendar size={20} />
                                        <span>{isLoggedIn ? 'Create Event' : 'Start Free Trial'}</span>
                                    </Link>
                                </button>
                                <button className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-300 font-medium rounded-2xl hover:bg-gray-800/80 hover:border-blue-500/50 transition-all duration-300">
                                    <Link to="/contact" className="flex items-center justify-center gap-3">
                                        Schedule a Demo
                                    </Link>
                                </button>
                            </div>
                            <p className="text-gray-400 text-sm mt-6">
                                <CheckCircle size={16} className="inline mr-2 text-green-400" />
                                No credit card required • 14-day free trial • Cancel anytime
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

// Add missing icon component
const PlayCircle = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="10 8 16 12 10 16 10 8"></polygon>
    </svg>
);

export default HomePage;