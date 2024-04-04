import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";
import dotenv from "dotenv";
import UserModel from "../models/usersModel.js";
import bcrypt from "bcrypt";
dotenv.config();

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;

    if (!token)
      res.status(401).json(errorResponse("You are not authenticated"));

    const tokenStr = token.split(" ")[1];
    jwt.verify(tokenStr, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) res.status(403).json(errorResponse("Token is not valid"));
      if (data) {
        req.user = data;
        next();
      }
    });
  },
  verifyUser: async (req, res, next) => {
    const data = req.user;
    const user = await UserModel.findOne({ email: data.email });
    if (!user) return res.status(404).json(errorResponse("User not found"));

    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      return res.status(404).json(errorResponse("User not found"));
    }

    const { password, ...others } = user._doc;
    req.user = others;
    next();
  },
};

export default middlewareController;
