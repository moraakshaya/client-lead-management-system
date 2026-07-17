import api from '../api/axios';

// Get paginated and filtered notes
export const getNotes = (params) => {
    return api.get('/notes', { params });
};

// Get note statistics
export const getNoteStats = () => {
    return api.get('/notes/stats');
};

// Create a new note
export const createNote = (data) => {
    return api.post('/notes', data);
};

// Update an existing note (e.g., Pin / Unpin, Edit text)
export const updateNote = (id, data) => {
    return api.patch(`/notes/${id}`, data);
};

// Delete a note
export const deleteNote = (id) => {
    return api.delete(`/notes/${id}`);
};
