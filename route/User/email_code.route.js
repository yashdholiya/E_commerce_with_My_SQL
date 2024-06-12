const express = require("express");
const emailCodeRoute = express.Router();
const { createCode } = require("../../controller/User/email_code.controller");
const verifyToken = require("../../helpers/usertoken");

emailCodeRoute.post("/add", verifyToken, createCode);

module.exports = emailCodeRoute;
