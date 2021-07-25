import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  courseid: Number,
  course: Array,
});
export default mongoose.model("Course", courseSchema);
