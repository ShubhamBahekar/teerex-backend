const cartModel = require("../models/cart");
const handleAsync = require("../utilities/handleAsync");
const MESSAGES  = require("../helpers/messages")
const handleGetAllCartProducts = handleAsync(async (req, res) => {
  
  const {userId} = req.params;
  
     const cart = await cartModel.find({userId});
   
    res.success(cart);

});

const handleCreateNewCartProduct = handleAsync(async (req, res) => {
  const userId = req.user._id; 
 
  const {
    key,
    name,
    price,
    image,
    quantity,
    count,
    category,
    color,
  } = req.body;
  const productId = key;
  
    let cart = await cartModel.findOne({ userId });

    const newItem = {
      productId, 
      name,
      price,
      image,
      quantity,
      count,
      category,
      color,
    };

    if (!cart) {
      cart = await cartModel.create({
        userId,
        items: [newItem],
      });
    } else {
     
      let existingItem = cart.items.find(
        (item) => item.productId.toString() === productId.toString()
      );

      if (existingItem) {

        existingItem.count = parseInt(count,10);
      } else {
        
        cart.items.push(newItem);
      }

      await cart.save();
    }

    return res.success(cart);

});




const handleDeleteCartProduct = handleAsync(async (req, res) => {
   const userId = req.user._id;
  const productId = req.params.id;
   const cart = await cartModel.findOne({userId});
   
   cart.items = cart.items.filter((item)=> item.productId.toString() !== productId);
   await cart.save();

   res.success(cart.items);
});


module.exports = {
  handleGetAllCartProducts,
  handleCreateNewCartProduct,
  handleDeleteCartProduct,
};
