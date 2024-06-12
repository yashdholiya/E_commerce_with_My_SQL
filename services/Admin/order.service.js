module.exports = class orderServices {

  // GTE ALL SUCCESS ORDER
  async getSucessOrder() {
    const sql = `SELECT * FROM orders WHERE status  = "success"`;
    try {
      const [result] = await db.query(sql);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // GET ALL CANCEL ORDER
  async getDeleteOrder() {
    const sql = `SELECT * FROM orders WHERE status = "cancelled"`;
    try {
      const [result] = await db.query(sql);
      const deleteOrderCount = result.length;
      return { orders: result, deleteOrderCount: deleteOrderCount };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to get delete orders: " + err.message);
    }
  }

  // GET ALL PENDING ORDER
  async getPendingOrder() {
    const sql = `SELECT * FROM orders WHERE status = "pending"`;
    try {
      const [result] = await db.query(sql);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};
