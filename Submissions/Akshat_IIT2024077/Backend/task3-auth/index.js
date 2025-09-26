const express = require("express");
require("dotenv").config();
const mongoConnect = require("./Controllers/MongoConnect");
const router = require("./Routes/apiRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());


const atlas_url = process.env.ATLAS_URL;

mongoConnect(atlas_url)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connect error:", err.message);
  });

app.use("/api", router);

app.get("/", (req, res) =>{
  const response={
  "success": true,
  "data": { status: "ok" },
  "message": "Operation completed successfully"
}
  res.json(response)
}
);
