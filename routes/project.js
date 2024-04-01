import express from "express";

import projectController from "../controllers/projectController.js";

const router = express.Router();

router.post("/project", projectController.createProject);

router.get("/project", projectController.getAllProject);

export default router;
