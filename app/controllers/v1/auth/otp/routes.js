const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();

const {sendEmail,verifyOTP , resetPassword, resendOTP} = require("./otp");

router.post("/send-email",upload.none(),sendEmail);
router.post("/verify-otp",upload.none(), verifyOTP);
router.post("/reset-password",upload.none(), resetPassword);
router.post("/resend-otp",upload.none(), resendOTP);

module.exports = router;