import mongoose from "mongoose";

export const ATRProductos = {
  strings: ["nombre", "descripcion", "codigo"],
  urls: ["foto"],
  integers: ["precio", "stock"],
};

export const PRODUCTOS_SCHEMA = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  foto: { type: String, required: true },
  codigo: { type: String, required: true, max: 20 },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  timestamp: { type: Date },
});
