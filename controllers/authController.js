import { errorResponse, successResponse } from "../src/utils/response.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserModel from "../models/usersModel.js";
import bcrypt from "bcrypt";

dotenv.config();
const refreshTokens = [];

export const authController = {
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const data = { ...req.body, password: hashed };

      const newUser = await UserModel.create(data);
      if (newUser) {
        res
          .status(200)
          .json(successResponse(newUser, "Register new user successfully"));
      }
    } catch (e) {
      res.status(500).json(errorResponse(e.message));
    }
  },
  login: async (req, res) => {
    try {
      const data = req.body;

      const user = await UserModel.findOne({ email: data.email });
      if (!user) res.status(404).json(errorResponse("Wrong email address"));

      const isValidPassword = await bcrypt.compare(
        data.password,
        user.password
      );

      if (!isValidPassword) {
        res.status(404).json(errorResponse("Wrong password"));
      }

      const { password, __v, ...others } = user._doc;
      const accessToken = authController.getAccessToken(data);
      const refreshToken = authController.getRefreshAccessToken(data);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });

      res.status(200).json(
        successResponse(
          {
            user: others,
            accessToken,
          },
          "Login successfully"
        )
      );
    } catch (e) {
      res.status(500).json(errorResponse(e.message));
    }
  },
  logout: async (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens.filter((refToken) => refToken !== refreshToken);
    res.sendStatus(200);
  },
  refreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      res.status(401).json(errorResponse("You are not authenticated"));

    if (!refreshTokens.includes(refreshToken))
      res.status(403).json(errorResponse("Token is not valid"));

    jwt.verify(
      refreshToken,
      process.env.REFRESH_ACCESS_TOKEN_SECRET,
      (err, data) => {
        if (err) res.status(403).json(errorResponse("Token is not valid"));
        refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = authController.getAccessToken(data);
        const newRefreshToken = authController.getRefreshAccessToken(data);

        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
        });
        res
          .status(200)
          .json(
            successResponse(
              { accessToken: newAccessToken },
              "Refresh token successfully"
            )
          );
      }
    );
  },
  getAccessToken: (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
  },
  getRefreshAccessToken: (data) => {
    const refreshToken = jwt.sign(
      data,
      process.env.REFRESH_ACCESS_TOKEN_SECRET
    );
    refreshTokens.push(refreshToken);
    return refreshToken;
  },
};

export default authController;
