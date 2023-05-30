// Imports
import { PORT, MODE, DB } from "./src/config.js";
import cluster from "cluster";
import os from "os";
import express from "express";
import router from "./src/routes/index.js";
import { NODE_ENV } from "./src/config.js";
import cors from "cors";
import sessionMiddleware from "./src/auth/session.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import initialize from "./src/auth/passport-config.js";

// Express

if (MODE === "CLUSTER" && cluster.isPrimary) {
  const numCpus = os.cpus().length;
  console.log("Primary cluster server");

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static("public"));
  app.use("/uploads", express.static("uploads"));
  if (NODE_ENV === "development") 
  app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
  app.use(cookieParser());
  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());
  initialize(passport);

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

  app.get("*", (_req, res) => {
    res.sendFile("/index.html", { root: "./public" });
  });
}
