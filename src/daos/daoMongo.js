import mongoose from "mongoose";
import { MongoAtlasUri } from "../config.js";
import logger from "../utils/logger.js";
try {
  mongoose.connect(
    MongoAtlasUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => logger.info("Mongoose is connected")
  );
} catch (error) {
  logger.fatal("Could not connect to mongoDB. Error: ", error);
}

class DaoMongo {
  constructor(model) {
    this.items = model;
  }

  getAll = async () => {
    try {
      return await this.items.find({});
    } catch (error) {
      error.code = 500;
      error.message += ` -- at ${this.constructor.name}`;
      throw error;
    }
  };

  getById = async (id) => {
    try {
      const item = await this.items.findById(id);
      if (!item) {
        const error = new Error(`Item with id: ${id} not found`);
        error.code = 404;
        throw error;
      }
      return item;
    } catch (error) {
      error.message = error.message.replace(
        "Cast to ObjectId failed",
        "Invalid ID"
      );
      error.message += ` -- at ${this.constructor.name}`;
      throw error;
    }
  };

  add = async (item) => {
    try {
      return this.items.create(item);
    } catch (error) {
      error.message += ` -- at ${this.constructor.name}`;
      throw error;
    }
  };

  updateById = async (id, item) =>
    this.items.findByIdAndUpdate(id, item, { new: true });

  async delete(id) {
    return await this.items.findByIdAndDelete(id);
  }
}

export default DaoMongo;
