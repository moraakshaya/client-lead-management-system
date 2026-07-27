const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        const user = await User.findOne({});
        if (user) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash('password123', salt);
            await user.save();
            console.log('--- USER INFO ---');
            console.log('Email: ' + user.email);
            console.log('Password: password123');
            console.log('-----------------');
        } else {
            console.log('No user found in the database. Please sign up a new user.');
        }
        mongoose.disconnect();
    })
    .catch(err => {
        console.error(err);
        mongoose.disconnect();
    });
