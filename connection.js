const mongoose = require("mongoose");

const connectMongoDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" Connection error:", err.message);
  }
};

module.exports = connectMongoDb;
