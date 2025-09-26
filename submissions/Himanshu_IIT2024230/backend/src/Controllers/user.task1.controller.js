import { User1 } from "../Modle/user.task1.modle.js";

export const signup = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }
    const existingUser = await User1.find({ email });
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    const newUser = new User1({ name, email });
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log("Error in signup ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User1.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error in getUsers ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User1.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  }
    catch (error) {
    console.log("Error in getUser ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


