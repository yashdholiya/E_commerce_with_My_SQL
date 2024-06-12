module.exports = class deleverServices {

// ADD DELEVER 
  async createOrderDelivery(shipmentId, code) {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // Fetch order details using shipment_id
      const orderSql =
        "SELECT order_id, user_id FROM shipments WHERE shipment_id = ?";
      const [orderResults] = await connection.query(orderSql, [shipmentId]);

      if (orderResults.length === 0) {
        throw new Error("Order not found for the given shipment ID");
      }

      const order = orderResults[0];
      const orderId = order.order_id;
      const userId = order.user_id;

      // Fetch shipment details
      const shipmentSql =
        "SELECT shipping_address, status FROM shipments WHERE shipment_id = ?";
      const [shipmentResults] = await connection.query(shipmentSql, [
        shipmentId,
      ]);

      if (shipmentResults.length === 0) {
        throw new Error("Shipment not found for the given ID");
      }

      const shipment = shipmentResults[0];

      if (shipment.status !== "pending") {
        throw new Error("Shipment status is not pending");
      }

      const shippingAddress = shipment.shipping_address;

      // Fetch payment details
      const paymentSql =
        "SELECT amount, payment_method FROM payments WHERE order_id = ?";
      const [paymentResults] = await connection.query(paymentSql, [orderId]);

      if (paymentResults.length === 0) {
        throw new Error("Payment not found for the given order");
      }

      const payment = paymentResults[0];

      // Validate the code with email_code table
      const codeSql = "SELECT * FROM email_code WHERE user_id = ? AND code = ?";
      const [codeResults] = await connection.query(codeSql, [userId, code]);

      if (codeResults.length === 0) {
        throw new Error("Invalid code");
      }

      // Insert into order_delivery table
      const deliverySql = `
        INSERT INTO order_delivery (shipment_id, order_id, user_id, address_id, amount, payment_method, code, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [deliveryResult] = await connection.query(deliverySql, [
        shipmentId,
        orderId,
        userId,
        shippingAddress,
        payment.amount,
        payment.payment_method,
        code,
        "success", // Set status to success
      ]);

      // Update shipment status to 'success'
      const updateShipmentSql =
        "UPDATE shipments SET status = ? WHERE shipment_id = ?";
      await connection.query(updateShipmentSql, ["success", shipmentId]);

      // Update order status to 'delivered'
      const updateOrderSql = "UPDATE orders SET status = ? WHERE order_id = ?";
      await connection.query(updateOrderSql, ["delivered", orderId]);

      await connection.commit();

      return {
        status: 201,
        message: "Order delivery created successfully",
        data: {
          delivery_id: deliveryResult.insertId,
          shipment_id: shipmentId,
          order_id: orderId,
          user_id: userId,
          address_id: shippingAddress,
          amount: payment.amount,
          payment_method: payment.payment_method,
          code: code,
          delivery_status: "delivered",
        },
      };
    } catch (err) {
      await connection.rollback();
      console.error("Error creating order delivery:", err);
      throw err;
    } finally {
      connection.release();
    }
  }
};
