const express = require("express");
const orderItemRoute = express.Router();
const verifyToken = require("../../helpers/usertoken");
const {
  getallOrderItems,
  createOrder,
} = require("../../controller/User/order_item.controller");

orderItemRoute.get("/getall", getallOrderItems);

module.exports = orderItemRoute;
