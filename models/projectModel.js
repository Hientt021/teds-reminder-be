import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    created_by: String,
    status: String,
    members: {
      type: Array,
    },
  },
  {
    collection: "projects",
    toJSON: {
      versionKey: false,
    },
  }
);

const ProjectModel = mongoose.model("projects", ProjectSchema);

export default ProjectModel;
