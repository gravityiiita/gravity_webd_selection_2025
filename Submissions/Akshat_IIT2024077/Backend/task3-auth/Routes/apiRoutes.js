const express = require("express");
const rateLimit = require("express-rate-limit");
const { Logout, handleSignup, handleLogin, authcheck, getProfile } = require("../Controllers/Auth");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many requests from this IP, please try again later" },
});


router.post("/signup", authLimiter, handleSignup);
router.post("/login", authLimiter, handleLogin);

router.post("/logout", Logout);
router.get("/profile", authcheck, getProfile);

module.exports = router;
