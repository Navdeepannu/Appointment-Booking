import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, reuqired: true },
    cancelled: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);

export default AppointmentModel;
