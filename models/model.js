const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Please enter a task"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
