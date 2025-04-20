import express from "express";
import {
  appointmentCancel,
  appointmentCompleted,
  appointmentDoctor,
  doctorList,
  loginDoctor,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctor.controllers.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentDoctor);
doctorRouter.post("/appointment-cancel", authDoctor, appointmentCancel);
doctorRouter.post("/complete-appointment", authDoctor, appointmentCompleted);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
