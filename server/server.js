import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import doctorRoutes from "./routes/doctor.js";
import bookingRoutes from "./routes/booking.js"; // Import booking routes
import userRoutes from "./routes/user.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // To handle CORS issues

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/doctors", doctorRoutes); // Use doctor routes
app.use("/api/users", userRoutes); // Use user routes
app.use("/api/bookings", bookingRoutes); // Use booking routes
// Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
