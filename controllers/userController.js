import UserModel from "../models/usersModel.js";
import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../src/utils/response.js";
const userController = {
  getMe: async (req, res) => {
    try {
      const data = req.user;

      const user = await UserModel.findOne({ email: data.email });
      if (!user)
        return res.status(404).json(errorResponse("Wrong email address"));

      const isValidPassword = await bcrypt.compare(
        data.password,
        user.password
      );

      if (!isValidPassword) {
        return res.status(404).json(errorResponse("Wrong password"));
      }

      const { password, __v, ...others } = user._doc;
      return res.status(200).json(successResponse(others, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not get profile"));
    }
  },
};

export default userController;
