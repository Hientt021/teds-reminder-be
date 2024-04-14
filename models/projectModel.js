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
    created_by: mongoose.Schema.Types.ObjectId,
    status: {
      type: String,
      required: true,
    },
    product_type: [String],
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
      type: [mongoose.Schema.Types.ObjectId],
    },
    boards: {
      type: [
        {
          title: String,
          color: String,
        },
      ],
      default: [{ title: "To Do", color: "#009688" }],
    },
  },
  {
    collection: "projects",
    versionKey: false,
  }
);

const ProjectModel = mongoose.model("projects", ProjectSchema);

export default ProjectModel;
