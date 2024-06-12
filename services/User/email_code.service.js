module.exports = class emailCodeServices {
  // CREATE USER EMAIL CODE 
  async createCode(user_id, code) {
    const sql = "INSERT INTO email_code (user_id, code ) VALUES (?, ?)";
    try {
      const result = db.query(sql, [user_id, code]);
      return {
        user_id: user_id,
        code: code,
      };
    } catch (error) {
      console.error(err);
      throw err;
    }
  }
};
