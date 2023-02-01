import { envVariable } from "../config.js";
let Productos;
let Carritos;
if (envVariable == 1) {
  Productos = await import("./productos/ProductosDaoArchivos.js").then(
    (res) => res.default
  );
  Carritos = await import("./carritos/CarritosDaoArchivos.js").then(
    (res) => res.default
  );
} else if (envVariable == 2) {
  Productos = await import("./productos/ProductosDaoMongo.js").then(
    (res) => res.default
  );
  Carritos = await import("./carritos/CarritosDaoMongo.js").then(
    (res) => res.default
  );
} else if (envVariable == 3) {
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

export { Productos, Carritos };
