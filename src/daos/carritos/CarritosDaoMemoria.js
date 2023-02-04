import ContenedorMemoria from "../../container/ContenedorMemoria.js";

class CarritosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super([]);
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
    const carrito = this.get(id);
    if (!carrito.productos) {
      carrito.productos = [];
    }
    carrito.productos.push(prod);
    return this.updateId(id, carrito);
  }

  async deleteCartItem(cartId, prodId) {
    const carrito = await this.get(cartId);
    if (carrito.productos.find((item) => item.id == prodId)) {
      return (carrito.productos = carrito.productos.filter(
        (item) => item.id != prodId
      ));
    } else {
      const error = new Error("Producto no encontrado");
      error.code = 404;
      throw error;
    }
  }
}

export default CarritosDaoMemoria;
