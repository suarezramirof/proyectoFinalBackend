// Imports
import hbs from "./src/engines/handlebars.js";
import { PORT, DB } from "./src/config.js";
import express from "express";
import router from "./src/routes/index.js";
import cors from "cors";
import sessionMiddleware from "./src/auth/session.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import initialize from "./src/auth/passport-config.js";

// Express

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(cors());
app.use(cookieParser());
app.use(sessionMiddleware)
app.use(passport.initialize());
app.use(passport.session());
initialize(passport)


app.engine("hbs", hbs.engine);
app.set("views", "public/views");
app.set("view engine", "hbs");

// Servidor

const server = app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en el puerto ${
      server.address().port
    }. Base de datos: ${DB}.`
  );
});
server.on("error", (error) => {
  console.log(`Error en el servidor: ${error}`);
});

// Router

app.use("/", router);
// app.get('*', (req, res) => {
//   res.sendFile('/public/index.html', {root: "."});
// });

// Manejo de rutas erróneas

app.use("*", (req, res) => {
  res.json({
    error: -2,
    descripcion: `Ruta ${req.originalUrl} con método ${req.method} no implementada`,
  });
});

app.get("/", (_req, res) => {
  res.sendFile("/index.html", { root: "." });
});