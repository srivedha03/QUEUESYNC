import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  slot: { type: String, required: true },
  center: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
