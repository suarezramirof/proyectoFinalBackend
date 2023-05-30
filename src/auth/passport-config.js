import { Strategy as LocalStrategy } from "passport-local";
import { isValidPassword } from "./bCrypt.js";
import User from "../models/mongoose/User.js";
import logger from "../utils/logger.js";

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
      logger.error("Login error: " + err);
      return done(err);
    }
    if (!user) {
      logger.warn("User not found for ", username);
      return done(null, false);
    }
    isValidPassword(user, password).then((res) => {
      if (res) {
        logger.info(username, " successful login");
        return done(null, user);
      } else {
        logger.warn("Wrong password for user ", username);
        return done(null, false);
      }
    });
  });
};

const login = new LocalStrategy(authenticateLogin);

export default initialize;
