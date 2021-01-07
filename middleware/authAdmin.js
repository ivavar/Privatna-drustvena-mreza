const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "There is no token. Authorization denied." });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    if (decoded.user.role === "admin") {
      req.user = decoded.user;
      next();
    } else {
      return res.status(401).send("Only admin has access.");
    }
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid." });
  }
};
