import mongoose from "mongoose";

const areaCodeSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

  code: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },

  rnum: {
    type: Number,
    require: true,
  },
});
export default mongoose.model("AreaCode", areaCodeSchema);
