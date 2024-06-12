module.exports = class productStokeServices {
  // ADD PRODUCT STOCK
  async AddProductStoke(product_id, p_stoke) {
    try {
      const sql =
        "INSERT INTO product_stock (product_id , p_stoke ) VALUES (?, ?)";
      const result = await db.query(sql, [product_id, p_stoke]);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // UPDATE STOCK
  async updateStock(id, p_stock, product_id) {
    let sql = "UPDATE product_stock SET";
    const params = [];
    const updates = [];

    if (p_stock !== undefined) {
      updates.push("p_stock = ?");
      params.push(p_stock);
    }
    if (product_id !== undefined) {
      updates.push("product_id = ?");
      params.push(product_id);
    }

    if (updates.length === 0) {
      throw new Error("No fields to update");
    }

    sql += " " + updates.join(", ");
    sql += " WHERE id = ?";
    params.push(id);

    try {
      const [result] = await db.query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating stock:", error);
      throw error;
    }
  }

  // GET ALL PRODUCT STOCK
  async getAllProductStock() {
    try {
      const sql = "SELECT * FROM product_stock";
      const [result] = await db.query(sql);
      return result;
    } catch {
      console.log(error);
      return null;
    }
  }
};
