const express = require("express");
const addressRoute = express.Router();
const {
  addAddress,
  getAddressUsertoken,
  getAllAddress,
  updateAddress,
} = require("../../controller/User/u_address.controller");
const verifyToken = require("../../helpers/usertoken");

addressRoute.post("/add", addAddress);

addressRoute.get("/getSpecific", verifyToken, getAddressUsertoken);

addressRoute.get("/getall", getAllAddress);

addressRoute.put("/update", verifyToken, updateAddress);

module.exports = addressRoute;
