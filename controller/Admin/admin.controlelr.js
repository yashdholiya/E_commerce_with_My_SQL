const AdminService = require("../../services/Admin/admin.service");
const adminService = new AdminService();
const bcrypt = require("bcrypt");
const secretKey = "yash";
const jwt = require("jsonwebtoken");
// REGISTER ADMIN
exports.registerAdmin = async (req, res) => {
  const { id, name, email, password, mobileno } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

  const adminData = { id, name, profileImage, email, password, mobileno };

  try {
    const result = await adminService.registerAdmin(adminData);
    res.json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
// UPDATE ADMIN
exports.updateAdmin = async (req, res) => {
  const adminId = req.adminId;
  const { name, mobileno } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

  console.log("Update request received:", { name, profileImage, mobileno });

  try {
    const result = await adminService.updateAdmin(adminId, {
      name,
      profileImage,
      mobileno,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN ADMIN
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminService.loginAdmin(email);

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log("hello mota bhai ..!", password , admin.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: admin.id, email: admin.email },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ success: true, message: "admin logged in successfully", token });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
  const adminId = req.adminId; // Extracted from token
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    const result = await adminService.updatePassword(
      adminId,
      oldPassword,
      newPassword,
      confirmPassword
    );
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update password: " + error.message });
  }
};
// GET SPECIFIC ADMIN
exports.getAdminProfile = async (req, res) => {
  const adminId = req.adminId;
  console.log("Print adminId", adminId);
  try {
    const admin = await adminService.getAdminById(adminId);
    // if (!admin) {
    //   return res.status(404).json({ message: "Admin not found" });
    // }
    res.json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
