const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://sultan112:KdpEilSZ1ixxlOxN@cluster0.8pv9q3r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const userSchema = new mongoose.Schema({
    userName:String,
    password: String,
    firstName: String,
    email: String
})

const User = mongoose.model("User",userSchema);

module.exports = User;