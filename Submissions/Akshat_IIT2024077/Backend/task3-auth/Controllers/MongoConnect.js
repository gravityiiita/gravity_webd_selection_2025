const mongoose = require("mongoose");

const mongoConnect = async function mongoConnect(url) {

  return mongoose.connect(url);
};

module.exports = mongoConnect;