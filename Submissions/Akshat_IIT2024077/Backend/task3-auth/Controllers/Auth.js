const Users = require("../Models/UserSchema");
const bcrypt = require("bcrypt");
const { verifysessionID, getsessionID } = require("./jwt.js");

const handleSignup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: "Validation failed",
        details: ["All fields are required"],
      },
    });
  }

  const exists = await Users.findOne({ email });
  if (exists) {
    return res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: "Validation failed",
        details: ["User already exists"],
      },
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  await Users.create({
    username: username,
    email: email,
    password: hashedPassword,
  }).then(() => {
    const response = {
      success: true,
      data: { message: "User registered successfully, Kindly Login" },
      message: "Operation completed successfully",
    };
    return res.status(201).json(response);
  });
};

const handleLogin = async (req, res) => {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: "Validation failed",
        details: ["All fields are required"],
      },
    });
  }

  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: "Authentication failed",
        details: ["Invalid email or password"],
      },
    });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: "Authentication failed",
        details: ["Invalid email or password"],
      },
    });
  }

  let token = getsessionID({
    id: user.id,
    username: user.username,
    email: user.email,
  });

  res.cookie("SID", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 60 * 60 * 1000,
  });

  const response = {
    success: true,
    data: {
      message: ` Login successful, you can Proceed to the Profile by clicking on this: http://localhost:${process.env.PORT}/api/profile `,
    },
    message: "Operation completed successfully",
  };
  return res.status(200).json(response);
};

const getProfile = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized",
        details: ["No valid session found"],
      },
    });
  }

  const response = {
    success: true,
    data: user,
    message: "Operation completed successfully",
  };

  return res.status(200).json(response);
};

const authcheck = (req, res, next) => {
  const token = req.cookies?.SID;
  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized",
        details: ["Session token missing"],
      },
    });
  }
  const data = verifysessionID(token);
  if (!data) {
    return res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized",
        details: ["Invalid or expired session"],
      },
    });
  }
  req.user = data;
  next();
};

const Logout = (req, res) => {
  if (req.user) {
    res.clearCookie("SID", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    const response = {
      success: true,
      data: { message: "Logged out successfully" },
      message: "Operation completed successfully",
    };

    return res.status(200).json(response);
  }
  const response = {
    success: true,
    data: { message: "No active session" },
    message: "Operation completed successfully",
  };

  return res.status(200).json(response);
};

module.exports = { handleSignup, handleLogin, authcheck, getProfile, Logout };
