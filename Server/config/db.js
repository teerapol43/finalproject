const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to the database...");
    await mongoose.connect("mongodb://127.0.0.1:27017/elect", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

module.exports = connectDB;
