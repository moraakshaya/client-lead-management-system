const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        // Clear existing users
        await User.deleteMany({});
        console.log('Cleared existing users');

        // Create new users
        const users = [
            { name: 'Alex Johnson', email: 'alex@example.com', role: 'Sales Rep' },
            { name: 'Sarah Smith', email: 'sarah@example.com', role: 'Manager' },
            { name: 'Mike Davis', email: 'mike@example.com', role: 'Sales Rep' },
            { name: 'Praveen', email: 'praveen@example.com', role: 'Admin' }
        ];

        await User.insertMany(users);
        console.log('Successfully seeded users!');
        
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedUsers();
