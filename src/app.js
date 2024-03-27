const express = require("express");
const path = require("path");
const session = require("express-session");
const users = require("./server/routes/users.js");
const tasks = require("./server/routes/tasks.js");

const { connectDataBase } = require("./mongo/index.js");
var cors = require("cors");

const app = express();
app.use(cors());

const port = 5000;
const endPoint = "/api/v1";
connectDataBase();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => res.json({ message: "New Express on Vercel" }));
app.post("/api/v1/login", (req, res) => res.json(req.body));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(endPoint, users);
app.use(endPoint, tasks);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
