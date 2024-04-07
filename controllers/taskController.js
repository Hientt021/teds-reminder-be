import TaskModel from "../models/taskModel.js";
import { errorResponse, successResponse } from "../utils/response.js";

const taskController = {
  getAllTask: async (req, res) => {
    try {
      const tasks = await TaskModel.find({});
      if (tasks) res.status(200).json(successResponse(tasks, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not get all tasks"));
    }
  },
  createTask: async (req, res) => {
    try {
      const newTask = await TaskModel.create(req.body);

      if (newTask)
        res
          .status(200)
          .json(successResponse(newTask, "Create new task successfully"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not create new task"));
    }
  },
};

export default taskController;
