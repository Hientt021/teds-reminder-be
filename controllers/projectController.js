import ProjectModel from "../models/projectModel.js";
import { errorResponse, successResponse } from "../utils/response.js";
const projectController = {
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
      res.status(500).json(errorResponse("Can not create new project " + e));
    }
  },
  getAllProjects: async (req, res) => {
    try {
      const { user, query } = req;
      const { id } = user;
      const { page = 1, limit = 10, requested } = query;
      const projects = await ProjectModel.find({
        "members.id": id,
        "members.status": requested ? "requested" : "attended",
      })
        .sort({
          id: -1,
        })
        .limit(limit)
        .skip(limit * (page - 1));
      if (projects) res.status(200).json(successResponse(projects, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse(e));
    }
  },
  getProjectDetails: async (req, res) => {
    try {
      const { body, params } = req;
      const { project_id } = params;

      const project = await ProjectModel.findById(project_id);
      if (project) res.status(200).json(successResponse(project, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse(e));
    }
  },
  updateProject: async (req, res) => {
    try {
      const { body, params } = req;
      const { project_id } = params;
      const updatedProject = await ProjectModel.findOneAndUpdate(
        { id: project_id },
        body,
        {
          new: true,
        }
      );

      if (updatedProject)
        res
          .status(200)
          .json(
            successResponse(updatedProject, "Create new project successfully")
          );
    } catch (e) {
      res.status(500).json(errorResponse("Can not create new project"));
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { body, user, params } = req;
      const { project_id } = params;

      const project = await ProjectModel.findById(project_id);

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
