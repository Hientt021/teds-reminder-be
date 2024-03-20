const express = require("express");
const path = require("path");
const session = require("express-session");
const users = require("./src/server/routes/users.js");
const tasks = require("./src/server/routes/tasks.js");

const { connectDataBase } = require("./src/mongo/index.js");
const app = express();
const port = 8080;
const endPoint = "/api/v1";

// config

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "shhhh, very secret",
  })
);

// Session-persisted message middleware

app.use(function (req, res, next) {
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = "";
  if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
  if (msg) res.locals.message = '<p class="msg success">' + msg + "</p>";
  next();
});

connectDataBase();
app.use(endPoint, users);
app.use(endPoint, tasks);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
