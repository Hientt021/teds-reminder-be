import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema(
  {
    title: String,
    deadline: String,
  },
  {
    collection: "tasks",
    toJSON: {
      versionKey: false,
    },
  }
);

const TaskModel = mongoose.model("task", TaskSchema);

export default TaskModel;
