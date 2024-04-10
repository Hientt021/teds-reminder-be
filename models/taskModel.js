import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: function () {
        return this._id;
      },
    },
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
