const orderItemService = require("../../services/User/order_item.service");
const orderItemServic = new orderItemService();

// GET ALL ORDER ITEM
exports.getallOrderItems = async (req, res) => {
  try {
    const orderItem = await orderItemServic.getAllOrderItem();
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

