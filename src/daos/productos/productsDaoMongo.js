import DaoMongo from "../daoMongo.js";
import Product from "../../models/mongoose/productos.js";

let instance = null;

class ProductsDaoMongo extends DaoMongo {
  constructor() {
    super(Product);
  }

  static getInstance() {
    if (!instance) {
      instance = new ProductsDaoMongo();
    }
    return instance;
  }
}

export default ProductsDaoMongo;
