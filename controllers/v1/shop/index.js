const {Router}  = require("express");
const router = Router();
const cart = require("./cart/routes");
const checkout = require("./checkout/routes");

router.use("/cart",cart);
router.use("/checkout",checkout);

module.exports = router;