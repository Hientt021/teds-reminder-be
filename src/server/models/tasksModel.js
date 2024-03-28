import mongoose from "mongoose";

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

export default TaskModel;
