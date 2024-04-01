import express from "express";
import taskController from "../controllers/taskController.js";

const router = express.Router();

router.post("/task", taskController.createTask);

router.get("/task", taskController.getAllTask);

export default router;
