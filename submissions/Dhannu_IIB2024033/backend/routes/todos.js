const express = require("express");
const router = express.Router();

let todos = [];

// Create task
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Task title is required" });

  const todo = { id: todos.length + 1, title, completed: false };
  todos.push(todo);
  res.status(201).json({ message: "Task added", todo });
});

// List tasks
router.get("/", (req, res) => res.json({ todos }));

// Mark complete
router.put("/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Task not found" });

  todo.completed = true;
  res.json({ message: "Task marked complete", todo });
});

// Delete task
router.delete("/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  const deleted = todos.splice(index, 1);
  res.json({ message: "Task deleted", deleted });
});

module.exports = router;
