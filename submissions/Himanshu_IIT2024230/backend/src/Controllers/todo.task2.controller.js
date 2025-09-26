import {Todo} from "../Modle/Todo.task2.model.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description,priority} = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }
    const newTodo = new Todo({ title, description , priority});
    await newTodo.save();
    res.status(201).json({ success: true, data: newTodo });
  } catch (error) {
    console.log("Error in createTodo ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllTodos = async (req, res) => {
    try {
        const { completed, priority, search, sortBy, order } = req.query;   
        let filter = {};
        if (completed) {
            filter.completed = completed === 'true';
        }
        if (priority) {
            filter.priority = priority;
        }
        if (search) {
            filter.$text = { $search: search };
        }
        let sort = {};
        if (sortBy) {
            const sortOrder = order === 'desc' ? -1 : 1;
            sort[sortBy] = sortOrder;
        } else {
            sort.createdAt = -1; 
        }
        const todos = await Todo.find(filter).sort(sort);
        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        console.log("Error in getAllTodos ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    console.log("Error in getTodo ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const { title, description, completed, priority } = req.body;
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }
        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (completed !== undefined) todo.completed = completed;
        if (priority !== undefined) todo.priority = priority;
        await todo.save();
        res.status(200).json({ success: true, data: todo });
    } catch (error) {
        console.log("Error in updateTodo ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findByIdAndDelete(todoId);
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    res.status(200).json({ success: true, message: "Todo deleted successfully" });
    } catch (error) {
    console.log("Error in deleteTodo ", error);
    return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const MarkComplete = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }
        if(todo.completed){
            todo.completed = false;
            await todo.save();
            return res.status(200).json({ success: true, data: todo });
        }
        else {
        todo.completed = true;
        await todo.save();
        res.status(200).json({ success: true, data: todo });
        }
    } catch (error) {
        console.log("Error in MarkComplete ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
