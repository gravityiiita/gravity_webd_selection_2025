// server.js
const express = require("express");
const ConnectDB = require("./Controllers/connectToDB");
require("dotenv").config();
const router = require("./Routes/apiRoutes");



const app = express();
app.use(express.json());

app.use("/api", router);

const atlas_url = process.env.ATLAS_URL;
ConnectDB(atlas_url).then(() => {
  console.log("Connected to MongoDB Successfully");
  
  const PORT = process.env.PORT;
  app.listen(PORT, () =>
    console.log(`Server Started on http://localhost:${PORT}`)
  );
}).catch((err) => console.log("Failed to connect to MongoDB:" + err.message));

