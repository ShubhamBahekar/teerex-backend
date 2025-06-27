const express = require("express");
const multer = require("multer");
const router = express.Router();


const upload = multer();

const {handleCreateNewUser,handleLoginUser} = require("./user")


router.post("/register",upload.none(),handleCreateNewUser);
router.post("/login",upload.none(),handleLoginUser);

module.exports = router;