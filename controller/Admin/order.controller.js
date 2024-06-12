const orderServices = require("../../services/Admin/order.service");
const orderService = new orderServices();
// GET ALL SUCCESS ORDER
exports.getSucessOrder = async (req, res) => {
  try {
    const data = await orderService.getSucessOrder();
    res.json(data);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET ALL CANCEL ORDER
exports.getDeleteOrder = async (req, res) => {
  try {
    const { orders, deleteOrderCount } = await orderService.getDeleteOrder();
    res
      .status(200)
      .json({ deleteOrderCount: deleteOrderCount, orders: orders });
  } catch (error) {
    console.error("Error getting delete orders:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// GET  ALLPENDING ORDER
exports.getPendingOrder = async (req, res) => {
  try {
    const data = await orderService.getPendingOrder();
    res.json(data);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
