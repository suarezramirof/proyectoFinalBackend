import Cart from "../../models/mongoose/carritos.js";
import DaoMongo from "../daoMongo.js";
import logger from "../../utils/logger.js";
let instance = null;
class CartsDaoMongo extends DaoMongo {
  constructor() {
    super(Cart);
  }

  async getItems(id) {
    const cart = await this.items.findOne({ userId: id });
    if (cart) {
      return cart.productos;
    } else {
      return null;
    }
  }

  async getId(id) {
    const cart = await this.items.findOne({ userId: id });
    if (cart) {
      return cart._id;
    } else {
      return null;
    }
  }

  async addCart(userId) {
    const newCart = await this.items.create({ userId: userId, productos: [] });
    return newCart;
  }

  async addCartItem(id, prod, qty = 1) {
    const carrito = await this.items.findOne({ userId: id });
    const index = carrito.productos
      .map((item) => item._id.toString())
      .indexOf(prod._id.toString());
    if (index >= 0) {
      carrito.productos[index].qty =
        carrito.productos[index].qty + parseInt(qty);
    } else {
      const tempProd = prod._doc;
      tempProd.qty = parseInt(qty);
      await carrito.productos.push(tempProd);
    }
    return await this.items
      .updateOne(
        { userId: id },
        { $set: { productos: carrito.productos } },
        { new: true }
      )
      .then(() => {
        logger.info(`Item with id: ${prod._id} added to cart with id: ${id}`);
        return carrito.productos;
      })
      .catch((err) =>
        logger.error(
          `Error adding item with id: ${prod._id} to cart with id: ${id}: ${err}`
        )
      );
  }

  async updateCartItem(userId, prodId, qty) {
    let products = await this.getItems(userId);
    if (products.find((item) => item._id == prodId)) {
      products = products.map((item) =>
        item._id == prodId ? { ...item, qty: parseInt(qty) } : item
      );
      const updatedItem = products.find((item) => item._id == prodId);
      return await this.items
        .updateOne(
          { userId: userId },
          { $set: { productos: products } },
          { new: true }
        )
        .then(() => {
          logger.info(
            `Item with id: ${prodId} updated in cart with id: ${userId}`
          );
          return updatedItem;
        })
        .catch((error) =>
          logger.error(
            `Error updating item with id: ${prodId} in cart with id: ${userId}. Error: ${error}`
          )
        );
    } else {
      const error = new Error("Producto no encontrado");
      error.code = 404;
      throw error;
    }
  }

  async deleteCartItem(userId, prodId) {
    let products = await this.getItems(userId);
    if (products.find((item) => item._id == prodId)) {
      const deletedItem = products.find((item) => item._id == prodId);
      products = products.filter((item) => item._id != prodId);
      return await this.items
        .updateOne(
          { userId: userId },
          { $set: { productos: products } },
          { new: true }
        )
        .then(() => {
          logger.info(
            `Item with id: ${prodId} removed from cart with id: ${userId}`
          );
          return deletedItem;
        })
        .catch((error) =>
          logger.error(
            `Error removing item with id: ${prodId} from cart with id: ${userId}. Error: ${error}`
          )
        );
    } else {
      const error = new Error("Producto no encontrado");
      error.code = 404;
      throw error;
    }
  }

  async deleteCart(userId) {
    const deletedCart = await this.items.findOneAndDelete({ userId: userId });
    if (deletedCart) return deletedCart;
    else {
      const error = new Error("Carrito no encontrado");
      error.code = 404;
      throw error;
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new CartsDaoMongo();
    }
    return instance;
  }
}

export default CartsDaoMongo;
