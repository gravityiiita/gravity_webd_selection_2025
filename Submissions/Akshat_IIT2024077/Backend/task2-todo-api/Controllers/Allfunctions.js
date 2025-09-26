const Todo = require("../Models/TodoSchema");

const AddTodo = async (req, res) => {
  try {
    const { id, title, description, priority } = req.body;

    if (!id || !title) {
      return res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: "Validation failed",
          details: ["id and title are required"],
        },
      });
    }

    const newTodo = await Todo.create({
      id,
      title,
      description: description || "N/A",
      priority: priority || "medium",
      completed: false,
    });

    return res.status(201).json({
      success: true,
      data: newTodo,
      message: "Operation completed successfully",
    });
  } catch (error) {
    if (error.message.includes("duplicate key error")) {
      return res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: "Validation failed",
          details: [
            "A todo with this id already exists, please provide a different id",
          ],
        },
      });
    } else {
      return res.status(500).json({
        success: false,
        error: {
          code: 500,
          message: "Server error",
          details: [error.message],
        },
      });
    }
  }
};

const GetAllTodos = async (req, res) => {
  let { limit, page } = req.query;
  if (!limit) limit = 10;
  if (!page) page = 1;
  try {
    const todos = await Todo.find()
      .limit(limit)
      .skip((page - 1) * limit);

    return res.json({
      success: true,
      data: todos,
      message: "Operation completed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Server error",
        details: [error.message],
      },
    });
  }
};

const SetCompleted = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findOne({ id: id });
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Not Found",
          details: ["Todo not found, please enter a valid id"],
        },
      });
    }

    todo.completed = true;
    await todo.save();

    return res.json({
      success: true,
      data: todo,
      message: "Operation completed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Server error",
        details: [error.message],
      },
    });
  }
};

const DeleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findOneAndDelete({ id: id });
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Not Found",
          details: ["Todo not found"],
        },
      });
    }

    return res.json({
      success: true,
      data: { message: "Todo deleted successfully" },
      message: "Operation completed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Server error",
        details: [error.message],
      },
    });
  }
};

const GetbyID = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findOne({ id: id });

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Not Found",
          details: ["Todo not found"],
        },
      });
    }

    return res.json({
      success: true,
      data: todo,
      message: "Operation completed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Server error",
        details: [error.message],
      },
    });
  }
};

const UpdateTodo = async (req, res) => {
  try {
    const { title, description, completed, priority } = req.body;
    const id = req.params.id;

    const newData = { title, description, completed, priority };

    const todo = await Todo.findOneAndUpdate({ id: id }, newData, {
      new: true,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Not Found",
          details: ["Todo not found, please enter a valid id"],
        },
      });
    }

    return res.json({
      success: true,
      data: todo,
      message: "Operation completed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Server error",
        details: [error.message],
      },
    });
  }
};

module.exports = {
  AddTodo,
  GetbyID,
  GetAllTodos,
  UpdateTodo,
  DeleteTodo,
  SetCompleted,
};
