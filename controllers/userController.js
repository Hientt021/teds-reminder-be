import UserModel from "../models/userModel.js";
import { errorResponse, successResponse } from "../utils/response.js";
const userController = {
  getMe: async (req, res) => {
    try {
      const user = req.user;

      if (user._id)
        return res.status(200).json(successResponse(user, "Success"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not get profile"));
    }
  },
  updateMe: async (req, res) => {
    try {
      const { user, body } = req;

      const updatedUser = await UserModel.findByIdAndUpdate(user.id, body, {
        new: true,
      });

      if (updatedUser)
        res
          .status(200)
          .json(successResponse(updatedUser, "Update profile successfully"));
    } catch (e) {
      res.status(500).json(errorResponse("Can not get profile"));
    }
  },
};

export default userController;
