const cupanServices = require("../../services/Admin/cupan.service");
const cupanService = new cupanServices();
// CREATE CUPAN 
exports.createCupan = async (req, res) => {
  try {
    const { cupen_name, discount } = req.body;

    const cupan = await cupanService.createCupan(cupen_name, discount);
    res.json(cupan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// GET ALL CUPAN 
exports.getAllCupan = async (req, res) => {
  try {
    const cupans = await cupanService.getAllCupan();
    res.json(cupans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// DELETE CUPAN
exports.deleteCupan = async (req, res) => {
  try {
    const id = req.params.id;
    const cupan = await cupanService.deleteCupan(id);
    res.json(cupan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


