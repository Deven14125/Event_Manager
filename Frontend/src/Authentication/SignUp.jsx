import { useState } from "react";
import { api } from "../Services/api.js";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import {
    User,
    Mail,
    Phone,
    Lock,
    UserPlus,
    Sparkles,
    Shield,
    ArrowRight,
    Loader2,
    Eye,
    EyeOff,
    AlertCircle,
    Facebook,
    Github,
    Twitter,
    Award,
} from 'lucide-react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();

    const socialProviders = [
        { name: 'Facebook', icon: <Facebook size={20} />, color: 'hover:bg-blue-500/10 hover:border-blue-500/30', text: 'text-blue-400' },
        { name: 'GitHub', icon: <Github size={20} />, color: 'hover:bg-gray-800/50 hover:border-gray-600/50', text: 'text-gray-400' },
        { name: 'Twitter', icon: <Twitter size={20} />, color: 'hover:bg-sky-500/10 hover:border-sky-500/30', text: 'text-sky-400' },
    ];

    const benefits = [
        { icon: '🎯', text: 'Personalized event recommendations' },
        { icon: '✨', text: 'Create and manage your own events' },
        { icon: '🛡️', text: 'Secure ticket booking and payments' },
        { icon: '📱', text: 'Mobile-friendly experience' },
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Full name is required";
        else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";

        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";

        if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
        else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Mobile number must be 10 digits";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        else if (!/(?=.*[A-Z])(?=.*\d)/.test(formData.password)) newErrors.password = "Include at least one uppercase letter and one number";

        if (!formData.cpassword) newErrors.cpassword = "Please confirm your password";
        else if (formData.password !== formData.cpassword) newErrors.cpassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 6) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        return strength;
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setFormData({ ...formData, password });
        setPasswordStrength(calculatePasswordStrength(password));

        if (errors.password) setErrors({ ...errors, password: undefined });
    };

    const handleSignUp = async () => {
        if (!validateForm()) {
            Swal.fire({
                title: 'Validation Error',
                html: `
                    <div class="text-left">
                        <p class="text-white mb-2">Please correct the following:</p>
                        <ul class="list-disc pl-4 text-gray-300 space-y-1">
                            ${Object.values(errors).map(error => `<li>${error}</li>`).join('')}
                        </ul>
                    </div>
                `,
                icon: 'error',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444',
                customClass: {
                    popup: 'rounded-2xl border border-red-500/30'
                }
            });
            return;
        }

        setIsLoading(true);

        try {
            let res = await fetch(api.url("/user/Signup"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.mobile,
                    password: formData.password
                }),
            });

            const data = await res.json();

            if (data.success) {
                Swal.fire({
                    title: 'Account Created Successfully!',
                    html: `
                        <div class="text-center">
                            <div class="mb-4 text-5xl">🎉</div>
                            <p class="text-white mb-2">Welcome to EventHub!</p>
                            <p class="text-gray-300">Your account has been created successfully.</p>
                            <p class="text-sm text-gray-400 mt-4">Redirecting to login...</p>
                        </div>
                    `,
                    icon: 'success',
                    background: '#1f2937',
                    color: '#fff',
                    confirmButtonColor: '#10b981',
                    timer: 3000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'rounded-2xl border border-emerald-500/30'
                    }
                }).then(() => {
                    navigate("/login");
                });
            } else {
                throw new Error(data.message || "Failed to create account");
            }
        } catch (err) {
            console.error('Signup error:', err);
            
            // Display specific error message from backend
            const errorMessage = err.message || 'Something went wrong. Please try again later.';
            
            Swal.fire({
                title: 'Registration Failed',
                text: e.message || 'Something went wrong. Please try again.',
                icon: 'error',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444',
                customClass: {
                    popup: 'rounded-2xl border border-red-500/30'
                }
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSignUp();
    };

    const inputClasses = "w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300";
    const errorInputClasses = "w-full bg-gray-800/50 backdrop-blur-sm border border-red-500/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300";
    const errorMessageClasses = "text-red-400 text-sm mt-2 flex items-center gap-2";

    const getStrengthColor = (strength) => {
        if (strength < 50) return "from-red-500 to-red-600";
        if (strength < 75) return "from-yellow-500 to-yellow-600";
        return "from-green-500 to-green-600";
    };

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Benefits */}
                    <div className="hidden lg:flex flex-col justify-center">
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
                                <Sparkles size={16} className="text-yellow-400" />
                                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                    Join Our Community
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                                    Create Your Account
                                </span>
                            </h1>

                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Join thousands of event enthusiasts, organizers, and creators. Discover amazing events, create your own, and build unforgettable experiences.
                            </p>

                            <div className="space-y-4 mb-8">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="p-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg">
                                            <span className="text-lg">{benefit.icon}</span>
                                        </div>
                                        <span className="text-gray-300">{benefit.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
                                    <div className="text-2xl font-bold text-white mb-1">50K+</div>
                                    <div className="text-xs text-gray-300">Active Users</div>
                                </div>
                                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
                                    <div className="text-2xl font-bold text-white mb-1">2K+</div>
                                    <div className="text-xs text-gray-300">Events Monthly</div>
                                </div>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl border border-yellow-500/30">
                                <div className="flex items-center gap-3">
                                    <Award size={20} className="text-yellow-400" />
                                    <div>
                                        <p className="font-semibold text-white">Premium Features</p>
                                        <p className="text-sm text-gray-300">Get access to exclusive events and early bird offers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Sign Up Form */}
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6 sm:p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl">
                                    <UserPlus size={24} className="text-blue-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Sign Up</h2>
                            </div>
                            <p className="text-gray-400">Create your account in minutes</p>
                        </div>

                        {/* Social Sign Up */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-400 text-center mb-4">Sign up with</p>
                            <div className="grid grid-cols-2 gap-3">
                                {socialProviders.map(provider => (
                                    <button
                                        key={provider.name}
                                        className={`flex items-center justify-center gap-2 p-3 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 ${provider.color} transition-all duration-300`}
                                    >
                                        <span className={provider.text}>{provider.icon}</span>
                                        <span className="text-sm text-gray-300">{provider.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700/50"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-gradient-to-br from-gray-800/40 to-gray-900/40 text-gray-400">Or with email</span>
                            </div>
                        </div>

                        <div className="space-y-6" onKeyPress={handleKeyPress}>
                            {/* Name Input */}
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                    <User size={16} />
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            if (errors.name) setErrors({ ...errors, name: undefined });
                                        }}
                                        className={`pl-10 ${errors.name ? errorInputClasses : inputClasses}`}
                                        placeholder="John Doe"
                                    />
                                </div>
                                {errors.name && (
                                    <p className={errorMessageClasses}>
                                        <AlertCircle size={14} />
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                    <Mail size={16} />
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            if (errors.email) setErrors({ ...errors, email: undefined });
                                        }}
                                        className={`pl-10 ${errors.email ? errorInputClasses : inputClasses}`}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className={errorMessageClasses}>
                                        <AlertCircle size={14} />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Mobile Input */}
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                    <Phone size={16} />
                                    Mobile Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="tel"
                                        value={formData.mobile}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '').substring(0, 10);
                                            setFormData({ ...formData, mobile: value });
                                            if (errors.mobile) setErrors({ ...errors, mobile: undefined });
                                        }}
                                        className={`pl-10 ${errors.mobile ? errorInputClasses : inputClasses}`}
                                        placeholder="1234567890"
                                    />
                                </div>
                                {errors.mobile && (
                                    <p className={errorMessageClasses}>
                                        <AlertCircle size={14} />
                                        {errors.mobile}
                                    </p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                    <Lock size={16} />
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handlePasswordChange}
                                        className={`pl-10 pr-10 ${errors.password ? errorInputClasses : inputClasses}`}
                                        placeholder="Create a strong password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {/* Password Strength */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs text-gray-400">Password strength</span>
                                            <span className="text-xs font-medium">{passwordStrength}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${getStrengthColor(passwordStrength)} transition-all duration-300`}
                                                style={{ width: `${passwordStrength}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                {errors.password && (
                                    <p className={errorMessageClasses}>
                                        <AlertCircle size={14} />
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                    <Lock size={16} />
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={formData.cpassword}
                                        onChange={(e) => {
                                            setFormData({ ...formData, cpassword: e.target.value });
                                            if (errors.cpassword) setErrors({ ...errors, cpassword: undefined });
                                        }}
                                        className={`pl-10 pr-10 ${errors.cpassword ? errorInputClasses : inputClasses}`}
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {formData.cpassword && formData.cpassword !== formData.password && (
                                    <p className="text-sm mt-1 text-red-400">Passwords do not match</p>
                                )}
                                {errors.cpassword && (
                                    <p className={errorMessageClasses}>
                                        <AlertCircle size={14} />
                                        {errors.cpassword}
                                    </p>
                                )}
                            </div>

                            {/* Terms & Conditions */}
                            <div className="flex items-start p-4 bg-gray-800/30 rounded-xl">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded bg-gray-700/50 mt-1"
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                                    I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>. I understand that my data will be processed securely.
                                </label>
                            </div>

                            {/* Sign Up Button */}
                            <button
                                onClick={handleSignUp}
                                disabled={isLoading}
                                className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus size={20} />
                                        Create Account
                                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </button>

                            {/* Login Link */}
                            <div className="text-center pt-6 border-t border-gray-700/50">
                                <p className="text-gray-400">
                                    Already have an account?{' '}
                                    <Link
                                        to="/login"
                                        className="font-medium text-blue-400 hover:text-blue-300 transition-colors group inline-flex items-center gap-1"
                                    >
                                        <span>Sign in</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Security Note */}
                        <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl border border-blue-500/30">
                            <div className="flex items-center gap-3">
                                <Shield size={20} className="text-green-400" />
                                <div>
                                    <p className="font-semibold text-white">Secure Registration</p>
                                    <p className="text-sm text-gray-300">Your information is protected with industry-standard encryption</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;