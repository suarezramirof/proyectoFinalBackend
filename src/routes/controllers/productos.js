import { productos } from "../../daos/index.js";
import { admin } from "../../../server.js";

export const getProducts = (_req, res) => {
  productos
    .getAll()
    .then((data) => res.json(data))
    .catch((error) => {
      res.status(error.code ? error.code : 500).json({ error: error.message });
    });
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  productos
    .get(id)
    .then((item) => res.json(item))
    .catch((error) =>
      res.status(error.code ? error.code : 500).json({ error: error.message })
    );
};

export const addProduct = (req, res) => {
  if (!admin) {
    res.status = 401;
    res.json({
      error: -1,
      descripcion: `Ruta ${req.originalUrl} con método ${req.method} no autorizada`,
    });
  } else {
    const producto = req.body;
    productos
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

export const editProduct = (req, res) => {
  if (!admin) {
    res.status = 401;
    res.json({
      error: -1,
      descripcion: `Ruta ${req.originalUrl} con método ${req.method} no autorizada`,
    });
  } else {
    const props = req.body;
    const id = req.params.id;
    productos
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

export const deleteProduct = (req, res) => {
  if (!admin) {
    res.status = 401;
    res.json({
      error: -1,
      descripcion: `Ruta ${req.originalUrl} con método ${req.method} no autorizada`,
    });
  } else {
    const id = req.params.id;
    productos
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
