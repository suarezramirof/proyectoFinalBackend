import fs from "fs";

class DaoFS {
  constructor(ruta) {
    this.ruta = ruta; // Ruta donde se encontrará el .json
  }

  static getIndex(id, array) {
    const index = array.findIndex((elem) => elem._id == id);
    return index;
  }

  static getNextId(array) {
    const nextId = array.length
      ? Math.max(...array.map((elem) => parseInt(elem._id))) + 1 + ""
      : "1";
    return nextId;
  }

  // Método para agregar un elemento (objeto, con datos opcionales) al array
  async add(item) {
    // Se lee el array y se le asigna a una variable
    const datos = await this.getAll();
    // El id asignado a un nuevo objeto siempre será un número mayor que el del id máximo del array o 1 para el primer objeto.
    const newId = DaoFS.getNextId(datos);
    const newItem = {
      ...item,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      _id: newId,
    };
    // Las propiedades mínimas del objeto serán el timestamp y el id.
    // El resto de las propiedades serán las del objeto que conforma el argumento del método.
    datos.push(newItem);
    // Se graba en el .json el array actualizado
    await this.update(datos);
    return newItem;
  }

  // Método que devuelve en forma de objeto (array) el contenido de un archivo .json
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.ruta);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Método que devuelve el objeto con el id provisto
  async getById(id) {
    const data = await this.getAll();
    const item = data.find((elem) => elem._id == id);
    if (item) {
      return item;
    } else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }

  // Método que sobreescribe el .json con el argumento pasado (array)
  async update(data) {
    return await fs.promises.writeFile(
      this.ruta,
      JSON.stringify(data),
      "utf-8"
    );
  }

  // Método para reemplazar propiedades de un objeto con un id dado por otras
  async updateById(id, item) {
    const data = await this.getAll();
    const index = DaoFS.getIndex(id, data);
    if (index >= 0) {
      const actualItem = data[index];
      const updatedItem = { ...actualItem, ...item, updatedAt: Date.now() };
      data[index] = updatedItem;
      await this.update(data);
      return updatedItem;
    } else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }

  async delete(id) {
    const data = await this.getAll();
    const index = DaoFS.getIndex(id, data);
    if (index >= 0) {
      const [deletedItem] = data.splice(index, 1);
      await this.update(data);
      return deletedItem;
    } else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }
}

export default DaoFS;
