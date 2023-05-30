import CartsApi from "../api/cartsApi.js";
import User from "../models/mongoose/User.js";
import transporter, { orderMail } from "../utils/nodeMailer.js";
import client, { message, whatsAppMessage } from "../utils/twilio.js";
import logger from "../utils/logger.js";
class CarritoController {
  constructor() {
    this.carts = CartsApi.getInstance();
  }

  deleteCartByUserId = (req, res) => {
    const userId = req.params.userId;
    this.carts
      .deleteCart(userId)
      .then((deletedCart) => {
        logger.info(`Cart with id: ${userId} deleted`);
        res.json(deletedCart);
      })
      .catch((error) => {
        logger.error("Error deleting cart: ", error.message);
        res
          .status(error.code ? error.code : 500)
          .json({ error: error.message });
      });
  };

  getItemsByUserId = (req, res) => {
    const id = req.params.userId;
    req.session.counter++;
    return this.carts
      .getProducts(id)
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
    const { userId, prodId } = req.params;
    const { qty } = req.query;
    req.session.counter++;

    this.carts
      .addProduct(userId, prodId, qty)
      .then((addedProduct) => {
        res.json(addedProduct);
      })
      .catch((error) => {
        logger.error("Error adding product to cart: ", error.message);
        res
          .status(error.code ? error.code : 500)
          .json({ error: error.message });
      });
  };

  updateItem = (req, res) => {
    const { userId, prodId } = req.params;
    const { qty } = req.query;
    this.carts
      .updateItem(userId, prodId, qty)
      .then((updatedProduct) => res.json(updatedProduct))
      .catch((error) => {
        res
          .status(error.code ? error.code : 500)
          .json({ error: error.message });
      });
  };

  deleteItem = (req, res) => {
    const { userId, prodId } = req.params;
    this.carts
      .deleteCartItem(userId, prodId)
      .then((data) => res.json(data))
      .catch((error) => {
        res
          .status(error.code ? error.code : 500)
          .json({ error: error.message });
      });
  };

  orderCart = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      const { email } = user;
      const { name } = user.userData;
      const cartId = await this.carts.getCartId(userId);
      const items = await this.carts.getProducts(userId);

      orderMail.html = JSON.stringify(items);
      orderMail.subject = `Nuevo pedido de ${name} / ${email}`;
      transporter.sendMail(orderMail);
      res.json({ message: "Cart items ordered" });
      logger.info("Cart items ordered");
      try {
        message.body = `Pedido con número ${cartId} en proceso.`;
        whatsAppMessage.body = `Nuevo pedido de ${name} / ${email}`;
        await client.messages
          .create(message)
          .then((msg) =>
            logger.info(
              `Text message sent: \n body: ${msg.body}\n to: ${msg.to}\n from: ${msg.from}`
            )
          );
        await client.messages
          .create(whatsAppMessage)
          .then((msg) =>
            logger.info(
              `WhatsApp message sent: \n body: ${msg.body}\n to: ${msg.to}\n from: ${msg.from}`
            )
          );
      } catch (err) {
        logger.error("Error sending message: " + err.message);
      }
    } catch (err) {
      logger.error("Error ordering cart: " + err.message);
      res.status(500).json({ error: "Error ordering cart" + err.message });
    }
  };
}

const carritoController = new CarritoController();

export default carritoController;
