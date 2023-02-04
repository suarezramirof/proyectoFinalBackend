import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct
} from "./controllers/productos.js";

export const productosRouter = express.Router();

productosRouter.get("/", getProducts);
productosRouter.get("/:id", getProductById);
productosRouter.post("/", addProduct);
productosRouter.put("/:id", editProduct);
productosRouter.delete("/:id", deleteProduct);