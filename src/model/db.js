require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("DB is working"));
