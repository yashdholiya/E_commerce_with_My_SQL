const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "yash";

module.exports = class UserService {
  // REGISTER USER
  async registerUser(userdata) {
    const hashedPassword = await bcrypt.hash(userdata.password, 10);

    const sql =
      "INSERT INTO users (id, name, profileImage, email, password, mobileno) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      userdata.id,
      userdata.name,
      userdata.profileImage,
      userdata.email,
      hashedPassword,
      userdata.mobileno,
    ];
    try {
      const [result] = await global.db.query(sql, values);
      console.log(result);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // LOGIN USER
  async getUserByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    try {
      const [result] = await db.query(sql, [email]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error("Error in getUserByEmail:", error);
      throw error;
    }
  }

  // UPDATE USER
  async updateUser(userId, userData) {
    const fields = [];
    const values = [];

    if (userData.name) {
      fields.push("name = ?");
      values.push(userData.name);
    }

    if (userData.profileImage) {
      fields.push("profileImage = ?");
      values.push(userData.profileImage);
    }

    if (userData.mobileno) {
      const mobileno = parseInt(userData.mobileno);
      if (isNaN(mobileno)) {
        console.log("Mobile number:", mobileno);
        throw new Error("Mobile number must be an integer");
      }
      fields.push("mobileno = ?");
      console.log("Mobile number:", mobileno);
      values.push(mobileno);
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(userId);
    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

    try {
      await db.query(sql, values);
      return { success: true, message: "User updated successfully" };
    } catch (error) {
      throw new Error("Failed to update user: " + error.message);
    }
  }

  // UPDATE PASSWORD
  async updatePassword(userId, oldPassword, newPassword, confirmPassword) {
    if (newPassword !== confirmPassword) {
      throw new Error("New password and confirmation password do not match");
    }

    const sql = "SELECT * FROM users WHERE id = ?";
    try {
      const [rows] = await db.query(sql, [userId]);
      if (rows.length === 0) {
        throw new Error("User not found");
      }

      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new Error("Old password is incorrect");
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      const updateSql = "UPDATE users SET password = ? WHERE id = ?";
      await db.query(updateSql, [hashedNewPassword, userId]);

      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      throw new Error("Failed to update password: " + error.message);
    }
  }

  //GET USER BY TOKEN
  async getUserById(userId) {
    const sql = "SELECT * FROM users WHERE id = ?";
    try {
      const [rows] = await db.query(sql, [userId]);
      if (rows.length === 0) {
        throw new Error("User not found");
      }
      return rows[0];
    } catch (error) {
      throw new Error("Failed to get user: " + error.message);
    }
  }
};
