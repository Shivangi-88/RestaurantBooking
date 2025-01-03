const mongoose = require('mongoose');

// Define schema for booking
const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
});

// Create a model based on the schema
const Booking = mongoose.model('Booking', bookingSchema);

// Export the model
module.exports = Booking;
