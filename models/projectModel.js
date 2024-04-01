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
    versionKey: false,
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
    },
  }
);

const ProjectModel = mongoose.model("projects", ProjectSchema);

export default ProjectModel;
