import express from "express";
import carritoController from "../controllers/carrito.js";

export const carritoRouter = express.Router();

carritoRouter.post("/:userId/pedido", carritoController.orderCart)
carritoRouter.delete("/:userId", carritoController.deleteCartByUserId);
carritoRouter.get("/:userId", carritoController.getItemsByUserId);
carritoRouter.post("/:userId/productos/:prodId", carritoController.addItem);
carritoRouter.put("/:userId/productos/:prodId", carritoController.updateItem);
carritoRouter.delete("/:userId/productos/:prodId", carritoController.deleteItem);