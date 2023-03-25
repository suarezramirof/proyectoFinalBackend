import mongoose from "mongoose";
import { MongoAtlasUri } from "../config.js";

try {
  mongoose.connect(
    MongoAtlasUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("Mongoose is connected")
  );
} catch (error) {
  console.log("Could not connect. Error: " + error);
}

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
