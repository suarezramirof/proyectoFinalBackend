import { carritos, productos } from "../daos/index.js";
import User from "../models/User.js";
import transporter, { orderMail } from "../misc/nodeMailer.js";
import client, { message, whatsAppMessage } from "../misc/twilio.js";
import logger from "../misc/logger.js";
class CarritoController {
  constructor(carritos, productos) {
    this.carritos = carritos;
    this.productos = productos;
  }

  addCart = (req, res) => {
    return this.carritos
      .add()
      .then(async (id) => {
        await User.findOneAndUpdate({ _id: req.user.id }, { cart: id });
        req.session.counter++;
        logger.info(`Cart with id: ${id} created`);
        return res.json({
          successMessage: `Carrito con id ${id} creado`,
          cartId: id,
        });
      })
      .catch((error) => {
        logger.error("Error adding cart: ", error.message);
        res
          .status(error.code ? error.code : 500)
          .json({ error: error.message });
      });
  };

  deleteCartById = (req, res) => {
    const id = req.params.id;
    this.carritos
      .delete(id)
      .then(() => {
        logger.info(`Cart with id: ${id} deleted`);
        res.json({ successMessage: "Cart deleted succesfully" });
      })
      .catch((error) => {
        logger.error("Error deleting cart: ", error.message);
        res
          .status(error.code ? error.code : 500)
          .json({ error: error.message });
      });
  };

  getItemsByCartId = (req, res) => {
    const id = req.params.id;
    req.session.counter++;
    this.carritos
      .getItems(id)
      .then((items) => {
        res.json(items);
      })
      .catch((error) => {
        logger.error("Error getting items from cart: ", error.message);
        res
          .status(error.code ? error.code : 500)
          .json({ error: error.message });
      });
  };

  addItem = (req, res) => {
    const { cartId, prodId } = req.params;
    const { qty } = req.query;
    req.session.counter++;
    this.productos
      .get(prodId)
      .then((producto) => this.carritos.addCartItem(cartId, producto, qty))
      .then(() => {
        logger.info(`Item with id: ${prodId} added to cart with id: ${cartId}`);
        res.json({ successMessage: "Item added to cart succesfully" });
      })
      .catch((error) => {
        res
          .status(error.code ? error.code : 500)
          .json({ error: error.message });
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
        res
          .status(error.code ? error.code : 500)
          .json({ error: error.message });
      });
  };

  orderCart = async (req, res) => {
    try {
      const { cartId, userId } = req.params;
      const user = await User.findById(userId);
      const { email } = user;
      const { name } = user.userData;
      this.carritos.getItems(cartId).then(async (items) => {
        orderMail.html = JSON.stringify(items);
        orderMail.subject = `Nuevo pedido de ${name} / ${email}`;
        transporter.sendMail(orderMail);
        res.json({ message: "Cart items ordered" });
        try {
          message.body = `Pedido con número ${cartId} en proceso.`;
          whatsAppMessage.body = `Nuevo pedido de ${name} / ${email}`;
          await client.messages.create(message).then((msg) => console.log(msg));
          await client.messages
            .create(whatsAppMessage)
            .then((msg) => console.log(msg));
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      res.json({ error: err });
    }
  };
}

const carritoController = new CarritoController(carritos, productos);

export default carritoController;
