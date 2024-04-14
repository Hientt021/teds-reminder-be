import TaskModel from "../models/taskModel.js";
import { errorResponse, successResponse } from "../utils/response.js";

const taskController = {
  getTasksByProjectId: async (req, res) => {
    try {
      const { body, user } = req;
      const { project_id } = body;
      const tasks = await TaskModel.find({ project_id });
      if (tasks) res.status(200).json(successResponse(tasks, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not get all tasks"));
    }
  },
  updateTask: async (req, res) => {
    try {
      const { body, user } = req;
      const { id } = body;
      const updatedTask = await TaskModel.findOneAndUpdate({ id }, body, {
        new: true,
      });
      if (updatedTask)
        res.status(200).json(successResponse(updatedTask, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not get all tasks"));
    }
  },
  createTask: async (req, res) => {
    try {
      const { body, user } = req;
      const newTask = await TaskModel.create({ ...body, created_by: user.id });

      if (newTask)
        res
          .status(200)
          .json(successResponse(newTask, "Create new task successfully"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not create new task" + e));
    }
  },
};

export default taskController;
