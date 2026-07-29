const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');

dotenv.config();

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        // Clear existing users
        await User.deleteMany({});
        console.log('Cleared existing users');

        const defaultPassword = await bcrypt.hash('admin123', 10);

        // Create new users matching the demo credentials requested
        const users = [
            { name: 'System Admin', email: 'admin@crm.com', password: defaultPassword, role: 'Admin' },
            { name: 'John Manager', email: 'manager@crm.com', password: defaultPassword, role: 'Sales Manager' },
            { name: 'Alice Executive', email: 'executive@crm.com', password: defaultPassword, role: 'Sales Executive' },
            { name: 'Demo Guest', email: 'demo@leadflow.com', password: defaultPassword, role: 'Sales Executive' }
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

