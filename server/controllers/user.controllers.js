import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import AppointmentModel from "../models/appointment.model.js";
import DoctorModel from "../models/doctor.model.js";

// API to Register new User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Credentials" });
    }
    // validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email." });
    }
    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Pasword must be 8 characters",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user data in DB
    const userData = { name, email, password: hashedPassword };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
    console.log("User crearted Successfully.");
  } catch (error) {
    console.log("Error Registering user: ", error);
    res.json({ success: false, message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist, register",
      });
    }

    // Match the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
      console.log("User logged in ");
    } else {
      res.json({ success: false, message: "Invalid credientials" });
    }
  } catch (error) {
    console.log("Error login user: ", error);
    res.json({ success: false, message: error.message });
  }
};

// Get user profile data
export const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    // find user
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log("Error fetching data: ", error);
    res.json({ success: false, message: error.message });
  }
};

// update the user profile
export const updateProfile = async (req, res) => {
  try {
    // get data
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data missing." });
    }

    // update the user data
    const updateData = {
      name,
      phone,
      address: JSON.parse(address), // convert to object
      dob,
      gender,
    };

    // If there's a new image, upload it to cloudinary
    if (imageFile) {
      try {
        const result = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
        });
        updateData.image = result.secure_url;
      } catch (error) {
        console.error("Error uploading image to cloudinary:", error);
        return res.json({ success: false, message: "Error uploading image" });
      }
    }

    // Update user with all data including new image if available
    await userModel.findByIdAndUpdate(userId, updateData);

    res.json({ success: true, message: "Profile Updated." });
  } catch (error) {
    console.log("Error updating data: ", error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { userId, slotDate, docId, slotTime } = req.body;
    const docData = await DoctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available." });
    }

    // store booked slots booked
    let slots_booked = docData.slots_booked;

    // check for slot available
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        // slot not avaliable
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime); // push to array
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    // Delete slots from doctor Data
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    // create new appointment
    const newAppointment = new AppointmentModel(appointmentData);
    // save appointment to DB
    await newAppointment.save();

    // Save changes of slots data in Doctors data model
    await DoctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked Successfully." });
  } catch (error) {
    console.error("Error booking appointment: ", error);
    res.json({ success: false, message: error.message });
  }
};

// Get list of appointment that user booked
export const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await AppointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    // get appointment data
    const appointmentData = await AppointmentModel.findById(appointmentId);

    // check the userId
    if (appointmentData.userId !== userId) {
      res.json({ success: false, message: "Unautherized action." });
    }

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
