const mongoose = require("mongoose");

const userTasksSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: { unique: true } },
  tasks: { type: Array },
});
const UserTasks = mongoose.model("UserTasks", userTasksSchema);

module.exports = UserTasks;
