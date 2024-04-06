import express from "express";
import { authController } from "../controllers/authController.js";

const router = express.Router();

router.get("/refresh", authController.refreshToken);

router.get("/logout", authController.logout);

router.post("/login", authController.login);

router.post("/register", authController.register);

export default router;
