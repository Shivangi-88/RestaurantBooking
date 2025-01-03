const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Create a booking
router.post('/create', async (req, res) => {
  const { name, contact, date, time, guests } = req.body;

  try {
    // Validate input
    if (!name || !contact || !date || !time || !guests) {
      return res.status(400).json({
        message: 'All fields are required.',
      });
    }

    // Check if the time slot is already booked
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) {
      return res.status(400).json({
        message: 'This time slot is already booked. Please select another time.',
      });
    }

    // If not booked, create a new booking
    const newBooking = new Booking({ name, contact, date, time, guests });
    await newBooking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking,
    });
  } catch (err) {
    console.error('Error creating booking:', err); // Log error for debugging
    res.status(500).json({
      message: 'Error creating booking',
      error: err.message,
    });
  }
});

// Get available slots for a specific date
router.get('/available-slots', async (req, res) => {
  const { date } = req.query;
  const allSlots = ['09:00', '09:30', '10:00', '10:30', '11:00']; // Example predefined static slots for a day

  if (!date) {
    return res.status(400).json({
      message: 'Date is required to fetch available slots.',
    });
  }

  try {
    // Fetch all bookings for the given date
    const bookings = await Booking.find({ date });

    // Extract the booked time slots
    const bookedSlots = bookings.map((booking) => booking.time);

    // Filter out the booked slots from all available slots
    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

    res.status(200).json({ availableSlots });
  } catch (err) {
    console.error('Error fetching available slots:', err);
    res.status(500).json({
      message: 'Error fetching available slots',
      error: err.message,
    });
  }
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    res.status(200).json({ message: 'Booking deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting booking', error: err.message });
  }
});
// Check availability for a specific time slot
router.get('/check-availability', async (req, res) => {
  const { date, time } = req.query;

  if (!date || !time) {
    return res.status(400).json({
      message: 'Date and time are required to check availability.',
    });
  }

  try {
    const existingBooking = await Booking.findOne({ date, time });

    // Return true if no booking exists for the given date and time
    res.status(200).json({ isAvailable: !existingBooking });
  } catch (err) {
    console.error('Error checking availability:', err);
    res.status(500).json({
      message: 'Error checking availability',
      error: err.message,
    });
  }
});

module.exports = router;
