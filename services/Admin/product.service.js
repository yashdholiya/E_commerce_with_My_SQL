module.exports = class productService {
  //  ADD PRODUCT USING VERIFY TOKEN

  async addProduct(name, productImage, price, description, ref_categorie_id) {
    const sql =
      "INSERT INTO products (name, productImage, price, description, ref_categorie_id) VALUES (?, ?, ?, ?, ?)";
    try {
      const result = await db.query(sql, [
        name,
        productImage, // Assuming productImage is the file path
        price,
        description,
        ref_categorie_id,
      ]);
      return {
        id: result.insertId,
        name: name,
        productImage: productImage,
        price: price,
        description: description,
        ref_categorie_id: ref_categorie_id,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
// GET ALL PRODUCT USING ADMIN_ID
async getProductByAdminId(adminId) {
  const sql = "SELECT * FROM products WHERE ref_categorie_id = ?"; // Ensure the column name is correct
  const values = [adminId];
  try {
    const [result] = await db.query(sql, values);

    console.log("All products:", result);
    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

  //GET ALL PRODUCT
  async getAllProduct() {
    const sql = "SELECT * FROM products";
    try {
      const [result] = await db.query(sql);
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // UPDATE PRODUCT  
  async updateProduct(productId, productData) {

    let sql = 'UPDATE products SET';
    const params = [];

    if (productData.ref_categorie_id !== undefined) {
      sql += ' ref_categorie_id = ?,';
      params.push(productData.ref_categorie_id);
    }
    if (productData.name !== undefined) {
      sql += ' name = ?,';
      params.push(productData.name);
    }
    if (productData.productImage !== undefined) {
      sql += ' productImage = ?,';
      params.push(productData.productImage);
    }
    if (productData.description !== undefined) {
      sql += ' description = ?,';
      params.push(productData.description);
    }
    if (productData.price !== undefined) {
      sql += ' price = ?,';
      params.push(productData.price);
    }

    sql = sql.slice(0, -1);
    sql += ' WHERE id = ?';
    params.push(productId);

    try {
      const [result] = await db.query(sql, params);
      return result.affectedRows > 0; 
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

// GET SPECIFIC PRODUCT WITH ID 
  async getProductById(productId) {
    const sql = "SELECT * FROM products WHERE id = ?";
    try {
      const results = await db.query(sql, [productId]);
      console.log(productId);
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  // DELETE PRODCUT
  async deleteProduct(id) {
    const sql = "DELETE FROM products WHERE id = ?";
    try {
      await db.query(sql, [id]);
    } catch (err) {
      throw err;
    }
  }
};
