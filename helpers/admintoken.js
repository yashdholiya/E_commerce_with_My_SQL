const jwt = require("jsonwebtoken");
const secretKey = "yash";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token is missing" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    console.log("Verified Token:", token);

    req.adminId = decoded.userId;
    console.log("Catch ID:", req.adminId);

    next();
  });
};

module.exports = verifyToken;
