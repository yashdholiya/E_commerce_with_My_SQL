const refundServices = require("../../services/User/refund.service");
const refundServic = new refundServices();
// DELETE ORDER AND ADD REFUND
exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  const { refund_charge ,reason } = req.body;
  try {
    const response = await refundServic.deleteOrder(
      orderId,
      parseFloat(refund_charge ),
      reason
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// FER ALL REFUND 
exports.getAllRefuds = async (req, res) => {
  try {
    const response = await refundServic.getAllRefund();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error getting all refunds:", error);
    res.status(500);
  }
};

// GET SPECIIIFIC REFUND
exports.getRefundDetails = async (req, res) => {
  const { refundId } = req.params;
  try {
    const refundDetails = await refundServic.getRefundDetails(refundId);
    res.status(200).json(refundDetails);
  } catch (error) {
    console.error("Error getting refund details:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};