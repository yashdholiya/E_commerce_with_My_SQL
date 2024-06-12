const express = require("express");
const AdminRouter = express.Router();
const {
  registerAdmin,
  updateAdmin,
  loginAdmin,
  updatePassword,
  getAdminProfile,
} = require("../../controller/Admin/admin.controlelr");
const { upload } = require("../../helpers/imageUplode");
const verifyToken = require("../../helpers/admintoken");

AdminRouter.post("/register", upload.single("profileImage"), registerAdmin);

AdminRouter.post("/login", loginAdmin);

AdminRouter.get("/profile", verifyToken, getAdminProfile);

AdminRouter.put(
  "/update",
  verifyToken,
  upload.single("profileImage"),
  updateAdmin
);

AdminRouter.post("/update-password", verifyToken, updatePassword);

module.exports = AdminRouter;
