const productStokeServices = require("../../services/Admin/product_stoke.service");
const productStokeService = new productStokeServices();
// ADD PRODUCT STOCK
exports.AddProductStoke = async (req, res) => {
  const { product_id, p_stoke } = req.body;
  try {
    const result = await productStokeService.AddProductStoke(
      product_id,
      p_stoke
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE STOCK
exports.updateStock = async (req, res) => {
  const { id } = req.params;
  const { p_stock, product_id } = req.body;

  try {
    const success = await productStokeService.updateStock(
      id,
      p_stock,
      product_id
    );
    if (success) {
      res.status(200).json({
        success: true,
        message: "Product stock updated successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product stock not found or no changes made",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// GET ALL STOCK
exports.getAllProductStock = async (req, res) => {
  try {
    const result = await productStokeService.getAllProductStock();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
