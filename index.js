import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import middlewareController from "./controllers/middlewareController.js";
import auth from "./routes/auth.js";
import projects from "./routes/project.js";
import user from "./routes/user.js";
import multer from "multer";
import path from "path";

dotenv.config();
const app = express();

const endPoint = "/api/v1";
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "https://tedsreminder.vercel.app"],
};

const uri = process.env.MONGOOSE_DB;
mongoose.connect(uri).then((data) => console.log("Connected to MongoDB"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(endPoint + "/auth", auth);

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

app.get("/upload", (req, res) => {
  res.render("upload", { layout: false });
});

app.post(
  "/upload",
  middlewareController.verifyToken,
  middlewareController.verifyUser,
  upload.single("avatar"),
  (req, res) => {
    console.log(req.file, req.user);

    res.status(200).json(req.file);
  }
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

app.use("/uploads", express.static("uploads"));

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
