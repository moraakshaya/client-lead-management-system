import api from '../api/axios';

export const login = (email, password) => {
    return api.post('/auth/login', { email, password });
};

export const signup = (userData) => {
    return api.post('/auth/signup', userData);
};

export const forgotPassword = (email) => {
    return api.post('/auth/forgot-password', { email });
};

export const resetPassword = (token, newPassword) => {
    return api.post(`/auth/reset-password/${token}`, { newPassword });
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
};
