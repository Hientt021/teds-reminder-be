import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema(
  {
    title: String,
    deadline: String,
  },
  {
    collection: "tasks",
    versionKey: false,
  }
);

const TaskModel = mongoose.model("task", TaskSchema);

export default TaskModel;
