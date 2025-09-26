const express = require("express");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/users");
const todoRoutes = require("./routes/todos");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);

// Root
app.get("/", (req, res) => res.send("🚀 Backend API Running!"));

// Start server
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
