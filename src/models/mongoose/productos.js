import mongoose from "mongoose";

export const DataTypesProductos = {
  strings: ["nombre", "descripcion", "codigo"],
  urls: ["foto"],
  integers: ["precio", "stock"],
};

const PRODUCTOS_SCHEMA = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    foto: { type: String, required: true },
    codigo: { type: String, required: true, max: 20 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Producto", PRODUCTOS_SCHEMA);
