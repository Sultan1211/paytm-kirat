const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://sultan112:Syedsultan%40123@cluster0.8pv9q3r.mongodb.net/");

// User Schema
const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String
});

// Account Schema
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Correctly referencing the 'User' model as a string
    },
    balance: Number
});

// Models
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
