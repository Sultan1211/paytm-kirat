const express = require("express");
const userRouter = require("./user");  // Ensure these paths are correct
const accRouter = require("./acc");
const router = express.Router();

// Mounting the user router
router.use("/user", userRouter);  // This allows userRouter to handle all routes prefixed with /user

// Mounting the accounts router
router.use("/accounts", accRouter);  // This allows accRouter to handle all routes prefixed with /accounts

module.exports = router;
