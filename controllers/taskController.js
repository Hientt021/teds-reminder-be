import TaskModel from "../models/tasksModel.js";
import { errorResponse, successResponse } from "../src/utils/response.js";

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
          .json(successResponse(tasks, "Create new task successfully"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not create new task"));
    }
  },
};

export default taskController;
