import { Strategy as LocalStrategy } from "passport-local";
import { isValidPassword } from "./bCrypt.js";
import UsersApi from "../api/usersApi.js";
import logger from "../utils/logger.js";

const usersApi = UsersApi.getInstance();

function initialize(passport) {
  passport.use("login", login);
  passport.serializeUser((user, done) => {
    done(null, { id: user._id, username: user.email, userData: user.userData });
  });
  passport.deserializeUser(({ id }, done) => {
    logger.info("Deserializing user ", id);
    // User.findById(id, done);
    try {
      usersApi.getUserById(id).then((user) => {
        done(null, { id: user._id, username: user.email });
      });
    } catch (error) {
      done(error);
    }
  });
}

const authenticateLogin = async (username, password, done) => {
  const user = await usersApi.getByUsername(username);
  if (!user) {
    logger.warn("User not found for ", username);
    return done(null, false,  { message: "User not found" });
  }
  isValidPassword(user, password).then((res) => {
    if (res) {
      logger.info(username, " successful login");
      return done(null, {
        _id: user._id,
        email: user.email,
        userData: user.userData,
      });
    } else {
      logger.warn("Wrong password for user ", username);
      return done(null, false,  { message: "Wrong password" });
    }
  });
};

const login = new LocalStrategy(authenticateLogin);

export default initialize;
