import { carritos, productos } from "../../daos/index.js";

class CarritoController {
    constructor (carritos, productos) {
        this.carritos = carritos;
        this.productos = productos;
    }

    addCart = (req, res) => {
        this.carritos
          .add()
          .then((id) => res.json({ successMessage: `Carrito con id ${id} creado` }))
          .catch((error) => {
            res.status(error.code ? error.code : 500).json({ error: error.message });
          });
      };

      deleteCartById = (req, res) => {
        const id = req.params.id;
        this.carritos
          .delete(id)
          .then(() => res.json({ successMessage: "Carrito eliminado con éxito" }))
          .catch((error) => {
            res.status(error.code ? error.code : 500).json({ error: error.message });
          });
      };

      getItemsByCartId = (req, res) => {
        const id = req.params.id;
        this.carritos
          .getItems(id)
          .then((items) => {
            res.json(items);
          })
          .catch((error) => {
            res.status(error.code ? error.code : 500).json({ error: error.message });
          });
      };

      addItem = (req, res) => {
        const { cartId, prodId } = req.params;
        this.productos
          .get(prodId)
          .then((producto) => this.carritos.addCartItem(cartId, producto))
          .then(() =>
            res.json({ successMessage: "Producto agregado al carrito con éxito" })
          )
          .catch((error) => {
            res.status(error.code ? error.code : 500).json({ error: error.message });
          });
      };

      deleteItem = (req, res) => {
        const { cartId, prodId } = req.params;
        this.carritos
          .deleteCartItem(cartId, prodId)
          .then(() =>
            res.json({ successMessage: "Producto eliminado del carrito con éxito" })
          )
          .catch((error) => {
            res.status(error.code ? error.code : 500).json({ error: error.message });
          });
      };
}

const carritoController = new CarritoController(carritos, productos);

export default carritoController;