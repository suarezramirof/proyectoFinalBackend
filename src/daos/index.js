import { DB } from "../config.js";

let productsInstance = null;
let cartsInstance = null;
let daoFactory = null;

export default class DaoFactory {
  constructor(db) {
    if (db == "mongoDB") {
      this.productsDao = import("./productos/productsDaoMongo.js").then((res) =>
        res.default.getInstance()
      );
      this.cartsDao = import("./carritos/cartsDaoMongo.js").then((res) =>
        res.default.getInstance()
      );
    }
  }

  static async getProductsDao() {
    if (productsInstance == null) {
      if (daoFactory == null) {
        daoFactory = new DaoFactory(DB);
      }
      productsInstance = await daoFactory.productsDao;
    }
    return productsInstance;
  }

  static async getCartsDao() {
    if (!cartsInstance) {
      if (!daoFactory) {
        daoFactory = new DaoFactory(DB);
      }
      cartsInstance = await daoFactory.cartsDao;
    }
    return cartsInstance;
  }
}
