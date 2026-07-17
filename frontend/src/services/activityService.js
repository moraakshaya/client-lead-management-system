import api from '../api/axios';

// Get paginated activities
export const getActivities = (params) => {
    return api.get('/activities', { params });
};

// Get activity statistics
export const getActivityStats = () => {
    return api.get('/activities/stats');
};

// Get activities for a specific lead
export const getActivityByLead = (leadId) => {
    return api.get(`/activities/lead/${leadId}`);
};
