import api from '../api/axios';

// Get all users
export const getUsers = () => {
    return api.get('/users');
};

// Create a new user
export const createUser = (userData) => {
    return api.post('/users', userData);
};
