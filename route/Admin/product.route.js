const express = require("express");
const productRoute = express.Router();
const { upload } = require("../../helpers/productImage");
const verifyToken = require("../../helpers/admintoken");
const {
  addProduct,
  updateProduct,
  getAllProduct,
  getProductByAdminId,
  deleteProductWithId,
} = require("../../controller/Admin/product.controller");

productRoute.post("/add", upload.single("productImage"), addProduct);

productRoute.get("/:adminId", upload.none(), getProductByAdminId);

productRoute.get("/product/all", upload.none(), getAllProduct);

productRoute.delete("/delete/:id", deleteProductWithId);

productRoute.put("/update/:id", upload.single("productImage"), updateProduct);

module.exports = productRoute;
