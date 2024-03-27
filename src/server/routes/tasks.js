const express = require("express");
const TaskModel = require("../models/tasksModel");
const { getNewUserId } = require("../../utils/id");
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

module.exports = router;
