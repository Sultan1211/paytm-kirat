const express = require("express");
const userRouter = require("./user");  
const accRouter = require("./acc");
const router = express.Router();


router.use("/user", userRouter); 


router.use("/accounts", accRouter);  
module.exports = router;
