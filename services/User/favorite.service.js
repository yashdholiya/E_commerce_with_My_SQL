module.exports = class favoroteServices {
  // ADD FAVORITE USING USER IS AND PRODUCT ID
  async addFavorite(userId, productId) {
    const sql = "INSERT INTO favorite (user_id, product_id ) VALUES (?, ?)";
    try {
      const result = db.query(sql, [userId, productId]);
      return {
        user_id: userId,
        productid: productId,
      };
    } catch (error) {
      console.error(err);
      throw err;
    }
  }

  // GET SPECIFIC FAVORITE USING USER TOKAN
  async getFavoritesByUserId(userId) {
    const sql = "SELECT * FROM favorite WHERE user_id = ?";
    try {
      const [result] = await db.query(sql, [userId]);
      console.log(result);
      return result;
    } catch {
      console.error("Error getting favorites:", error);
      throw new Error("Failed to get favorites: " + error.message);
    }
  }

  // GET ALL FAVOTITE
  async getAllFavorites() {
    const sql = "SELECT * FROM Favorite";

    try {
      const [rows] = await db.query(sql);
      console.log(rows);
      return rows;
    } catch (error) {
      console.error("Error getting all favorites:", error);
      throw new Error("Failed to get all favorites: " + error.message);
    }
  }

  // UPDATE FAVORITE
  async updateFavorite(favoriteId, userId, productId) {
    const sql = "UPDATE Favorite SET user_id = ?, product_id = ? WHERE id = ?";

    try {
      await db.query(sql, [userId, productId, favoriteId]);
      return { success: true, message: "Favorite item updated successfully" };
    } catch (error) {
      console.error("Error updating favorite item:", error);
      throw new Error("Failed to update favorite item: " + error.message);
    }
  }

  // DELETE FAVORITE
  async deleteFavorite(id) {
    const sql = "DELETE FROM Favorite WHERE id = ?";
    try {
      await db.query(sql, [id]);
      return { success: true, message: "Favorite item deleted successfully" };
    } catch (error) {
      console.error("Error deleting favorite item:", error);
      throw new Error("Failed to delete favorite item: " + error.message);
    }
  }
};
