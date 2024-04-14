import express from "express";

import projectController from "../controllers/projectController.js";
import taskController from "../controllers/taskController.js";

const router = express.Router();

//PROJECTS
router.post("/project", projectController.createProject);
router.get("/project", projectController.getAllProjects);

//PROJECT DETAILS
router.get("/project/:project_id", projectController.getProjectDetails);
router.put("/project/:project_id", projectController.updateProject);
router.delete("/project/:project_id", projectController.deleteProject);

//PROJECT TASK
router.post("/project/:project_id/task", taskController.createTask);
router.get("/project/:project_id/task/", taskController.getAllTasks);

//PROJECT TASK DETAILS
router.put("/project/:project_id/task/:task_id", taskController.updateTask);
router.get("/project/:project_id/task/:task_id", taskController.getTaskDetails);
router.delete("/project/:project_id/task/:task_id", taskController.deleteTask);

export default router;
