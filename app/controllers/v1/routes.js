const {Router} = require("express");
const router = Router();
const auth = require("../v1/auth");
const products = require("./products/routes")
const shopping = require("../v1/shop");
const verify = require("../../middlewares/verify")

router.use("/auth",auth);
router.use("/products",verify,products);
router.use("/shop",verify,shopping);

module.exports  = router ;


