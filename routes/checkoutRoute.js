const express = require("express");
const multer = require("multer");
const upload = multer();
const checkoutPageRouter = express.Router();
const {createUserAddressDetails, getUserAddressDetails} = require("../controllers/checkoutController");



checkoutPageRouter.post("/",upload.none(),createUserAddressDetails);
checkoutPageRouter.get("/",getUserAddressDetails);

module.exports = checkoutPageRouter;