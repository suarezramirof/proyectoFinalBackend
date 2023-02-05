import express from "express";
import carritoController from "./controllers/carrito.js";

export const carritoRouter = express.Router();

carritoRouter.post("/", carritoController.addCart);
carritoRouter.delete("/:id", carritoController.deleteCartById);
carritoRouter.get("/:id", carritoController.getItemsByCartId);
carritoRouter.post("/:cartId/productos/:prodId", carritoController.addItem);
carritoRouter.delete("/:cartId/productos/:prodId", carritoController.deleteItem);