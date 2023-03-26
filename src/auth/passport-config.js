import { Strategy as LocalStrategy } from "passport-local";
import { isValidPassword, createHash } from "./bCrypt.js";
import User from "../models/User.js";

function initialize(passport) {
  passport.use("login", login);
  passport.serializeUser((user, done) => {
    done(null, { id: user._id, username: user.username });
  });
  passport.deserializeUser(({ id }, done) => {
    User.findById(id, done);
  });
}

const authenticateLogin = async (username, password, done) => {
  User.findOne({ email: username }, (err, user) => {
    if (err) {
      console.log("Login error: " + err);
      return done(err);
    }
    if (!user) {
      console.log("User not found");
      return done(null, false);
    }
    if (isValidPassword(user, password)) {
      console.log("Login successful");
      return done(null, user);
    } else {
      console.log("Wrong password");
      return done(null, false);
    }
  });
};

const login = new LocalStrategy(authenticateLogin);

export default initialize;
