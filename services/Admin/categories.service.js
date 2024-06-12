module.exports = class categoriyServices {
  // ADD CATEGORY
  async addToCategoriy(adminId, name) {
    const sql =
      "INSERT INTO categories (ref_merchant_id , name) VALUES (? ,? )";
    try {
      const result = await db.query(sql, [adminId, name]);
      const insertcategoriy = result.insertId;
      return {
        id: insertcategoriy,
        name: name,
        ref_merchant_id: adminId,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }


  // GET ALL CATEGORY
  async getCategory() {
    const sql = "SELECT * FROM categories";
    try {
      const [result] = await db.query(sql);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // DELETE CATOGERY
  async deleteCategor(id) {
    const sql = "DELETE FROM categories WHERE id = ?";
    try {
      const [result] = await db.query(sql, [id]);
      return result;
    } catch (error) {
      console.error(err);
      throw err;
    }
  }

  // GET SPECIFIC CATEEGORY
  async getSpecificCategory(id) {
    const sql = "SELECT * FROM categories WHERE id = ?";
    try {
      const [result] = await db.query(sql, [id]);
      return result;
    } catch (error) {
      console.error(err);
      throw err;
    }
  }

  // UPDATE CATEGORY
  async updatecategory(id, ref_merchant_id, name) {
    let sql = "UPDATE categories SET";
    const params = [];

    if (ref_merchant_id !== undefined) {
      sql += " ref_merchant_id = ?";
      params.push(ref_merchant_id);
    }

    if (name !== undefined) {
      sql += " name = ?";
      params.push(name);
    }
    sql += " WHERE id = ?";
    params.push(id);
    try {
      const [result] = await db.query(sql, params);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // GET CATEGORY WITH ADMIN TOKEN
  async getAllCatogeryWithMerchantToken(adminId) {
    const sql = "SELECT * FROM categories WHERE ref_merchant_id = ?";
    try {
      const [result] = await db.query(sql, [adminId]);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};
