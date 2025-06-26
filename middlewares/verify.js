const userModel = require("../models/auth/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;

const Verify = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    console.log("VVVrfy", token);
    //  console.log("token======",token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "User is unauthorized", code: 401 });
    }

    jwt.verify(token, SECRET_ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "This session has expired.Please login" });
      }

      req.userId = await userModel.findById(decoded.userId);
      const user = req.userId;
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const { password, ...data } = user._doc;
      console.log("userDoc", user._doc);
      req.user = data;
      next();
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = Verify;
