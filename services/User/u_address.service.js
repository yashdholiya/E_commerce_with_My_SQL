module.exports = class u_addressServices {
  // ADD ADDRESS
  async addaddress(address_1, address_2, city, pincode) {
    const sql = `INSERT INTO u_address ( address_1 ,address_2 , city , pincode) VALUES (?,?,?,?)`;

    try {
      const result = await db.query(sql, [address_1, address_2, city, pincode]);
      return {
        address_1: address_1,
        address_2: address_2,
        city: city,
        pincode: pincode,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // GET USER ADDRESS WITH TOKEN
  async getAddressByUserToken(userId) {
    const sql = `SELECT * FROM u_address WHERE user_id = ?`;
    try {
      const [result] = await db.query(sql, [userId]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //GET ALL ADDRESS FROM USER
  async getAllAddress() {
    const sql = `SELECT * FROM u_address`;
    try {
      const [result] = await db.query(sql);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //UPDATE USER ADDRESS
  async updateAddress(userId, address_1, address_2, city, pincode) {
    let sql = "UPDATE u_address SET";
    const params = [];

    if (address_1 !== undefined) {
      sql += " address_1 = ?,";
      params.push(address_1);
    }
    if (address_2 !== undefined) {
      sql += " address_2 = ?,";
      params.push(address_2);
    }
    if (city !== undefined) {
      sql += " city = ?,";
      params.push(city);
    }
    if (pincode !== undefined) {
      sql += " pincode = ?,";
      params.push(pincode);
    }
    sql = sql.slice(0, -1); // Remove last comma
    sql += " WHERE user_id = ? ";
    params.push(userId);

    try {
      const [result] = await db.query(sql, params);
      return result;
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    }
  }
};
