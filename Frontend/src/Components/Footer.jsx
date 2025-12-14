import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  Calendar, 
  Ticket, 
  Sparkles,
  Heart,
  ArrowRight,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Globe,
  Shield,
  Zap,
  Award,
  Send
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { path: "/home", label: "Home", icon: "🏠" },
        { path: "/eventCard", label: "Browse Events", icon: "🎯" },
        { path: "/eventForm", label: "Create Event", icon: "✨" },
        { path: "/myBookings", label: "My Bookings", icon: "🎫" },
        { path: "/about", label: "About Us", icon: "👥" },
        { path: "/contact", label: "Contact", icon: "📞" },
    ];

    const categories = [
        { name: "Technology", count: "85+", color: "text-blue-400" },
        { name: "Music", count: "120+", color: "text-green-400" },
        { name: "Arts", count: "65+", color: "text-yellow-400" },
        { name: "Sports", count: "45+", color: "text-purple-400" },
        { name: "Business", count: "90+", color: "text-cyan-400" },
        { name: "Workshops", count: "75+", color: "text-orange-400" },
    ];

    const socialLinks = [
        { platform: "LinkedIn", icon: <Linkedin size={18} />, url: "https://www.linkedin.com/in/deven-machchhar-b13287286/", color: "hover:text-blue-500" },
        { platform: "GitHub", icon: <Github size={18} />, url: "https://github.com/Deven14125", color: "hover:text-gray-800" },
        { platform: "Twitter", icon: <Twitter size={18} />, url: "#", color: "hover:text-sky-500" },
        { platform: "Instagram", icon: <Instagram size={18} />, url: "#", color: "hover:text-pink-500" },
        { platform: "YouTube", icon: <Youtube size={18} />, url: "#", color: "hover:text-red-500" },
        { platform: "Facebook", icon: <Facebook size={18} />, url: "#", color: "hover:text-blue-600" },
    ];

    const stats = [
        { icon: <Users size={16} />, value: "50K+", label: "Active Users", color: "from-blue-500/20 to-blue-600/20" },
        { icon: <Calendar size={16} />, value: "2K+", label: "Events Hosted", color: "from-green-500/20 to-green-600/20" },
        { icon: <Ticket size={16} />, value: "98%", label: "Satisfaction", color: "from-yellow-500/20 to-yellow-600/20" },
        { icon: <Globe size={16} />, value: "100+", label: "Cities", color: "from-purple-500/20 to-purple-600/20" },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-green-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
                {/* Main Footer Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                        {/* Brand & Description */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-xl">
                                    <Sparkles size={24} className="text-yellow-400" />
                                </div>
                                <h3 className="text-2xl font-bold">
                                    <span className="bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                                        EventHub
                                    </span>
                                </h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Creating unforgettable experiences and bringing communities together through amazing events.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Shield size={14} className="text-green-400" />
                                <span>Secure & Trusted Platform</span>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Zap size={18} className="text-blue-400" />
                                Quick Links
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                                {quickLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="group flex items-center gap-2 p-2 text-gray-400 hover:text-white rounded-lg transition-all duration-300 hover:bg-gray-800/30"
                                    >
                                        <span className="text-lg">{link.icon}</span>
                                        <span className="text-sm">{link.label}</span>
                                        <ArrowRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Event Categories */}
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Calendar size={18} className="text-green-400" />
                                Popular Categories
                            </h4>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <div key={category.name} className="flex items-center justify-between p-2 hover:bg-gray-800/30 rounded-lg transition-colors">
                                        <span className={`text-sm font-medium ${category.color}`}>
                                            {category.name}
                                        </span>
                                        <span className="text-xs text-gray-500 px-2 py-1 bg-gray-800/50 rounded-full">
                                            {category.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact & Newsletter */}
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Send size={18} className="text-yellow-400" />
                                Stay Updated
                            </h4>
                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <Mail size={14} className="text-blue-400" />
                                        <span>deven81281256@gmail.com</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <Phone size={14} className="text-green-400" />
                                        <span>+1 (234) 567-8900</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <MapPin size={14} className="text-yellow-400" />
                                        <span>San Francisco, CA</span>
                                    </div>
                                </div>
                                
                                {/* Newsletter Subscription */}
                                <div className="mt-4">
                                    <p className="text-sm text-gray-400 mb-2">Subscribe to our newsletter</p>
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            placeholder="Your email"
                                            className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <button className="px-3 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mb-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, idx) => (
                                <div 
                                    key={idx}
                                    className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-xl p-4 border border-gray-700/50`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-800/50 rounded-lg">
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-white">{stat.value}</div>
                                            <div className="text-xs text-gray-300">{stat.label}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Links & Copyright */}
                    <div className="pt-8 border-t border-gray-800/50">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* Social Links */}
                            <div className="flex items-center gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-2 p-2 text-gray-400 ${social.color} transition-colors rounded-lg hover:bg-gray-800/30`}
                                        aria-label={`Follow us on ${social.platform}`}
                                    >
                                        {social.icon}
                                        <span className="text-sm hidden sm:inline">{social.platform}</span>
                                        <ExternalLink size={12} className="opacity-50" />
                                    </a>
                                ))}
                            </div>

                            {/* Made with Love */}
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>Made with</span>
                                <Heart size={14} className="text-red-400 fill-red-400 animate-pulse" />
                                <span>by Deven Machchhar</span>
                            </div>

                            {/* Copyright */}
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Award size={14} className="text-yellow-400" />
                                <span>&copy; {currentYear} EventHub. All rights reserved.</span>
                            </div>
                        </div>

                        {/* Bottom Links */}
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
                            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-yellow-400 transition-colors">Cookie Policy</a>
                            <a href="#" className="hover:text-purple-400 transition-colors">Code of Conduct</a>
                            <a href="#" className="hover:text-cyan-400 transition-colors">Accessibility</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Gradient Bar */}
                <div className="h-1 bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500"></div>
            </div>
        </footer>
    );
};

export default Footer;