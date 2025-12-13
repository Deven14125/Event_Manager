import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Background3D from "../Components/Background3D";
import { useUser } from "../context/UserContext";

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
    const navigate = useNavigate();
    const { login } = useUser();

    const loginBtn = async () => {
        // Empty field check
        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields!',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        // Email format validation
        if (!validateEmail(email)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Email",
                text: "Please enter a valid email address (example@gmail.com).",
                background: "#1f2937",
                color: "#fff",
                confirmButtonColor: "#ef4444",
            });
            return;
        }

        // Basic password strength validation
        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Weak Password",
                text: "Password must be at least 6 characters long.",
                background: "#1f2937",
                color: "#fff",
                confirmButtonColor: "#ef4444",
            });
            return;
        }


        setIsLoading(true);

        try {
            let res = await fetch("http://localhost:7120/user/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                // Use the login function from UserContext
                login(data.user, data.token);
                
                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: `Login successful! Welcome, ${data.user.name}`,
                    background: '#1f2937',
                    color: '#fff',
                    confirmButtonColor: '#4f46e5',
                    timer: 2000,
                    showConfirmButton: false
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
                icon: 'error',
                title: 'Login Failed',
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
            loginBtn();
        }
    };

    return (
        <div className="min-h-screen relative">
            <Background3D />
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-400">
                            Welcome back! Please enter your details
                        </p>
                    </div>
                    <div className="mt-8 space-y-6" onKeyPress={handleKeyPress}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div className="relative group">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none rounded-lg block w-full pl-10 px-5 py-4 bg-gray-700/50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg"
                                    placeholder="Email address"
                                    aria-describedby="email-help"
                                />
                                <div id="email-help" className="sr-only">Enter your email address</div>
                            </div>

                            <div className="relative group">
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        checkPasswordStrength(e.target.value);
                                    }}

                                    className="appearance-none rounded-lg block w-full pl-10 px-5 py-4 bg-gray-700/50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg"
                                    placeholder="Password"
                                    aria-describedby="password-help"
                                />
                                <p className={`text-sm mt-1 ${passwordStrength.color}`}>
                                 {passwordStrength.msg}
                                </p>

                                
                                <div id="password-help" className="sr-only">Enter your password</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700/50"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200 hover:underline">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={loginBtn}
                                disabled={isLoading}
                                className={`group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-bold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 shadow-lg hover:shadow-indigo-500/30 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                                aria-busy={isLoading}
                                aria-describedby="login-button-help"
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
                                {isLoading ? 'Processing...' : 'Sign in'}
                            </button>
                            <div id="login-button-help" className="sr-only">Click to sign in or press Enter</div>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link
                                to="/signUp"
                                className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;