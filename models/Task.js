import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  task_name: String,
  due_date: Date,
  submitted: { type: Boolean, default: false },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Task", taskSchema);
