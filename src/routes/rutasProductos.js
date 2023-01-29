import express from "express";
import { admin } from "../../server.js";
// import Productos from "../api/apiProductos.js";
import { Productos } from "../daos/index.js";

// const productos = new Productos([]);

const productos = new Productos();

export const productosRouter = express.Router();

productosRouter.get("/", (req, res) => {
  productos
    .getAll()
    .then((data) => res.json(data))
    .catch((error) => {
      res.status(error.code ? error.code : 500).json({ error: error.message });
    });
});

productosRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  productos
    .get(id)
    .then((item) => res.json(item))
    .catch((error) =>
      res.status(error.code ? error.code : 500).json({ error: error.message })
    );
});

productosRouter.post("/", (req, res) => {
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
});

productosRouter.put("/:id", (req, res) => {
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
});

productosRouter.delete("/:id", (req, res) => {
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
});
