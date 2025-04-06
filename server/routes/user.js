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
// //   Get all users
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// //  Get a single user by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// //  Update a user
// router.put("/:id", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email, password },
//       { new: true }
//     );

//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// //  Delete a user
// router.delete("/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

export default userRouter;
