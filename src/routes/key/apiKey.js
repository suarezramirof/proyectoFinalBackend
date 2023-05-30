import { apiKey, keyMode } from "../../config.js";
const validateRequest = (req, res, next) => {
  if (keyMode) {
    const { headers } = req;
    if (!headers.apikey) {
      res.status(403).send({ error: "Forbidden" });
      return;
    }
    if (headers.apikey !== apiKey) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }
    next();
  } else {
    next();
  }
};

export default validateRequest;
