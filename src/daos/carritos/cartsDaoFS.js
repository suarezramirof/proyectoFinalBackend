import DaoFS from "../daoFS.js";
import fs from "fs";
let instance = null;

class CartsDaoFS extends DaoFS {
  constructor() {
    super("./data/carritos.json");
  }

  async getItems(userId) {
    const carts = await this.getAll();
    const cart = carts.find((cart) => cart.userId == userId);
    if (cart) {
      return cart.productos;
    }
    return null;
  }

  async addCart(userId) {
    const carts = await this.getAll();
    const cart = {
      _id: CartsDaoFS.getNextId(carts),
      userId: userId,
      productos: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    carts.push(cart);
    await this.update(carts);
    return cart;
  }

  async addCartItem(userId, prod, qty) {
    const data = await fs.promises.readFile(this.ruta);
    const carts = JSON.parse(data);
    const existingCart = carts.find((cart) => cart.userId == userId);
    const cart = existingCart ? existingCart : await this.addCart(userId);
    const cartId = cart._id;
    const index = CartsDaoFS.getIndex(prod.id, cart.productos);
    if (index >= 0) {
      cart.productos[index].qty += parseInt(qty);
    } else {
      cart.productos.push({ ...prod, qty: parseInt(qty) });
    }
    await this.updateById(cartId, cart);
    return cart.productos;
  }

  async updateCartItem(userId, prodId, qty) {
    const carts = await this.getAll();
    const cart = carts.find((cart) => cart.userId == userId);
    if (cart) {
      const index = CartsDaoFS.getIndex(prodId, cart.productos);
      if (index >= 0) {
        if (qty) cart.productos[index].qty = parseInt(qty);
        await this.updateById(cart._id, cart);
        return cart.productos[index];
      }
      const error = new Error("Item not found");
      error.code = 404;
      throw error;
    }
    const error = new Error("Cart not found");
    error.code = 404;
    throw error;
  }

  async deleteCart(userId) {
    const carts = await this.getAll();
    const cart = carts.find((cart) => cart.userId == userId);
    if (cart) {
      const [deletedCart] = carts.splice(carts.indexOf(cart), 1);
      await this.update(carts);
      return deletedCart;
    }
    const error = new Error("Cart not found");
    error.code = 404;
    throw error;
  }

  async deleteCartItem(userId, prodId) {
    const carts = await this.getAll();
    const cart = carts.find((cart) => cart.userId == userId);
    if (cart) {
      const index = CartsDaoFS.getIndex(prodId, cart.productos);
      if (index >= 0) {
        const [deletedItem] = cart.productos.splice(index, 1);
        await this.updateById(cart._id, cart);
        return deletedItem;
      }
      const error = new Error("Item not found");
      error.code = 404;
      throw error;
    }
    const error = new Error("Cart not found");
    error.code = 404;
    throw error;
  }

  static getInstance() {
    if (!instance) {
      instance = new CartsDaoFS();
    }
    return instance;
  }
}

export default CartsDaoFS;
