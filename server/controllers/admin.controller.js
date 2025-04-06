import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

import AppointmentModel from "../models/appointment.model.js";
import userModel from "../models/user.model.js";
import DoctorModel from "../models/doctor.model.js";

// API to add doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // Save data in DB
    if (
      !name ||
      !email ||
      !password ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !speciality ||
      !address
    ) {
      return res.json({ success: false, message: "Missing doctor details." });
    }
    // validate email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email.",
      });
    }
    // validate strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be 8 characters.",
      });
    }

    const existingDoctor = await DoctorModel.findOne({ email });
    if (existingDoctor) {
      return res.json({
        success: false,
        message: "Doctor with this email already exists.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageURL = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience: String(experience),
      about,
      fees,
      address: JSON.parse(address), // store as object
      date: Date.now(),
      image: imageURL,
    };

    const newDoctor = new DoctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "New Doctor Added." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // create a JWT token
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (error) {
    console.error("Login Failed: ", error);
    res.json({ success: false, message: error.message });
  }
};

// Get all doctors from database
const allDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({}).select("-password");

    res.json({ success: true, doctors });
  } catch (error) {
    console.error("Error Fetching data: ", error);
    res.json({ succes: false, message: "Error Fetching doctors data." });
  }
};

const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Error Fetching data: ", error);
    res.json({ succes: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // get appointment data
    const appointmentData = await AppointmentModel.findById(appointmentId);

    // change the cancelled to true
    await AppointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Change the doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await DoctorModel.findById(docId);

    // get all the booked slots
    let slots_booked = doctorData.slots_booked;

    // filter out the booked slots, compare slotTime
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    // find the particular doctor and updare the slots_booked
    await DoctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Canceled" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get data from DB for dashboard
const adminDashboard = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({});
    const users = await userModel.find({});
    const appointments = await AppointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5), //top 5 appointments
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
  }
};
export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
