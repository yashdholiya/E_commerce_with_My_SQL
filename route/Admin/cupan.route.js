const express = require("express");
const cupanRoute = express.Router();
const {
  createCupan,
  getAllCupan,
  deleteCupan,
} = require("../../controller/Admin/kupan.controller");

cupanRoute.post("/add", createCupan);

cupanRoute.get("/getall", getAllCupan);

cupanRoute.delete("/delete/:id", deleteCupan);

module.exports = cupanRoute;
