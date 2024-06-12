const jwt = require("jsonwebtoken");
const secretKey = "yash";

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  

  if (!authHeader) {
    return res.status(401).json({ message: "Token is missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log("Verified Token:", token);

    req.userId = decoded.userId;
    console.log(req.userId);
    next();
  });
}

module.exports = {
  verifyToken,
};

module.exports = verifyToken;
