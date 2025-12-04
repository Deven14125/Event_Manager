import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        firstName: 'User',
        lastName: 'Name',
        email: '',
        mobile: '',
        bio: 'Event enthusiast and community member.',
        location: 'New York, USA'
    });

    useEffect(() => {
        // Fetch user data from localStorage or API
        const storedEmail = localStorage.getItem('userEmail');
        const storedProfile = localStorage.getItem('userProfile');

        if (storedProfile) {
            try {
                const parsedProfile = JSON.parse(storedProfile);
                setUserData(prev => ({
                    ...prev,
                    ...parsedProfile,
                    // Ensure we don't overwrite with undefined if fields are missing in profile
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
                firstName: storedEmail.split('@')[0] // Fallback name from email
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Save to localStorage (simulate API call)
        localStorage.setItem('userProfile', JSON.stringify(userData));
        setIsEditing(false);
        
        Swal.fire({
            title: 'Profile Updated!',
            text: 'Your profile information has been saved successfully.',
            icon: 'success',
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: '#4f46e5'
        });
    };

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl">
                    {/* Header / Cover */}
                    <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden bg-gray-800">
                                <img 
                                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="absolute top-4 right-4">
                            {!isEditing ? (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all flex items-center space-x-2"
                                >
                                    <span>✏️ Edit Profile</span>
                                </button>
                            ) : (
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => setIsEditing(false)}
                                        className="bg-red-500/80 hover:bg-red-600/80 text-white px-4 py-2 rounded-lg transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleSave}
                                        className="bg-green-500/80 hover:bg-green-600/80 text-white px-4 py-2 rounded-lg transition-all"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="pt-20 px-8 pb-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white">{userData.firstName} {userData.lastName}</h1>
                            <p className="text-indigo-300">{userData.email}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">Personal Information</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={userData.firstName}
                                                onChange={handleChange}
                                                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-white text-lg">{userData.firstName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={userData.lastName}
                                                onChange={handleChange}
                                                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-white text-lg">{userData.lastName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                        <p className="text-gray-300 text-lg">{userData.email}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Mobile Number</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="mobile"
                                                value={userData.mobile}
                                                onChange={handleChange}
                                                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="+1 234 567 890"
                                            />
                                        ) : (
                                            <p className="text-white text-lg">{userData.mobile || 'Not set'}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">About Me</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="location"
                                                value={userData.location}
                                                onChange={handleChange}
                                                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-white text-lg">{userData.location}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                                        {isEditing ? (
                                            <textarea
                                                name="bio"
                                                value={userData.bio}
                                                onChange={handleChange}
                                                rows="4"
                                                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                            />
                                        ) : (
                                            <p className="text-gray-300 leading-relaxed">{userData.bio}</p>
                                        )}
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