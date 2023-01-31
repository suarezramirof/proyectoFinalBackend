import ContenedorFirebase from "../../container/ContenedorFirebase.js";
const coleccion = "carritos";

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(coleccion);
  }

  async getItems(id) {
    const carrito = await this.get(id);
    const items = carrito.productos;
    if (items) {
      if (items.length > 0) return items;
    }
    return "El carrito está vacío";
  }

  async addCartItem(id, prod) {
    const doc = this.query.doc(id);
    const carrito = await this.get(id);
    if (!carrito.productos) {
      carrito.productos = [];
    }
    carrito.productos.push(prod);
    await doc.update({ productos: carrito.productos });
  }

  async deleteCartItem(cartId, prodId) {
    const doc = this.query.doc(cartId);
    const carrito = await this.get(id);
    if (carrito.productos.find((item) => item.id == prodId)) {
      carrito.productos = carrito.productos.filter((item) => item.id != prodId);
      await this.updateId(cartId, carrito);
    } else {
      const error = new Error("Producto no encontrado");
      error.code = 404;
      throw error;
    }
  }
}

export default CarritosDaoFirebase;
