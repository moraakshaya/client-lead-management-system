import { toast } from 'react-toastify';

/**
 * Centralized API Error Handler
 * Handles granular error messages like network disconnections, 500 crashes, and duplicate emails.
 * 
 * @param {Object} error - The error object caught in the try-catch block
 * @param {string} context - The context of the operation (e.g. 'deleteLead', 'fetchLeads')
 */
export const handleApiError = (error, context = 'operation') => {
  // Log for debugging
  console.error(`Error during ${context}:`, error);

  // 1. Network disconnected / No response from server
  if (!error.response) {
    return toast.error("No internet connection.");
  }

  const status = error.response.status;
  const data = error.response.data;

  // 2. Server crashes (500 and above)
  if (status >= 500) {
    if (context === 'fetchLeads') {
      return toast.error("Unable to load leads.");
    }
    if (context === 'deleteLead') {
      return toast.error("Unable to delete lead.");
    }
    return toast.error("Something went wrong. Try again.");
  }

  // 3. Duplicate Email (400 or 409)
  if (status === 400 || status === 409) {
    if (data?.message?.toLowerCase().includes('email already exists')) {
      return toast.error("Lead already exists.");
    }
  }

  // 4. Operation-specific fallbacks
  if (context === 'deleteLead') {
    return toast.error("Unable to delete lead.");
  }

  // 5. Default Fallback
  return toast.error(data?.message || "Something went wrong. Try again.");
};
