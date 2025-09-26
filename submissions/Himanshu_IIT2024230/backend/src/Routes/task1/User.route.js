import express from "express";

import { getAllUsers, getUser, signup } from "../../Controllers/user.task1.controller.js";




const router = express.Router();



router.post("/create", signup);
router.get("/users",getAllUsers)

router.get("/users/:id", getUser);





export default router;