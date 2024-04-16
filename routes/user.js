import express from "express";
import userController from "../controllers/userController.js";
import { upload } from "../index.js";

const router = express.Router();

router.get("/user/me", userController.getMe);
router.put("/user/me", upload.single("avatar"), userController.updateMe);

export default router;
