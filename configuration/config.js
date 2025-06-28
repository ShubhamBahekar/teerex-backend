const env = require("dotenv");
env.config();


module.exports = {
    SECRET_ACCESS_TOKEN:process.env.SECRET_ACCESS_TOKEN,
    JWT_TIMEOUT_DURATION:process.env.JWT_TIMEOUT_DURATION,
    URI: process.env.URI,
    PORT: process.env.PORT,
    nodeMailerTransporterOptions: {
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_USER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
}