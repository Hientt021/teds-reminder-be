import express from "express";
import TaskModel from "../models/tasksModel.js";
import { getNewUserId } from "../../utils/id.js";

const router = express.Router();

router.post("/task", async (req, res) => {
  try {
    const id = await getNewUserId(TaskModel);
    const newTask = await TaskModel.create({
      ...req.body,
      id,
    });
    if (newTask) res.json(newTask);
  } catch (e) {
    res.status(500).json("Create new task fail");
  }
});

router.get("/task", async (req, res) => {
  try {
    const userId = req.body.userId;
    const tasks = await TaskModel.find({});
    if (tasks) res.json(tasks);
  } catch (e) {
    res.status(500).json("Get tasks fail");
  }
});

export default router;
