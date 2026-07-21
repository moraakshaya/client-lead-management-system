import api from '../api/axios';

// Get paginated activities
export const getActivities = (params) => {
    return api.get('/activity', { params });
};

// Get activity statistics
export const getActivityStats = () => {
    return api.get('/activity/stats');
};

// Get activities for a specific lead
export const getActivityByLead = (leadId) => {
    return api.get(`/activities/lead/${leadId}`);
};
