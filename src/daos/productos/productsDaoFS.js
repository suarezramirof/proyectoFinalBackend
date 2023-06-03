import DaoFS from "../daoFS.js";

let instance = null;

class ProductsDaoFS extends DaoFS {
  constructor() {
    super("./data/productos.json");
  }

  static getInstance() {
    if (!instance) {
      instance = new ProductsDaoFS();
    }
    return instance;
  }
}

export default ProductsDaoFS;
