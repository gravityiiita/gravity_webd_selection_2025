const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

let users = [];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Add user
router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and Email are required" });
  if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email format" });

  const user = { id: uuidv4(), name, email };
  users.push(user);
  res.status(201).json({ message: "✅ User added successfully!", user });
});

// List users
router.get("/", (req, res) => res.json({ count: users.length, users }));

// Get single user
router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ user });
});

module.exports = router;
