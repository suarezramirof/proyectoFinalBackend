import mongoose from "mongoose";
import { MONGOPORT, MONGODB } from "../config.js";

mongoose.connect(MONGOPORT + MONGODB, {
  useNewUrlParser: true,
});

class ContenedorMongo {
  constructor(type, schema) {
    this.items = mongoose.model(type, schema);
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
    return await this.items.deleteOne({ _id: id });
  }
}

export default ContenedorMongo;
