import ContenedorMongo from "../../container/ContenedorMongo.js";
import { PRODUCTOS_SCHEMA } from "../../models/productos.js";

class ProductosDaoMongo extends ContenedorMongo {
  constructor() {
    super("productos", PRODUCTOS_SCHEMA);
  }
}

export default ProductosDaoMongo;
