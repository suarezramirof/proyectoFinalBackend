import { productos } from "../daos/index.js";
import { admin } from "../config.js"; // La variable admin establece el permiso agregado de productos, edición y eliminación
import { validationResult, body, matchedData } from "express-validator";
import { DataTypesProductos } from "../models/productos.js";

class ProductsController {
  // El constructor utiliza una instancia del contenedor de productos, y las categorías de cada una de las propiedades
  constructor(productos, { strings, urls, integers }) {
    this.productos = productos;
    this.strings = strings;
    this.urls = urls;
    this.integers = integers;
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
      await body(this.strings) // Cadena de validación
        .exists({ checkFalsy: true })
        .withMessage("debe tener un valor")
        .bail()
        .isString()
        .withMessage("debe ser una cadena de texto")
        .trim()
        .run(req);
      await body(this.urls)
        .exists({ checkFalsy: true })
        .withMessage("debe ser una URL válida")
        .bail()
        .trim()
        .isURL({ require_protocol: true, allow_fragments: false })
        .withMessage("debe ser una URL válida")
        .run(req);
      await body(this.integers)
        .exists()
        .withMessage("debe tener un valor")
        .bail()
        .trim()
        .isInt({ min: 0 })
        .withMessage("debe ser un entero positivo")
        .toInt()
        .run(req);
      const result = validationResult(req);
      if (!result.isEmpty()) {
        // Se cumple cuando hubo algún error en la validación
        return res.status(400).json({ error: result.array() });
      }
      const producto = matchedData(req, { includeOptionals: false }); // El producto que se pasa sólo tendrá los parámetros que se chequearon en la cadena de validación.
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
      await body([...this.strings, ...this.urls, ...this.integers]).run(req);
      const props = matchedData(req, { includeOptionals: false }); // EL objeto tendrá todas las propiedades del modelo, aquellas que no formen parte del body tendrán valor "undefined"
      const keys = Object.keys(props);
      for (let key of keys) {
        if (props[key] != undefined) { // Se chequean aquellas propiedades con valor asignado
          if (this.strings.includes(key)) {
            await body(key)
              .exists({ checkFalsy: true })
              .withMessage("debe tener un valor")
              .bail()
              .isString()
              .withMessage("debe ser una cadena de texto")
              .bail()
              .trim()
              .run(req);
          } else if (this.urls.includes(key)) {
            await body(key)
              .exists({ checkFalsy: true })
              .withMessage("debe ser una URL válida")
              .bail()
              .trim()
              .isURL({ require_protocol: true, allow_fragments: false })
              .withMessage("debe ser una URL válida")
              .bail()
              .run(req);
          } else if (this.integers.includes(key)) {
            await body(key)
              .trim()
              .isInt({ min: 0 })
              .withMessage("debe ser un entero positivo")
              .toInt()
              .run(req);
          }
        } else {
          delete props[key]; // Las propiedades con valor "undefined" son eliminadas del objeto, porque de lo contrario se actualizarían los valores a undefined.
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
  DataTypesProductos
);

export default productsController;
