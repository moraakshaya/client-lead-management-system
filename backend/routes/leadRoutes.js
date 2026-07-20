const express = require('express'); // Importing the Express framework to create a web server
const router = express.Router(); // Creating a new router object to define routes for the Lead resource

const { createLead, getAllLeads, getLeadStats, getLeadById, updateLead, deleteLead, getFilterOptions } = require('../controllers/leadController'); // Importing the LeadController to handle requests related to leads

// Define routes for the Lead resource and associate them with the corresponding controller functions
router.post('/', createLead); // Route to create a new lead, handled by the createLead controller function
router.get('/', getAllLeads); // Route to retrieve all leads, handled by the getAllLeads controller function
router.get('/stats', getLeadStats); // Route to get lead statistics
router.get('/filter-options', getFilterOptions); // Route to get dynamic filter options
router.get('/:id', getLeadById); //Route to retrieve a single lead by its ID, handled by the getLeadById controller function
router.patch('/:id', updateLead); // Route to update a lead by its ID, handled by the updateLead controller function
router.delete('/:id', deleteLead); // Route to delete a lead by its ID, handled by the deleteLead controller function

// Export the router to be used in other parts of the application, allowing for the defined routes to be accessible when the router is imported
module.exports = router; // Exporting the router to be used in other parts of the application, allowing for the defined routes to be accessible when the router is imported