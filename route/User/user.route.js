const express = require("express");
const router = express.Router();
const { upload } = require("../../helpers/imageUplode");

const verifyToken = require("../../helpers/usertoken");
const {
  getUserProfile,
  updatePassword,
  updateUser,
  registerUser,
  loginUser,
} = require("../../controller/User/user.controller");

router.post("/register", upload.single("profileImage"), registerUser);

router.post("/login", loginUser); 

router.put("/update", verifyToken, upload.single("profileImage"), updateUser);

router.post("/update-password", verifyToken, updatePassword);

router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
