import { CARRITOS_SCHEMA } from "../../models/carritos.js";
import ContenedorMongo from "../../container/ContenedorMongo.js";

class CarritosDaoMongo extends ContenedorMongo {
  constructor() {
    super("carritos", CARRITOS_SCHEMA);
  }

  async getItems(id) {
    const carrito = await this.get(id);
    const items = carrito.productos;
    return items;
  }

  async addCartItem(id, prod, qty = 1) {
    const carrito = await this.get(id);
    if (!carrito.productos) {
      carrito.productos = [];
    }
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
    await this.items.updateOne(
      { _id: id },
      { $set: { productos: carrito.productos } }
    );
  }

  async deleteCartItem(cartId, prodId) {
    const carrito = await this.get(cartId);
    if (carrito.productos.find((item) => item._id == prodId)) {
      carrito.productos = carrito.productos.filter(
        (item) => item._id != prodId
      );
      await this.updateId(cartId, carrito);
    } else {
      const error = new Error("Producto no encontrado");
      error.code = 404;
      throw error;
    }
  }
}

export default CarritosDaoMongo;
