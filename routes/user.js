import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/user/me", userController.getMe);
router.put("/user/me", userController.updateMe);

export default router;
