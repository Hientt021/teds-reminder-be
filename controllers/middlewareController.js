import jwt from "jsonwebtoken";
import { errorResponse } from "../src/utils/response.js";
import dotenv from "dotenv";

dotenv.config();

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;

    if (!token)
      res.status(401).json(errorResponse("You are not authenticated"));

    const tokenStr = token.split(" ")[1];
    jwt.verify(tokenStr, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err.message, user, tokenStr);
      if (err) res.status(403).json(errorResponse("Token is not valid"));
      if (user) {
        req.user = user;
        next();
      }
    });
  },
};

export default middlewareController;
