const u_addressServices = require("../../services/User/u_address.service");
const u_addressService = new u_addressServices();

// ADD ADDRESS
exports.addAddress = async (req, res) => {
  const { address_1, address_2, city, pincode } = req.body;
  try {
    const result = await u_addressService.addaddress(
      address_1,
      address_2,
      city,
      pincode
    );
    res.json({
      message: "add address successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    ``;
    res.status(500).send("Server error");
  }
};

// GET ADDRESS USING USER TOKEN
exports.getAddressUsertoken = async (req, res) => {
  const userId = req.userId;
  try {
    const result = await u_addressService.getAddressByUserToken(userId);
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// GET ALL USER ADDRERSS
exports.getAllAddress = async (req, res) => {
  try {
    const result = await u_addressService.getAllAddress();
    res.json({ result });
  } catch {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// UPDATE ADDRERSS UDING  TOKEN
exports.updateAddress = async (req, res) => {
  const userId = req.userId;
  const { address_1, address_2, city, pincode } = req.body;
  try {
    const result = await u_addressService.updateAddress(
      userId,
      address_1,
      address_2,
      city,
      pincode
    );
    res.json({
      message: "update address successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
