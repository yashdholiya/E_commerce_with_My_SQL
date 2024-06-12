const deleveryServices = require("../../services/User/shipments.service");
const deleveryService = new deleveryServices();
// ADD SHIPMENT
exports.createShipment = async (req, res) => {
  const { order_id } = req.body;

  try {
    const result = await deleveryService.createShipment(order_id);

    if (result.status === 201) {
      res.status(201).json(result);
    } else {
      res.status(result.status).json({
        success: false,
        message: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// GET SPECIFIC SHIPMENT USINF SHIPMENT ID
exports.getShipmentDetails = async (req, res) => {
  const { shipmentId } = req.params;

  try {
    const response = await deleveryService.getShipmentDetails(shipmentId);
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error getting shipment details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
