const express = require("express");
const UserModel = require("../models/usersModel");
const AccountModel = require("../models/accountModel");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    const account = await AccountModel.findOne({ userName, password });

    if (account) {
      const user = await UserModel.findOne({ id: account.id });
      if (user) res.json(user);
    } else res.json("Wrong user name or password");
  } catch (e) {
    res.status(500).json("Login fail");
  }
});

router.post("/register", async (req, res) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    const id = await getNewUserId();

    const newAccount = await AccountModel.create({
      userName,
      password,
      id,
    });
    if (newAccount) {
      const newUser = {
        userName: newAccount.userName,
        id: newAccount.id,
      };
      const user = await UserModel.create(newUser);
      if (user) res.json(newUser);
    }
  } catch (e) {
    res.status(500).json("Register fail");
  }
});

const getNewUserId = async (length = 6) => {
  let userId = "";
  while (!userId) {
    const id = Math.random()
      .toString(36)
      .substring(2, length + 2);
    const alreadyExist = await UserModel.findOne({ id });
    if (alreadyExist) userId = "";
    else userId = id;
  }

  return userId;
};

module.exports = router;
