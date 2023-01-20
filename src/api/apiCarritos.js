class Carritos {
  #numCarts = 0;
  #carts = [];

  initialize(carts) {
    this.#carts = carts;
    this.#numCarts = carts.length;
  }

  getCarts() {
    return this.#carts;
  }

  createCart() {
    const id = this.#numCarts + 1;
    this.#numCarts++;
    this.#carts.push({ id, timestamp: Date.now(), productos: [] });
    return id;
  }

  deleteCartById(id) {
    if (isNaN(id)) {
      const error = new Error("Ingrese un id válido para el carrito");
      error.code = 400;
      throw error;
    }
    if (this.#carts.map((cart) => cart.id).includes(parseInt(id))) {
      this.#carts = this.#carts.filter((cart) => cart.id != id);
    } else {
      const error = new Error("Carrito no encontrado");
      error.code = 404;
      throw error;
    }
  }

  getCartItems(id) {
    if (isNaN(id)) {
      const error = new Error("Ingrese un id válido para el carrito");
      error.code = 400;
      throw error;
    }
    try {
      const [{ productos }] = this.#carts.filter((cart) => cart.id == id);
      if (productos.length) return productos;
      else return "No hay productos en el carrito";
    } catch {
      const error = new Error("Carrito no encontrado");
      error.code = 404;
      throw error;
    }
  }

  addCartItem(cartId, producto) {
    if (isNaN(cartId)) {
      const error = new Error("Ingrese un id válido para el carrito");
      error.code = 400;
      throw error;
    }
    let idExistente = false;
    for (let cart of this.#carts) {
      if (cart.id == cartId) {
        cart.productos.push({ ...producto, timestamp: Date.now() });
        idExistente = true;
      }
    }
    if (!idExistente) {
      const error = new Error("Carrito no encontrado");
      error.code = 404;
      throw error;
    }
  }

  deleteCartItem(cartId, prodId) {
    if (isNaN(cartId) || isNaN(prodId)) {
      const error = new Error("Ingrese id's válidos");
      error.code = 400;
      throw error;
    }
    let cartIdExistente = false;
    let prodIdExistente = false;
    for (let cart of this.#carts) {
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
    }
  }
}

export default Carritos;
