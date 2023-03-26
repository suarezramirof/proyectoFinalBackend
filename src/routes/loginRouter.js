import { Router } from "express";
import passport from "passport";
import { config } from "dotenv";
config();
const loginRouter = Router();
import User from "../models/User.js";
import registerMiddleware from "../auth/registerMiddleware.js";
import { createHash } from "../auth/bCrypt.js";

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

// loginRouter.get("/", (_req, res) => {
//   res.redirect("/home");
// });

loginRouter.get("/register", checkNotAuthenticated, (_req, res) => {
  res.render("pages/register");
});

// loginRouter.post(
//   "/register",
//   checkNotAuthenticated,
//   passport.authenticate("register", {
//     failureRedirect: "/registerfailure",
//     successRedirect: "/login",
//     session: false,
//   })
// );

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
    });
    User.create(newUser, (err, userWithId) => {
      if (err) {
        console.log("Error when saving user: " + err);
        return res.json(err);
      }
      return res.json(userWithId);
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

loginRouter.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/loginfailure",
  })
);

loginRouter.get("/loginfailure", checkNotAuthenticated, (_req, res) => {
  res.send("Falló el login");
});

const route = process.env.HOST == "LOCAL" ? true : false;

// loginRouter.get("/home", checkAuthenticated, (req, res) => {
//   req.session.counter++;

// //   res.render("pages/home", { user: req.session.passport.user.username, ruta: route });
// });

loginRouter.get("/logout", checkAuthenticated, async (req, res) => {
  try {
    const { userData } = await User.findOne({
      _id: req.session.passport.user.id,
    });
    const { name } = userData;
    req.session.destroy();
    res.render("pages/logout", { mensaje: `Hasta luego ${name}` });
  } catch (error) {
    console.log(error);
  }
});

export function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
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
