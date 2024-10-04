const express = require("express");
const authMiddleware = require("../authMiddleware");
const { Account } = require("../db");
const router = express.Router();

router.post("/transfer");

router.get("/balance",authMiddleware,async (req,res)=>{
   const userAcc =  await Account.findOne({
        userId: req.userId
    })
    res.json({
        Balance: userAcc.balance
    })

});

module.exports = router;