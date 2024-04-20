import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: function () {
        return this._id;
      },
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    description: String,
    start_date: Number,
    end_date: Number,
    tasks: {
      type: Number,
      default: 0,
    },
    closed_tasks: {
      type: Number,
      default: 0,
    },
    open_tasks: {
      type: Number,
      default: 0,
    },
    members: {
      type: [
        {
          id: String,
          avatar: String,
          email: String,
          userName: String,
          role: String,
          status: String,
        },
      ],
    },
    boards: {
      type: [
        {
          title: String,
          id: mongoose.Schema.Types.ObjectId,
        },
      ],
      default: [{ title: "To Do", id: new mongoose.Types.ObjectId() }],
    },
  },
  {
    collection: "projects",
    versionKey: false,
  }
);

const ProjectModel = mongoose.model("projects", ProjectSchema);

export default ProjectModel;
