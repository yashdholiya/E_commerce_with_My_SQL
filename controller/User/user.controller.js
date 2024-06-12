const UserService = require("../../services/User/user.service");
const userService = new UserService();
const bcrypt = require("bcrypt");
const secretKey = "yash";
const jwt = require("jsonwebtoken");
// REGISTER USER
exports.registerUser = async (req, res) => {
  const { id, name, email, password, mobileno } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

  const userdata = { id, name, profileImage, email, password, mobileno };

  try {
    const result = await userService.registerUser(userdata);
    res.json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.json({ success: true, message: "User logged in successfully", token });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const userId = req.userId;
  const { name, mobileno } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

  console.log("Update request received:", { name, profileImage, mobileno });

  try {
    const result = await userService.updateUser(userId, {
      name,
      profileImage,
      mobileno,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
  const userId = req.userId;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message:
        "Old password, new password, and confirmation password are required",
    });
  }

  try {
    const result = await userService.updatePassword(
      userId,
      oldPassword,
      newPassword,
      confirmPassword
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await userService.getUserById(userId);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
