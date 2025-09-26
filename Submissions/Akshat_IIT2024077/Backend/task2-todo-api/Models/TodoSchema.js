const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Backend2", todoSchema);



module.exports=Todo;
