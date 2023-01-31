import ContenedorArchivo from "../../container/ContenedorArchivo.js";

class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("./data/carritos.json");
  }

  async add() {
    return this.parentAdd();
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
    const carrito = await this.get(id);
    if (!carrito.productos) {
      carrito.productos = [];
    }
    carrito.productos.push(prod);
    await this.updateId(id, carrito);
  }

  async deleteCartItem(cartId, prodId) {
    const carrito = await this.get(cartId);
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

export default CarritosDaoArchivo;
