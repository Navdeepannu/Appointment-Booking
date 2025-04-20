import DoctorModel from "../models/doctor.model.js";
import AppointmentModel from "../models/appointment.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Change availability of a doctor
export const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await DoctorModel.findById(docId);

    await DoctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({ success: true, message: "Availability Changed!" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const doctorList = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({}).select(["-password", "-email"]);

    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await DoctorModel.findOne({ email });

    if (!doctor) {
      return res.json({
        success: false,
        message: "Invalid Credentials for Doctor.",
      });
    }

    // match the password
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      // give authentication token
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Password. " });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get doctor appointments for doctor panel
export const appointmentDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await AppointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// complete appointment
export const appointmentCompleted = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await AppointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await AppointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed." });
    } else {
      res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// cancel appointment
export const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await AppointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await AppointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled." });
    } else {
      res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await AppointmentModel.find({ docId });

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;

    const profileData = await DoctorModel.findById(docId).select("-password");

    if (profileData) {
      res.json({ success: true, profileData });
    } else {
      res.json({ success: false, message: "Failed to fetch doctor data" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;

    await DoctorModel.findByIdAndUpdate(docId, { fees, address, available });

    res.json({ success: true, message: "Doctor Profile Updated." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
