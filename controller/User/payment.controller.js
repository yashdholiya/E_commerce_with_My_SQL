const paymentServices = require("../../services/User/payment.service");
const paymentService = new paymentServices();
// ADD PAYMENY
exports.createPayment = async (req, res) => {
  const { orderId, amount, paymentMethod, transactionId } = req.body;

  const txnId = paymentMethod === "Cash On Delivery" ? "COD" : transactionId;

  try {
    const response = await paymentService.createPayment(
      orderId,
      parseFloat(amount),
      paymentMethod,
      txnId
    );
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET ALL PAYMENT
exports.getAllPayment = async (req, res) => {
  try {
    const result = await paymentService.getAllPayment();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting all payments:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET SPECIFC PAYMENT
exports.getSpecificPayment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await paymentService.getSpecificPayment(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting specific payment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
