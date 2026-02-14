const jwt = require("jsonwebtoken");

module.exports = function authOptional(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { id, isAdmin }
    } catch {
      // invalid token → treat as public
      req.user = null;
    }
  } else {
    req.user = null;
  }

  next();
};
