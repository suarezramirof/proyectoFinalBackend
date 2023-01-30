import mongoose from "mongoose";
import ContenedorMongo from "../../container/ContenedorMongo.js";
const dbname = "ecommerce";
const ProductsSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: String, required: true, max: 20 },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});

class ProductosDaoMongo extends ContenedorMongo {
  constructor() {
    super(dbname, "productos", ProductsSchema);
  }
}

export default ProductosDaoMongo;
