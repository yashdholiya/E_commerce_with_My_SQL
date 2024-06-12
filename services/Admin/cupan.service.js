module.exports = class cupanServices {
  // ADD CUPAN
  async createCupan(cupen_name, discount) {
    const sql = "INSERT INTO cupan (cupen_name , discount ) VALUES (?, ?)";
    try {
      const [result] = await db.query(sql, [cupen_name, discount]);
      return {
        cupen_name: cupen_name,
        discount: discount,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
// GET ALL CUPAN
  async getAllCupan() {
    const sql = "SELECT * FROM cupan";
    try {
      const [result] = await db.query(sql);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // DELETE CUPAN
  async deleteCupan(id) {
    const sql = "DELETE FROM cupan WHERE id = ?";
    try {
      const [result] = await db.query(sql, [id]);
      return result;
    } catch {
      console.error(error);
      throw error;
    }
  }
};
