import DaoMongo from "../daoMongo.js";
import User from "../../models/mongoose/User.js";

let instance = null;

export default class UsersDaoMongo extends DaoMongo {
  constructor() {
    super(User);
  }

  async getByUsername(username) {
    return await this.items.findOne({ email: username });
  }

  static getInstance() {
    if (!instance) {
      instance = new UsersDaoMongo();
    }
    return instance;
  }
}


