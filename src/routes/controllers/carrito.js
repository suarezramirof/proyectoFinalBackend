import { carritos, productos } from "../../daos/index.js";

export const addCart = (req, res) => {
  carritos
    .add()
    .then((id) => res.json({ successMessage: `Carrito con id ${id} creado` }))
    .catch((error) => {
      res.status(error.code ? error.code : 500).json({ error: error.message });
    });
};

export const deleteCartById = (req, res) => {
  const id = req.params.id;
  carritos
    .delete(id)
    .then(() => res.json({ successMessage: "Carrito eliminado con éxito" }))
    .catch((error) => {
      res.status(error.code ? error.code : 500).json({ error: error.message });
    });
};

export const getItemsByCartId = (req, res) => {
  const id = req.params.id;
  carritos
    .getItems(id)
    .then((items) => {
      res.json(items);
    })
    .catch((error) => {
      res.status(error.code ? error.code : 500).json({ error: error.message });
    });
};

export const addItem = (req, res) => {
  const { cartId, prodId } = req.params;
  productos
    .get(prodId)
    .then((producto) => carritos.addCartItem(cartId, producto))
    .then(() =>
      res.json({ successMessage: "Producto agregado al carrito con éxito" })
    )
    .catch((error) => {
      res.status(error.code ? error.code : 500).json({ error: error.message });
    });
};

export const deleteItem = (req, res) => {
  const { cartId, prodId } = req.params;
  carritos
    .deleteCartItem(cartId, prodId)
    .then(() =>
      res.json({ successMessage: "Producto eliminado del carrito con éxito" })
    )
    .catch((error) => {
      res.status(error.code ? error.code : 500).json({ error: error.message });
    });
};
