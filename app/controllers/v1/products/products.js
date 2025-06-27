const MESSAGES = require("../../../helpers/messages");
const Product = require("../../../models/product");
const handleAsync = require("../../../utilities/handleAsync");
const handleGetAllProducts = async (req, res) => {
  const dbProducts = await Product.find({});
  res.json(dbProducts);
};

const handleGetProductById = handleAsync(async (req, res) => {
  
  const productData = await Product.findById(req.params.id);

  if(!productData)
  {
    return res.notFound(MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("Product"));
  }

  return res.success(productData);
});

const handleDeleteProductById = handleAsync(async (req, res) => {
  const productData = await Product.findByIdAndDelete(req.params.id);
   if(!productData)
  {
    return res.notFound(MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("Product"));
  }
  return res.success(productData);
});

const handleUpdateProductById = handleAsync(async (req, res) => {
  const productData = await Product.findByIdAndUpdate(req.params.id, {
    price: "Changed",
  });
  if(!productData)
  {
    return res.notFound(MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("Product"));
  }
  return res.success(productData);
});

const handleCreateNewProduct = handleAsync(async (req, res) => {
  const body = req.body;
  const imagePath = req.file ? req.file.filename : null; 

  if (
    !body ||
    !body.name ||
    !body.price ||
    !body.color ||
    !body.gender ||
    !body.category
  ) {
    return res.badRequest("All fields required...");
  }

    const result = await Product.create({
      name: body.name,
      price: body.price,
      image: imagePath,
      color: body.color,
      gender: body.gender,
      category: body.category,
      quantity: body.quantity,
    });

  return res.success({id:result._id})
});

module.exports = {
  handleGetAllProducts,
  handleGetProductById,
  handleDeleteProductById,
  handleUpdateProductById,
  handleCreateNewProduct,
};
