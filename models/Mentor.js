import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  mentor_name: String,
  mentee_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Mentor", mentorSchema);
