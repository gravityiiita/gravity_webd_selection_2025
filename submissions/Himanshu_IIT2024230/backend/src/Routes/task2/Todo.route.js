import express from "express";
import { createTodo, deleteTodo, getAllTodos, getTodo, MarkComplete, updateTodo } from "../../Controllers/todo.task2.controller.js";


const router = express.Router();

//  - `POST /todos` - Create new todo
//   - `GET /todos` - Get all todos
//   - `GET /todos/:id` - Get specific todo
//   - `PUT /todos/:id` - Update todo
//   - `DELETE /todos/:id` - Delete todo
//   - `PATCH /todos/:id/complete` - Mark todo as complete

router.post("/todos", createTodo )
router.get("/todos", getAllTodos)
router.get("/todos/:id", getTodo)
router.put("/todos/:id", updateTodo)
router.delete("/todos/:id", deleteTodo)
router.patch("/todos/:id/complete", MarkComplete)

export default router;