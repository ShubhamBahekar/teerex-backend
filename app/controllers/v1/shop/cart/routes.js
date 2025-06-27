const express = require("express");
const { upload } = require("../../../../middlewares/uploadConfig");
const router = express.Router();
const {
  handleGetAllCartProducts,
  handleCreateNewCartProduct,
  handleDeleteCartProduct,
  handleUpdateCartProduct
} = require("./cart");

router.get("/:userId", handleGetAllCartProducts);
router.post("/", upload, handleCreateNewCartProduct);
router.delete("/:id", handleDeleteCartProduct);

module.exports = router;
