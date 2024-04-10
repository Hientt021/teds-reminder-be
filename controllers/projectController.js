import ProjectModel from "../models/projectModel.js";
import { errorResponse, successResponse } from "../utils/response.js";

const projectController = {
  getAllProject: async (req, res) => {
    try {
      const { _id } = req.user;
      const projects = await ProjectModel.find({ created_by: _id }).sort({
        _id: -1,
      });
      if (projects) res.status(200).json(successResponse(projects, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not get all projects"));
    }
  },
  createProject: async (req, res) => {
    try {
      const { body, user } = req;
      const newProject = await ProjectModel.create({
        ...body,
        created_by: user._id,
      });

      if (newProject)
        res
          .status(200)
          .json(successResponse(newProject, "Create new project successfully"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not create new project"));
    }
  },
};

export default projectController;
