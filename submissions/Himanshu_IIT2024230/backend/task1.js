import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/DB/connectMongoDB.js";
import userRouter from "./src/Routes/task1/User.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use("/api/task1", userRouter);


connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send(`Backend is running on port ${PORT}`);
    });

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Failed to connect to MongoDB:", err);
  });
