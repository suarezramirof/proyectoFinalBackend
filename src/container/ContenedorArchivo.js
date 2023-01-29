import fs from "fs";

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async add(item) {
    const datos = await this.getAll();
    const newId = Math.max(...datos.map((elem) => elem.id)) + 1;
    datos.push({ ...item, timestamp: Date.now(), id: newId });
    await this.update(datos);
    return newId;
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.ruta);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }

  async get(id) {
    const data = await this.getAll();
    const item = data.find((elem) => elem.id == id);
    if (item) {
      return item;
    } else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }

  async update(data) {
    return fs.promises
      .writeFile(this.ruta, JSON.stringify(data), "utf-8")
      .catch((error) => error);
  }

  async updateId(id, item) {
    const data = await this.getAll();
    if (data.find((elem) => elem.id == id)) {
      const updatedData = data.map((elem) =>
        elem.id == id ? { ...elem, ...item } : elem
      );
      await this.update(updatedData);
    } else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }

  async delete(id) {
    const data = await this.getAll();
    if (data.find((elem) => elem.id == id)) {
      const dataFiltrada = data.filter((elem) => elem.id != id);
      await this.update(dataFiltrada);
    } else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }
}

export default ContenedorArchivo;
