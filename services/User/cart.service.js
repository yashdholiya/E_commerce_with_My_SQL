
module.exports = class cartServices {
  // ADD TO CART
  async addToCart(userId, productId, quantity) {
    try {
      const checkStockSql =
        "SELECT p_stock FROM product_stock WHERE product_id = ? AND p_stock >= ?";
      const [productStockResult] = await db.query(checkStockSql, [
        productId,
        quantity,
      ]);

      if (
        productStockResult.length === 0 ||
        productStockResult[0].p_stock < quantity
      ) {
        throw new Error("Insufficient stock for the product");
      }

      const sql =
        "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
      const [result] = await db.query(sql, [userId, productId, quantity]);

      return {
        user_id: userId,
        product_id: productId,
        quantity: quantity,
      };
    } catch (error) {
      throw error; // Rethrow the error
    }
  }

  // GET ALL CART
  async getAllCartItems() {
    const sql = "SELECT * FROM cart";

    try {
      const [rows] = await db.query(sql);
      return rows;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw new Error("Failed to fetch cart items: " + error.message);
    }
  }

  // GET SPECIFIC CART WITH USER TOKEN
  async getCartItem(userId) {
    const sql = "SELECT * FROM cart WHERE user_id = ?";
    try {
      const [result] = await db.query(sql, [userId]);
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error fetching cart item:", error);
      throw new Error("Failed to fetch cart item: " + error.message);
    }
  }

  // UPDATE CART 
  async updateCartItem(id, quantity) {
    let sql = "UPDATE cart SET";
    const params = [];

    if (quantity !== undefined) {
      sql += " quantity = ?";
      params.push(quantity);
    } else {
      throw new Error("Quantity must be provided for update.");
    }

    sql += " WHERE id = ?";
    params.push(id);

    try {
      const [result] = await db.query(sql, params);
      return result;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
};
