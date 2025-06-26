const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    URI: process.env.URI,
    PORT: process.env.PORT,
    SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN
};