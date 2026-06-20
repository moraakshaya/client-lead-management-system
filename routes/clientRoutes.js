const express = require('express');
const router = express.Router(); // Creating a new router object to define routes for client-related operations

const { createClient, getAllClients, getClientsById, updateClient, deleteClient, convertLeadToClient } = require('../controllers/clientController'); // Importing controller functions for handling client-related operations

// Define routes for client-related operations
router.post('/', createClient); // Route to create a new client, handled by the createClient controller function
router.get('/', getAllClients); // Route to retrieve all clients, handled by the getAllClients controller function
router.get('/:id', getClientsById); // Route to retrieve a single client by its ID, handled by the getClientsById controller function
router.patch('/:id', updateClient); 
router.delete('/:id', deleteClient);
router.post('/convert/:leadId', convertLeadToClient);

module.exports = router; 