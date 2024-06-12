// routes/payment.routes.js

const express = require("express");
const paymentRouter = express.Router();
const {
  createPayment,
  getAllPayment,
  getSpecificPayment,
} = require("../../controller/User/payment.controller");

paymentRouter.post("/payments", createPayment);

paymentRouter.get("/getAllPatment", getAllPayment);

paymentRouter.get("/getSpecific/:id", getSpecificPayment);

module.exports = paymentRouter;
