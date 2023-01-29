// Imports

import express from "express";
import { productosRouter } from "./src/routes/rutasProductos.js";
import { carritoRouter } from "./src/routes/rutasCarritos.js";
import cors from "cors";

// Express

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (_req, res) => {
  res.sendFile("/index.html", { root: "." });
});
app.use(express.static("public"));
app.use(cors())

// Servidor

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => {
  console.log(`Error en el servidor: ${error}`);
});

// Router

// const productosRouter = express.Router();

app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);

// Login

export const admin = true;

// Manejo de rutas erróneas

app.use("*", (req, res) => {
  res.json({
    error: -2,
    descripcion: `Ruta ${req.originalUrl} con método ${req.method} no implementada`,
  });
});