const orderServices = require("../../services/User/order.service");
const orderServic = new orderServices();
// GET SPECCIFIC ORDER
exports.getSpecificOrder = async (req, res) => {
  const userId = req.userId;
  try {
    console.log("user id", userId);
    const result = await orderServic.getSpecificOrder(userId);
    res.json({ success: true, result });
  } catch (error) {
    console.error("Error fetching order  :", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET ALL ORDER
exports.getAllOrder = async (req, res) => {
  try {
    const result = await orderServic.getAllOrder();
    res.json({ success: true, result });
  } catch {
    console.error("Error fetching all orders  :", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const userId = req.userId; // Extract user ID from token

    const discount = req.body.discount || 0;
    const delevery_charge = req.body.delevery_charge || 0;
    const couponName = req.body.couponName || 0;

    const order = await orderServic.createOrder(userId, discount ,delevery_charge, couponName);
    res
      .status(201)
      .json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    if (error.message === "Cart is empty") {
      return res
        .status(400)
        .json({ success: false, error: "User's cart is empty" });
    }
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
