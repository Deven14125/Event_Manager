import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sweet from 'sweetalert2';  // Import SweetAlert

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            Sweet.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Passwords do not match!',
            });
            return;
        }

        setIsLoading(true);

        try {
            const api_url = "http://localhost:7120/user/Signup";

            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                Sweet.fire({
                    icon: 'success',
                    title: 'Sign Up Successful',
                    text: 'You have successfully signed up!',
                });
                navigate('/login');
            } else {
                const result = await response.json();
                Sweet.fire({
                    icon: 'error',
                    title: 'Sign Up Failed',
                    text: result.message || 'Unable to sign up. Please try again!',
                });
            }
            console.log(response);
        } catch (e) {
            console.log(e);
            Sweet.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="min-h-screen flex justify-center items-center p-4">
                <div className="w-full max-w-3xl p-10 space-y-8 bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700">
                    <h2 className="text-center text-4xl font-extrabold text-white">
                        Create your account
                    </h2>
                    <div className="mt-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <label htmlFor="first-name" className="sr-only">First Name</label>
                                <input
                                    id="first-name"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="appearance-none rounded-lg block w-full px-5 py-3 bg-gray-700/50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="relative group">
                                <label htmlFor="last-name" className="sr-only">Last Name</label>
                                <input
                                    id="last-name"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="appearance-none rounded-lg block w-full px-5 py-3 bg-gray-700/50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <label htmlFor="dob" className="sr-only">Date of Birth</label>
                            <input
                                id="dob"
                                name="dob"
                                type="date"
                                required
                                value={formData.dob}
                                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                className="appearance-none rounded-lg block w-full px-5 py-3 bg-gray-700/50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg"
                            />
                        </div>

                        <div className="relative group">
                            <label htmlFor="email" className="sr-only">Email Address</label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="appearance-none rounded-lg block w-full pl-10 px-5 py-3 bg-gray-700/50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg"
                                placeholder="Email Address"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="appearance-none rounded-lg block w-full pl-10 px-5 py-3 bg-gray-700/50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="relative group">
                                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    id="confirm-password"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="appearance-none rounded-lg block w-full pl-10 px-5 py-3 bg-gray-700/50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg"
                                    placeholder="Confirm Password"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <label htmlFor="mobile-number" className="sr-only">Mobile Number</label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
                                className="appearance-none rounded-lg block w-full pl-10 px-5 py-3 bg-gray-700/50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg"
                                placeholder="Mobile Number"
                            />
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={handleSignUp}
                                disabled={isLoading}
                                className={`group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-bold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 shadow-lg hover:shadow-indigo-500/30 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02]'}`}>
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-gray-400">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200 hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
