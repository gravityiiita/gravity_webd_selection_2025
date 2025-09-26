const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: { 
        type: String,
         required: true 
    },

    email: { 
        type: String,
         required: true 
    },

  },{timestamps: true});

const User=mongoose.model("Backend1", userSchema);

module.exports = User;