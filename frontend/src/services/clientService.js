import api from '../api/axios';

// Get paginated and filtered clients
export const getClients = (params) => {
    return api.get('/clients', { params });
};

// Get client stats
export const getClientStats = () => {
    return api.get('/clients/stats');
};

// Get a single client
export const getClientById = (id) => {
    return api.get(`/clients/${id}`);
};

// Create a new client
export const createClient = (clientData) => {
    return api.post('/clients', clientData);
};

// Update a client
export const updateClient = (id, clientData) => {
    return api.patch(`/clients/${id}`, clientData);
};

// Delete a client
export const deleteClient = (id) => {
    return api.delete(`/clients/${id}`);
};
