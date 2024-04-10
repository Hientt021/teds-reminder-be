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
};

export default userController;
