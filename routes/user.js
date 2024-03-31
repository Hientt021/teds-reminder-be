import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/user", userController.getMe);

export default router;
