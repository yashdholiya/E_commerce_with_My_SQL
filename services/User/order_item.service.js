module.exports = class OrderItemService {
  // GET ALL ORDER ITEM
  async getAllOrderItem() {
    const sql = `SELECT * FROM order_items;`;
    try {
      const [rows] = await db.query(sql);
      return rows;
    } catch (error) {
      console.error("Error fetching order items:", error);
      throw new Error("Failed to fetch order items: " + error.message);
    }
  }
};
