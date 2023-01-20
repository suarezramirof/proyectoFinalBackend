import fs from "fs";

class Productos {
  async updateProductos(productos) {
    try {
      await fs.promises.writeFile(
        "./data/productos.json",
        JSON.stringify(productos),
        "utf-8"
      );
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    return await fs.promises
      .readFile("./data/productos.json")
      .then((data) => JSON.parse(data));
  }

  async getItemById(id) {
    const [item] = await this.getAll().then((items) =>
      items.filter((elem) => elem.id == id)
    );
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
  }

  async addItem(producto) {
    if (
      producto.nombre &&
      producto.descripcion &&
      producto.codigo &&
      producto.foto &&
      producto.precio &&
      producto.stock
    ) {
      let idMax = 0;
      await this.getAll().then((productos) => {
        for (let item of productos) {
          if (item.id > idMax) idMax = item.id;
        }
        const newId = idMax + 1;
        const item = { ...producto, id: newId, timestamp: Date.now() };
        productos.push(item);
        return this.updateProductos(productos);
      });
    } else {
      const error = new Error("Ingrese todos los datos del producto");
      error.code = 400;
      throw error;
    }
  }

  async updateItem(id, { nombre, descripcion, codigo, foto, precio, stock }) {
    if (isNaN(id)) {
      const error = new Error("Ingrese un id válido");
      error.code = 400;
      throw error;
    } else if (!(nombre || descripcion || codigo || foto || precio || stock)) {
      const error = new Error("Ingrese alguna propiedad válida");
      error.code = 400;
      throw error;
    } else {
      await this.getAll().then((productos) => {
        let idValido = false;
        for (let item of productos) {
          if (item.id == id) idValido = true;
        }
        if (!idValido) {
          const error = new Error("Producto no encontrado");
          error.code = 404;
          throw error;
        } else {
          productos = productos.map((item) =>
            item.id == id
              ? {
                  ...item,
                  nombre: nombre ? nombre : item.nombre,
                  descripcion: descripcion ? descripcion : item.descripcion,
                  codigo: codigo ? codigo : item.codigo,
                  foto: foto ? foto : item.foto,
                  precio: precio ? precio : item.precio,
                  stock: stock ? stock : item.stock,
                }
              : item
          );
          return this.updateProductos(productos);
        }
      });
    }
  }

  async deleteItemById(id) {
    if (isNaN(id)) {
      const error = new Error("Ingrese un id válido");
      error.code = 400;
      throw error;
    } else {
      await this.getAll().then((productos) => {
        let idValido = false;
        for (let item of productos) {
          if (item.id == id) idValido = true;
        }
        if (!idValido) {
          const error = new Error("Producto no encontrado");
          error.code = 404;
          throw error;
        } else {
          productos = productos.filter((item) => item.id != id);
          return this.updateProductos(productos);
        }
      });
    }
  }
}

export default Productos;
