const express = require("express");
const TaskModel = require("../models/tasksModel");

const router = express.Router();

router.post("/task", async (req, res) => {
  TaskModel.create(req.body)
    .then((data) => {
      if (data) res.json("Create new task successfully");
    })
    .catch((e) => res.status(500).json("Create new task fail"));
});

module.exports = router;
