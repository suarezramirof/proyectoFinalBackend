import ProductsApi from "../api/productsApi.js";
import logger from "../utils/logger.js";

class ProductsController {
  // El constructor utiliza una instancia del contenedor de productos, y las categorías de cada una de las propiedades
  constructor() {
    this.productos = ProductsApi.getInstance();
  }

  getProducts = async (req, res) => {
    try {
      req.session.counter++;
      const products = await this.productos.getAll();
      logger.info("Get products request received");
      res.json(products);
    } catch (error) {
      error.message += ` -- at ${this.constructor.name}`;
      logger.error(error.message);
      res.status(error.code || 500).json({ error: error.message });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await this.productos.getById(id);
      logger.info("Get product by id: " + id + " request received");
      res.json(item);
    } catch (error) {
      error.message += ` -- at ${this.constructor.name}`;
      logger.error(error.message);
      res.status(error.code || 500).json({ error: error.message });
    }
  };

  addProduct = async (req, res) => {
    try {
      const addedProduct = await this.productos.save(req.body);
      res.json(addedProduct);
    } catch (error) {
      error.message += ` -- at ${this.constructor.name}`;
      logger.error(error.message);
      res.status(error.code ? error.code : 500).json({ error: error.message });
    }
  };

  editProduct = async (req, res) => {
    try {
      const updatedProduct = await this.productos.update(
        req.params.id,
        req.body
      );
      res.json(updatedProduct);
    } catch (error) {
      error.message += ` -- at ${this.constructor.name}`;
      logger.error(error.message);
      res.status(error.code ? error.code : 500).json({ error: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const deletedProduct = await this.productos.delete(req.params.id);
      res.json(deletedProduct);
    } catch (error) {
      error.message += ` -- at ${this.constructor.name}`;
      logger.error(error.message);
      res.status(error.code ? error.code : 500).json({ error: error.message });
    }
  };
}

const productsController = new ProductsController();

export default productsController;
