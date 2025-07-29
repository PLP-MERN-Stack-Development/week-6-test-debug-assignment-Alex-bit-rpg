
// Example: server/config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is configured to load environment variables for MONGO_URI

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB; // <--- THIS LINE IS CRUCIAL!