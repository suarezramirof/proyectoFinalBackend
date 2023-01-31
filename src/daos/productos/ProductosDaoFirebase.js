import ContenedorFirebase from "../../container/ContenedorFirebase.js";
const coleccion = "productos";

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(coleccion);
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

export default ProductosDaoFirebase;
