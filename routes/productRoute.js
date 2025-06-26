const express = require("express");
const { upload } = require("../middlewares/uploadConfig");

const router = express.Router();
const {
  handleGetAllProducts,
  handleGetProductById,
  handleDeleteProductById,
  handleUpdateProductById,
  handleCreateNewProduct,
} = require("../controllers/productController");

router
  .route("/")
  .get(handleGetAllProducts)
  .post(upload, handleCreateNewProduct);

router
  .route("/:id")
  .get(handleGetProductById)
  .delete(handleDeleteProductById)
  .patch(handleUpdateProductById);

module.exports = router;
