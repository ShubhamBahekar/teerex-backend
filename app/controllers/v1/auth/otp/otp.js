const argon2 = require("argon2");
const nodemailer = require("nodemailer");
const handleAsync = require("../../../../utilities/handleAsync");
const MESSAGES = require("../../../../helpers/messages");
const UserInstance = require("../../../../models/auth/repository/userRepository");
const OTPInstance = require("../../../../models/auth/repository/otpRepository")
require("dotenv").config();
const HOST_PASSWORD = process.env.HOST_PASSWORD;

const sendEmail = handleAsync(async (req, res) => {
  const { email } = req.body;

  let user = await UserInstance.findOneDoc({ email });
  const otpCode = Math.floor(1000 + Math.random() * 9000);

  let otpData = await OTPInstance.findOneDoc({ email });

  let currentTime = Date.now();

  if (!otpData) {
      await OTPInstance.createDoc({
      email: email,
      otp: otpCode,
      expiredIn: currentTime + 200 * 1000,
    });
  }

  await OTPInstance.findAndUpdateDoc(
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
      pass: HOST_PASSWORD,
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

  let otpDetails = await OTPInstance.findOneDoc({ email });

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
  const { email,confirmPassword } = req.body;

  let data = await OTPInstance.findOneDoc({ email });

  if (!data) {
    return res.notFound(MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("OTP"));
  }

  let currentTime = Date.now();
  let diff = data.expiredIn - currentTime;

  if (diff < 0) {
    return res.badRequest(MESSAGES.apiErrorStrings.DATA_IS_EXPIRED("OTP"));
  }

  let user = await UserInstance.findOneDoc({ email });
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

  let otpData = await OTPInstance.findOneDoc({ email });

  let currentTime = Date.now();

  if (!otpData) {
    return res.notFound(MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("OTP"));
  }

  const isExpired = currentTime > otpData.expiredIn;

  if (!isExpired) {
    return res.success({ expired: isExpired });
  }

  await OTPInstance.findAndUpdateDoc(
    { email },
    { otp: otpCode, expiredIn: currentTime + 2 * 60 * 1000 },
    { new: true }
  );

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "shubhambahekar02@gmail.com",
      pass: HOST_PASSWORD ,
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
