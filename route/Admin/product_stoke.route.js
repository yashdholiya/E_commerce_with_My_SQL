const express = require("express");
const productStokRoute = express.Router();
const {
  AddProductStoke,
  updateStock,
  getAllProductStock,
} = require("../../controller/Admin/product_stoke.controller");

productStokRoute.post("/add", AddProductStoke);

productStokRoute.put("/update/:id", updateStock);

productStokRoute.get("/getAll", getAllProductStock);

module.exports = productStokRoute;
