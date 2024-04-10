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
    start_date: Date,
    end_date: Date,
    tasks: Number,
    closed_tasks: Number,
    open_tasks: Number,
    members: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  {
    collection: "projects",
    versionKey: false,
  }
);

const ProjectModel = mongoose.model("projects", ProjectSchema);

export default ProjectModel;
