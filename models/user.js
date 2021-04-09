const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true, index: { unique: true } },
});
const User = mongoose.model("Users", userSchema);

module.exports = User;
