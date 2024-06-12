module.exports = class productUService {
  // GET ALL PRODUCTS
  async getAllProducts() {
    const sql = "SELECT * FROM products";

    try {
      const [rows] = await db.query(sql);
      return rows;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products: " + error.message);
    }
  }

  // GET SPECIFIC PRODUCT
  async getuProductById(productId) {
    const sql = "SELECT * FROM products WHERE id = ?";
    const values = [productId];
    try {
      const [result] = await db.query(sql, values);
      if (result.length === 0) {
        return null;
      }
      console.log(result);
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  // GET ALL CATEGORIES
  async getAllCategories() {
    const sql = "SELECT * FROM categories";
    try {
      const [result] = await db.query(sql);
      console.log("All categories:", result);
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  // GET CATEGORY WITH PRODUCTS
  async getCategoryWithProducts(categoryId) {
    try {
      const sql = `
      SELECT 
        c.name AS category_name,
        p.id AS product_id,
        p.name AS product_name,
        p.price
      FROM 
        categories c
      JOIN 
        products p ON c.id = p.ref_categorie_id
      WHERE 
        c.id = ?
    `;
      const [results] = await db.query(sql, [categoryId]);

      if (results.length === 0) {
        return {
          status: 404,
          message: "Category not found or no products available",
        };
      }

      const categoryName = results[0].category_name;
      const products = results.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        price: item.price,
      }));

      return {
        status: 200,
        message: "Category and products retrieved successfully",
        data: {
          category_name: categoryName,
          products: products,
        },
      };
    } catch (err) {
      console.error("Error retrieving category and products:", err);
      return {
        status: 500,
        error: "Internal Server Error",
      };
    }
  }
};
