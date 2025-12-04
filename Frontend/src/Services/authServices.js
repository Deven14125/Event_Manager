// src/services/authService.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // You should store this securely (for example, in environment variables)

export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
};

export const removeAuthToken = () => {
    localStorage.removeItem('authToken');
};

export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const isLoggedIn = () => {
    const token = getAuthToken();
    if (!token) return false;

    try {
        jwt.verify(token, SECRET_KEY); // Verify the token using the secret key
        return true;
    } catch (error) {
        console.log(error)
        removeAuthToken();
        return false;
    }
};

export const login = (userData) => {
    const token = jwt.sign(userData, SECRET_KEY, { expiresIn: '1d' });
    setAuthToken(token);
};

export const logout = () => {
    removeAuthToken();
};
