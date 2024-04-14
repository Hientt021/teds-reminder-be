import TaskModel from "../models/taskModel.js";
import { errorResponse, successResponse } from "../utils/response.js";

const taskController = {
  createTask: async (req, res) => {
    try {
      const { body, user, params } = req;
      const newTask = await TaskModel.create({ ...body, created_by: user.id });

      if (newTask)
        res
          .status(200)
          .json(successResponse(newTask, "Create new task successfully"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not create new task " + e));
    }
  },
  getAllTasks: async (req, res) => {
    try {
      const { body, user } = req;
      const { project_id } = body;
      const tasks = await TaskModel.find({ project_id });
      if (tasks) res.status(200).json(successResponse(tasks, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse(e));
    }
  },
  getTaskDetails: async (req, res) => {
    try {
      const { params } = req;
      const { project_id, task_id } = params;
      const tasks = await TaskModel.find({ id: task_id, project_id });
      if (tasks) res.status(200).json(successResponse(tasks, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse(e));
    }
  },
  updateTask: async (req, res) => {
    try {
      const { body, user } = req;
      const { project_id, task_id } = params;
      const updatedTask = await TaskModel.findOneAndUpdate(
        { id: task_id, project_id },
        body,
        {
          new: true,
        }
      );
      if (updatedTask)
        res.status(200).json(successResponse(updatedTask, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse(e));
    }
  },
  deleteTask: async (req, res) => {
    try {
      const { body, user } = req;
      const { project_id, task_id } = params;
      const updatedTask = await TaskModel.findOneAndUpdate(
        { id: task_id, project_id },
        body,
        {
          new: true,
        }
      );
      if (updatedTask)
        res.status(200).json(successResponse(updatedTask, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse(e));
    }
  },
};

export default taskController;
