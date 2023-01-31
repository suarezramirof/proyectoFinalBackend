import ContenedorArchivo from "../../container/ContenedorArchivo.js";

class ProductosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("./data/productos.json");
  }

  // Se genera un método add para validación de las propiedades del objeto.
  // Se podría validar eventualmente desde el lado del cliente.
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

export default ProductosDaoArchivo;
