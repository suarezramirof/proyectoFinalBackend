import { productos } from "../../daos/index.js";
import { admin } from "../../../server.js";

class ProductsController {
  constructor(productos) {
    this.productos = productos;
  }

  getProducts = (_req, res) => {
    this.productos
      .getAll()
      .then((data) => res.json(data))
      .catch((error) => {
        res
          .status(error.code ? error.code : 500)
          .json({ error: error.message });
      });
  };

  getProductById = (req, res) => {
    const { id } = req.params;
    this.productos
      .get(id)
      .then((item) => res.json(item))
      .catch((error) =>
        res.status(error.code ? error.code : 500).json({ error: error.message })
      );
  };

  addProduct = (req, res) => {
    if (!admin) {
      res.status = 401;
      res.json({
        error: -1,
        descripcion: `Ruta ${req.originalUrl} con método ${req.method} no autorizada`,
      });
    } else {
      const producto = req.body;
      this.productos
        .add(producto)
        .then(() => {
          res.json({ successMessage: "Carga exitosa" });
        })
        .catch((error) => {
          res
            .status(error.code ? error.code : 500)
            .json({ error: error.message });
        });
    }
  };

  editProduct = (req, res) => {
    if (!admin) {
      res.status = 401;
      res.json({
        error: -1,
        descripcion: `Ruta ${req.originalUrl} con método ${req.method} no autorizada`,
      });
    } else {
      const props = req.body;
      const id = req.params.id;
      this.productos
        .updateId(id, props)
        .then(() => {
          res.json({ successMessage: "Actualización exitosa" });
        })
        .catch((error) => {
          res
            .status(error.code ? error.code : 500)
            .json({ error: error.message });
        });
    }
  };

  deleteProduct = (req, res) => {
    if (!admin) {
      res.status = 401;
      res.json({
        error: -1,
        descripcion: `Ruta ${req.originalUrl} con método ${req.method} no autorizada`,
      });
    } else {
      const id = req.params.id;
      this.productos
        .delete(id)
        .then(() => {
          res.json({ successMessage: "Eliminación exitosa" });
        })
        .catch((error) => {
          res
            .status(error.code ? error.code : 500)
            .json({ error: error.message });
        });
    }
  };
}

const productsController = new ProductsController(productos);
export default productsController;
