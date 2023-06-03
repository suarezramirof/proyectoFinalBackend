import DaoFactory from "../daos/index.js";
import validateProducts from "../models/validation/products.js";
let instance = null;
import Productos from "../models/classes/productsClass.js";
import ProductsDto from "../models/dtos/productsDto.js";

export default class ProductsApi {
  constructor() {
    DaoFactory.getProductsDao().then((res) => (this.dao = res));
  }
  async getAll() {
    try {
      const products = await this.dao.getAll();
      return products.map((product) => new Productos(product));
    } catch (error) {
      error.message += ` -- at ${this.constructor.name}`;
      throw error;
    }
  }

  async getById(id) {
    try {
      const product = await this.dao.getById(id);
      return new Productos(product);
    } catch (error) {
      error.message += ` -- at ${this.constructor.name}`;
      throw error;
    }
  }

  async save(product) {
    try {
      const data = ProductsApi.isValidProduct(product, true);
      const dto = new ProductsDto(data);
      const response = await this.dao.add(dto);
      return new Productos(response);
    } catch (error) {
      error.message += ` -- at ${this.constructor.name}`;
      throw error;
    }
  }

  async update(id, product) {
    const data = ProductsApi.isValidProduct(product, false);
    const dto = new ProductsDto(data);
    const updatedProductProps = Object.fromEntries(
      Object.entries(dto).filter(([_key, value]) => value !== undefined)
    );
    return await this.dao.updateById(id, updatedProductProps);
  }

  async delete(id) {
    return await this.dao.delete(id);
  }

  static getInstance() {
    if (!instance) {
      instance = new ProductsApi();
    }
    return instance;
  }

  static isValidProduct(product, required) {
    try {
      return validateProducts(product, required);
    } catch (error) {
      const err = new Error(
        "Invalid product json format or missing fields: " +
          error.details[0].message
      );
      err.code = 400;
      throw err;
    }
  }
}
