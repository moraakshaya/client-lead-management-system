const mongoose = require('mongoose');
require('dotenv').config();

console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('SUCCESS: Connected to MongoDB!');
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('FAILED to connect:');
        console.error(err.message);
        mongoose.disconnect();
    });
