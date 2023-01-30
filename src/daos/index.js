import { envVariable } from "../config.js";
let Productos;
let Carritos;
if (envVariable == 1) {
  Productos = await import("./productos/ProductosDaoArchivos.js");
  Productos = Productos.default;
  Carritos = await import("./carritos/CarritosDaoArchivos.js");
  Carritos = Carritos.default;
} else if (envVariable == 2) {
  Productos = await import("./productos/ProductosDaoMongo.js");
  Productos = Productos.default;
  Carritos = await import("./carritos/CarritosDaoMongo.js");
  Carritos = Carritos.default;
}

export { Productos, Carritos };
