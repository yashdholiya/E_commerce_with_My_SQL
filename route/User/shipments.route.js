const express = require("express");
const shipmentRoute = express.Router();
const {
  createShipment,
  getShipmentDetails,
} = require("../../controller/User/shipments.controller");

shipmentRoute.post("/shipments", createShipment);

shipmentRoute.get("/shipments/:shipmentId", getShipmentDetails);

module.exports = shipmentRoute;
