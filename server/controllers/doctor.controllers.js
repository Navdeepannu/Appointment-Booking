import DoctorModel from "../models/doctor.model.js";
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
