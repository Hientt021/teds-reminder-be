import express from "express";
import UserModel from "../models/usersModel.js";
import AccountModel from "../models/accountModel.js";
import { getNewUserId } from "../../utils/id.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const account = await AccountModel.findOne(data);
    if (account) {
      const user = await UserModel.findOne({ id: account.id });
      if (user) {
        const accessToken = await jwt.sign(
          data,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );
        res.json({ accessToken });
      }
    } else res.json("Wrong user name or password");
  } catch (e) {
    res.status(500).json("Login fail");
  }
});

router.post("/register", async (req, res) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    const id = await getNewUserId(UserModel);

    const newAccount = await AccountModel.create({
      userName,
      password,
      id,
    });
    if (newAccount) {
      const newUser = {
        userName: newAccount.userName,
        id: newAccount.id,
      };
      const user = await UserModel.create(newUser);
      if (user) res.json(newUser);
    }
  } catch (e) {
    res.status(500).json("Register fail");
  }
});

export default router;
