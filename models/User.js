import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mentor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
  codekata_solved: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);
