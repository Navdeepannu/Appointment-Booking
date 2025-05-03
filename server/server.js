import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.js";
import path from "path";

import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(
  cors({
    origin: [
      "https://appointment-booking-li4k.vercel.app",
      "https://appointment-booking-app-ashy.vercel.app",
    ],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();
connectCloudinary();

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor/", doctorRouter);
app.use("/api/user", userRouter); // Use user routes

app.use("/uploads", express.static(path.join("server/public/uploads")));

// Health check route
app.get("/", (req, res) => {
  res.send("Server is working");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(` Server is listening at http://localhost:${PORT}`);
});
