import { DB } from "../config.js";
let Productos;
let Carritos;
if (DB == "fs") {
  Productos = await import("./productos/ProductosDaoArchivos.js").then(
    (res) => res.default
  );
  Carritos = await import("./carritos/CarritosDaoArchivos.js").then(
    (res) => res.default
  );
} else if (DB == "mongoDB") {
  Productos = await import("./productos/productsDaoMongo.js").then(
    (res) => res.default
  );
  Carritos = await import("./carritos/cartsDaoMongo.js").then(
    (res) => res.default
  );
} else if (DB == "firebase") {
  Productos = await import("./productos/ProductosDaoFirebase.js").then(
    (res) => res.default
  );
  Carritos = await import("./carritos/CarritosDaoFirebase.js").then(
    (res) => res.default
  );
} else {
  Productos = await import("./productos/ProductosDaoMemoria.js").then(
    (res) => res.default
  );
  Carritos = await import("./carritos/CarritosDaoMemoria.js").then(
    (res) => res.default
  );
}

export const productos = new Productos();
export const carritos = new Carritos();
