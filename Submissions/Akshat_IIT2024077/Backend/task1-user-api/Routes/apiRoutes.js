const express = require("express");
const { AddUser, GetAllUsers,GetuserbyID } = require("../Controllers/Userfunctions");


const router=express.Router();

router.post("/users", AddUser);

router.get("/users", GetAllUsers);

router.get("/users/:id", GetuserbyID);


module.exports = router;