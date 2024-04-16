import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      maxLength: 20,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      maxLength: 50,
      unique: true,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: function () {
        return this._id;
      },
    },
    avatar: {
      type: String,
    },
  },
  {
    collection: "users",
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
