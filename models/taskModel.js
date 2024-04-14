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
    description: String,
    members: [String],
    priority: String,
    scopes: String,
    status: String,
    created_by: mongoose.Schema.Types.ObjectId,
    project_id: { type: mongoose.Schema.Types.ObjectId, require: true },
    board: String,
  },
  {
    collection: "tasks",
    versionKey: false,
  }
);

const TaskModel = mongoose.model("task", TaskSchema);

export default TaskModel;
