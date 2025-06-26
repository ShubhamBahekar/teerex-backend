const express = require("express");
const multer = require("multer");
const userRouter = express.Router();
const Verify = require("../middlewares/verify")

const upload = multer();
const {handleCreateNewUser,handleLoginUser} = require("../controllers/userController")
const {sendEmail,verifyOTP , resetPassword, resendOTP} = require("../controllers/otpController");


userRouter.post("/register",upload.none(),handleCreateNewUser);
userRouter.post("/login",upload.none(),handleLoginUser);
userRouter.post("/send-email",upload.none(),sendEmail);
userRouter.post("/verify-otp",upload.none(), verifyOTP);
userRouter.post("/reset-password",upload.none(), resetPassword);
userRouter.post("/resend-otp",upload.none(), resendOTP);

module.exports = userRouter;