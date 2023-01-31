import mongoose from "mongoose";
import { mongo } from "../config.js";

class ContenedorMongo {
  constructor(db, type, schema) {
    this.ruta = mongo + db;
    this.db = db;
    this.connect(this.ruta);
    this.items = mongoose.model(type, schema);
  }

  connect(ruta) {
    mongoose.connect(ruta, {
      useNewUrlParser: true,
    });
  }

  async getAll() {
    const items = this.items.find({});
    return items;
  }

  async get(id) {
    const [item] = await this.items.find({ _id: id });
    return item;
  }

  async add(item) {
    const promise = this.items.create(item);
    return await promise.then((elem) => {
      this.updateId(elem._id, { timestamp: elem._id.getTimestamp() });
      return elem._id;
    });
  }

  async updateId(id, item) {
    return await this.items.updateOne({ _id: id }, { $set: item });
  }

  async delete(id) {
    return await this.items
      .deleteOne({ _id: id })
      .then(() => console.log("Eliminación exitosa"));
  }
}

export default ContenedorMongo;
