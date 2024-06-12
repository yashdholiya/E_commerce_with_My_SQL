const emailCodeServices = require("../../services/User/email_code.service");
const emailCodeService = new emailCodeServices();
// ADD USER EMAIL OCDE
exports.createCode = async (req, res) => {
  try {
    const user_id = req.userId;
    const {  code } = req.body;
    const createCode = await emailCodeService.createCode(user_id, code);
    res.json(createCode);
    res.json({
        success: true,
        message: " user email added to code successfully",
        favorite: result,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
