import DaoFactory from "../daos/index.js";

let instance = null;

export default class CartsApi {
  constructor() {
    DaoFactory.getProductsDao().then((dao) => {this.productsDao = dao})
    DaoFactory.getCartsDao().then((dao) => {this.dao = dao})
  }

  async addProduct(userId, productId, qty = 1) {
    const prods = await this.dao.getItems(userId);
    if (!prods) {
      await this.dao.addCart(userId);
    }
    const product = await this.productsDao.getById(productId);
    return await this.dao.addCartItem(userId, product, qty);
  }

  async getProducts(userId) {
    return await this.dao.getItems(userId);
  }

  async getCartId(userId) {
    return await this.dao.getId(userId);
  }

  async updateItem(userId, productId, qty) {
    return await this.dao.updateCartItem(userId, productId, qty);
  }

  async deleteCartItem(userId, productId) {
    return await this.dao.deleteCartItem(userId, productId);
  }

  async deleteCart(userId) {
    return await this.dao.deleteCart(userId);
  }

  static async createCart(userId) {
    return await this.dao.addCart(userId);
  }

  static getInstance() {
    if (!instance) {
      instance = new CartsApi();
    }
    return instance;
  }
}
