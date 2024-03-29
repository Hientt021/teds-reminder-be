import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { connectDataBase } from "./mongo/index.js";
import AccountModel from "./server/models/accountModel.js";
import UserModel from "./server/models/usersModel.js";
import { errorResponse, successResponse } from "./utils/response.js";
import dotenv from "dotenv";

dotenv.config();
const refreshTokens = [];
const port = 5500;

const app = express();
app.options("*", cors());
app.use(express.json());

connectDataBase();

app.post("/api/v1/refreshToken", async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_ACCESS_TOKEN_SECRET,
    (err, data) => {
      console.log(err, data);
      if (err) res.sendStatus(403);
      const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30s",
      });
      const resp = response(200, "Refresh token successfully", {
        accessToken,
      });
      res.json(resp);
    }
  );
});

app.post("/api/v1/logout", async (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens.filter((refToken) => refToken !== refreshToken);
  res.sendStatus(200);
});

app.post("/api/v1/login", async (req, res) => {
  try {
    const data = req.body;

    const account = await AccountModel.findOne(data);
    if (account) {
      const user = await UserModel.findOne({ id: account.id });
      if (user) {
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "30s",
        });
        const refreshToken = jwt.sign(
          data,
          process.env.REFRESH_ACCESS_TOKEN_SECRET
        );
        refreshTokens.push(refreshToken);
        res.status(200).json(
          successResponse(
            {
              accessToken,
              refreshToken,
            },
            "Login successfully"
          )
        );
      }
    } else {
      res.status(401).json(errorResponse("Wrong user name or password"));
    }
  } catch (e) {
    res.status(500).json(errorResponse("Login fail"));
  }
});

app.post("/api/v1/register", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
