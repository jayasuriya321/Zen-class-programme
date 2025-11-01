import mongoose from "mongoose";

const codekataSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  total_problems_solved: Number,
});

export default mongoose.model("Codekata", codekataSchema);
