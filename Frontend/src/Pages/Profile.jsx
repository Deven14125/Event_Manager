import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Edit,
    Save,
    X,
    Calendar,
    Ticket,
    Award,
    Star,
    Shield,
    Settings,
    Camera,
    Globe,
    Users,
    Zap,
    TrendingUp,
    Sparkles,
    CheckCircle,
    Activity,
    Bookmark,
    Share2,
    Lock
} from 'lucide-react';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [userData, setUserData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        mobile: '+1 (234) 567-8900',
        bio: 'Passionate event organizer with 5+ years of experience creating memorable experiences. Love connecting people through technology and arts.',
        location: 'San Francisco, CA',
        title: 'Senior Event Manager',
        company: 'EventHub Pro',
        website: 'johndoe.com',
        joinDate: '2022-03-15'
    });

    const [stats, setStats] = useState({
        eventsCreated: 24,
        eventsAttended: 48,
        totalBookings: 72,
        avgRating: 4.8,
        followers: 1245,
        following: 543
    });

    const [recentActivity] = useState([
        { id: 1, type: 'booking', event: 'Tech Summit 2024', date: '2 days ago', icon: '🎫' },
        { id: 2, type: 'created', event: 'Art Workshop', date: '1 week ago', icon: '✨' },
        { id: 3, type: 'review', event: 'Music Festival', date: '2 weeks ago', icon: '⭐' },
        { id: 4, type: 'share', event: 'Networking Mixer', date: '3 weeks ago', icon: '🔗' }
    ]);

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedProfile = localStorage.getItem('userProfile');

        if (storedProfile) {
            try {
                const parsedProfile = JSON.parse(storedProfile);
                setUserData(prev => ({
                    ...prev,
                    ...parsedProfile,
                    firstName: parsedProfile.firstName || parsedProfile.name || prev.firstName,
                    email: parsedProfile.email || storedEmail || prev.email
                }));
            } catch (e) {
                console.error("Error parsing profile", e);
            }
        } else if (storedEmail) {
            setUserData(prev => ({
                ...prev,
                email: storedEmail,
                firstName: storedEmail.split('@')[0]
            }));
        }

        // Load user stats (in real app, this would come from API)
        const userStats = localStorage.getItem('userStats');
        if (userStats) {
            setStats(JSON.parse(userStats));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        localStorage.setItem('userProfile', JSON.stringify(userData));
        setIsEditing(false);

        Swal.fire({
            title: 'Profile Updated!',
            html: `
                <div class="text-center">
                    <div class="mb-4 text-5xl">🎉</div>
                    <p class="text-white mb-2">Your profile has been updated successfully!</p>
                    <p class="text-gray-300">All changes have been saved.</p>
                </div>
            `,
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
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <Activity size={18} /> },
        { id: 'events', label: 'My Events', icon: <Calendar size={18} /> },
        { id: 'bookings', label: 'Bookings', icon: <Ticket size={18} /> },
        { id: 'saved', label: 'Saved', icon: <Bookmark size={18} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
    ];

    const inputClasses = "w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300";
    const labelClasses = "block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2";

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
                            <Sparkles size={16} className="text-yellow-400" />
                            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                My Profile
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                                Profile
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Manage your account, events, and preferences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Profile Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
                                {/* Profile Header */}
                                <div className="relative h-48 bg-gradient-to-br from-blue-600/30 via-green-600/20 to-transparent">
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10"></div>
                                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-20">
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                            <img
                                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                                alt="Profile"
                                                className="relative w-32 h-32 rounded-full border-4 border-gray-900 object-cover"
                                            />
                                            {isEditing && (
                                                <button className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-full border-2 border-gray-900">
                                                    <Camera size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Profile Info */}
                                <div className="pt-20 px-6 pb-6 text-center">
                                    <h2 className="text-2xl font-bold text-white mb-1">{userData.firstName} {userData.lastName}</h2>
                                    <p className="text-gray-400 mb-2">{userData.title}</p>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm font-medium">{stats.avgRating}</span>
                                        </div>
                                        <span className="text-gray-600">•</span>
                                        <span className="text-sm text-gray-400">Premium Member</span>
                                    </div>

                                    <div className="flex gap-4 justify-center mb-6">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-white">{stats.followers}</div>
                                            <div className="text-xs text-gray-400">Followers</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-white">{stats.following}</div>
                                            <div className="text-xs text-gray-400">Following</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-white">{stats.eventsCreated}</div>
                                            <div className="text-xs text-gray-400">Events</div>
                                        </div>
                                    </div>

                                    {isEditing ? (
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:text-white rounded-xl border border-gray-700/50 hover:border-red-500/50 transition-all"
                                            >
                                                <X size={18} />
                                                <span className="text-sm">Cancel</span>
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:opacity-90 transition-all"
                                            >
                                                <Save size={18} />
                                                <span className="text-sm">Save</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600/20 to-blue-600/10 text-blue-400 hover:text-blue-300 rounded-xl border border-blue-500/30 hover:border-blue-500/50 transition-all"
                                        >
                                            <Edit size={18} />
                                            <span className="font-medium">Edit Profile</span>
                                        </button>
                                    )}
                                </div>

                                {/* Quick Stats */}
                                <div className="px-6 pb-6 space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                                <Calendar size={18} className="text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Member Since</p>
                                                <p className="text-white font-medium">March 2022</p>
                                            </div>
                                        </div>
                                        <Award size={20} className="text-yellow-400" />
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-500/10 rounded-lg">
                                                <Shield size={18} className="text-green-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Account Status</p>
                                                <p className="text-white font-medium">Verified</p>
                                            </div>
                                        </div>
                                        <CheckCircle size={20} className="text-green-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Tabs */}
                            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-2">
                                <div className="flex flex-wrap gap-2">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === tab.id
                                                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                                }`}
                                        >
                                            {tab.icon}
                                            <span>{tab.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Overview Tab Content */}
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    {/* Personal Information */}
                                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl">
                                                <User size={24} className="text-blue-400" />
                                            </div>
                                            <h2 className="text-xl font-bold text-white">Personal Information</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className={labelClasses}>
                                                    <User size={16} />
                                                    First Name
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={userData.firstName}
                                                        onChange={handleChange}
                                                        className={inputClasses}
                                                    />
                                                ) : (
                                                    <div className="px-4 py-3 bg-gray-800/30 rounded-xl text-white">{userData.firstName}</div>
                                                )}
                                            </div>

                                            <div>
                                                <label className={labelClasses}>
                                                    <User size={16} />
                                                    Last Name
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={userData.lastName}
                                                        onChange={handleChange}
                                                        className={inputClasses}
                                                    />
                                                ) : (
                                                    <div className="px-4 py-3 bg-gray-800/30 rounded-xl text-white">{userData.lastName}</div>
                                                )}
                                            </div>

                                            <div>
                                                <label className={labelClasses}>
                                                    <Mail size={16} />
                                                    Email Address
                                                </label>
                                                <div className="px-4 py-3 bg-gray-800/30 rounded-xl text-white flex items-center gap-2">
                                                    {userData.email}
                                                    <CheckCircle size={16} className="text-green-400" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className={labelClasses}>
                                                    <Phone size={16} />
                                                    Mobile Number
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="tel"
                                                        name="mobile"
                                                        value={userData.mobile}
                                                        onChange={handleChange}
                                                        className={inputClasses}
                                                    />
                                                ) : (
                                                    <div className="px-4 py-3 bg-gray-800/30 rounded-xl text-white">{userData.mobile}</div>
                                                )}
                                            </div>

                                            <div>
                                                <label className={labelClasses}>
                                                    <MapPin size={16} />
                                                    Location
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        value={userData.location}
                                                        onChange={handleChange}
                                                        className={inputClasses}
                                                    />
                                                ) : (
                                                    <div className="px-4 py-3 bg-gray-800/30 rounded-xl text-white flex items-center gap-2">
                                                        <MapPin size={16} className="text-blue-400" />
                                                        {userData.location}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className={labelClasses}>
                                                    <Globe size={16} />
                                                    Website
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="url"
                                                        name="website"
                                                        value={userData.website}
                                                        onChange={handleChange}
                                                        className={inputClasses}
                                                    />
                                                ) : (
                                                    <div className="px-4 py-3 bg-gray-800/30 rounded-xl text-blue-400 hover:text-blue-300 transition-colors">
                                                        <a href={`https://${userData.website}`} target="_blank" rel="noopener noreferrer">
                                                            {userData.website}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <label className={labelClasses}>
                                                <User size={16} />
                                                Bio
                                            </label>
                                            {isEditing ? (
                                                <textarea
                                                    name="bio"
                                                    value={userData.bio}
                                                    onChange={handleChange}
                                                    rows="3"
                                                    className={`${inputClasses} resize-none`}
                                                />
                                            ) : (
                                                <div className="px-4 py-3 bg-gray-800/30 rounded-xl text-gray-300 leading-relaxed">
                                                    {userData.bio}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl">
                                                <Zap size={24} className="text-green-400" />
                                            </div>
                                            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                                        </div>

                                        <div className="space-y-4">
                                            {recentActivity.map(activity => (
                                                <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors">
                                                    <div className="text-2xl">{activity.icon}</div>
                                                    <div className="flex-1">
                                                        <p className="text-white font-medium">{activity.event}</p>
                                                        <p className="text-sm text-gray-400 capitalize">{activity.type} • {activity.date}</p>
                                                    </div>
                                                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                                        <Share2 size={18} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
                                    <div className="flex items-center justify-between mb-2">
                                        <Calendar size={20} className="text-blue-400" />
                                        <TrendingUp size={16} className="text-green-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-white">{stats.eventsCreated}</div>
                                    <div className="text-xs text-gray-300">Events Created</div>
                                </div>

                                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
                                    <div className="flex items-center justify-between mb-2">
                                        <Ticket size={20} className="text-green-400" />
                                        <TrendingUp size={16} className="text-blue-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-white">{stats.eventsAttended}</div>
                                    <div className="text-xs text-gray-300">Events Attended</div>
                                </div>

                                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/30">
                                    <div className="flex items-center justify-between mb-2">
                                        <Star size={20} className="text-yellow-400" />
                                        <TrendingUp size={16} className="text-green-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-white">{stats.avgRating}</div>
                                    <div className="text-xs text-gray-300">Avg Rating</div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
                                    <div className="flex items-center justify-between mb-2">
                                        <Users size={20} className="text-purple-400" />
                                        <TrendingUp size={16} className="text-blue-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-white">{stats.totalBookings}</div>
                                    <div className="text-xs text-gray-300">Total Bookings</div>
                                </div>
                            </div>

                            {/* Security Note */}
                            <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 backdrop-blur-sm rounded-xl border border-yellow-500/30">
                                <div className="flex items-center gap-3">
                                    <Lock size={20} className="text-yellow-400" />
                                    <div>
                                        <p className="font-semibold text-white">Account Security</p>
                                        <p className="text-sm text-gray-300">Your account is protected with two-factor authentication. Last login: 2 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;