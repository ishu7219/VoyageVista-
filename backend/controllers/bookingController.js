import Booking from "../models/Booking.js";

// ✅ create new booking
export const createBooking = async (req, res) => {
  const newBooking = new Booking({
    ...req.body,
    userId: req.user?.id,        // token se userId (optional)
    userEmail: req.user?.email,  // token se email (optional)
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your tour is booked ✅",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, message: "Successfully fetched", data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ get all bookings
export const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ success: true, message: "Successfully fetched", data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
