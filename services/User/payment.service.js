module.exports = class paymentServices {
  // ADD PAYMENT
  async createPayment(orderId, amount, paymentMethod, transactionId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const orderSql =
        "SELECT total_price, status FROM orders WHERE order_id = ?";
      const [orderResults] = await connection.query(orderSql, [orderId]);

      if (orderResults.length === 0) {
        throw new Error("Order not found");
      }

      const order = orderResults[0];
      const orderTotalPrice = parseFloat(order.total_price).toFixed(2);
      const paymentAmount = parseFloat(amount).toFixed(2);

      console.log("orderTotalPrice:", orderTotalPrice);
      console.log("paymentAmount:", paymentAmount);

      if (orderTotalPrice !== paymentAmount) {
        throw new Error("Payment amount does not match the order total price");
      }

      const paymentSql = `
            INSERT INTO payments (order_id, amount, payment_method, transaction_id, status) 
            VALUES (?, ?, ?, ?, ?)
        `;
      const [paymentResult] = await connection.query(paymentSql, [
        orderId,
        amount,
        paymentMethod,
        transactionId,
        "success", // Assuming payment is successful for this logic
      ]);

      const updateOrderSql = "UPDATE orders SET status = ? WHERE order_id = ?";
      await connection.query(updateOrderSql, ["success", orderId]);

      // Find related product_id and quantity from order_items table
      const orderItemsSql =
        "SELECT product_id, quantity FROM order_items WHERE order_id = ?";
      const [orderItems] = await connection.query(orderItemsSql, [orderId]);

      // Update product_stock table for each product_id
      for (const item of orderItems) {
        const updateStockSql =
          "UPDATE product_stock SET p_stock = p_stock  - ? WHERE product_id = ?";
        await connection.query(updateStockSql, [
          item.quantity,
          item.product_id,
        ]);
      }

      await connection.commit();

      return {
        status: 201,
        message: "Payment created and order status updated successfully",
        data: {
          payment_id: paymentResult.insertId,
          order_id: orderId,
          amount,
          payment_method: paymentMethod,
          transaction_id: transactionId, // Return transaction ID
          status: "success",
        },
      };
    } catch (err) {
      await connection.rollback();
      console.error("Error creating payment:", err);
      return {
        status: 500,
        error: err.message || "Internal Server Error",
      };
    } finally {
      connection.release();
    }
  }

  // GET ALL PAYMENT
  async getAllPayment() {
    const sql = "SELECT * FROM payments";
    try {
      const [result] = await db.query(sql);
      console.log("All payment :", result);
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  // GET  SPECIFIC PAYMENT
  async getSpecificPayment(id) {
    const sql = "SELECT * FROM payments WHERE payment_id = ?";
    try {
      const [result] = await db.query(sql, [id]);
      console.log("Specific payment:", result);
      return result;
    } catch (error) {
      console.error("Error fetching payment:", error);
      throw error;
    }
  }
};
