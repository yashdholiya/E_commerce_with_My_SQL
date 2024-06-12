const productuService = require("../../services/User/product.service");
const productuServic = new productuService();
// GET ALL PRODUCT
exports.getAllProduct = async (req, res) => {
  try {
    const products = await productuServic.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

  // GET SPECIFIC PRODUCT
  exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  console.log(req.params.id);

  try {
    const product = await productuServic.getuProductById(productId);
    if (!product) {
      return res.status(404).send("product  not found");
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


// GET ALL CATEGORIES
exports.getAllCategories = async (req, res) => {  
  try {
    const categories = await productuServic.getAllCategories();
    if (categories.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No categories found" });
    }
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ALL  CATEGORY WITH ID
exports.getCategoryWithProducts = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const response = await productuServic.getCategoryWithProducts(categoryId);

    res.status(response.status).json({
      success: response.status === 200,
      message: response.message,
      data: response.data
    });
  } catch (error) {
    console.error("Error retrieving category and products:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};