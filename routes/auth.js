const express = require("express");

const router = express.Router();

const ADMIN_EMAIL = "admin@campusmart.com";
const ADMIN_PASSWORD = "123456";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.cookie("isLoggedIn", "true", cookieOptions);
    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("isLoggedIn", cookieOptions);
  return res.status(200).json({ message: "Logged out" });
});

router.get("/auth/status", (req, res) => {
  const loggedIn = req.cookies && req.cookies.isLoggedIn === "true";
  return res.status(200).json({
    loggedIn,
    email: loggedIn ? ADMIN_EMAIL : null,
  });
});

module.exports = router;
