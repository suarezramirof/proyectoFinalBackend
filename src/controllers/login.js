import UsersApi from "../api/usersApi.js";
import logger from "../utils/logger.js";
import passport from "passport";

class LoginController {
  constructor() {
    this.users = UsersApi.getInstance();
  }

  registerUser = async (req, res) => {
    const userData = {
      name: req.body.name,
      address: req.body.address,
      age: req.body.age,
      phone: req.body.phone,
      photo: req.file
        ? req.file.path
        : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    };
    const newUser = await this.users.registerUser(
      req.body.username,
      req.body.password,
      userData
    );
    if (newUser) {
      logger.info("New user registered");
      res.status(200).json(newUser);
    } else {
      logger.error("Error registering user");
      res.status(500).json({ error: "Error registering user" });
    }
  };

  logUser = async (req, res, next) => {
    passport.authenticate("login", (err, user, message) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return LoginController.handleAuthFailure(req, res, message.message);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.session.counter = 1;
        return res.status(200).json({
          success: true,
          user: req.user,
        });
      });
    })(req, res, next);
  };

  static handleAuthFailure(_req, res, message) {
    return res.status(401).json({
      success: false,
      message,
    });
  }
}

const loginController = new LoginController();

export default loginController;
