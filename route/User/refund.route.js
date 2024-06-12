const express = require("express");
const refundRoute = express.Router();
const {
  deleteOrder,
  getAllRefuds,
  getRefundDetails,
} = require("../../controller/User/refund.controller");

refundRoute.delete("/orders/:orderId", deleteOrder);

refundRoute.get("/getAllRefund", getAllRefuds);

refundRoute.get("/getSpecific/:refundId", getRefundDetails);

module.exports = refundRoute;
