const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB = process.env.CONNECTION_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Db open");
});


module.exports=db;