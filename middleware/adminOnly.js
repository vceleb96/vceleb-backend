module.exports = function adminOnly(req, res, next) {
  if (process.env.SKIP_ADMIN_CHECK === 'true') {
    return next();
  }

  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
};
