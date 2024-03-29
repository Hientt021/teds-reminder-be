import express from "express";
import { authController } from "../controllers/authController.js";

const router = express.Router();

router.post("/refresh", authController.refreshToken);

router.post("/logout", authController.logout);

router.post("/login", authController.login);

router.post("/register", authController.register);

export default router;
