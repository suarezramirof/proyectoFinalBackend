import { productos } from "../daos/index.js";
import { admin } from "../../server.js";
import { validationResult, check, matchedData } from "express-validator";
import { ATRProductos } from "../models/productos.js";
class ProductsController {
  constructor(productos, atr) {
    this.productos = productos;
    this.strings = atr.strings;
    this.urls = atr.urls;
    this.integers = atr.integers;
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

  addProduct = async (req, res) => {
    if (!admin) {
      res.status = 401;
      res.json({
        error: -1,
        descripcion: `Ruta ${req.originalUrl} con método ${req.method} no autorizada`,
      });
    } else {
      await check(this.strings)
        .exists({ checkFalsy: true })
        .bail()
        .trim()
        .isString()
        .run(req);
      await check(this.urls)
        .exists({ checkFalsy: true })
        .bail()
        .trim()
        .isURL({ require_protocol: true, allow_fragments: false })
        .run(req);
      await check(this.integers)
        .exists()
        .bail()
        .trim()
        .isInt({ min: 0 })
        .toInt()
        .run(req);
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ error: result.array() });
      }
      const producto = matchedData(req, { includeOptionals: false });

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

  editProduct = async (req, res) => {
    if (!admin) {
      res.status = 401;
      res.json({
        error: -1,
        descripcion: `Ruta ${req.originalUrl} con método ${req.method} no autorizada`,
      });
    } else {
      await check([...this.strings, ...this.urls, ...this.integers]).run(req);

      const props = matchedData(req, { includeOptionals: false });
      const keys = Object.keys(props);
      for (let key of keys) {
        if (props[key] != undefined) {
          if (this.strings.includes(key)) {
            await check(key)
              .exists({ checkFalsy: true })
              .bail()
              .isString()
              .bail()
              .trim()
              .run(req);
          } else if (this.urls.includes(key)) {
            await check(key)
              .exists({ checkFalsy: true })
              .bail()
              .trim()
              .isURL({ require_protocol: true, allow_fragments: false })
              .bail()
              .run(req);
          } else if (this.integers.includes(key)) {
            await check(key).trim().isInt({ min: 0 }).toInt().run(req);
          }
        } else {
          delete props[key];
        }
      }

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ error: result.array() });
      }

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

const productsController = new ProductsController(
  productos,
  ATRProductos
);
export default productsController;
