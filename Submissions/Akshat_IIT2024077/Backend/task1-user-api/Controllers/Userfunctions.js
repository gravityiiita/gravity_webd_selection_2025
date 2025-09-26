const User = require("../Models/schema");

const AddUser = async (req, res) => {
  try {
    const { id, name, email } = req.body;

    if (!id || !name || !email) {
      return res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: "Validation failed",
          details: ["id, name, and email are required"],
        },
      });
    }

    const newUser = await User.create({ id, name, email });

    return res.status(201).json({
      success: true,
      data: newUser,
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

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.json({
      success: true,
      data: users,
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

const GetuserbyID = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ id: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Not Found",
          details: ["User not found"],
        },
      });
    }

    return res.json({
      success: true,
      data: user,
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
  AddUser,
  GetAllUsers,
  GetuserbyID,
};
