const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AccountSchema = new Schema(
  {
    userName: String,
    password: String,
    id: String,
  },
  { collection: "accounts" }
);

const AccountModel = mongoose.model("accounts", AccountSchema);
module.exports = AccountModel;
