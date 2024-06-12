const express = require("express");
const orderaRoute = express.Router();
const { getAllOrder } = require("../../controller/User/order.controller");
const {
  getSucessOrder,
  getDeleteOrder,
  getPendingOrder,
} = require("../../controller/Admin/order.controller");

orderaRoute.get("/getAllorder", getAllOrder);

orderaRoute.get("/sucessOrder", getSucessOrder);

orderaRoute.get("/deleteOrder", getDeleteOrder);

orderaRoute.get("/pendingOrder", getPendingOrder);

module.exports = orderaRoute;
