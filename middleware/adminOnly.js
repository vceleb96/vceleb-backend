module.exports = function adminOnly(req, res, next) {
  // TEMP: allow all requests if auth not wired yet
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
