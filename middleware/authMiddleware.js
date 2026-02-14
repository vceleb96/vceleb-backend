const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  // Allow bypass for dev / emergency
  if (process.env.SKIP_AUTH === 'true') {
    req.user = { id: null, isAdmin: true };
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      isAdmin: decoded.isAdmin
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
