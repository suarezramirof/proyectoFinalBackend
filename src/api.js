export class Productos {
  #productos;
  constructor(productos) {
    this.#productos = productos;
  }

  initialize(productos) {
    this.#productos = productos;
  }

  getAll() {
    return this.#productos;
  }

  getItemById = (id) => {
    const [item] = this.#productos.filter((elem) => elem.id == id);
    if (item) return item;
    else if (isNaN(id)) {
      const error = new Error("El id ingresado no es válido");
      error.code = 400;
      throw error;
    } else {
      const error = new Error("Producto no encontrado");
      error.code = 404;
      throw error;
    }
  };

  addItem = (producto) => {
    if (
      producto.nombre &&
      producto.descripcion &&
      producto.codigo &&
      producto.foto &&
      producto.precio &&
      producto.stock
    ) {
      let idMax = 0;
      for (let item of this.#productos) {
        if (item.id > idMax) idMax = item.id;
      }
      const newId = idMax + 1;
      this.#productos.push({ ...producto, id: newId, timestamp: Date.now() });
    } else {
      const error = new Error("Ingrese todos los datos del producto");
      error.code = 400;
      throw error;
    }
  };

  updateItem = (id, { nombre, descripcion, codigo, foto, precio, stock }) => {
    if (isNaN(id)) {
      const error = new Error("Ingrese un id válido");
      error.code = 400;
      throw error;
    } else {
      let idValido = false;
      for (let item of this.#productos) {
        if (item.id == id) idValido = true;
      }
      if (!idValido) {
        const error = new Error("Producto no encontrado");
        error.code = 404;
        throw error;
      } else {
        this.#productos = this.#productos.map((item) =>
          item.id == id
            ? {
                nombre: nombre ? nombre : item.nombre,
                descripcion: descripcion ? descripcion : item.descripcion,
                codigo: codigo ? codigo : item.codigo,
                foto: foto ? foto : item.foto,
                precio: precio ? precio : item.precio,
                stock: stock ? stock : item.stock,
                id,
              }
            : item
        );
      }
    }
  };

  deleteItemById = (id) => {
    if (isNaN(id)) {
      const error = new Error("Ingrese un id válido");
      error.code = 400;
      throw error;
    } else if (this.#productos.map((item) => item.id).includes(parseInt(id))) {
      this.#productos = this.#productos.filter((item) => item.id != id);
    } else {
      const error = new Error("Producto no encontrado");
      error.code = 404;
      throw error;
    }
  };
}

export class Carritos {
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
    for (let cart of this.#carts) {
      if (cart.id == cartId) cart.productos.push({...producto, timestamp: Date.now()});
    }
  }

  deleteCartItem(cartId, prodId) {
    for (let cart of this.#carts) {
      if (cart.id == cartId) {
        cart.productos = cart.productos.filter((prod) => prod.id != prodId);
      }
    }
  }
}
