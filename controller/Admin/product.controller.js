const productService = require("../../services/Admin/product.service");
const ProductService = new productService();
// ADD PRODUCT
exports.addProduct = async (req, res) => {
  const { name, description, price, ref_categorie_id } = req.body;
  const productImage = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const product = await ProductService.addProduct(
      name,
      productImage,
      price,
      description,
      ref_categorie_id
    );
    console.log(product);
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET SPECIFIC PRODUCT BY ADMIN
exports.getProductByAdminId = async (req, res) => {
  const adminId = req.params.adminId;
  console.log("Admin ID:", adminId);

  try {
    const products = await ProductService.getProductByAdminId(adminId);
    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found for this admin" });
    }
    res.json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// GET ALL PRODUCT
exports.getAllProduct = async (req, res) => {
  try {
    const product = await ProductService.getAllProduct();
    res.status(200).json(product);
  } catch {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PRODCUT
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { ref_categorie_id, name, description, price } = req.body;
  const productImage = req.file ? `/uploads/${req.file.filename}` : null;
  const productData = {
    ref_categorie_id,
    name,
    productImage,
    description,
    price,
  };
  try {
    const result = await ProductService.updateProduct(productId, productData);
    if (result) {
      res.json({ message: "product updated successfully" });
    } else {
      res.status(404).send("product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// DELETE PRODUCT WITH ID 
exports.deleteProductWithId = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await ProductService.deleteProduct(id);
    if (result) {
      res.json({ message: "product updated successfully" });
    } else {
      res.status(404).send("product not found");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
