import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  topic_name: String,
  topic_date: Date,
});

export default mongoose.model("Topic", topicSchema);
