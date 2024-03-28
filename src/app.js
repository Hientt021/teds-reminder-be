import express from "express";
import path from "path";
import session from "express-session";
import users from "./server/routes/users.js";
import tasks from "./server/routes/tasks.js";
import cors from "cors";
import { connectDataBase } from "./mongo/index.js";

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;
const endPoint = "/api/v1";
connectDataBase();
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => res.json({ message: "New Express on Vercel" }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(endPoint, users);
app.use(endPoint, tasks);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
