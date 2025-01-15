const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  const mongoURI = config.get("mongoURI");

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
