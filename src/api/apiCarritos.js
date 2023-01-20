import fs from "fs";

class Carritos {
  getCarts() {
    return fs.promises
      .readFile("./data/carritos.json")
      .then((data) => JSON.parse(data))
      .catch((error) => error);
  }

  updateCarts(carritos) {
    return fs.promises
      .writeFile("./data/carritos.json", JSON.stringify(carritos), "utf-8")
      .catch((error) => error);
  }

  async createCart() {
    return await this.getCarts().then((carts) => {
      let idMax = 0;
      for (let cart of carts) {
        if (cart.id > idMax) idMax = cart.id;
      }
      const newId = idMax + 1;
      this.updateCarts([
        ...carts,
        {
          id: newId,
          timestamp: Date.now(),
          productos: [],
        },
      ]);
      return newId;
    });
  }

  async deleteCartById(id) {
    if (isNaN(id)) {
      const error = new Error("Ingrese un id válido para el carrito");
      error.code = 400;
      throw error;
    }
    return await this.getCarts().then((carts) => {
      if (carts.map((cart) => cart.id).includes(parseInt(id))) {
        carts = carts.filter((cart) => cart.id != id);
        this.updateCarts(carts);
      } else {
        const error = new Error("Carrito no encontrado");
        error.code = 404;
        throw error;
      }
    });
  }

  async getCartItems(id) {
    if (isNaN(id)) {
      const error = new Error("Ingrese un id válido para el carrito");
      error.code = 400;
      throw error;
    }
    const [cart] = await this.getCarts().then((carts) =>
      carts.filter((cart) => cart.id == id)
    );
    if (cart) {
      if (cart.productos.length) return cart.productos;
      else return "No hay productos en el carrito";
    } else {
      const error = new Error("Carrito no encontrado");
      error.code = 404;
      throw error;
    }
  }

  async addCartItem(cartId, producto) {
    if (isNaN(cartId)) {
      const error = new Error("Ingrese un id válido para el carrito");
      error.code = 400;
      throw error;
    }
    await this.getCarts().then((carts) => {
      let idExistente = false;
      for (let cart of carts) {
        if (cart.id == cartId) {
          cart.productos.push({ ...producto, timestamp: Date.now() });
          idExistente = true;
        }
      }
      if (idExistente) this.updateCarts(carts);
      else {
        const error = new Error("Carrito no encontrado");
        error.code = 404;
        throw error;
      }
    });
  }

  async deleteCartItem(cartId, prodId) {
    if (isNaN(cartId) || isNaN(prodId)) {
      const error = new Error("Ingrese id's válidos");
      error.code = 400;
      throw error;
    }

    await this.getCarts().then((carts) => {
      let cartIdExistente = false;
      let prodIdExistente = false;
      for (let cart of carts) {
        if (cart.id == cartId) {
          cartIdExistente = true;
          cart.productos = cart.productos.filter((prod) => {
            if (prod.id != prodId) {
              return prod.id;
            } else {
              prodIdExistente = true;
            }
          });
        }
      }
      if (!cartIdExistente) {
        const error = new Error("Carrito no encontrado");
        error.code = 404;
        throw error;
      } else if (!prodIdExistente) {
        const error = new Error("Producto no encontrado");
        error.code = 404;
        throw error;
      } else {
        return this.updateCarts(carts);
      }
    });
  }
}

export default Carritos;
