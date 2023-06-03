import DaoFS from "../daoFS.js";
let instance = null;
export default class UsersDaoFS extends DaoFS {
  constructor() {
    super("./data/users.json");
  }

  async getByUsername(username) {
    const users = await this.getAll();
    const user = users.find((user) => user.email == username);
    return user;
  }

  static getInstance() {
    if (!instance) {
      instance = new UsersDaoFS();
    }
    return instance;
  }
}
