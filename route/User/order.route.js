const express = require("express");
const orderRouter = express.Router();
const {
  getSpecificOrder,
  getAllOrder,
  createOrder,
} = require("../../controller/User/order.controller");
const verifyToken = require("../../helpers/usertoken");

orderRouter.get("/getOrder", verifyToken, getSpecificOrder);

orderRouter.get("/getAll", getAllOrder);

orderRouter.post("/addOrder", verifyToken, createOrder);

module.exports = orderRouter;
