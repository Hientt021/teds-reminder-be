import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema(
  {
    title: String,
    deadline: String,
  },
  {
    collection: "tasks",
  }
);

TaskSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const TaskModel = mongoose.model("task", TaskSchema);

export default TaskModel;
