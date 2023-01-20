import express from "express";
import { admin } from "../../server.js";
import Carritos from "../api/apiCarritos.js";
import Productos from "../api/apiProductos.js";

const productos = new Productos();
const carritos = new Carritos();

export const carritoRouter = express.Router();

carritoRouter.post("/", (req, res) => {
  carritos.createCart().then((id) => res.json(`Carrito con id ${id} creado`));
});

carritoRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  carritos
    .deleteCartById(id)
    .then(() => res.json({ successMessage: "Carrito eliminado con éxito" }))
    .catch((error) => {
      res.status(error.code ? error.code : 500).json({ error: error.message });
    });
});

carritoRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  carritos
    .getCartItems(id)
    .then((items) => {
      res.json(items);
    })
    .catch((error) => {
      res.status(error.code ? error.code : 500).json({ error: error.message });
    });
});

carritoRouter.post("/:cartId/productos/:prodId", (req, res) => {
  const { cartId, prodId } = req.params;
  productos
    .getItemById(prodId)
    .then((producto) => carritos.addCartItem(cartId, producto))
    .then(() =>
      res.json({ successMessage: "Producto agregado al carrito con éxito" })
    )
    .catch((error) => {
      res.status(error.code ? error.code : 500).json({ error: error.message });
    });
});

carritoRouter.delete("/:cartId/productos/:prodId", (req, res) => {
  const { cartId, prodId } = req.params;
  carritos
    .deleteCartItem(cartId, prodId)
    .then(() =>
      res.json({ successMessage: "Producto eliminado del carrito con éxito" })
    )
    .catch((error) => {
      res.status(error.code ? error.code : 500).json({ error: error.message });
    });
});
