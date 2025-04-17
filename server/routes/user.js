import express from "express";
// import User from "../models/user.model.js";

import upload from "../middlewares/multer.js";
import authUser from "../middlewares/authUser.js";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
} from "../controllers/user.controllers.js";

const userRouter = express.Router();

//  Create a new user
userRouter.post("/register", registerUser);

// login user route
userRouter.post("/login", loginUser);

// Get ptofile route
userRouter.get("/get-profile", authUser, getProfile);

// Update the profile, using multer and authUser as middlewares
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);

userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;
