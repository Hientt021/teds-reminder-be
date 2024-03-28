import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    userName: String,
    id: String,
  },
  { collection: "users" }
);

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
