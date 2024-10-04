const express = require("express");
const userRouter = require("./user")
const accRouter = require("./acc")
const router = express.Router();

router.get("/user",userRouter)
router.get("/accounts",accRouter)


module.exports = router;