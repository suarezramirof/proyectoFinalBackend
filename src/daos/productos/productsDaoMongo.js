import DaoMongo from "../daoMongo.js";
import { PRODUCTOS_SCHEMA } from "../../models/productos.js";

class ProductosDaoMongo extends DaoMongo {
  constructor() {
    super("productos", PRODUCTOS_SCHEMA);
  }
}

export default ProductosDaoMongo;
