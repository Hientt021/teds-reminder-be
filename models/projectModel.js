import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    created_by: mongoose.Schema.Types.ObjectId,
    status: {
      type: String,
      required: true,
    },
    members: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  {
    collection: "projects",
  }
);

ProjectSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const ProjectModel = mongoose.model("projects", ProjectSchema);

export default ProjectModel;
