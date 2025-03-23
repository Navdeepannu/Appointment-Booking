import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// ✅ Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Create a new doctor
router.post("/", async (req, res) => {
  const { name, specialty, degree, experience, about, fees, address } = req.body;

  try {
    const newDoctor = new Doctor({
      name,
      specialty,
      degree,
      experience,
      about,
      fees,
      address,
    });

    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Update an existing doctor
router.put("/:id", async (req, res) => {
  const { name, specialty, degree, experience, about, fees, address } = req.body;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { name, specialty, degree, experience, about, fees, address },
      { new: true } // Return the updated document
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete a doctor
router.delete("/:id", async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
