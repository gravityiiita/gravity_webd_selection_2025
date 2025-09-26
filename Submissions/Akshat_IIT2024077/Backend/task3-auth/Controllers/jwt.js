const jwt = require("jsonwebtoken");
require("dotenv").config();

const SecretKey = process.env.SecretKey;



const getsessionID = (user) => {
  return jwt.sign(user, SecretKey, {
    expiresIn: "5h",
  });
};

const verifysessionID =(token) => {
  if (!token) return null;

  try {
    const data = jwt.verify(token, SecretKey);
    return data;
  } catch {
    return null;
  }

};

module.exports = { verifysessionID,getsessionID };
