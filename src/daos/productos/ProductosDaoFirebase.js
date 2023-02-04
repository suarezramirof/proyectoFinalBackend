import ContenedorFirebase from "../../container/ContenedorFirebase.js";
const coleccion = "productos";

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(coleccion);
  }
}

export default ProductosDaoFirebase;
