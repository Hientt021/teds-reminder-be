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
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

const TaskModel = mongoose.model("tasks", TaskSchema);

export default TaskModel;
