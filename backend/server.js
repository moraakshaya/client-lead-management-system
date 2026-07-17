const express = require('express'); // Importing the Express framework to create a web server
const mongoose = require('mongoose'); // Importing Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js, to interact with the MongoDB database
const cors = require('cors'); // Importing the CORS middleware to enable Cross-Origin Resource Sharing, allowing the server to handle requests from different origins
const dotenv = require('dotenv'); // Importing the dotenv package to load environment variables from a .env file into process.env, allowing for configuration of sensitive information like database connection strings and API keys without hardcoding them in the code
const leadRoutes = require('./routes/leadRoutes'); // Importing the leadRoutes module, which contains the route definitions for handling requests related to leads
const clientRoutes = require('./routes/clientRoutes');
const followUpRoutes = require('./routes/followUpRoutes');
const notesRoutes = require('./routes/noteRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const activityRoutes = require('./routes/activityRoutes');
const PORT = process.env.PORT || 5000;



dotenv.config();    // Load environment variables from the .env file into process.env



const app = express(); // Creating an instance of the Express application

// Middleware setup
app.use(cors()); // Enabling CORS for all routes, allowing the server to accept requests from any origin
app.use(express.json()); // Middleware to parse incoming JSON requests and make the data available in req.body
app.use('/api/leads', leadRoutes); // Mounting the leadRoutes on the /api/leads path, meaning that any requests to /api/leads will be handled by the routes defined in leadRoutes
app.use('/api/clients', clientRoutes);
app.use('/api/followUps', followUpRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/activity', activityRoutes);




// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URL) // Connecting to the MongoDB database using the connection string stored in the MONGO_URL environment variable
    .then(() => console.log('connected to MongoDB')) // Log a success message if the connection is successful
    .catch((err) => console.log(err)); // Log any errors that occur during the connection attempt

app.listen(PORT, () => { // Starting the server and listening on port 5000
    console.log(`server is running on port ${PORT}`); // Log a message to the console indicating that the server is running
});

