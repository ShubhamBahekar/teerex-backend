const express = require("express");
const { upload } = require("../middlewares/uploadConfig");
const cartRouter = express.Router();
const {
  handleGetAllCartProducts,
  handleCreateNewCartProduct,
  handleDeleteCartProduct,
  handleUpdateCartProduct
} = require("../controllers/cartController");

cartRouter.get("/:userId", handleGetAllCartProducts);
cartRouter.post("/", upload, handleCreateNewCartProduct);
cartRouter.delete("/:id", handleDeleteCartProduct);

module.exports = cartRouter;
