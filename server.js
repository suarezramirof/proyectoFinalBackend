// Imports

import express from "express";
import router from "./src/routes/index.js";
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

const server = app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => {
  console.log(`Error en el servidor: ${error}`);
});

// Router

app.use("/api", router);

// Login

export const admin = true;

// Manejo de rutas erróneas

app.use("*", (req, res) => {
  res.json({
    error: -2,
    descripcion: `Ruta ${req.originalUrl} con método ${req.method} no implementada`,
  });
});