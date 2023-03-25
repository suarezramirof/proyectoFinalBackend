import { Router } from "express";
import passport from "passport";
import { config } from "dotenv";
config();
const loginRouter = Router();

// loginRouter.get("/", (_req, res) => {
//   res.redirect("/home");
// });

loginRouter.get("/register", checkNotAuthenticated, (_req, res) => {
  res.render("pages/register");
});

loginRouter.post(
  "/register",
  checkNotAuthenticated,
  passport.authenticate("register", {
    failureRedirect: "/registerfailure",
    successRedirect: "/login",
    session: false,
  })
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

loginRouter.get("/logout", checkAuthenticated, (req, res) => {
  try {
    const name = req.session.passport.user.username
      ? req.session.passport.user.username
      : "";
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
