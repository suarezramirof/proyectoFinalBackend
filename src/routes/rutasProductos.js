import express from "express";
import productsController from "../controllers/productos.js";
import validateRequest from "./key/apiKey.js";
export const productosRouter = express.Router();

productosRouter.get("/", productsController.getProducts);
productosRouter.get("/:id", productsController.getProductById);
productosRouter.post("/", validateRequest, productsController.addProduct);
productosRouter.put("/:id", productsController.editProduct);
productosRouter.delete("/:id", productsController.deleteProduct);