import { Router } from "express";
import passport from "passport";
import { config } from "dotenv";
config();
const loginRouter = Router();

import registerMiddleware from "../auth/registerMiddleware.js";
import multer from "multer";
import { AUTH } from "../config.js";
import loginController from "../controllers/login.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

loginRouter.post(
  "/register",
  checkNotAuthenticated,
  upload.single("file"),
  registerMiddleware,
  loginController.registerUser
);

loginRouter.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ logged: true });
  } else {
    res.send({ logged: false });
  }
});

loginRouter.post("/login", checkNotAuthenticated, loginController.logUser);

loginRouter.get("/loginfailure", checkNotAuthenticated, (_req, res) => {
  res.json({ logged: false });
});

loginRouter.get("/logout", checkAuthenticated, loginController.logout);

loginRouter.get("/userdata", checkAuthenticated, loginController.getUserData);

export function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    if (AUTH === "no") {
      return next();
    }
    res.status(401).json({
      error: "Unauthorized",
      message: "You need to login to access this resource",
      logged: false,
    });
  }
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.json({ logged: true });
  } else {
    next();
  }
}

export default loginRouter;
