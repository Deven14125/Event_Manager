import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sweet from 'sweetalert2';  // Import SweetAlert

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    
    const loginBtn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const api_url = "http://localhost:7120/login/userLogin";
            
            const response = await fetch(api_url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            if (response.ok) {
                let token = "dummy-token"; // Default token to keep user logged in if backend doesn't send one
                
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    if (data.token) token = data.token;
                    
                    // Save user details if provided by backend
                    if (data.user) {
                        localStorage.setItem('userProfile', JSON.stringify(data.user));
                    } else {
                        // Construct profile from flat fields if necessary, or create a basic one
                        const userProfile = {
                            firstName: data.firstName || data.name || data.username || email.split('@')[0],
                            lastName: data.lastName || '',
                            email: data.email || email,
                            mobile: data.mobile || ''
                        };
                        localStorage.setItem('userProfile', JSON.stringify(userProfile));
                    }
                } else {
                    // Handle plain text response
                    const text = await response.text();
                    console.log("Login response:", text);
                }
                
                localStorage.setItem('authToken', token);
                localStorage.setItem('userEmail', email); // Store email for profile
                
                // Dispatch a custom event to notify Navbar
                window.dispatchEvent(new Event('auth-change'));

                Sweet.fire({
                    icon: 'success',    
                    title: 'Login Successful',
                    text: 'You have successfully logged in!',
                });
                navigate('/home');
                
            } else {
                // Handle error response (could also be text)
                let errorMessage = 'Invalid credentials!';
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const result = await response.json();
                    errorMessage = result.message || errorMessage;
                } else {
                    errorMessage = await response.text();
                }

                Sweet.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: errorMessage,
                });
            }
        } catch (e) {
            console.log(e);
            Sweet.fire({
                icon: 'error',
                title: 'Error',
                text: 'Login Failed. Please try again later.',
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <div className="min-h-screen flex justify-center items-center p-4">
                <div className="w-full max-w-4xl p-8 md:p-12 space-y-12 bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700">
                    <h2 className="text-center text-white text-4xl font-extrabold">
                        Login to your account
                    </h2>
                    
                    <input type="hidden" name="remember" defaultValue="true" />
                    
                    <div className="rounded-lg shadow-md space-y-4">
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
                            />
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
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-lg block w-full pl-10 px-5 py-4 bg-gray-700/50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 sm:text-lg"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 focus:ring-offset-gray-800"
                            />
                            <label
                                htmlFor="remember_me"
                                className="ml-3 block text-sm md:text-base text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm md:text-base">
                            <Link
                                to="forgot"
                                className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={loginBtn}
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
                            {isLoading ? 'Processing...' : 'Sign in'}
                        </button>
                    </div>
                    <div className="text-center mt-6">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link
                                to="/signUp"
                                className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200 hover:underline">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;