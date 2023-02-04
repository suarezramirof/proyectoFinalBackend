import express from "express";
import {
  addCart,
  deleteCartById,
  getItemsByCartId,
  addItem,
  deleteItem,
} from "./controllers/carrito.js";

export const carritoRouter = express.Router();

carritoRouter.post("/", addCart);
carritoRouter.delete("/:id", deleteCartById);
carritoRouter.get("/:id", getItemsByCartId);
carritoRouter.post("/:cartId/productos/:prodId", addItem);
carritoRouter.delete("/:cartId/productos/:prodId", deleteItem);