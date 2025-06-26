const otpModel = require("../models/otp");
const userModel = require("../models/auth/userModel");
const argon2 = require("argon2");
const nodemailer = require("nodemailer");
const handleAsync = require("../utilities/handleAsync");
const MESSAGES = require("../helpers/messages");

const sendEmail = handleAsync(async (req, res) => {
  const { email } = req.body;

  let user = await userModel.findOne({ email });
  const otpCode = Math.floor(1000 + Math.random() * 9000);

  let otpData = await otpModel.findOne({ email });

  let currentTime = Date.now();

  if (!otpData) {
    let createOtp = new otpModel({
      email: email,
      otp: otpCode,
      expiredIn: currentTime + 200 * 1000,
    });
    await createOtp.save();
  }

  await otpModel.findOneAndUpdate(
    { email },
    { otp: otpCode, expiredIn: currentTime + 2 * 60 * 1000 },
    { new: true }
  );

  console.log("OTPCode", otpCode);

  if (!user) {
    return res.notFound(MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("UserId"));
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "shubhambahekar02@gmail.com",
      pass: "azkl kffy vnso ipln",
    },
  });
  const mailOptions = {
    from: "shubhambahekar02@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otpCode}.It will expire in 2 minutes`,
  };

  await transporter.sendMail(mailOptions);
  return res.success(MESSAGES.apiSuccessStrings.SEND("OTP"));
});

const verifyOTP = handleAsync(async (req, res) => {
  const { email, otp } = req.body;

  let otpDetails = await otpModel.findOne({ email });

  if (!otpDetails) {
    return res.notFound(MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("OTP"));
  }

  let currentTime = Date.now();
  let diff = otpDetails.expiredIn - currentTime;

  if (diff < 0) {
    return res.badRequest(MESSAGES.apiErrorStrings.DATA_IS_EXPIRED("OTP"));
  }

  if (otp != otpDetails.otp) {
    return res.notFound(MESSAGES.apiErrorStrings.DATA_IS_INCORRECT("OTP"));
  }

  return res.success(MESSAGES.apiSuccessStrings.VERIFIED("OTP"));
});

const resetPassword = handleAsync(async (req, res) => {
  const { email, OTP, password, confirmPassword } = req.body;

  let data = await otpModel.findOne({ email });

  if (!data) {
    return res.notFound(MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("OTP"));
  }

  let currentTime = Date.now();
  let diff = data.expiredIn - currentTime;

  if (diff < 0) {
    return res.badRequest(MESSAGES.apiErrorStrings.DATA_IS_EXPIRED("OTP"));
  }

  let user = await userModel.findOne({ email });
  if (!user) {
    return res.notFound(MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("User"));
  }

  const hashedPassword = await argon2.hash(confirmPassword);
  user.password = hashedPassword;
  await user.save();

  return res.success(MESSAGES.apiSuccessStrings.UPDATE("Password"));
});

const resendOTP = handleAsync(async (req, res) => {
  const { email } = req.body;

  const otpCode = Math.floor(1000 + Math.random() * 9000);

  let otpData = await otpModel.findOne({ email });

  let currentTime = Date.now();

  if (!otpData) {
    return res.notFound(MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("OTP"));
  }

  const isExpired = currentTime > otpData.expiredIn;

  if (!isExpired) {
    return res.success({ expired: isExpired });
  }

  await otpModel.findOneAndUpdate(
    { email },
    { otp: otpCode, expiredIn: currentTime + 2 * 60 * 1000 },
    { new: true }
  );

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "shubhambahekar02@gmail.com",
      pass: "azkl kffy vnso ipln",
    },
  });
  const mailOptions = {
    from: "shubhambahekar02@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otpCode}.It will expire in 2 minutes`,
  };

  await transporter.sendMail(mailOptions);
  return res.success(MESSAGES.apiSuccessStrings.SEND("OTP"));
});

module.exports = { sendEmail, verifyOTP, resetPassword, resendOTP };
