module.exports = class deleveryServices {
  // ADD SHIPMENT
  async createShipment(order_id) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const orderSql = "SELECT user_id, status FROM orders WHERE order_id = ?";
      const [orderResults] = await connection.query(orderSql, [order_id]);

      if (orderResults.length === 0) {
        throw new Error("Order not found");
      }

      const order = orderResults[0];

      if (order.status !== "success") {
        throw new Error("Order status is not successful");
      }

      const userId = order.user_id;

      // Fetch user address
      const addressSql = "SELECT id FROM users WHERE address_id = ? LIMIT 1";
      const [addressResults] = await connection.query(addressSql, [userId]);

      if (addressResults.length === 0) {
        throw new Error("User address not found");
      }

      const shippingAddress = addressResults[0].id;

      // Insert into shipments table
      const shipmentSql = `
        INSERT INTO shipments (user_id, order_id, shipping_address, status, created_at, updated_at) 
        VALUES (?, ?, ?, ?, NOW(), NOW())
      `;
      const [shipmentResult] = await connection.query(shipmentSql, [
        userId,
        order_id,
        shippingAddress,
        "pending",
      ]);

      // Update order status to shipped
      const updateOrderSql = "UPDATE orders SET status = ? WHERE order_id = ?";
      await connection.query(updateOrderSql, ["shipped", order_id]);

      await connection.commit();

      return {
        status: 201,
        message: "Shipment created successfully",
        data: {
          shipment_id: shipmentResult.insertId,
          user_id: userId,
          order_id: order_id,
          shipping_address: shippingAddress,
          status: "pending",
        },
      };
    } catch (err) {
      await connection.rollback();
      console.error("Error creating shipment:", err);
      return {
        status: 500,
        error: err.message || "Internal Server Error",
      };
    } finally {
      connection.release();
    }
  }

  // GET SPECIFIC SHIPMENNT DETAIL USING SHIPMENT ID
  async getShipmentDetails(shipmentId) {
    const connection = await db.getConnection();
    try {
      const shipmentSql = "SELECT * FROM shipments WHERE shipment_id = ?";
      const [shipmentResults] = await connection.query(shipmentSql, [
        shipmentId,
      ]);

      if (shipmentResults.length === 0) {
        return {
          status: 404,
          message: "Shipment not found",
        };
      }

      return {
        status: 200,
        data: shipmentResults[0],
      };
    } catch (err) {
      console.error("Error getting shipment details:", err);
      return {
        status: 500,
        error: err.message || "Internal Server Error",
      };
    } finally {
      connection.release();
    }
  }
};
