import { Router } from "express";
import passport from "passport";
import { config } from "dotenv";
config();
const loginRouter = Router();

import registerMiddleware from "../auth/registerMiddleware.js";
import { createHash } from "../auth/bCrypt.js";
import transporter, { registerMail } from "../utils/nodeMailer.js";
import multer from "multer";
import logger from "../utils/logger.js";
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

loginRouter.get("/logout", checkAuthenticated, async (req, res, next) => {
  try {
    const { name } = req.session.passport.user.userData;
    const { username } = req.session.passport.user;
    req.logOut((err) => {
      if (err) return next(err);
      logger.info(`User ${username} logged out`);
      req.session.destroy();
      res.json({ mensaje: `Hasta luego ${name}` });
    });
  } catch (error) {
    console.log(error);
  }
});

loginRouter.get("/userdata", checkAuthenticated, async (req, res) => {
  try {
    const { email, userData, cart, _id } = req.session.passport.user;
    res.json({ email, userData, cart, id: _id });
  } catch (err) {
    res.json({ error: err });
  }
});

loginRouter.delete("/cart/:id", checkAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, { cart: "" })
      .then(() => console.log("User cart deleted succesfully"))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});

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
