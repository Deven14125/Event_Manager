import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Background3D from "../Components/Background3D";

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
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    // Password Strength State
    const [passwordStrength, setPasswordStrength] = useState({ msg: "", color: "" });

    // Password Strength Checker
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


    const handleSignUp = async () => {
        // Clear previous errors
        setErrors({});

        // Client-side validation
        const newErrors = {};
        
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.dob) newErrors.dob = "Date of birth is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.mobile) newErrors.mobile = "Mobile number is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (formData.mobile && (formData.mobile.length !== 10 || !/^\d+$/.test(formData.mobile))) {
            newErrors.mobile = "Please enter a valid 10-digit mobile number";
        }

        if (formData.password && formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: Object.values(newErrors)[0],
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        setIsLoading(true);

        try {
            let res = await fetch("http://localhost:7120/user/Signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: data.message || 'Account created successfully!',
                    background: '#1f2937',
                    color: '#fff',
                    confirmButtonColor: '#4f46e5'
                });
                navigate("/login");
            } else {
                throw new Error(data.message || "Failed to create account");
            }
        } catch (err) {
            console.error('Signup error:', err);
            
            // Display specific error message from backend
            const errorMessage = err.message || 'Something went wrong. Please try again later.';
            
            Swal.fire({
                icon: 'error',
                title: 'Sign Up Failed',
                text: errorMessage,
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444'
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Enter key press for form submission
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSignUp();
        }
    };

    return (
        <div className="min-h-screen relative">
            <Background3D />
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl w-full space-y-8 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            Create your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-400">
                            Join us today! Please fill in your details
                        </p>
                    </div>
                    <div className="mt-8 space-y-6" onKeyPress={handleKeyPress}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div className="relative group">
                                <label htmlFor="first-name" className="sr-only">First Name</label>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    id="first-name"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className={`appearance-none rounded-lg block w-full pl-10 px-5 py-3 bg-gray-700/50 border ${errors.firstName ? 'border-red-500' : 'border-gray-600'} placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg`}
                                    placeholder="First Name"
                                    aria-describedby="first-name-help"
                                />
                                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                            </div>

                            <div className="relative group">
                                <label htmlFor="last-name" className="sr-only">Last Name</label>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    id="last-name"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className={`appearance-none rounded-lg block w-full pl-10 px-5 py-3 bg-gray-700/50 border ${errors.lastName ? 'border-red-500' : 'border-gray-600'} placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg`}
                                    placeholder="Last Name"
                                    aria-describedby="last-name-help"
                                />
                                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                            </div>

                            <div className="relative group">
                                <label htmlFor="dob" className="sr-only">Date of Birth</label>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    id="dob"
                                    name="dob"
                                    type="date"
                                    required
                                    value={formData.dob}
                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                    className={`appearance-none rounded-lg block w-full pl-10 px-5 py-3 bg-gray-700/50 border ${errors.dob ? 'border-red-500' : 'border-gray-600'} placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg`}
                                    placeholder="Date of Birth"
                                    aria-describedby="dob-help"
                                />
                                {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob}</p>}
                            </div>

                            <div className="relative group">
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`appearance-none rounded-lg block w-full pl-10 px-5 py-3 bg-gray-700/50 border ${errors.email ? 'border-red-500' : 'border-gray-600'} placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg`}
                                    placeholder="Email address"
                                    aria-describedby="email-help"
                                />
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div className="relative group">
                                <label htmlFor="mobile-number" className="sr-only">Mobile Number</label>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <input
                                    id="mobile-number"
                                    name="mobileNumber"
                                    type="tel"
                                    pattern="[0-9]{10}"
                                    required
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    className={`appearance-none rounded-lg block w-full pl-10 px-5 py-3 bg-gray-700/50 border ${errors.mobile ? 'border-red-500' : 'border-gray-600'} placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg`}
                                    placeholder="Mobile Number"
                                    aria-describedby="mobile-help"
                                />
                                {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>}
                            </div>

                            <div className="relative group">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    autoComplete="new-password"
                                    required
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`appearance-none rounded-lg block w-full pl-10 px-5 py-3 bg-gray-700/50 border ${errors.password ? 'border-red-500' : 'border-gray-600'} placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg`}
                                    placeholder="Password (min 6 characters)"
                                    aria-describedby="password-help"
                                />
                                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div className="relative group">
                                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                                {formData.cpassword && formData.cpassword !== formData.password && (
                                    <p className="text-sm mt-1 text-red-400">Passwords do not match</p>
                                )}

                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    id="confirm-password"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    autoComplete="new-password"
                                    required
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className={`appearance-none rounded-lg block w-full pl-10 px-5 py-3 bg-gray-700/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg`}
                                    placeholder="Confirm Password"
                                    aria-describedby="confirm-password-help"
                                />
                                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={handleSignUp}
                                disabled={isLoading}
                                className={`group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-bold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 shadow-lg hover:shadow-indigo-500/30 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                                aria-busy={isLoading}
                                aria-describedby="signup-button-help"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </span>
                                {isLoading ? 'Processing...' : 'Sign Up'}
                            </button>
                            <div id="signup-button-help" className="sr-only">Click to sign up or press Enter</div>
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-gray-400">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;