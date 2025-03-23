import express from "express";
import Booking from "../models/Booking.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

const router = express.Router();

// ➡️ Create a booking
router.post("/", async (req, res) => {
  const { userId, doctorId, date, time } = req.body;

  try {
    const user = await User.findById(userId);
    const doctor = await Doctor.findById(doctorId);

    if (!user || !doctor) {
      return res.status(404).json({ message: "User or Doctor not found" });
    }

    const booking = await Booking.create({ user: userId, doctor: doctorId, date, time });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ➡️ Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("doctor", "name specialty");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➡️ Get a single booking
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email")
      .populate("doctor", "name specialty");

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➡️ Update a booking
router.put("/:id", async (req, res) => {
  const { date, time } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { date, time },
      { new: true }
    ).populate("user").populate("doctor");

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➡️ Delete a booking
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
