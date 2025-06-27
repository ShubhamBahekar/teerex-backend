const {Router} = require("express");
const router = Router();
const user = require("./user/routes");
const otp = require("./otp/routes");


router.use("/user",user);
router.use("/otp",otp);

module.exports = router;