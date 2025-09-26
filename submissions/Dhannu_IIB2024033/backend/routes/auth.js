const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const JWT_SECRET = "supersecretkey";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

let users = [];

// Signup
router.post("/signup", upload.single("profileImage"), async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  if (users.find(u => u.email === email)) return res.status(400).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    email,
    password: hashed,
    profileImage: req.file ? `/uploads/${req.file.filename}` : null
  };

  users.push(newUser);
  res.status(201).json({ message: "User registered", user: { id: newUser.id, email: newUser.email, profileImage: newUser.profileImage } });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: "Invalid email or password" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid email or password" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

// Protected profile
router.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Profile access granted", user: decoded });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;
