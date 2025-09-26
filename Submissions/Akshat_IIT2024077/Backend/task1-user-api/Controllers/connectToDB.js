const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDB = async (url) => {
  return await mongoose.connect(url);
};

module.exports = ConnectDB;
