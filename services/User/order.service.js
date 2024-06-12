module.exports = class OrderServices {
  // GET SPECIFIC ORDER USING USER TOKAN
  async getSpecificOrder(userId) {
    try {
      const query = `SELECT * FROM orders WHERE user_id = ?`;
      const [rows] = await db.query(query, [userId]);
      if (rows.length === 0) {
        throw new Error("Order not found");
      }
      return rows[0];
    } catch (error) {
      throw new Error("Failed to get order: " + error.message);
    }
  }

  // GET ALL TOKAN
  async getAllOrder() {
    try {
      const sql = `SELECT * FROM orders`;
      const [rows] = await db.query(sql);
      return rows;
    } catch (error) {
      throw new Error("Failed to get all orders: " + error.message);
    }
  }

  // CREATE ORDER
  async createOrder(userId, discount, delevery_charge, couponName) {
    try {
      const cartItemsSql = `
      SELECT 
        c.product_id, 
        p.ref_categorie_id AS category_id, 
        c.quantity, 
        p.price 
      FROM 
        cart c 
      JOIN 
        products p 
      ON 
        c.product_id = p.id 
      WHERE 
        c.user_id = ?
    `;
      const [cartItems] = await db.query(cartItemsSql, [userId]);

      if (cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

      let couponDiscount = 0;
      if (couponName) {
        const couponSql = `SELECT discount FROM cupan WHERE cupen_name = ?`;
        const [couponResults] = await db.query(couponSql, [couponName]);

        if (couponResults.length === 0) {
          throw new Error("Coupon is not valid");
        }

        couponDiscount = couponResults[0].discount;
      }

      let subtotal = 0;
      const orderItems = cartItems.map((item) => {
        const total_price = item.quantity * item.price;
        subtotal += total_price;
        return {
          category_id: item.category_id,
          product_id: item.product_id,
          price: item.price,
          quantity: item.quantity,
          total_price: total_price,
        };
      });

      const total_price =
        subtotal + delevery_charge - discount - couponDiscount;

      const orderSql =
        "INSERT INTO orders (user_id, subtotal, delevery_charge, discount, cupan_discount, total_price) VALUES (?, ?, ?, ?, ?, ?)";
      const [orderResult] = await db.query(orderSql, [
        userId,
        subtotal,
        delevery_charge,
        discount,
        couponDiscount,
        total_price,  
      ]);
      const orderId = orderResult.insertId;

      // Insert order items into order_items table
      const orderItemsSql =
        "INSERT INTO order_items (order_id, category_id, product_id, price, quantity, total_price) VALUES ?";
      await db.query(orderItemsSql, [
        orderItems.map((item) => [    
          orderId,
          item.category_id,
          item.product_id,
          item.price,
          item.quantity,
          item.total_price,
        ]),
      ]);

      // Clear cart
      const clearCartSql = "DELETE FROM cart WHERE user_id = ?";
      await db.query(clearCartSql, [userId]);

      return {
        orderId,
        userId,
        subtotal,
        delivery_charge: delevery_charge,
        discount,
        coupon_discount: couponDiscount,
        total_price,
        orderItems,
      };
    } catch (err) {
      console.error("Error creating order:", err);
      throw err;
    }
  }
};
