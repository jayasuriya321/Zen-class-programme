import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  status: { type: String, enum: ["Present", "Absent"] },
});

export default mongoose.model("Attendance", attendanceSchema);
