const express = require("express");
const cartRoute = express.Router();
const {
  addToCart,
  getCartItem,
  getAllCartItems,
  updateCartItem,
} = require("../../controller/User/cart.controller");
const verifyToken = require("../../helpers/usertoken");

cartRoute.post("/cart", verifyToken, addToCart);

cartRoute.get("/cart/all", getAllCartItems);

cartRoute.get("/cart", verifyToken, getCartItem);

cartRoute.put("/cart/:id", updateCartItem);

module.exports = cartRoute;
