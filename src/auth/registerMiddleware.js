import User from "../models/mongoose/User.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import logger from "../utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const registerMiddleware = (req, res, next) => {
  User.findOne({ email: req.body.username }, (err, user) => {
    if (err) {
      logger.error("Register error", err);
      return res.sendStatus(500);
    }
    if (user) {
      logger.warn("User ", req.body.username, " already exists");
      try {
        fs.unlinkSync(
          path.join(__dirname, "../../", req.file ? req.file.path : "")
        );
      } catch (err) {
        logger.error("Error deleting file", err.message);
      }
      return res.redirect("/register");
    }
    return next();
  });
};

export default registerMiddleware;
