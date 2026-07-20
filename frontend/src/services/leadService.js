import api from '../api/axios';

// Get paginated and filtered leads
export const getLeads = (params) => {
    return api.get('/leads', { params });
};

// Get lead stats
export const getLeadStats = () => {
    return api.get('/leads/stats');
};

// Get dynamic filter options
export const getLeadFilterOptions = () => {
    return api.get('/leads/filter-options');
};

// Get a single lead
export const getLeadById = (id) => {
    return api.get(`/leads/${id}`);
};

// Create a new lead
export const createLead = (leadData) => {
    return api.post('/leads', leadData);
};

// Update a lead
export const updateLead = (id, leadData) => {
    return api.patch(`/leads/${id}`, leadData);
};

// Delete a lead
export const deleteLead = (id) => {
    return api.delete(`/leads/${id}`);
};

// Convert a lead to a client
export const convertLeadToClient = (id) => {
    return api.post(`/clients/convert/${id}`);
};
