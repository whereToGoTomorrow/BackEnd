import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  addr1: String,
  areacode: Number,
  cat1: String,
  cat2: String,
  cat3: String,
  contentid: Number,
  contenttypeid: Number,
  createdtime: Number,
  firstimage: String,
  firstimage2: String,
  mapx: String,
  mapy: String,
  mlevel: Number,
  modifiedtime: String,
  readcount: String,
  sigungucode: Number,
  title: String,
  overview: String,
});
export default mongoose.model("DataList", listSchema);
