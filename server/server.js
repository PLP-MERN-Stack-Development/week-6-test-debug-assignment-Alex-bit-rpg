require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bugRoutes = require('./routes/bugRoutes');
const { errorHandler } = require('./middleware/errorHandler');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Body parser for raw JSON

// Routes
app.use('/api/bugs', bugRoutes);

// Intentional Bug Example: Misspell an endpoint to demonstrate debugging
// app.use('/api/bugs-typo', bugRoutes); // Uncomment this line to introduce a bug

// Fallback for unknown routes (404 Not Found)
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Pass the error to the error handling middleware
});

// Error handling middleware (must be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

/* Duplicate code removed to prevent redeclaration errors. 
   All necessary setup is already handled above. */