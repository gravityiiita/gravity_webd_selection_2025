const express = require("express");

const {
  DeleteTodo,
  UpdateTodo,
  AddTodo,
  SetCompleted,
  GetAllTodos,
  GetbyID,
} = require("../Controllers/Allfunctions");

const router = express.Router();

router.post("/todos", AddTodo);

router.get("/todos", GetAllTodos);

router.get("/todos/:id", GetbyID);

router.put("/todos/:id", UpdateTodo);

router.delete("/todos/:id", DeleteTodo);

router.patch("/todos/:id/complete", SetCompleted);

module.exports = router;
