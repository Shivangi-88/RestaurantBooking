
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes'); // Make sure the path is correct

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use the booking routes as middleware
app.use('/api', bookingRoutes); // This will use the router defined in bookingRoutes.js

// Set the server port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
