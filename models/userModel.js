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
  },
  {
    collection: "users",
  }
);

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
