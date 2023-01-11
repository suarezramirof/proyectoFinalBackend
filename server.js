// Imports

import express from "express";
import { MemoriaProductos } from "./src/persistencia.js";
import { Productos, Carritos } from "./src/api.js";

// Instancias de clases

const carritos = new Carritos();
const persistencia = new MemoriaProductos();
const productos = new Productos([]);

// Express

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (_req, res) => {
  res.sendFile("/index.html", {root: "."});
});
app.use(express.static("public"));

// Servidor

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => {
  console.log(`Error en el servidor: ${error}`);
});

// Router

const productosRouter = express.Router();
const carritoRouter = express.Router();
app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);

// Login

const admin = true;

// Inicialización productos

persistencia
  .leerProductos()
  .then((data) => {
    productos.initialize(data);
  })
  .catch((error) => console.log(error));

// Inicialización carritos

persistencia
  .leerCarritos()
  .then((data) => {
    carritos.initialize(data);
  })
  .catch((error) => console.log(error));

// Rutas productos

productosRouter.get("/", (req, res) => {
  res.json(productos.getAll());
});

productosRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    res.json(productos.getItemById(id));
  } catch (error) {
    res.status(error.code ? error.code : 500).json({ error: error.message });
  }
});

productosRouter.post("/", (req, res) => {
  if (!admin) {
    res.status = 401;
    res.json({
      error: -1,
      descripcion: `Ruta ${req.originalUrl} con método ${req.method} no autorizada`,
    });
  } else {
    try {
      const producto = req.body;
      productos.addItem(producto);
      persistencia.updateProductos(productos.getAll());
      res.json({ successMessage: "Carga exitosa" });
    } catch (error) {
      res.status(error.code ? error.code : 500).json({ error: error.message });
    }
  }
});

productosRouter.put("/:id", (req, res) => {
  if (!admin) {
    res.status = 401;
    res.json({
      error: -1,
      descripcion: `Ruta ${req.originalUrl} con método ${req.method} no autorizada`,
    });
  } else {
    const { nombre, descripcion, codigo, foto, stock, precio } = req.body;
    const id = req.params.id;
    productos.updateItem(id, {
      nombre,
      descripcion,
      codigo,
      foto,
      stock,
      precio,
    });
    persistencia.updateProductos(productos.getAll());
    res.json({ successMessage: "Actualización exitosa" });
  }
});

productosRouter.delete("/:id", (req, res) => {
  if (!admin) {
    res.status = 401;
    res.json({
      error: -1,
      descripcion: `Ruta ${req.originalUrl} con método ${req.method} no autorizada`,
    });
  } else {
    const id = req.params.id;
    productos.deleteItemById(id);
    persistencia.updateProductos(productos.getAll());
    res.json({ successMessage: "Eliminación exitosa" });
  }
});

productosRouter.post("/:id", (req, res) => {
  res.json({
    error: -2,
    descripcion: `Ruta ${req.originalUrl} con método ${req.method} no implementada`,
  });
});

// Rutas carrito

carritoRouter.post("/", (req, res) => {
  res.json(carritos.createCart());
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
    res.json({ productos: carritos.getCartItems(id) });
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
    const {cartId, prodId} = req.params;
    carritos.deleteCartItem(cartId, prodId);
    persistencia.updateCarritos(carritos.getCarts());
    res.json({successMessage: "Producto eliminado del carrito con éxito"});
  } catch(error) {
    res.status(error.code ? error.code : 500).json({error: error.message})
  }
})

carritoRouter.get("/", (req, res) => {
  res.json({
    error: -2,
    descripcion: `Ruta ${req.originalUrl} con método ${req.method} no implementada`,
  });
});
