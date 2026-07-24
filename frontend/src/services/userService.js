import api from '../api/axios';

// Get all users
export const getUsers = () => {
    return api.get('/users');
};

// Create a new user
export const createUser = (userData) => {
    return api.post('/users', userData);
};

// Get current user profile
export const getProfile = () => {
    return api.get('/users/profile');
};

// Update user profile (multipart/form-data if image included)
export const updateProfile = (formData) => {
    return api.put('/users/profile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// Update user password
export const updatePassword = (passwordData) => {
    return api.put('/users/password', passwordData);
};
