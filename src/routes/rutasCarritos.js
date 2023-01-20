import express from "express";
import { admin } from "../../server.js";
import Carritos from "../api/apiCarritos.js";
import MemoriaCarritos from "../data/persistenciaCarritos.js";

const carritos = new Carritos();
const persistencia = new MemoriaCarritos();

export const carritoRouter = express.Router();

persistencia
  .leerCarritos()
  .then((data) => {
    carritos.initialize(data);
  })
  .catch((error) => console.log(error));

carritoRouter.post("/", (req, res) => {
  res.json({ succesMessage: `Carrito con id ${carritos.createCart()} creado` });
  persistencia.updateCarritos(carritos.getCarts());
});

carritoRouter.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    carritos.deleteCartById(id);
    persistencia.updateCarritos(carritos.getCarts());
    res.json({ successMessage: "Carrito eliminado con éxito" });
  } catch (error) {
    res.status(error.code ? error.code : 500).json({ error: error.message });
  }
});

carritoRouter.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    res.json(carritos.getCartItems(id));
  } catch (error) {
    res.status(error.code ? error.code : 500).json({ error: error.message });
  }
});

carritoRouter.post("/:cartId/productos/:prodId", (req, res) => {
  try {
    const { cartId, prodId } = req.params;
    const producto = productos.getItemById(prodId);
    carritos.addCartItem(cartId, producto);
    persistencia.updateCarritos(carritos.getCarts());
    res.json({ successMessage: "Producto agregado al carrito con éxito" });
  } catch (error) {
    res.status(error.code ? error.code : 500).json({ error: error.message });
  }
});

carritoRouter.delete("/:cartId/productos/:prodId", (req, res) => {
  try {
    const { cartId, prodId } = req.params;
    carritos.deleteCartItem(cartId, prodId);
    persistencia.updateCarritos(carritos.getCarts());
    res.json({ successMessage: "Producto eliminado del carrito con éxito" });
  } catch (error) {
    res.status(error.code ? error.code : 500).json({ error: error.message });
  }
});
