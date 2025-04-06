import express from "express";
import {
  addDoctor,
  adminDashboard,
  allDoctors,
  appointmentCancel,
  appointmentsAdmin,
  loginAdmin,
} from "../controllers/admin.controller.js";
import { changeAvailability } from "../controllers/doctor.controllers.js";

import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("docImg"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-aapointment", authAdmin, appointmentCancel);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
