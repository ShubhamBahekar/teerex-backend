const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    otp: { type: Number, require: true },
    expiredIn: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

const otpModel = mongoose.model("otp", otpSchema);

module.exports = otpModel;
