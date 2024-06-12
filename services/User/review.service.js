module.exports = class reviewsServices {
  async createReview(delivery_id, reviews) {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // Fetch user_id using delivery_id from order_delivery table
      const deliverySql = `
            SELECT user_id 
            FROM order_delivery 
            WHERE delivery_id = ?
          `;
      const [deliveryResults] = await connection.query(deliverySql, [
        delivery_id,
      ]);

      if (deliveryResults.length === 0) {
        throw new Error("Delivery not found for the given delivery ID");
      }

      const delivery = deliveryResults[0];
      const userId = delivery.user_id;

      // Insert into reviews table
      const reviewSql = `
            INSERT INTO reviews (delivery_id, user_id, reviews) 
            VALUES (?, ?, ?)
          `;
      const [reviewResult] = await connection.query(reviewSql, [
        delivery_id,
        userId,
        reviews,
      ]);

      await connection.commit();

      return {
        status: 201,
        message: "Review created successfully",
        data: {
          reviews_id: reviewResult.insertId,
          delivery_id: delivery_id,
          user_id: userId,
          reviews: reviews,
        },
      };
    } catch (err) {
      await connection.rollback();
      console.error("Error creating review:", err);
      throw err;
    } finally {
      connection.release();
    }
  }

  async getReciewWithUser(userId) {
    const sql = "SELECT * FROM  reviews WHERE user_id = ?";
    try {
      const [rows] = await db.query(sql, [userId]);
      if (rows.length === 0) {
        throw new Error(" this User not reviews");
      }
      return rows[0];
    } catch (error) {
      throw new Error("Failed to get reviews: " + error.message);
    }
  }

  async deleteReview(reviewId) {
    const sql = "DELETE FROM reviews WHERE review_id = ?";
    try {
      await db.query(sql, [reviewId]);
      return {
        status: 200,
        message: "Review deleted successfully",
      };
    } catch (error) {
      throw new Error("Failed to get reviews: " + error.message);
    }
  }
};
