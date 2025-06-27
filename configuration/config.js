const env = require("dotenv");
env.config();


module.exports = {
    HOST_EMAIL:process.env.HOST_EMAIL,
    HOST_PASSWORD:process.env.HOST_PASSWORD,
    SECRET_ACCESS_TOKEN:process.env.SECRET_ACCESS_TOKEN,
    URI: process.env.URI,
    PORT: process.env.PORT,
}