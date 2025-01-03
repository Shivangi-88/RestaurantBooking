const mongoose = require('mongoose');

// MongoDB connection URI
const connectDB = async () => {
  try {
    // Remove deprecated options from the connection
    await mongoose.connect('mongodb://localhost/restaurant-booking');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
