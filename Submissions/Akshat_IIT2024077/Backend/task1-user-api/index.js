const express = require("express");
const mongoose = require("mongoose");
const ConnectDB = require("./Controllers/connectToDB");
const router = require("./Routes/apiroutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const atlas_url = process.env.ATLAS_URL;

ConnectDB(atlas_url).then(() => {
  console.log("Connected to MongoDB Sucessfully...");

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});

app.use("/api", router);
