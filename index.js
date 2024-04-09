import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import tasks from "./routes/task.js";
import projects from "./routes/project.js";
import user from "./routes/user.js";
import middlewareController from "./controllers/middlewareController.js";

dotenv.config();
const app = express();

const endPoint = "/api/v1";
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "https://tedsreminder.vercel.app"],
};

const uri = process.env.MONGOOSE_DB;
mongoose.connect(uri).then((data) => console.log("Connected to MongoDB"));

app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(endPoint + "/auth", auth);
app.use(
  endPoint,
  middlewareController.verifyToken,
  middlewareController.verifyUser,
  tasks
);
app.use(
  endPoint,
  middlewareController.verifyToken,
  middlewareController.verifyUser,
  user
);
app.use(
  endPoint,
  middlewareController.verifyToken,
  middlewareController.verifyUser,
  projects
);
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
