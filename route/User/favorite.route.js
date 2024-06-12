const express = require("express");
const favoriteRoute = express.Router();
const favoriteController = require("../../controller/User/favorite.controller");
const {
  addFavorite,
  getFavorites,
  updateFavorite,
} = require("../../controller/User/favorite.controller");
const verifyToken = require("../../helpers/usertoken");

favoriteRoute.post("/favorites", verifyToken, addFavorite);

favoriteRoute.get("/favorites", verifyToken, getFavorites);

favoriteRoute.get("/favorites/all", favoriteController.getAllFavorites);

favoriteRoute.put("/favorites", updateFavorite);

favoriteRoute.delete("/delete/:id",favoriteController.deleteFavorite)

module.exports = favoriteRoute;
