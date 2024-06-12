const deleverServices = require("../../services/Admin/delever.service");
const deleverService = new deleverServices();
// ADD DELEVERY 
exports.createOrderDelivery = async (req, res) => {
  const { shipmentId, code } = req.body;

  try {
    const result = await deleverService.createOrderDelivery(shipmentId, code);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
