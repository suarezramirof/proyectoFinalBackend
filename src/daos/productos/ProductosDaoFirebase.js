import ContenedorFirebase from "../../container/ContenedorFirebase.js";
const COLECCION = "productos";

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(COLECCION);
  }
}

export default ProductosDaoFirebase;
