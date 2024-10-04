const express = require("express");
const mongoose = require("mongoose"); // Import mongoose
const authMiddleware = require("../authMiddleware");
const { Account } = require("../db");
const router = express.Router();

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body;

        // Check user account balance
        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.json({ msg: "Insufficient Balance" });
        }

        // Check recipient account
        const toAcc = await Account.findOne({ userId: to }).session(session);
        if (!toAcc) {
            await session.abortTransaction();
            return res.json({ msg: "Invalid account" });
        }

        // Update balances
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
        
        // Commit transaction
        await session.commitTransaction();
        res.json({ msg: "Transaction Successful" });
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({ msg: "Error processing transaction", error: err.message });
    } finally {
        session.endSession(); // Ensure the session is ended
    }
});

router.get("/balance", authMiddleware, async (req, res) => {
    const userAcc = await Account.findOne({ userId: req.userId });
    if (!userAcc) {
        return res.status(404).json({ msg: "Account not found" });
    }
    res.json({ Balance: userAcc.balance });
});

module.exports = router;
