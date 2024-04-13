import ProjectModel from "../models/projectModel.js";
import { errorResponse, successResponse } from "../utils/response.js";
const projectController = {
  getAllProject: async (req, res) => {
    try {
      const { id } = req.user;
      const projects = await ProjectModel.find({ created_by: id }).sort({
        id: -1,
      });
      if (projects) res.status(200).json(successResponse(projects, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not get all projects"));
    }
  },
  getProjectById: async (req, res) => {
    try {
      const projectId = req.params["id"];
      const { id } = req.user;
      const project = await ProjectModel.findById(projectId);
      if (project) res.status(200).json(successResponse(project, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not get all projects"));
    }
  },
  createProject: async (req, res) => {
    try {
      const { body, user } = req;

      const newProject = await ProjectModel.create({
        ...body,
        created_by: user.id,
      });

      if (newProject)
        res
          .status(200)
          .json(successResponse(newProject, "Create new project successfully"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not create new project"));
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { body, user } = req;

      const project = await ProjectModel.findById(body.id);

      if (project.created_by.equals(user.id)) {
        await ProjectModel.findByIdAndDelete(body.id);
        res.sendStatus(200);
      }
    } catch (e) {
      res.status(500).json(errorResponse("Can not delete project"));
    }
  },
};

export default projectController;
