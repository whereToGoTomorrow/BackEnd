require("dotenv").config();
const mongoose = require("mongoose");
const qwe = process.env.MONGOURL;
console.log(qwe);
mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("DB is working"));
