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
    professional: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    phoneNumber: {
      type: String,
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
      default: process.env.DOMAIN + "/uploads/avatar.png",
    },
    mode: {
      type: String,
      default: "light",
    },
    languages: {
      type: String,
      default: "en",
    },
  },
  {
    collection: "users",
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
