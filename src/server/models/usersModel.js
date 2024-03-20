const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    userName: String,
    id: String,
  },
  { collection: "users" }
);

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
