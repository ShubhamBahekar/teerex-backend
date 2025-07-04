const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { SECRET_ACCESS_TOKEN, JWT_TIMEOUT_DURATION } = require("../../../configuration/config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    max: 20,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    max: 20,
    require: true,
  },
  confirmPassword: {
    type: String,
    max: 20,
    require: true,
  },
});

userSchema.methods.generateAccessJWT = function () {
  let payload = { userId: this._id };

  return jwt.sign(payload, SECRET_ACCESS_TOKEN, { expiresIn: JWT_TIMEOUT_DURATION });
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
