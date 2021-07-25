const mongoose = require("mongoose");

// mongodb://test:test@localhost:27017/W6_Homework?authSource=admin

// mongodb://localhost:27017/W6_Homework

mongoose.connect("mongodb://localhost:27017/init", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("DB is working"));
