const express = require("express");
const deleverRoute = express.Router();

const {
  createOrderDelivery,
} = require("../../controller/Admin/delever.controller");

deleverRoute.post("/create", createOrderDelivery);

module.exports = deleverRoute;
