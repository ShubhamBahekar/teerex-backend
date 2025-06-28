const userModel = require("../models/auth/userModel");
const {SECRET_ACCESS_TOKEN} = require("../../configuration/config")
const jwt = require("jsonwebtoken");
const handleAsync = require("../utilities/handleAsync");
const MESSAGES = require("../helpers/messages")

const Verify = handleAsync(async (req, res, next) => {
    const token = req.headers["authorization"];
    console.log("VVVrfy", token);


    if(!token){
      return res.unauthorized({message:MESSAGES.apiErrorStrings.UNAUTHORIZED("User"),statusCode:401})
    }

    jwt.verify(token, SECRET_ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        return res.unauthorized({message:MESSAGES.apiErrorStrings.EXPIRED("Session")});
      }

      req.userId = await userModel.findById(decoded.userId);
      const user = req.userId;
      
      if (!user) {
        return res.unauthorized({message:MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("User")});
      }

      const { password, ...data } = user._doc;
      req.user = data;
      next();
    });
});

module.exports = Verify;
