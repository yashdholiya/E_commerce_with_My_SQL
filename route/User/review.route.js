const express = require("express");
const reviewRoute = express.Router();
const {
  createReview,
  getReciewWithUser,
  deleteReview,
} = require("../../controller/User/review.controller");
const verifyToken = require("../../helpers/usertoken");

reviewRoute.post("/add", createReview);

reviewRoute.get("/get-specific", verifyToken, getReciewWithUser);

reviewRoute.delete("/delete", deleteReview);

module.exports = reviewRoute;
