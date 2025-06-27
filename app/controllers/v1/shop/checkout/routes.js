const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();
const {createUserAddressDetails, getUserAddressDetails} = require("./checkout");



router.post("/",upload.none(),createUserAddressDetails);
router.get("/",getUserAddressDetails);

module.exports = router;