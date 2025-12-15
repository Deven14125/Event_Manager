import { useState } from "react";
import { api } from "../Services/api.js";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import {
    Mail,
    Lock,
    LogIn,
    Eye,
    EyeOff,
    Sparkles,
    CheckCircle,
    Shield,
    Zap,
    ArrowRight,
    Loader2,
    Facebook,
    Github, 
    Twitter,
    AlertCircle
} from 'lucide-react';

// Email Validation Regex
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Password Strength Function
const checkPasswordStrength = (pass) => {
    let strength = 0;

    if (pass.length >= 6) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;

    let msg = "";
    let color = "";

    if (strength <= 2) {
        msg = "Weak Password";
        color = "text-red-400";
    } else if (strength === 3) {
        msg = "Medium Password";
        color = "text-yellow-400";
    } else {
        msg = "Strong Password";
        color = "text-green-400";
    }

    setPasswordStrength({ msg, color });
};


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState({ msg: "", color: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { login } = useUser();

    const socialProviders = [
        { name: 'Facebook', icon: <Facebook size={20} />, color: 'hover:bg-blue-500/10 hover:border-blue-500/30', text: 'text-blue-400' },
        { name: 'GitHub', icon: <Github size={20} />, color: 'hover:bg-gray-800/50 hover:border-gray-600/50', text: 'text-gray-400' },
        { name: 'Twitter', icon: <Twitter size={20} />, color: 'hover:bg-sky-500/10 hover:border-sky-500/30', text: 'text-sky-400' },
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const loginBtn = async () => {
        if (!validateForm()) {
            // Show validation errors
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
            let res = await fetch(api.url("/user/Login"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                let data = await res.json();

                // Store auth data
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userEmail", email);
                localStorage.setItem("userProfile", JSON.stringify(data.user || {}));

                if (rememberMe) {
                    localStorage.setItem("rememberMe", "true");
                }

                window.dispatchEvent(new Event('auth-change'));

                Swal.fire({
                    title: 'Welcome Back!',
                    html: `
                        <div class="text-center">
                            <div class="mb-4 text-5xl">🎉</div>
                            <p class="text-white mb-2">Login successful!</p>
                            <p class="text-gray-300">Redirecting to your dashboard...</p>
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
                }).then(() => {
                    navigate("/home");
                });
                
                // Redirect to home page
                setTimeout(() => {
                    navigate("/home");
                }, 500);
            } else {
                throw new Error(data.message || "Invalid credentials");
            }
        } catch (err) {
            console.error('Login error:', err);
            
            // Display specific error message from backend
            const errorMessage = err.message || 'Something went wrong. Please try again later.';
            
            Swal.fire({
                title: 'Login Failed',
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
        if (e.key === 'Enter') loginBtn();
    };

    const inputClasses = "w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300";
    const errorInputClasses = "w-full bg-gray-800/50 backdrop-blur-sm border border-red-500/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300";
    const errorMessageClasses = "text-red-400 text-sm mt-2 flex items-center gap-2";

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white"> 
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Info */}
                    <div className="hidden lg:flex flex-col justify-center">
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
                                <Sparkles size={16} className="text-yellow-400" />
                                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                    Welcome Back
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold mb-4">
                                <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                                    Welcome to EventHub
                                </span>
                            </h1>

                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Access your personalized event dashboard, manage bookings, and discover amazing experiences tailored just for you.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <CheckCircle size={20} className="text-green-400" />
                                    <span className="text-gray-300">Access all your booked events</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle size={20} className="text-green-400" />
                                    <span className="text-gray-300">Create and manage events</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle size={20} className="text-green-400" />
                                    <span className="text-gray-300">Personalized recommendations</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle size={20} className="text-green-400" />
                                    <span className="text-gray-300">Secure payment processing</span>
                                </div>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl border border-blue-500/30">
                                <div className="flex items-center gap-3">
                                    <Shield size={20} className="text-green-400" />
                                    <div>
                                        <p className="font-semibold text-white">Secure Login</p>
                                        <p className="text-sm text-gray-300">Your data is protected with 256-bit encryption</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6 sm:p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl">
                                    <LogIn className="text-blue-400" size={24} />
                                </div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Welcome Back</h2>
                            </div>
                            <p className="text-gray-400">Sign in to continue to EventHub</p>
                        </div>

                        <div className="space-y-6">
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
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                                        }}
                                        className={`pl-10 pr-4 ${errors.email ? errorInputClasses : inputClasses}`}
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

                            {/* Password Input */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className=" text-sm font-medium text-gray-300 flex items-center gap-2">
                                        <Lock size={16} />
                                        Password
                                    </label>
                                    <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                                        }}
                                        className={`pl-10 pr-10 ${errors.password ? errorInputClasses : inputClasses}`}
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className={errorMessageClasses}>
                                        <AlertCircle size={14} />
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember Me & Security */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded bg-gray-700/50"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                        Remember me
                                    </label>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Shield size={12} />
                                    <span>Secure connection</span>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                onClick={loginBtn}
                                disabled={isLoading}
                                className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        <LogIn size={20} />
                                        Sign In
                                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </button>

                            {/* Sign Up Link */}
                            <div className="text-center pt-6 border-t border-gray-700/50">
                                <p className="text-gray-400">
                                    {` Don't have an account?`}
                                    <Link
                                        to="/signUp"
                                        className="font-medium text-blue-400 hover:text-blue-300 transition-colors group inline-flex items-center gap-1"
                                    >
                                        <span>Create account</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </p>
                            </div>

                            {/* Mobile Info */}
                            <div className="lg:hidden mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl border border-blue-500/30">
                                <div className="flex items-center gap-3">
                                    <Zap size={20} className="text-yellow-400" />
                                    <div>
                                        <p className="font-semibold text-white">New to EventHub?</p>
                                        <p className="text-sm text-gray-300">Join thousands of event enthusiasts worldwide</p>
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

export default Login;