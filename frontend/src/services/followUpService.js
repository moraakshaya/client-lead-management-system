import api from '../api/axios';

// Get paginated and filtered follow-ups
export const getFollowUps = (params) => {
    return api.get('/follow-ups', { params });
};

// Get follow-up statistics
export const getFollowUpStats = () => {
    return api.get('/follow-ups/stats');
};

// Create a new follow-up
export const createFollowUp = (data) => {
    return api.post('/follow-ups', data);
};

// Update an existing follow-up (e.g., Mark as Completed)
export const updateFollowUp = (id, data) => {
    return api.patch(`/follow-ups/${id}`, data);
};

// Delete a follow-up
export const deleteFollowUp = (id) => {
    return api.delete(`/follow-ups/${id}`);
};
