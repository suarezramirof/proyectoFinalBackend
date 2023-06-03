import DaoFactory from "../daos/index.js";
import { createHash } from "../auth/bCrypt.js";

let instance = null;
export default class UsersApi {
  constructor() {
    DaoFactory.getUsersDao().then((dao) => (this.dao = dao));
  }

  async getByUsername(username) {
    try {
      const user = await this.dao.getByUsername(username);
      return user;
    } catch (error) {
      error.message += ` -- at ${this.constructor.name}`;
      throw error;
    }
  }

  async getUser(username) {
    const user = await this.getByUsername(username);
    if (user) {
      return { username: user.email, userData: user.userData };
    }
    return null;
  }

  async getUserById(id) {
    try {
      const user = await this.dao.getById(id);
      return user;
    } catch (error) {
      error.message += ` -- at ${this.constructor.name}`;
      throw error;
    }
  }

  async registerUser(username, password, userData) {
    const hash = createHash(password);
    const newUser = await this.dao.add({
      email: username,
      password: hash,
      userData,
    });
    return { email: newUser.email, userData: newUser.userData };
  }

  static getInstance() {
    if (!instance) {
      instance = new UsersApi();
    }
    return instance;
  }
}
