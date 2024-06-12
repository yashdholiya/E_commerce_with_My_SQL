const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "yash";

module.exports = class AdminService {
  // REGISTER ADMIN
  async registerAdmin(adminData) {
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    const sql =
      "INSERT INTO merchants (id, name, profileImage, email, password, mobileno ) VALUES (?, ?, ?, ?,  ? , ?)";
    const values = [
      adminData.id,
      adminData.name,
      adminData.profileImage,
      adminData.email,
      hashedPassword,
      adminData.mobileno,
    ];
    try {
      const [result] = await global.db.query(sql, values);
      console.log(result);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // UPDATE ADMIN
  async updateAdmin(adminId, adminData) {
    const fields = [];
    const values = [];

    if (adminData.name) {
      fields.push("name = ?");
      values.push(adminData.name);
    }

    if (adminData.profileImage) {
      fields.push("profileImage = ?");
      values.push(adminData.profileImage);
    }

    if (adminData.mobileno) {
      const mobileno = parseInt(adminData.mobileno);
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

    values.push(adminId);
    const sql = `UPDATE admins SET ${fields.join(", ")} WHERE id = ?`;

    try {
      await db.query(sql, values);
      return { success: true, message: "User updated successfully" };
    } catch (error) {
      throw new Error("Failed to update user: " + error.message);
    }
  }

  // LOGIN ADMIN
  async loginAdmin(email) {
    const sql = "SELECT * FROM merchants  WHERE email = ?";
    try {
      const [result] = await db.query(sql, [email]);
      console.log("ohh wow ...", result);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error("Error in getAdminByEmail:", error);
      throw error;
    }
  }

  // UPDATE PASSWORD
  async updatePassword(adminId, oldPassword, newPassword, confirmPassword) {
    if (newPassword !== confirmPassword) {
      throw new Error("New password and confirm password do not match");
    }

    const sqlSelect = "SELECT * FROM merchants  WHERE id = ?";
    const [adminResult] = await db.query(sqlSelect, [adminId]);

    if (adminResult.length === 0) {
      throw new Error("Admin not found");
    }

    const admin = adminResult[0];

    const isOldPasswordValid = await bcrypt.compare(
      oldPassword,
      admin.password
    );
    if (!isOldPasswordValid) {
      throw new Error("Old password is incorrect");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const sqlUpdate = "UPDATE merchants  SET password = ? WHERE id = ?";
    await db.query(sqlUpdate, [hashedNewPassword, adminId]);

    return { success: true, message: "Password updated successfully" };
  }

  // GET SPECIFIC ADMIN USING TOKEN
  async getAdminById(adminId) {
    const sql = "SELECT * FROM merchants  WHERE id = ?";
    try {
      const [rows] = await db.query(sql, [adminId]);
      if (rows.length === 0) {
        throw new Error("admin not found");
      }
      return rows[0];
    } catch (error) {
      throw new Error("Failed to get admin: " + error.message);
    }
  }
};
