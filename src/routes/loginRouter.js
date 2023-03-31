import { Router } from "express";
import passport from "passport";
import { config } from "dotenv";
config();
const loginRouter = Router();
import User from "../models/User.js";
import registerMiddleware from "../auth/registerMiddleware.js";
import { createHash } from "../auth/bCrypt.js";
import transporter, {registerMail} from "../misc/nodeMailer.js";

import multer from "multer";
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

loginRouter.get("/register", checkNotAuthenticated, (_req, res) => {
  res.render("pages/register");
});

loginRouter.post(
  "/register",
  checkNotAuthenticated,
  upload.single("file"),
  registerMiddleware,
  (req, res) => {
    const userData = {
      name: req.body.name,
      address: req.body.address,
      age: req.body.age,
      phone: req.body.phone,
      photo: req.file.path,
    };
    const newUser = new User({
      email: req.body.username,
      password: createHash(req.body.password),
      userData: userData,
      cart: "",
    });
    User.create(newUser, (err, userWithId) => {
      if (err) {
        console.log("Error when saving user: " + err);
        return res.json(err);
      }
      registerMail.html = JSON.stringify(userWithId);
      transporter.sendMail(registerMail);
      return res.redirect("/");
    });
  }
);

loginRouter.get("/registerfailure", checkNotAuthenticated, (_req, res) => {
  res.render("pages/registerfailure");
});

loginRouter.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ logged: true });
  } else {
    res.send({ logged: false });
  }
});

loginRouter.post("/login", checkNotAuthenticated, (req, res, next) => {
  passport.authenticate("login", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) return handleAuthFailure(req, res);
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ user: req.user });
    });
  })(req, res, next);
});

function handleAuthFailure(req, res) {
  return res.status(401).json({
    success: false,
    message: "Invalid username or password",
  });
}

loginRouter.get("/loginfailure", checkNotAuthenticated, (_req, res) => {
  res.json({ logged: false });
});

loginRouter.get("/logout", checkAuthenticated, async (req, res, next) => {
  try {
    const { name } = req.user.userData;
    req.logOut((err) => {
      if (err) return next(err);
      res.json({ mensaje: `Hasta luego ${name}` });
    });
  } catch (error) {
    console.log(error);
  }
});

loginRouter.get("/userdata", checkAuthenticated, async (req, res) => {
  try {
    const { email, userData, cart } = req.user;
    res.json({ email, userData, cart });
  } catch (err) {
    res.json({ error: err });
  }
});

export function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
}

export default loginRouter;