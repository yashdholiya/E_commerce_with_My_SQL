module.exports = class refundServices {
// DELETE ORDER AND ADD REFUND

  async deleteOrder(orderId, refund_charge, reason) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Fetch order details
      const orderSql =
        "SELECT total_price, status FROM orders WHERE order_id = ?";
      const [orderResults] = await connection.query(orderSql, [orderId]);
      console.log("Order details: ", orderResults);

      if (orderResults.length === 0) {
        throw new Error("Order not found");
      }

      const { total_price, status } = orderResults[0];

      // Check if the order status is 'success'
      if (status !== "success") {
        throw new Error(
          `Order status is not 'success', current status: '${status}'`
        );
      }

      // Calculate refund amount
      const refund_amount = total_price - refund_charge;

      // Insert refund record with pending status
      const insertRefundSql = `
        INSERT INTO refunds (order_id, amount, refund_charge, refund_amount, reason, status)
        VALUES (?, ?, ?, ?, ?, 'pending')
      `;
      const [refundResult] = await connection.query(insertRefundSql, [
        orderId,
        total_price,
        refund_charge,
        refund_amount,
        reason,
      ]);
      const refundId = refundResult.insertId;
      console.log("Refund record inserted: ", refundResult);

      // Update order status to 'cancelled'
      const updateOrderSql =
        "UPDATE orders SET status = 'cancelled' WHERE order_id = ?";
      const [updateOrderResult] = await connection.query(updateOrderSql, [
        orderId,
      ]);
      console.log("Order status updated: ", updateOrderResult);

      // Verify order status update
      const verifyOrderSql = "SELECT status FROM orders WHERE order_id = ?";
      const [verifyOrderResult] = await connection.query(verifyOrderSql, [
        orderId,
      ]);
      console.log("Order status verification: ", verifyOrderResult);

      // Check if the order status was successfully updated
      if (
        verifyOrderResult.length === 0 ||
        verifyOrderResult[0].status !== "cancelled"
      ) {
        throw new Error("Failed to update order status to 'cancelled'");
      }

      // Update refund status to success
      const updateRefundSql =
        "UPDATE refunds SET status = 'success' WHERE refund_id = ?";
      const [updateRefundResult] = await connection.query(updateRefundSql, [
        refundId,
      ]);
      console.log("Refund status updated: ", updateRefundResult);

      // Verify refund status update
      const verifyRefundSql = "SELECT status FROM refunds WHERE refund_id = ?";
      const [verifyRefundResult] = await connection.query(verifyRefundSql, [
        refundId,
      ]);
      console.log("Refund status verification: ", verifyRefundResult);

      // Check if the refund status was successfully updated
      if (
        verifyRefundResult.length === 0 ||
        verifyRefundResult[0].status !== "success"
      ) {
        throw new Error("Failed to update refund status to 'success'");
      }

      // Update payment status to 'refunded'
      const updatePaymentSql =
        "UPDATE payments SET status = 'refund' WHERE order_id = ?";
      const [updatePaymentResult] = await connection.query(updatePaymentSql, [
        orderId,
      ]);
      console.log("Payment status updated: ", updatePaymentResult);

      // Verify payment status update
      const verifyPaymentSql = "SELECT status FROM payments WHERE order_id = ?";
      const [verifyPaymentResult] = await connection.query(verifyPaymentSql, [
        orderId,
      ]);
      console.log("Payment status verification: ", verifyPaymentResult);

      // Check if the payment status was successfully updated
      if (
        verifyPaymentResult.length === 0 ||
        verifyPaymentResult[0].status !== "refund"
      ) {
        throw new Error("Failed to update payment status to 'refunded'");
      }

      // Find related product_id and quantity from order_items table
      const orderItemsSql =
        "SELECT product_id, quantity FROM order_items WHERE order_id = ?";
      const [orderItems] = await connection.query(orderItemsSql, [orderId]);

      // Update product_stock table for each product_id
      for (const item of orderItems) {
        const updateStockSql =
          "UPDATE product_stock SET p_stock = p_stock + ? WHERE product_id = ?";
        await connection.query(updateStockSql, [
          item.quantity,
          item.product_id,
        ]);
      }

      await connection.commit();

      return {
        success: true,
        message:
          "Order status updated to 'cancelled' and refund successfully, payment status updated to 'refund'",
      };
    } catch (error) {
      await connection.rollback();
      throw new Error("Failed to cancel order: " + error.message);
    } finally {
      connection.release();
    }
  }

  // GET ALL REFUND
  async getAllRefund() {
    const sql = "SELECT * FROM refunds";
    try {
      const [rows] = await db.query(sql);
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // GET SPECIFIC REFUND USING REFUND ID
  async getRefundDetails(refundId) {
    try {
      const query = `SELECT * FROM refunds WHERE refund_id = ?`;
      const [rows] = await db.query(query, [refundId]);
      if (rows.length === 0) {
        throw new Error("Refund not found");
      }
      return rows[0];
    } catch (error) {
      throw new Error("Failed to get refund details: " + error.message);
    }
  }
};
