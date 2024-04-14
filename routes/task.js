import express from "express";
import taskController from "../controllers/taskController.js";

const router = express.Router();

router.post("/task", taskController.createTask);

router.put("/task", taskController.updateTask);

router.get("/task", taskController.getTasksByProjectId);

export default router;
