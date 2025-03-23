import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: String,
    specialty: String,
    degree: String,
    experience: Number,
    about: String,
    fees: Number,
    address: {
      line1: String,
      line2: String,
    },
  },
  { collection: "doctors" } // 👈 Force the collection name to 'doctors'
);

const Doctor = mongoose.model("Doctor", doctorSchema, "doctors");

export default Doctor;
