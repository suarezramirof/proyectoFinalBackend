import ContenedorMemoria from "../../container/ContenedorMemoria.js";

class ProductosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super([]);
  }

  async add(item) {
    if (
      item.nombre &&
      item.descripcion &&
      item.codigo &&
      item.foto &&
      item.precio &&
      item.stock
    )
      return this.parentAdd(item);
    else {
      const error = new Error("Ingrese todos los datos del producto");
      error.code = 400;
      throw error;
    }
  }
}

export default ProductosDaoMemoria;