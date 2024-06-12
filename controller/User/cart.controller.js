const cartServices = require("../../services/User/cart.service");
const cartservice = new cartServices();
// ADD TO CART
exports.addToCart = async (req, res) => {
  const userId = req.userId;
  const { product_id, quantity } = req.body;

  try {
    const result = await cartservice.addToCart(userId, product_id, quantity);
    console.log(result);
    res.json({
      success: true,
      message: "Product added to cart successfully",
      cart: result,
    });
  } catch (error) {
    if (error.message === "Insufficient stock for the product") {
      res.status(400).json({ success: false, message: error.message });
    } else {
      console.error("Error adding product to cart:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};

// GET ALL CART
exports.getAllCartItems = async (req, res) => {
  try {
    const cartItems = await cartservice.getAllCartItems();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SPECIFIC CART USING USER TOKAN
exports.getCartItem = async (req, res) => {
  const userId = req.userId;

  try {
    const cartItem = await cartservice.getCartItem(userId);
    res.json({ success: true, cartItem });
  } catch (error) {
    console.error("Error fetching cart :", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// UPDATE CART 
exports.updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const result = await cartservice.updateCartItem(id, quantity);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
