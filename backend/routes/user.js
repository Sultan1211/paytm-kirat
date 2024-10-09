const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const authMiddleware = require("../authMiddleware");

const inputSchema = zod.object({
    userName: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

router.post("/signup", async function(req, res) {
    const { success, error } = inputSchema.safeParse(req.body);
    if (!success) {
        return res.json({
            msg: "Invalid Inputs!!!",
            errors: error.errors // Optionally include error details
        });
    }

    const isExists = await User.findOne({ userName: req.body.userName });
    if (isExists) {
        return res.json({
            msg: "User already exists"
        });
    }

    try {
        const user = await User.create({
            userName: req.body.userName,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        await Account.create({
            userId: user._id,
            balance: 1 + Math.random() * 10000
        });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.json({ msg: "User created successfully", token: token });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Update Route
const updateObj = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put("/update", authMiddleware, async (req, res) => {
    const { success, error } = updateObj.safeParse(req.body);
    if (!success) {
        return res.json({
            msg: "Invalid user",
            errors: error.errors // Include validation errors if needed
        });
    }

    try {
        await User.updateOne({ _id: req.userId }, req.body);
        res.json({
            msg: "User updated successfully"
        });
    } catch (err) {
        res.status(500).json({ msg: "Error updating user" });
    }
});

// -----------------------------------------------------------------------------------

router.get("/filter", async (req, res) => {
    const filter = req.query.filter || ""; // Use req.query for query parameters
    try {
        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } }, // Case-insensitive regex search for firstName
                { lastName: { "$regex": filter, "$options": "i" } }   // Case-insensitive regex search for lastName
            ]
        });

        res.json({
            users: users.map(user => ({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id // Use _id for Mongoose documents
            }))
        });
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving users", error: error.message });
    }
});


module.exports = router;
