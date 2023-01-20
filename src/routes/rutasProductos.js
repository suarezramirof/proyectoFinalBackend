import express from "express";
import { admin } from "../../server.js";
import Productos from "../api/apiProductos.js";
import MemoriaProductos from "../data/persistenciaProductos.js";

const productos = new Productos([]);
const persistencia = new MemoriaProductos();

export const productosRouter = express.Router();

persistencia
  .leerProductos()
  .then((data) => {
    productos.initialize(data);
  })
  .catch((error) => console.log(error));

productosRouter.get("/", (req, res) => {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.json(productos.getAll());
  });
  
  productosRouter.get("/:id", (req, res) => {
    try {
      const { id } = req.params;
      res.json(productos.getItemById(id));
    } catch (error) {
      res.status(error.code ? error.code : 500).json({ error: error.message });
    }
  });
  
  productosRouter.post("/", (req, res) => {
    if (!admin) {
      res.status = 401;
      res.json({
        error: -1,
        descripcion: `Ruta ${req.originalUrl} con método ${req.method} no autorizada`,
      });
    } else {
      try {
        const producto = req.body;
        productos.addItem(producto);
        persistencia.updateProductos(productos.getAll());
        res.json({ successMessage: "Carga exitosa" });
      } catch (error) {
        res.status(error.code ? error.code : 500).json({ error: error.message });
      }
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
      try {
        const { nombre, descripcion, codigo, foto, stock, precio } = req.body;
        const id = req.params.id;
        productos.updateItem(id, {
          nombre,
          descripcion,
          codigo,
          foto,
          stock,
          precio,
        });
        persistencia.updateProductos(productos.getAll());
        res.json({ successMessage: "Actualización exitosa" });
      } catch (error) {
        res.status(error.code ? error.code : 500).json({ error: error.message });
      }
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
      try {
        const id = req.params.id;
        productos.deleteItemById(id);
        persistencia.updateProductos(productos.getAll());
        res.json({ successMessage: "Eliminación exitosa" });
      } catch (error) {
        res.status(error.code ? error.code : 500).json({ error: error.message });
      }
    }
  });