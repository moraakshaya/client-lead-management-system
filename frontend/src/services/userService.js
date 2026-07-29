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
    // Axios automatically sets the Content-Type with the correct boundary when passing a FormData object
    return api.put('/users/profile', formData);
};

// Update user password
export const updatePassword = (passwordData) => {
    return api.put('/users/password', passwordData);
};

// --- ADMIN ENDPOINTS ---

export const updateUser = (id, userData) => {
    return api.put(`/users/${id}`, userData);
};

export const deleteUser = (id) => {
    return api.delete(`/users/${id}`);
};

export const resetUserPassword = (id, passwordData) => {
    return api.put(`/users/${id}/reset-password`, passwordData);
};

