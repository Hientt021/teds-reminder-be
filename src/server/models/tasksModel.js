const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TaskSchema = new Schema(
  {
    id: String,
    title: String,
    deadline: String,
  },
  { collection: "tasks" }
);

const TaskModel = mongoose.model("tasks", TaskSchema);
module.exports = TaskModel;
