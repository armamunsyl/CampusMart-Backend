const requireAuth = (req, res, next) => {
  if (!req.cookies || req.cookies.isLoggedIn !== "true") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next();
};

module.exports = requireAuth;
